import { world, system } from "@minecraft/server";
import { typeIdToFamily, familyDefenseValues } from './def.js';
import { formatAttack } from './attributes/utils.js';
import { families } from "./attributes/families.js";

system.afterEvents.scriptEventReceive.subscribe(data => {
    const player = data.sourceEntity;
    const id = data.id;

    if (id === "axell:damage") {
        let str = world.scoreboard.getObjective("str").getScore(player);
        let dex = world.scoreboard.getObjective("dex").getScore(player);
        let dmgbonus = world.scoreboard.getObjective("dmgbonus").getScore(player);
        let critRate = world.scoreboard.getObjective("critRate").getScore(player);
        let critDMG = world.scoreboard.getObjective("critDMG").getScore(player);
        let multiplier = world.scoreboard.getObjective("multiplier").getScore(player);
        let pen = world.scoreboard.getObjective("pen").getScore(player);
        let radius2 = world.scoreboard.getObjective("radius").getScore(player);
        let radpos = world.scoreboard.getObjective("radpos").getScore(player);

        let atk = formatAttack(str, dex);
        multiplier += (dex * 0.05);

        let calculatedDamage = Math.round(atk * (multiplier / 100));
        let damagebonus = Math.round(calculatedDamage + (calculatedDamage * (dmgbonus / 100)));

        const di = player.getViewDirection();
        let radius = radius2 / 10;
        let poskibidi;
        if (radpos >= 0) {
            poskibidi = radius + 0.1 - (radpos / 10);
        } else {
            poskibidi = radius - 0.1 + (Math.abs(radpos) / 10);
        }
        let targetPosition = {
            x: player.location.x + di.x * poskibidi,
            y: player.location.y + di.y * poskibidi,
            z: player.location.z + di.z * poskibidi
        };

        let diri = `name=!"${ (player.name || player.nameTag).replace(/"/g, '\\"') }"`;
        let aicombo0 = `scores={m1=1..4,aircombo=0}`;
        let barrageM1 = `scores={m1=1..6,sp1=..-20}`;
        let windB7 = `hasitem={item=axell:nichirin,location=slot.weapon.mainhand},scores={breathings=3,cd7=-39..-17}`;
        let soundF5 = `hasitem={item=axell:nichirin,location=slot.weapon.mainhand},scores={breathings=4,cd5=..-1}`;
        let soundF4 = `hasitem={item=axell:nichirin,location=slot.weapon.mainhand},scores={breathings=4,cd4=..-7}`;
        let soundF4P2 = `hasitem={item=axell:nichirin,location=slot.weapon.mainhand},scores={breathings=4,cd4=-6..-1}`;
        let flameF2= `hasitem={item=axell:nichirin,location=slot.weapon.mainhand},scores={breathings=2,cd2=-5..-1}`;

        let thunderF2 = `hasitem={item=axell:nichirin,location=slot.weapon.mainhand},scores={breathings=5,cd2=..-15}`;
        let mistF2 = `hasitem={item=axell:nichirin,location=slot.weapon.mainhand},scores={breathings=6,cd2=..-5}`;
        let insectF3 = `hasitem={item=axell:nichirin,location=slot.weapon.mainhand},scores={breathings=7,cd3=..-11}`;
        let mistF5 = `hasitem={item=axell:nichirin,location=slot.weapon.mainhand},scores={breathings=6,cd5=..-10}`;
        let akaza = ["hasitem={item=axell:bda,location=slot.weapon.mainhand},scores={bda=1}"];
        let akaza2 = ["hasitem={item=axell:bda,location=slot.weapon.mainhand},scores={bda=1,m1=6}"]
        let hidup = ["tag=!autoparry,type=!akaza:air,type=!xp_orb,type=!axell:dmg,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real"];
        
        player.runCommand(`execute as @s at @s positioned ^^^${poskibidi || 0} run playanimation @e[r=${radius},type=axell:dontol] animation.dontol.hurt`);
        player.runCommand(`scoreboard players set @s parry 5`);
        player.runCommand(`execute as @s at @s positioned ^^^${poskibidi || 0} run execute as @e[r=${radius},${hidup},name=!"${player.name}",tag=!block] at @s run tp @s ^^^-0.5 facing @p[name="${player.name}"] true`);

        //mist
        player.runCommand(`execute as @s[type=axell:akaza] at @s positioned ^^^${poskibidi || 0} run scoreboard players set @e[r=${radius},${hidup},name=!"${player.name || player.nameTag}"] stun2 3`);
        player.runCommand(`execute as @s[type=sun:solar,scores={cd=!11..}] at @s positioned ^^^${poskibidi || 0} run scoreboard players set @e[r=${radius},${hidup},name=!"${player.name || player.nameTag}"] stun2 3`);
        player.runCommand(`execute as @s[${insectF3}] at @s positioned ^^^${poskibidi || 0} run scoreboard players set @e[r=${radius},${hidup},name=!"${player.name || player.nameTag}"] stun2 3`);
        player.runCommand(`execute as @s[${mistF2}] at @s positioned ^^^${poskibidi || 0} run scoreboard players set @e[r=${radius},${hidup},name=!"${player.name || player.nameTag}"] stun2 3`);
        player.runCommand(`execute as @s[${mistF5}] at @s positioned ^^^${poskibidi || 0} run execute as @e[r=${radius},${hidup},name=!"${player.name || player.nameTag}"] run scriptevent axell:dw3`);


        //staggering movea
        player.runCommand(`execute as @s[tag=autoparry,tag=!ultimate] at @s positioned ^^^${poskibidi || 0} run scoreboard players set @e[r=${radius},${hidup},name=!"${player.name || player.nameTag}"] stun2 3`);
        player.runCommand(`execute as @s[tag=ultimate] at @s positioned ^^^${poskibidi || 0} run scoreboard players set @e[r=${radius},${hidup},name=!"${player.name || player.nameTag}"] stun2 6`);
        player.runCommand(`execute as @s[${windB7}] at @s positioned ^^^${poskibidi || 0} run scoreboard players set @e[r=${radius},${hidup},name=!"${player.name || player.nameTag}"] stun2 3`);
        player.runCommand(`execute as @s[${thunderF2}] at @s positioned ^^^${poskibidi || 0} run scoreboard players set @e[r=${radius},${hidup},name=!"${player.name || player.nameTag}"] stun2 3`);
        player.runCommand(`execute as @s[${barrageM1}] at @s positioned ^^^${poskibidi || 0} run scoreboard players set @e[r=${radius},${hidup},name=!"${player.name || player.nameTag}"] stun2 3`);
        player.runCommand(`execute as @s[${soundF5}] at @s positioned ^^^${poskibidi || 0} run scoreboard players set @e[r=${radius},${hidup},name=!"${player.name || player.nameTag}"] stun2 3`);
        player.runCommand(`execute as @s[${flameF2}] at @s positioned ^^^${poskibidi || 0} run scoreboard players set @e[r=${radius},${hidup},name=!"${player.name || player.nameTag}"] stun2 3`);


        player.runCommand(`execute as @s[${soundF4}] at @s positioned ^^^${poskibidi || 0} run scoreboard players set @e[r=${radius},${hidup},name=!"${player.name || player.nameTag}"] stun2 5`);
        player.runCommand(`execute as @s[${soundF4P2}] at @s positioned ^^^${poskibidi || 0} run execute as @e[r=${radius},${hidup},name=!"${player.name || player.nameTag}"] at @s run tp @s ~~~ facing @p`);
        player.runCommand(`execute as @s[${soundF4P2}] at @s positioned ^^^${poskibidi || 0} run execute as @e[r=${radius},${hidup},name=!"${player.name || player.nameTag}"] run scriptevent axell:kbm1`);

        //stagger

        player.runCommand(`execute as @s[scores={m1=5..6}] at @s positioned ^^^${poskibidi || 0} run execute as @e[r=${radius},${hidup},name=!"${player.name || player.nameTag}"] at @s run tp @s ~~~ facing @p`);
        player.runCommand(`execute as @s[scores={m1=5},tag=!autoparry] at @s positioned ^^^${poskibidi || 0} run execute as @e[r=${radius},${hidup},name=!"${player.name || player.nameTag}"] run scriptevent axell:kbm1`);
        player.runCommand(`execute as @s[${aicombo0}] at @s positioned ^^^${poskibidi || 0} run scoreboard players set @e[r=${radius},${hidup},name=!"${player.name || player.nameTag}"] stun2 2`);

        player.runCommand(`execute as @s[tag=!autoparry] at @s positioned ^^^${poskibidi || 0} run scoreboard players add @e[r=${radius},${hidup},name=!"${player.name || player.nameTag}",type=!player] stun 2`);
        player.runCommand(`execute as @s[tag=autoparry] at @s positioned ^^^${poskibidi || 0} run scoreboard players set @e[r=${radius},${hidup},${diri},type=!player] stun 5`);

        // akaza
        player.runCommand(`execute as @s[${akaza2},tag=!autoparry] at @s positioned ^^^${poskibidi || 0} run execute as @e[r=${radius},${hidup},name=!"${player.name || player.nameTag}"] run scriptevent axell:kbm12`);
        player.runCommand(`execute as @s[${akaza},tag=autoparry] at @s positioned ^^^${poskibidi || 0} at @e[r=${radius},${hidup},${diri}] run particle akaza:impact3 ~~1~`);
        player.runCommand(`execute as @s[${akaza},tag=!autoparry] at @s positioned ^^^${poskibidi || 0} at @e[r=${radius},${hidup},${diri}] run particle akaza:impact2 ~~1~`);
        player.runCommand(`execute as @s[${akaza}] at @s positioned ^^^${poskibidi || 0} at @e[r=${radius},${hidup}] run particle akaza:impact3 ~~1~`);
        player.runCommand(`execute as @s[${akaza},tag=!autoparry] at @s positioned ^^^${poskibidi || 0} at @e[r=${radius},${hidup},${diri}] run particle akaza:impact2 ~~1~`);
        player.runCommand(`execute as @s[${akaza}] at @s positioned ^^^${poskibidi || 0} at @e[r=${radius},${hidup},${diri}] run particle akaza:impact3 ~~1~`);
        player.runCommand(`execute as @s[${akaza},tag=autoparry] at @s positioned ^^^${poskibidi || 0} at @e[r=${radius},${hidup}] run particle akaza:impact3 ~~1~`);
        
        player.runCommand(`execute as @s[type=akaza:air] at @s positioned ^^^${poskibidi || 0} at @e[r=${radius},${hidup}] run particle akaza:crot ~~1~`);
        player.runCommand(`execute as @s[type=akaza:air] at @s positioned ^^^${poskibidi || 0} at @e[r=${radius},${hidup}] run particle akaza:impact2 ~~1~`);
        player.runCommand(`execute as @s[type=akaza:air] at @s positioned ^^^${poskibidi || 0} at @e[r=${radius},${hidup}] run particle akaza:impact3 ~~1~`);
        player.runCommand(`execute as @s[type=akaza:air] at @s positioned ^^^${poskibidi || 0} if entity @e[r=${radius},${hidup}] run scoreboard players set @s cd 20`);
        // Determine the correct name property to exclude
        const playername = player.name;
        // Get all tags of the player that start with "team"
        const playerTeamTags = player.getTags().filter(tag => tag.startsWith("team"));

        const targetEntities = player.dimension.getEntities({
            location: targetPosition,
            maxDistance: radius,
            excludeTypes: [
                "xp_orb", "axell:dmg", "item", "armor_stand", "thrown_trident", "arrow",
                "area_effect_cloud", "minecart", "chest_minecart", "command_block_minecart",
                "dragon_fireball", "egg", "snowball", "ender_crystal", "ender_pearl",
                "evocation_fang", "falling_block", "fireball", "fireworks_rocket",
                "fishing_hook", "leash_knot", "lightning_bolt", "lingering_potion",
                "llama_spit"
            ],
            excludeFamilies: [
                "damage", "atk", "real"
            ],
            excludeTags: [
                "barrage",
                "ultimate",
                ...playerTeamTags
            ],
        });


// Filter out the caster entity from targetEntities
let filteredTargets = targetEntities.filter(target => target.id !== player.id);

// If the caster is not a player, also exclude players with the same nameTag
if (player.typeId !== "minecraft:player") {
    const casterNameTag = player.nameTag;
    filteredTargets = filteredTargets.filter(target => {
        if (target.typeId === "minecraft:player" && target.name === casterNameTag) {
            return false;
        }
        return true;
    });
}

// Update the damage calculation logic
filteredTargets.forEach(target => {
    let isCrit = false;
    let critMultiplier = 1;

    if (!isCrit && Math.random() * 100 < critRate) {
        isCrit = true;
        if (critRate > 100) {
            // Calculate guaranteed crit for first 100, then randomize extra 50
            critMultiplier = 1.45 + (critDMG / 100);
            const extraRate = critRate - 100;
            if (extraRate > 0 && Math.random() * 50 < extraRate) {
                // Extra crit bonus for critRate above 100
                critMultiplier = 2 * (1.45 + (critDMG / 100));
            }
        } else {
            critMultiplier = 1.45 + (critDMG / 100);
        }
    }
    

    let targetFamily = typeIdToFamily[target.typeId] || "other";
    let targetDef;
    if (target.typeId === "minecraft:player") {
        // For players, get their "def" score from the scoreboard
        const defObj = world.scoreboard.getObjective("def");
        targetDef = defObj ? defObj.getScore(target) : 0;
    } else {
        targetDef = familyDefenseValues[targetFamily] || familyDefenseValues["other"];
    }

    let finalDamage = (damagebonus * (isCrit ? critMultiplier : 1)).toFixed(1);
    finalDamage = Math.max(finalDamage, 0);

 {
        // Blocking: send block event and consume energy instead of applying damage
        if (target.hasTag && target.hasTag("blocking")) {
            const blockInObj = world.scoreboard.getObjective("blockIn");
            if (blockInObj) blockInObj.setScore(target, Math.ceil(finalDamage));
            // show small block indicator and raise the block event
            target.runCommand(`scriptevent axell:block`);
        } else {
            // Apply damage immediately
            target.applyDamage(finalDamage, {
                cause: "override",
                damagingEntity: player
            });

            let randomCoords = {
                x: (Math.random() * 2 - 1).toFixed(2), // Random value between -1 and 1
                y: (Math.random() * 2).toFixed(2),    // Random value between 0 and 2
                z: (Math.random() * 2 - 1).toFixed(2) // Random value between -1 and 1
            };

            let damageIndicator;
            if (isCrit) {
            if (critRate > 100) {
            // Guaranteed crit for first 100, then randomize extra 50
            const extraRate = critRate - 100;
            if (extraRate > 0 && Math.random() * 50 < extraRate) {
                // Extra crit bonus for critRate above 100
                damageIndicator = `§b§l${finalDamage}`; // Different color for extra crit
            } else {
                damageIndicator = `§c${finalDamage}`; // Normal crit above 100
            }
            } else {
            damageIndicator = `§c§l${finalDamage}`; // Normal crit
            }
        } else {
            damageIndicator = `${finalDamage}`; // Non-crit
        }

        target.runCommand(`execute as @s[${hidup},tag=!autoparry] run summon axell:dmg "${damageIndicator}" ~${randomCoords.x} ~${randomCoords.y} ~${randomCoords.z}`);
        // If the target is of type axell:dontol, set its nameTag to the damage per second (dps)

        const breathingsObj = world.scoreboard.getObjective("breathings");
        const bladesObj = world.scoreboard.getObjective("blades");
        if (
            breathingsObj && bladesObj &&
            player.getComponent("minecraft:equippable")?.getEquipment("Mainhand")?.typeId === "axell:nichirin"
            || world.getDimension("overworld").getEntities({ typeId: ["axell:kocho"] })
        ) {
            const breathings = breathingsObj.getScore(player);
            const blades = bladesObj.getScore(player);
            if (breathings === 7 && blades === 2) {
                // Insect poison logic
                if (!globalThis.insectPoisonMap) globalThis.insectPoisonMap = new Map();
                const poisonMap = globalThis.insectPoisonMap;

                poisonMap.set(target.id, {
                    remainingTicks: 100,
                    lastAttacker: player.id
                });

                target.addTag("insect_poisoned");
            }
        }
        // Persistent slayer crit chance: starts at 25%, increases by 25% each miss, resets on hit
        if (
            bladesObj &&
            player.getComponent("minecraft:equippable")?.getEquipment("Mainhand")?.typeId === "axell:nichirin"
            || world.getDimension("overworld").getEntities({ families: ["slayer"] })
        ) {
            const blades = bladesObj.getScore(player);
            if (blades === 1) {
            // Use a persistent map to store the current chance per player
            if (!globalThis.slayerCritChanceMap) globalThis.slayerCritChanceMap = new Map();
            const critMap = globalThis.slayerCritChanceMap;
            const key = player.id + ":" + target.id;
            let currentChance = critMap.get(key) ?? 0.1; 

            if (Math.random() < currentChance) {
                let extraDamage = finalDamage * 1.5;
                if (target.hasTag && target.hasTag("blocking")) {
                    const blockInObj = world.scoreboard.getObjective("blockIn");
                    if (blockInObj) blockInObj.setScore(target, Math.ceil(extraDamage));
                    target.runCommand(`scriptevent axell:block`);
                } else {
                    target.applyDamage(extraDamage, {
                        cause: "override",
                        damagingEntity: player
                    });
                    target.runCommand(`execute as @s[${hidup},tag=!autoparry] run summon axell:dmg "§6${extraDamage.toFixed(1)}" ~${randomCoords.y} ~${randomCoords.y} ~${randomCoords.x}`);
                }
                critMap.set(key, 0);
            } else {
                let nextChance = Math.min(currentChance + 0.1, 1);
                critMap.set(key, nextChance);
            }
            }
        }

    }
}});

    }
});

