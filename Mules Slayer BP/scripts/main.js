import { world, system } from "@minecraft/server";
import "./hash.js";
import "./attributes/display.js";
import "./attributes/in_out.js";
import "./demons/sunburn";
import "./attributes/stats";
import "./Vec3";
import "./use";
import "./damage";
import "./def";
import "./books";
import "./attributes/sword";
import "./attributes/dash";
import "./utils/blocking";
import "./utils/energy_regen";
import "./utils/join";


// Knockbacks
system.afterEvents.scriptEventReceive.subscribe((event) => {
    const player = event.sourceEntity;
    const direction = player.getViewDirection();

    const knockbackActions = {
        "axell:fw1": { x: direction.x, z: direction.z, horizontal: 0.6, vertical: 0 },
        "axell:fw2": { x: direction.x, z: direction.z, horizontal: 1.1, vertical: 0 },
        "axell:fw2.5": { x: direction.x, z: direction.z, horizontal: 1.5, vertical: 0 },
        "axell:bw2": { x: direction.x, z: direction.z, horizontal: -2, vertical: 0 },
        "axell:bw5": { x: direction.x, z: direction.z, horizontal: -5, vertical: 0 },
        "axell:bw15": { x: direction.x, z: direction.z, horizontal: -15, vertical: 0 },
        "axell:form3w": { x: direction.x, z: direction.z, horizontal: 2, vertical: 0 },
        "axell:fw3": { x: direction.x, z: direction.z, horizontal: 3, vertical: 0 },
        "axell:fw4": { x: direction.x, z: direction.z, horizontal: 4, vertical: 0 },
        "axell:fw5": { x: direction.x, z: direction.z, horizontal: 5, vertical: 0 },
        "axell:fw10": { x: direction.x, z: direction.z, horizontal: 10, vertical: 0 },
        "axell:fwrom5": { x: direction.x, z: direction.z, horizontal: 8, vertical: -1 },
        "axell:fwkaza8": { x: direction.x, z: direction.z, horizontal: 4, vertical: -1 },
        "axell:fw8": { x: direction.x, z: direction.z, horizontal: 8, vertical: 0 },
        "axell:fw15": { x: direction.x, z: direction.z, horizontal: 15, vertical: 0 },
        "axell:fw20": { x: direction.x, z: direction.z, horizontal: 20, vertical: 0 },

        "sun:wheel": { x: direction.x, z: direction.z, horizontal: 5, vertical: 0.5 },
        "sun:burningb": { x: direction.x, z: direction.z, horizontal: 0.3, vertical: 0 },
        
        "axell:wind8": { x: direction.x, z: direction.z, horizontal: 6, vertical: 1 },
        "axell:dbj": { x: direction.x, z: direction.z, horizontal: 1, vertical: 0.7 },
        "axell:kb5": { x: direction.x, z: direction.z, horizontal: -5, vertical: 1 },
        "axell:kbm1": { x: direction.x, z: direction.z, horizontal: -2, vertical: 0.4 },
        "axell:kbm12": { x: direction.x, z: direction.z, horizontal: -1, vertical: 0.4 },
        "axell:wheel": { x: direction.x, z: direction.z, horizontal: 1, vertical: -0.1 },
        "axell:up1": { x: 0, z: 0, horizontal: 0, vertical: 0.65 },
        "axell:form5": { x: 0, z: 0, horizontal: 0, vertical: 0.1 },
        "axell:up2": { x: 0, z: 0, horizontal: 0, vertical: 0.85 },
        "axell:up3": { x: 0, z: 0, horizontal: 0, vertical: 1 },
        "axell:up5": { x: 0, z: 0, horizontal: 0, vertical: 1.3 },
        "axell:up10": { x: 0, z: 0, horizontal: 0, vertical: 2 },
        "axell:up05": { x: 0, z: 0, horizontal: 0, vertical: 0.225 },
        "axell:dw3": { x: 0, z: 0, horizontal: 0, vertical: -1 },

        //special
        "axell:thunder1": { x: direction.x, z: direction.z, horizontal: 18, vertical: 0 },
        "axell:mist2": { x: direction.x, z: direction.z, horizontal: 0.3, vertical: 0 },
        "axell:insect1a": { x: direction.x, z: direction.z, horizontal: 0, vertical: 0.8 },
        "axell:insect1b": { x: direction.x, y: direction.y, z: direction.z, horizontal: 8, vertical: -2 },
    };

    const action = knockbackActions[event.id];
    if (action) {
        player.applyKnockback(action.x, action.z, action.horizontal, action.vertical);
    }
});

