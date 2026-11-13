import * as mc from '@minecraft/server';

const { world, system } = mc;

// (previous position tracking removed) we'll use input vectors instead
// track when blocking started (tick when `blocking` tag was added)
const _blockStartTicks = new Map();
let _tickCounter = 0;

// Configuration
const MIN_BLOCK_COST = 1;         // minimum energy consumed per block
const PUNISH_STUN_TICKS = 30;     // stun ticks applied when block breaks
const PUNISH_BLOCK_COOLDOWN = 50; // ticks (2s) before player can block again

// Ensure scoreboard objective for passing incoming block damage exists
(function ensureObjectives() {
    try {
        if (!world.scoreboard.getObjective("blockIn")) {
            // best-effort create (may fail in some environments) — ignore errors
            world.getDimension("overworld").runCommandAsync(`scoreboard objectives add blockIn dummy`);
        }
    } catch (e) {
        // ignore — code will still work without the objective (fallbacks used)
    }
})();

const GRACE_TICKS = 10;
system.runInterval(() => {
    _tickCounter++;
    const energyObj = world.scoreboard.getObjective("energy");
    const cdObj = world.scoreboard.getObjective("cd");

    for (const player of world.getPlayers()) {
        try {
            // clear 'need_resneak' when player stops sneaking so they can re-sneak later
            if (!player.isSneaking && player.hasTag("need_resneak")) {
                player.removeTag("need_resneak");
            }

            // detect movement via input vector: cancel blocking if player inputs movement
            if (player.hasTag("blocking")) {
                const startTick = _blockStartTicks.get(player.id) || 0;
                const gracePassed = (_tickCounter - startTick) >= GRACE_TICKS;
                let moved = false;
                try {
                    const move = player.inputInfo.getMovementVector();
                    const jumpScore = world.scoreboard.getObjective("jump")?.getScore(player) ?? 0;
                    // in this project `move.y` is forward/back and `move.x` is left/right
                    moved = Math.abs(move.x) > 0.2 || Math.abs(move.y) > 0.2 || jumpScore === 1;
                } catch (e) {
                    // if inputInfo unavailable, be conservative and treat as not moved
                    moved = false;
                }

                if (moved && gracePassed) {
                    player.removeTag("blocking");
                    _blockStartTicks.delete(player.id);
                    player.addTag("need_resneak");
                    player.runCommand(`playsound note.hat @s`);
                    player.runCommand(`execute as @s run particle minecraft:crit ~~~ 0.1 0.1 0.1 0.01 3`);
                }
            }
            const energy = energyObj ? energyObj.getScore(player) : 0;
            const cd = cdObj ? cdObj.getScore(player) : 0;

            // require specific items in main hand to enable blocking
            const mainHand = player.getComponent("minecraft:equippable")?.getEquipment("Mainhand")?.typeId || "";
            const holdingAllowed = mainHand === "axell:nichirin" || mainHand === "axell:bda";

            // require not flagged 'need_resneak' (movement cancelled) to re-enable blocking
            const canBlock = player.isSneaking && holdingAllowed && energy > 1 && cd === 0 && !player.hasTag("nstd") && !player.hasTag("stun") && !player.hasTag("need_resneak");

            if (canBlock) {
                if (!player.hasTag("blocking")) {
                    player.addTag("blocking");
                    _blockStartTicks.set(player.id, _tickCounter);
                    // lightweight feedback when block turns on
                    player.runCommand(`playsound note.snare @s`);
                    player.runCommand(`execute as @s run particle minecraft:crit ~~~ 0.15 0.15 0.15 0.01 5`);
                }
            } else {
                if (player.hasTag("blocking")) {
                    player.removeTag("blocking");
                    _blockStartTicks.delete(player.id);
                    // subtle feedback when block ends
                    player.runCommand(`playsound note.hat @s`);
                }
            }
        } catch (err) {
            // defensive: ignore per-player failures
            continue;
        }
        // no previous-position updates needed when using input vectors
    }
}, 1);

// Handle block events: deduct energy (min 10) + extra from incoming damage; punish if energy <= 0
system.afterEvents.scriptEventReceive.subscribe(ev => {
    try {
        if (ev.id !== "axell:block") return;
        const player = ev.sourceEntity;
        if (!player) return;

        const energyObj = world.scoreboard.getObjective("energy");
        const blockInObj = world.scoreboard.getObjective("blockIn");

        const prevEnergy = energyObj ? energyObj.getScore(player) : 0;
        const incoming = blockInObj ? blockInObj.getScore(player) : 0; // may be 0
        const incomingCeil = Math.ceil(Math.max(0, Number(incoming) || 0));

        const deduction = Math.max(MIN_BLOCK_COST, incomingCeil);
        const newEnergy = Math.max(0, prevEnergy - deduction);

        if (energyObj) energyObj.setScore(player, newEnergy);

        // randomize indicator position (matches damage.js)
        let randomCoords = {
            x: (Math.random() * 2 - 1).toFixed(2), // Random value between -1 and 1
            y: (Math.random() * 2).toFixed(2),    // Random value between 0 and 2
            z: (Math.random() * 2 - 1).toFixed(2) // Random value between -1 and 1
        };

        // Show block / energy-consume indicator
        player.runCommand(`execute as @s[tag=!autoparry] run summon axell:dmg "§7-${deduction}" ~${randomCoords.x} ~${randomCoords.y} ~${randomCoords.z}`);
        player.runCommand(`playsound item.shield.block @s`);
        player.runCommand(`particle nichirin:sheeth ~${randomCoords.x} ~1 ~${randomCoords.z}`);

        // Clear the temporary incoming value
        if (blockInObj) blockInObj.setScore(player, 0);

        // If energy dropped to 0 or below, punish and prevent blocking for 2s
        if (newEnergy <= 0) {
            const stunObj = world.scoreboard.getObjective("stun");
            const cdObjLocal = world.scoreboard.getObjective("cd");
            if (stunObj) stunObj.setScore(player, PUNISH_STUN_TICKS);
            if (cdObjLocal) cdObjLocal.setScore(player, PUNISH_BLOCK_COOLDOWN);

            // remove blocking immediately and give clear feedback
            if (player.hasTag("blocking")) {
                player.removeTag("blocking");
                _blockStartTicks.delete(player.id);
            }
            player.runCommand(`execute as @s run summon axell:dmg "§cPunish" ~${randomCoords.x} ~${randomCoords.y} ~${randomCoords.z}`);
            player.runCommand(`playsound random.break @s`);
            player.runCommand(`particle minecraft:knockback_roar_particle ~~1~`);
        }
    } catch (err) {
        // swallow — non-critical
        console.error("axell:block handler error:", err);
    }
});
