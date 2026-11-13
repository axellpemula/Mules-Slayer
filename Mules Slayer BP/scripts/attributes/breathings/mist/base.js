import { system, world } from "@minecraft/server";
import "../../stats.js";
import { getScore, upgradebonus } from "../../utils.js";
import "./mistUI.js";
import { m1, form1,form2,form3, form4, form5, form6 } from "./mistMultipliers.js";
import { showMistForms } from "./mistUI.js";

export { showMistForms };

// --- Script Event Handler ---

system.afterEvents.scriptEventReceive.subscribe((event) => {
    const player = event.sourceEntity;
    if (!player || !player.isValid()) return;

    // Set radius based on event.id
    let radius = 0;
    switch (event.id) {
        case "mist:m1a": case "mist:m1b": case "mist:m1c": radius = 22; break;
        case "mist:m1e": radius = 45; break;
        case "mist:form1": radius = 35; break;
        case "mist:form2": radius = 30; break;
        case "mist:form3": radius = 35; break;
        case "mist:form4": radius = 50; break;
        case "mist:form5": radius = 40; break;
        case "mist:form6": radius = 40; break;
    }
    if (radius > 0) 
        player.runCommandAsync(`scoreboard players set @s radius ${radius}`);

    // Multiplier mapping
    const multiplierMap = {
        "mist:m1a": { key: "m1lvl", base: m1, idx: 0 },
        "mist:m1b": { key: "m1lvl", base: m1, idx: 1 },
        "mist:m1c": { key: "m1lvl", base: m1, idx: 2 },
        "mist:m1d1": { key: "m1lvl", base: m1[3], idx: 0 },
        "mist:m1d2": { key: "m1lvl", base: m1[3], idx: 1 },
        "mist:m1d3": { key: "m1lvl", base: m1[3], idx: 2 },
        "mist:m1e": { key: "m1lvl", base: m1, idx: 4 },
        "mist:form1": { key: "ab1", base: form1},
        "mist:form2": { key: "ab2", base: form2},
        "mist:form3": { key: "ab3", base: form3},
        "mist:form4": { key: "ab4", base: form4},
        "mist:form5": { key: "ab5", base: form5},
        "mist:form6": { key: "ab6", base: form6}

    };

    const entry = multiplierMap[event.id];
        if (entry && event.id.startsWith("mist:m1")) {
            let level = getScore(entry.key, player);
            const base = entry.base[entry.idx];
            let percent = Math.round(base * Math.pow(upgradebonus, level - 1));
            player.runCommandAsync(`scoreboard players set @s multiplier ${percent}`);
            player.runCommandAsync(`scriptevent axell:damage`);
        }
        if (entry && event.id.startsWith("mist:form")) {
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


let mistCounter = 0;
system.runInterval(() => {
    mistCounter++;
    const entities = [
        ...world.getPlayers(),
        ...world.getDimension("overworld").getEntities({ families: ["slayer"] })
    ];
    for (const entity of entities) {
        const breathings = getScore("breathings", entity);
        
        if (breathings === 6) {
            // Check form5 every 2 ticks
            if (mistCounter % 2 === 0) {
                const cd5 = getScore("cd5", entity);
                if (cd5 <= -7) {
                    entity.runCommandAsync("scriptevent mist:form5");
                }
            }
            // Check form3 every 3 ticks
            if (mistCounter % 3 === 0) {
                const cd3 = getScore("cd3", entity);
                if (cd3 <= -5) {
                    entity.runCommandAsync("scriptevent mist:form3");
                }
            }
        }
    }
}, 1);

