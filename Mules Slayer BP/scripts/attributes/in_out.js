import { world, system } from "@minecraft/server";
const prevSwordState = new Map();

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const inventory = player.getComponent("minecraft:inventory");
        if (!inventory) continue;

        let hasNichirin = false;
        let holdingNichirin = false;

        // Check mainhand
        let selectedSlot = Number(player.selectedSlotIndex);
        if (Number.isInteger(selectedSlot) && selectedSlot >= 0 && selectedSlot < inventory.container.size) {
            const mainhand = inventory.container.getItem(selectedSlot);
            if (mainhand && mainhand.typeId === "axell:nichirin") {
                holdingNichirin = true;
                hasNichirin = true;
            } else {
                // Check inventory for nichirin
                for (let i = 0; i < inventory.container.size; i++) {
                    const item = inventory.container.getItem(i);
                    if (item && item.typeId === "axell:nichirin") {
                        hasNichirin = true;
                        break;
                    }
                }
            }
        } else {
            // Check inventory for nichirin
            for (let i = 0; i < inventory.container.size; i++) {
                const item = inventory.container.getItem(i);
                if (item && item.typeId === "axell:nichirin") {
                    hasNichirin = true;
                    break;
                }
            }
        }

        // determine whether the player is allowed to sheeth the sword based on cooldown scores
        let state;
        if (holdingNichirin) {
            state = "out";
        } else if (hasNichirin) {
            // check cd and bcd objectives, require all present scores == 0
            let canSheeth = true;
            const checkNames = [];
            for (let i = 1; i <= 12; i++) {
                checkNames.push(`cd${i}`);
                checkNames.push(`bcd${i}`);
            }
            for (const name of checkNames) {
                const obj = world.scoreboard.getObjective(name);
                if (obj && obj.hasParticipant(player)) {
                    const val = obj.getScore(player);
                    if (val < 0) {
                        canSheeth = false;
                        break;
                    }
                }
            }
            // ultimate score must also be exactly zero to allow switching
            if (canSheeth) {
                const ultObj = world.scoreboard.getObjective("ultimate");
                if (ultObj && ultObj.hasParticipant(player)) {
                    const ultVal = ultObj.getScore(player);
                    if (ultVal !== 0) {
                        canSheeth = false;
                    }
                }
            }
            state = canSheeth ? "seeth" : "out";
        } else {
            state = "no";
        }

        if (prevSwordState.get(player.id) !== state) {
            prevSwordState.set(player.id, state);

            // update sword_state scoreboard: no=0, seeth=1, out=2
            let stateScore = 0;
            if (state === "seeth") stateScore = 1;
            else if (state === "out") stateScore = 2;
            player.runCommandAsync(`scoreboard players set @s sword_state ${stateScore}`);

            let dualScore = 0;
            const dualObj = world.scoreboard.getObjective("dual");
            if (dualObj && dualObj.hasParticipant(player)) {
            dualScore = dualObj.getScore(player);
            }

            if (state === "out") {
                // Get breathings score
                let breathingsScore = 0;
                const breathingsObj = world.scoreboard.getObjective("breathings");
                if (breathingsObj && breathingsObj.hasParticipant(player)) {
                    breathingsScore = breathingsObj.getScore(player);
                }
                // Build command based on breathings score
                let outCmd = "event entity @s sword:out";
                if (breathingsScore > 0) {
                    outCmd = `event entity @s sword:out${breathingsScore}`;
                }
                player.runCommandAsync(outCmd);
                if (dualScore > 0) {
                player.playAnimation(`animation.nichirin.unsheeth_dual`);
                }
                else {
                player.playAnimation(`animation.nichirin.unsheeth${breathingsScore}`);}
            } else if (state === "seeth") {
                if (dualScore > 0) {
                    player.playAnimation("animation.nichirin.sheeth2");
                }
                else {
                player.playAnimation("animation.nichirin.sheeth");}
                player.runCommandAsync("scoreboard players set @s[scores={sp1=1..}] sp1 0");
                player.runCommandAsync("scoreboard players set @s[scores={hold=1..}] hold 0");
                player.runCommandAsync("scoreboard players set @s[scores={sp1=..-1}] sp1 0");
                player.runCommandAsync("scoreboard players set @s right 0");
                player.runCommandAsync("scoreboard players set @s rightS 0");
                player.runCommandAsync("scoreboard players set @s hold 0");
                player.runCommandAsync("tag @s remove autoparry");
                player.runCommandAsync("scoreboard players set @s holdS 0");
                player.runCommandAsync("inputpermission set @s[scores={sp1=0}] movement enabled");
                player.runCommandAsync("inputpermission set @s[scores={sp1=0}] move_forward enabled");
                player.runCommandAsync("inputpermission set @s[scores={sp1=0}] sneak enabled");
                player.runCommandAsync("inputpermission set @s[scores={sp1=0}] jump enabled");
                // Delay the event by 0.8 seconds (16 ticks)
                system.runTimeout(() => {
                    // Double check state to avoid race conditions
                    if (prevSwordState.get(player.id) === "seeth") {
                        player.runCommandAsync("event entity @s sword:seeth");
                    }
                }, 13);
            } else {
                // when sword_state is reset to 0 (no sword out) ensure any negative cooldown
                // scores are clamped to zero so they don't linger below the allowed range.
                for (let i = 1; i <= 12; i++) {
                    player.runCommandAsync(`scoreboard players set @s[scores={cd${i}=..-1}] cd${i} 0`);
                    player.runCommandAsync(`scoreboard players set @s[scores={bcd${i}=..-1}] bcd${i} 0`);
                }

                player.runCommandAsync("event entity @s sword:no");
                player.runCommandAsync("scriptevent axell:beatdowncancel");
                player.runCommandAsync("scoreboard players set @s right 0");
                player.runCommandAsync("scoreboard players set @s rightS 0");
                player.runCommandAsync("scoreboard players set @s hold 0");
                player.runCommandAsync("scoreboard players set @s holdS 0");
                player.runCommandAsync("tag @s remove autoparry");
                player.runCommandAsync("inputpermission set @s movement enabled");
                player.runCommandAsync("inputpermission set @s move_forward enabled");
                player.runCommandAsync("inputpermission set @s jump enabled");
                player.runCommandAsync("inputpermission set @s sneak enabled");
                player.playAnimation("animation.nichirin.cancel");
            }
        }
    }
});

