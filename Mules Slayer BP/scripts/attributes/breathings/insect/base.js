import { system, world } from "@minecraft/server";
import "../../stats.js";
import { getScore, upgradebonus } from "../../utils.js";
import "./insectUI.js";
import { m1, form1,form2,form3, form4, special } from "./insectMultipliers.js";
import { showInsectForms } from "./insectUI.js";

export { showInsectForms };

// --- Script Event Handler ---

system.afterEvents.scriptEventReceive.subscribe((event) => {
    const player = event.sourceEntity;
    if (!player || !player.isValid()) return;

    // Set radius based on event.id
    let radius = 0;
    switch (event.id) {
        case "insect:m1a": case "insect:m1b": case "insect:m1c": radius = 22; break;
        case "insect:m1e": radius = 45; break;
        case "insect:form1": radius = 35; break;
        case "insect:form2": radius = 35; break;
        case "insect:form3": radius = 35; break;
        case "insect:form4": radius = 50; break;
        case "insect:form5": radius = 40; break;
        case "insect:form6": radius = 40; break;
        case "insect:formSpecial": radius = 40; break;
    }
    if (radius > 0) 
        player.runCommandAsync(`scoreboard players set @s radius ${radius}`);

    // Multiplier mapping
    const multiplierMap = {
        "insect:m1a": { key: "m1lvl", base: m1, idx: 0 },
        "insect:m1b": { key: "m1lvl", base: m1, idx: 1 },
        "insect:m1c": { key: "m1lvl", base: m1, idx: 2 },
        "insect:m1d1": { key: "m1lvl", base: m1[3], idx: 0 },
        "insect:m1d2": { key: "m1lvl", base: m1[3], idx: 1 },
        "insect:m1d3": { key: "m1lvl", base: m1[3], idx: 2 },
        "insect:m1e": { key: "m1lvl", base: m1, idx: 4 },
        "insect:form1": { key: "ab1", base: form1},
        "insect:form2": { key: "ab2", base: form2},
        "insect:form3": { key: "ab3", base: form3},
        "insect:form4": { key: "ab4", base: form4},
        "insect:formSpecial": { key: "special", base: special}

    };

    const entry = multiplierMap[event.id];
        if (entry && event.id.startsWith("insect:m1")) {
            let level = getScore(entry.key, player);
            const base = entry.base[entry.idx];
            let percent = Math.round(base * Math.pow(upgradebonus, level - 1));
            player.runCommandAsync(`scoreboard players set @s multiplier ${percent}`);
            player.runCommandAsync(`scriptevent axell:damage`);
        }
        if (entry && event.id.startsWith("insect:form")) {
                let percent;
                if (typeof entry.key !== "undefined") {
                    let level = getScore(entry.key, player);
                    let base = (typeof entry.idx !== "undefined") ? entry.base[entry.idx] : entry.base;
                    percent = Math.round(base * Math.pow(upgradebonus, level - 1));
                } else {
                    percent = (typeof entry.idx !== "undefined") ? entry.base[entry.idx] : entry.base;
                }
                player.runCommandAsync(`scoreboard players set @s multiplier ${percent}`);
                player.runCommandAsync(`scriptevent axell:damage`);
            }
        }
    );

/**
 * Insect poison tracking map.
 * Key: entity.id, Value: { remainingTicks, lastAttacker }
 */
if (!globalThis.insectPoisonMap) globalThis.insectPoisonMap = new Map();

/**
 * Call this to apply insect poison to a target.
 * @param {Entity} target - The entity to poison.
 * @param {Entity} attacker - The entity applying the poison.
 * @param {number} durationTicks - How long the poison lasts (in ticks).
 */
export function applyInsectPoison(target, attacker, durationTicks = 100) {
    if (!target || !target.id) return;
    globalThis.insectPoisonMap.set(target.id, {
        remainingTicks: durationTicks,
        lastAttacker: attacker?.id
    });
    target.addTag("insect_poisoned");
}

let leftRight = true;
let insectCounter = 0;

system.runInterval(() => {
    insectCounter++;
    const entities = [
        ...world.getPlayers(),
        ...world.getDimension("overworld").getEntities({ families: ["slayer"] })
    ];
    for (const player of entities) {
        const cd = getScore("cd4", player);
        const breathings = getScore("breathings", player);
        // Check form4 every 2 ticks
        if (insectCounter % 2 === 0) {
            if (cd <= -5 && cd >= -35 && breathings === 7) {
                const particleType = leftRight ? "^1.15^^1" : "^-1.15^^1";
                player.runCommandAsync(`execute as @s at @s rotated ~ 0 run particle smoke:insectzigzag2 ${particleType}`);
                player.runCommandAsync(`execute as @s at @s rotated ~ 0 run particle insect:zigzag2 ${particleType}`);
                player.runCommandAsync(`execute as @s at @s rotated ~ 0 run particle smoke:insectzigzag ^^^4`);
                player.runCommandAsync(`execute as @s at @s rotated ~ 0 run particle smoke:wind ^^^4`);
                player.runCommandAsync(`execute as @s at @s rotated ~ 0 run playsound mob.wither.break_block @a ~~~ 1 1.5 1`);
                leftRight = !leftRight;
            }
        }
    }
}, 1);

// Poison interval logic
system.runInterval(() => {
    if (!globalThis.insectPoisonMap) return;
    for (const [entityId, data] of globalThis.insectPoisonMap.entries()) {
        const entity = world.getEntity(entityId);
        if (!entity || data.remainingTicks <= 0) {
            globalThis.insectPoisonMap.delete(entityId);
            if (entity) entity.removeTag("insect_poisoned");
            continue;
        }
        // Every 20 ticks (1 second), apply poison damage
        if (data.remainingTicks % 20 === 0) {
            // Get max HP
            const maxHp = entity.getComponent("health")?.currentValue;
            // Calculate average level of ab1, ab2, ab3, ab4 from attacker
            let avgLevel = 1;
            if (data.lastAttacker) {
                const attackerEntity = world.getEntity(data.lastAttacker);
                if (attackerEntity) {
                    const abLevels = [
                        getScore("ab1", attackerEntity) || 1,
                        getScore("ab2", attackerEntity) || 1,
                        getScore("ab3", attackerEntity) || 1,
                        getScore("ab4", attackerEntity) || 1
                    ];
                    avgLevel = abLevels.reduce((a, b) => a + b, 0) / abLevels.length;
                }
            }
            // If everything is level 10, then avgLevel = 10, so damage = 5% of maxHp
            const percent = Math.max(1, avgLevel * 0.4); // 0.5% per average level
            const poisonDamage = Math.max(1, Math.round(maxHp * (percent / 100)));

            // Apply damage (if supported in your API)
            if (typeof entity.applyDamage === "function") {
            entity.applyDamage(poisonDamage, {
                cause: "override",
                damagingEntity: undefined
            });
            }

            // Show damage indicator
            // Generate random offset for indicator
            const randomCoords = {
            x: (Math.random() - 0.5) * 0.5,
            y: Math.random() * 1.2 + 0.5,
            z: (Math.random() - 0.5) * 0.5
            };
            // Prepare damage indicator text
            const damageIndicator = `§d${poisonDamage}`;
            // Prepare hidup selector (alive, not dead)
            // Show indicator
            entity.runCommand(`execute as @s run summon axell:dmg "${damageIndicator}" ~${randomCoords.x} ~${randomCoords.y} ~${randomCoords.z}`);
            entity.runCommand(`execute as @s run particle insect:hold`);
        }
        data.remainingTicks--;}})