// Knockbacks
system.afterEvents.scriptEventReceive.subscribe((event) => {
    const player = event.sourceEntity;
    const direction = player.getViewDirection();

    const particler = {
        "water:form8b": { x: direction.x, z: direction.z, horizontal: 2.5, vertical: 0.75, particle: "water:waterfall" },
        "water:form8c": { x: direction.x, z: direction.z, horizontal: 2.5, vertical: 0, particle: "water:linger" }
    };

    const action = particler[event.id];
    if (action) {
        // Calculate right vector for U shape
        const right = { x: -direction.z, z: direction.x };
        // Three offsets: left, center, right (U shape)
        const offsets = [
            { h: 1.5, r: 1.5, f:1},   // left
            { h: 2.5, r: 0, f:3.5 },   // center (farthest)
            { h: 1.5, r: -1.5, f:1 }   // right
        ];
        for (const offset of offsets) {
            const spawnLocation = {
                x: player.location.x + direction.x * offset.h + right.x * offset.r,
                y: player.location.y + action.vertical * offset.f,
                z: player.location.z + direction.z * offset.h + right.z * offset.r
            };
            player.dimension.spawnParticle(action.particle, spawnLocation);
        }
    }
    }
);


system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const entitynam = player.nameTag;
        const entitynam2 = player.nameTag + "_sneak";
        const direction = player.getViewDirection();

        // set same stats as player
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] str = @s str`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] dex = @s dex`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] pen = @s pen`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] critRate = @s critRate`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] critDMG = @s critDMG`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] dmgbonus = @s dmgbonus`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] radius = @s radius`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] ab1 = @s ab1`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] ab2 = @s ab2`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] ab3 = @s ab3`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] ab4 = @s ab4`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] ab5 = @s ab5`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] ab6 = @s ab6`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] ab7 = @s ab7`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] ab8 = @s ab8`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] ab9 = @s ab9`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] ab10 = @s ab10`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] ab11 = @s ab11`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] ab12 = @s ab12`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] bab1 = @s bab1`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] bab2 = @s bab2`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] bab3 = @s bab3`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] bab4 = @s bab4`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] bab5 = @s bab5`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] bab6 = @s bab6`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] bab7 = @s bab7`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] bab8 = @s bab8`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] bab9 = @s bab9`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] bab10 = @s bab10`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] bab11 = @s bab11`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam}"] bab12 = @s bab12`);

        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] ab1 = @s ab1`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] ab2 = @s ab2`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] ab3 = @s ab3`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] ab4 = @s ab4`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] ab5 = @s ab5`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] ab6 = @s ab6`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] ab7 = @s ab7`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] ab8 = @s ab8`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] ab9 = @s ab9`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] ab10 = @s ab10`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] ab11 = @s ab11`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] ab12 = @s ab12`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] bab1 = @s bab1`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] bab2 = @s bab2`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] bab3 = @s bab3`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] bab4 = @s bab4`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] bab5 = @s bab5`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] bab6 = @s bab6`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] bab7 = @s bab7`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] bab8 = @s bab8`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] bab9 = @s bab9`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] bab10 = @s bab10`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] bab11 = @s bab11`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] bab12 = @s bab12`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] str = @s str`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] dex = @s dex`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] pen = @s pen`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] critRate = @s critRate`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] critDMG = @s critDMG`);
        player.runCommand(`scoreboard players operation @e[name="${entitynam2}"] dmgbonus = @s dmgbonus`);
    }
}, 1);

system.afterEvents.scriptEventReceive.subscribe((event) => {
    if (event.id !== "axell:beatdowncancel") return;
    const player = event.sourceEntity;
    if (!player || !player.isValid()) return;
    const playerName = player.name;

    // Helper to run a command as the player
    function cmd(c) {
        player.runCommandAsync(c);
    }
    const commands = [
        `camera @s clear`,
        `fog @s remove ult`,
        `playanimation @s animation.nichirin.cancel`,
        `execute as @s run function base/parrybase`,
        `scoreboard players set @s skillani 0`,
        `scoreboard players set @s ultimate 0`,
        `scoreboard players set @s ult 0`,
        `inputpermission set @s movement enabled`,
        `inputpermission set @s move_forward enabled`,
        `inputpermission set @s sneak enabled`,
        `inputpermission set @s jump enabled`,
        `inputpermission set @s camera enabled`,
        `tag @e[tag="${playerName}ult"] remove "${playerName}ult"`,
        `scoreboard players set @e[type=!player,name="${playerName}"] cd 1000`,
        `event entity @e[type=!player,name="${playerName}"] axell:despawn`,
        `hud @s reset`,
        `scoreboard players set @s radpos 0`,
        `event entity @s axell:jatuh`,
        `tag @s remove ultimate`,
        `tag @s remove autoparry`,
    ];

    for (const c of commands) {
        cmd(c);
    }
});

// Parry event
system.afterEvents.scriptEventReceive.subscribe((event) => {
    if (event.id !== "axell:parry") return;
    const player = event.sourceEntity;
    if (!player || !player.isValid()) return;

     const hidup = 'family=!inanimate,type=!axell:dmg,type=!xp_orb,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real';

    function cmd(c) {
        player.runCommandAsync(c);
    }
    const commands = [
        `execute as @s at @s positioned ^^^3 run execute as @e[r=2.9,${hidup},tag=!autoparry] at @s run particle ds:parry ~~0.5~`,
        `execute as @s at @s positioned ^^^3 run execute as @e[r=2.9,${hidup},tag=!autoparry] at @s run particle ds:parry2 ~~~`,
        `execute as @s at @s rotated ~ 0 positioned ^^^3 unless entity @e[r=2.9,${hidup},tag=!autoparry] run particle ds:parry2 ^^^-1`,
        `execute as @s at @s rotated ~ 0 positioned ^^^3 unless entity @e[r=2.9,${hidup},tag=!autoparry] run particle sun:kobong2 ^^^-1`,
        `execute as @s at @s rotated ~ 0 positioned ^^^3 unless entity @e[r=2.9,${hidup},tag=!autoparry] run particle ds:parry ^^0.5^-1`,
        `execute as @s at @s positioned ^^^3 run kill @e[type=arrow,r=4]`,
        `execute as @s run scoreboard players set @s radius 30`,
        `execute as @s run scoreboard players set @s radpos 0`,
        `execute as @s run scoreboard players set @s multiplier 80`,
        `scoreboard players set @s parry 0`,
        `tag @s remove parry`,
        `event entity @s noparry`,
        `execute as @s at @s run playsound mob.elderguardian.curse @a ~~~ 1 2 10000`,
        `scoreboard players add @s[tag=!autoparry] energy 10`,
        `camerashake add @s[tag=!autoparry] 2.5 0.2`
    ];

    for (const c of commands) {
        cmd(c);
    }
});

system.afterEvents.scriptEventReceive.subscribe((event) => {
    if (event.id === "slayer:mark") {
    const player = event.sourceEntity;
        for (let n = 1; n <= 13; n++) {
            const cd = world.scoreboard.getObjective(`cd${n}`)?.getScore(player) ?? 0;
            if (cd >= 1) {
                player.runCommandAsync(`scoreboard players set @s[scores={ultimate=0}] cd${n} 0`);
            }
        }
}});

system.afterEvents.scriptEventReceive.subscribe((event) => {
    if (event.id === "kizuki:awake") {
    const player = event.sourceEntity;
        for (let n = 1; n <= 13; n++) {
            const cd = world.scoreboard.getObjective(`bcd${n}`)?.getScore(player) ?? 0;
            if (cd >= 1) {
                player.runCommandAsync(`scoreboard players set @s[scores={ultimate=0}] bcd${n} 0`);
            }
        }
}});

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        try {
            const vitScore = world.scoreboard.getObjective("vit")?.getScore(player);
            let vit = vitScore ?? 1;
            if (vit <= 1) vit = 1;
            player.runCommandAsync(`event entity @s axell:hp.${vit}`);
        } catch (e) {
            // Ignore errors if vit not found
        }
    }
}, 1);

system.runInterval(() => {
        const entities = [
      ...world.getPlayers(),
      ...world.getDimension("overworld").getEntities({ families: ["hashira"] }),
      ...world.getDimension("nether").getEntities({ families: ["hashira"] }),
      ...world.getDimension("the_end").getEntities({ families: ["hashira"] }),
    ];
    for (const player of entities) {
        for (let n = 1; n <= 13; n++) {
            const cd = world.scoreboard.getObjective(`cd${n}`)?.getScore(player) ?? 0;
            if (cd >= 1) {
                player.runCommandAsync(`scoreboard players remove @s cd${n} 1`);
            } else if (cd <= -1) {
                player.runCommandAsync(`scoreboard players add @s cd${n} 1`);
            }
        }
    }
}, 1);

system.runInterval(() => {
    const entities = [
      ...world.getPlayers(),
      ...world.getDimension("overworld").getEntities({ families: ["kizuki"] }),
      ...world.getDimension("nether").getEntities({ families: ["kizuki"] }),
      ...world.getDimension("the_end").getEntities({ families: ["kizuki"] }),
    ];
    for (const player of entities) {
        for (let n = 1; n <= 13; n++) {
            const cd = world.scoreboard.getObjective(`bcd${n}`)?.getScore(player) ?? 0;
            if (cd >= 1) {
                player.runCommandAsync(`scoreboard players remove @s bcd${n} 1`);
            } else if (cd <= -1) {
                player.runCommandAsync(`scoreboard players add @s bcd${n} 1`);
            }
        }
    }
}, 1);