const BDAState = new Map();

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const inventory = player.getComponent("minecraft:inventory");
        if (!inventory) continue;

        let holdingbda = false;

        // Check mainhand only
        let selectedSlot = Number(player.selectedSlotIndex);
        if (Number.isInteger(selectedSlot) && selectedSlot >= 0 && selectedSlot < inventory.container.size) {
            const mainhand = inventory.container.getItem(selectedSlot);
            if (mainhand && mainhand.typeId === "axell:bda") {
                holdingbda = true;
            }
        }

        let state = holdingbda ? "out" : "no";

        if (BDAState.get(player.id) !== state) {
            BDAState.set(player.id, state);
            if (state === "out") {
                // Get breathings score
                let bdascore = 0;
                const bdaObj = world.scoreboard.getObjective("bda");
                if (bdaObj && bdaObj.hasParticipant(player)) {
                    bdascore = bdaObj.getScore(player);
                }
                // Build command based on breathings score
                let outCmd = "event entity @s bda:start";
                if (bdascore > 0) {
                    outCmd = `event entity @s bda:start${bdascore}`;
                }
                player.runCommandAsync(outCmd);
            } else {
                player.runCommandAsync("scoreboard players set @s[scores={sp1=1..}] sp1 0");
                player.runCommandAsync("scoreboard players set @s[scores={hold=1..}] hold 0");
                player.runCommandAsync("scoreboard players set @s[scores={sp1=..-1}] sp1 0");
                player.runCommandAsync("scoreboard players set @s right 0");
                player.runCommandAsync("scoreboard players set @s rightS 0");
                player.runCommandAsync("scoreboard players set @s hold 0");
                player.runCommandAsync("scoreboard players set @s holdS 0");
                player.runCommandAsync("tag @s remove autoparry");
                player.runCommandAsync("playanimation @s animation.nichirin.cancel");
                player.runCommandAsync("event entity @s bda:no");
                player.runCommandAsync("inputpermission set @s movement enabled");
                player.runCommandAsync("inputpermission set @s move_forward enabled");
                player.runCommandAsync("inputpermission set @s jump enabled");
                player.runCommandAsync("inputpermission set @s sneak enabled");
            }
        }
    }
});