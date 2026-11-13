import { system, world } from "@minecraft/server";
import "../../stats.js";
import { getScore, upgradebonus } from "../../utils.js";
import "./sunUI.js";
import { m1, form1, form2, form3, form4, form5, form6, form7, form8, form9, form10, form11, form12 } from "./sunMultipliers.js";
import { showSunForms } from "./sunUI.js";

export { showSunForms };

// --- Script Event Handler ---

system.afterEvents.scriptEventReceive.subscribe((event) => {
    const player = event.sourceEntity;
    if (!player || !player.isValid()) return;

    // Set radius based on event.id
    let radius = 0;
    switch (event.id) {
        case "sun:m1a": case "sun:m1b": case "sun:m1c": radius = 22; break;
        case "sun:m1d1": radius = 35; break;
        case "sun:m1d2": radius = 45; break;
        case "sun:form1": radius = 35; break;
        case "sun:form2": radius = 50; break;
        case "sun:form3": radius = 35; break;
        case "sun:form4": radius = 30; break;
        case "sun:form5": radius = 30; break;
        case "sun:form6a": radius = 60; break;
        case "sun:form6b": radius = 70; break;
        case "sun:form7a": radius = 40; break;
        case "sun:form7b": radius = 46; break;
        case "sun:form8": radius = 30; break;
        case "sun:form9": radius = 40; break;
        case "sun:form10": radius = 40; break;
        case "sun:form11": radius = 40; break;
        case "sun:form12": radius = 40; break;
    }
    if (radius > 0) 
        player.runCommandAsync(`scoreboard players set @s radius ${radius}`);

    // Multiplier mapping
    const multiplierMap = {
        "sun:m1a": { key: "m1lvl", base: m1, idx: 0 },
        "sun:m1b1": { key: "m1lvl", base: m1[1], idx: 0 },
        "sun:m1b2": { key: "m1lvl", base: m1[1], idx: 1 },
        "sun:m1c1": { key: "m1lvl", base: m1[2], idx: 0 },
        "sun:m1c2": { key: "m1lvl", base: m1[2], idx: 1 },
        "sun:m1d1": { key: "m1lvl", base: m1[3], idx: 0 },
        "sun:m1d2": { key: "m1lvl", base: m1[3], idx: 1 },
        "sun:form1": { key: "ab1", base: form1},
        "sun:form2": { key: "ab2", base: form2},
        "sun:form3": { key: "ab3", base: form3},
        "sun:form4": { key: "ab4", base: form4},
        "sun:form5": { key: "ab5", base: form5},
        "sun:form6a": { key: "ab6", base: form6, idx: 0},
        "sun:form6b": { key: "ab6", base: form6, idx: 1},
        "sun:form7a": { key: "ab7", base: form7, idx: 0},
        "sun:form7b": { key: "ab7", base: form7, idx: 1},
        "sun:form8": { key: "ab8", base: form8},
        "sun:form9": { key: "ab9", base: form9},
        "sun:form10": { key: "ab10", base: form10},
        "sun:form11": { key: "ab11", base: form11},
        "sun:form12": { key: "ab12", base: form12},

    };

    const entry = multiplierMap[event.id];
        if (entry && event.id.startsWith("sun:m1")) {
            let level = getScore(entry.key, player);
            const base = entry.base[entry.idx];
            let percent = Math.round(base * Math.pow(upgradebonus, level - 1));
            player.runCommandAsync(`scoreboard players set @s multiplier ${percent}`);
            player.runCommandAsync(`scriptevent axell:damage`);
        }
        if (entry && event.id.startsWith("sun:form")) {
            
                if (event.id === "sun:form5") {
                    // Form5: Deal damage based on target's lost HP, scaled by ab5 level
                    const radius = 30;
                    const ab5Level = getScore("ab5", player);
                    const di = player.getViewDirection();
                    // Aim a short distance ahead for the hit point and search a small hit radius
                    const aimDistance = 2; // how far ahead of player to check
                    const hitRadius = 3; // only entities within this radius of the aim point will be damaged
                    let targetPosition = {
                        x: player.location.x + di.x * aimDistance,
                        y: player.location.y + di.y * aimDistance,
                        z: player.location.z + di.z * aimDistance
                    };

                    const playername = player.name;
                    const playerTeamTags = player.getTags().filter(tag => tag.startsWith("team"));

                    const targetEntities = player.dimension.getEntities({
                        location: targetPosition,
                        maxDistance: hitRadius,
                        excludeTypes: [
                            "xp_orb", "axell:dmg", "item", "armor_stand", "thrown_trident", "arrow",
                            "area_effect_cloud", "minecart", "chest_minecart", "command_block_minecart",
                            "dragon_fireball", "egg", "snowball", "ender_crystal", "ender_pearl",
                            "evocation_fang", "falling_block", "fireball", "fireworks_rocket",
                            "fishing_hook", "leash_knot", "lightning_bolt", "lingering_potion",
                            "llama_spit"
                        ],
                        excludeFamilies: ["damage", "atk", "real"],
                        excludeTags: ["barrage", "ultimate", ...playerTeamTags],
                    });

                    const filteredTargets = targetEntities.filter(target => target.id !== player.id);

                    // Damage only entities within the small hit radius (around aim point)
                    filteredTargets.forEach(target => {
                        const healthComp = target.getComponent("health");
                        if (!healthComp) return;
                        const maxHealth = healthComp.effectiveMax;
                        const currentHealth = healthComp.currentValue;
                        const lostHP = maxHealth - currentHealth;
                        const scaledDamage = Math.floor(lostHP * (ab5Level / 100));

                        if (scaledDamage > 0) {
                            target.applyDamage(scaledDamage, {
                                cause: "override",
                                damagingEntity: player
                            });
                            target.runCommandAsync(`execute as @s run summon axell:dmg "§4§l${scaledDamage}" ^^2^1`);
                        }
                    });
                } else {
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
        }
    );

let sunCounter = 0;
system.runInterval(() => {
    sunCounter++;
    const entities = [
        ...world.getPlayers(),
        ...world.getDimension("overworld").getEntities({ families: ["slayer"] })
    ];
    for (const entity of entities) {
        const breathings = getScore("breathings", entity);
        
        if (breathings === 8) {
            const right = (getScore("right", entity)||getScore("rightS", entity));
            const hold = (getScore("hold", entity)||getScore("holdS", entity));
            
            if (sunCounter % 15 === 0) {
                if (right == 1 && hold >= 20) {
                    entity.runCommandAsync("particle sun:bunder ~~1~");
                }
            }
        }
    }
}, 1);