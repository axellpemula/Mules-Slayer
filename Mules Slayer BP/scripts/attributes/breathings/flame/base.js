import { system, world } from "@minecraft/server";
import "../../stats.js";
import "./ult.js";
import { getScore, upgradebonus } from "../../utils.js";
import "./flameUI.js";
import { m1, form1, form2, form3, form4, form5, form9 } from "./flameMultipliers.js";
import { showFlameForms } from "./flameUI.js";

export { showFlameForms };

// --- Script Event Handler ---

system.afterEvents.scriptEventReceive.subscribe((event) => {
    const player = event.sourceEntity;
    if (!player || !player.isValid()) return;

    // Set radius based on event.id
    let radius = 0;
    switch (event.id)  {
        case "flame:m1a":
        case "flame:m1b":
        case "flame:m1c":
        case "flame:m1d":
        case "flame:m1e":
            radius = 22;
            break;
        case "flame:form1":
            radius = 40;
            break;
        case "flame:form2":
            radius = 35;
            break;
        case "flame:form3":
            radius = 30;
            break;
        case "flame:form4":
            radius = 35;
            break;
        case "flame:form5":
            radius = 40;
            break;
        case "flame:form9a":
            radius = 55;
            break;
        case "flame:form9b":
            radius = 50;
            break;
    }
    if (radius > 0) 
        player.runCommandAsync(`scoreboard players set @s radius ${radius}`);

    // Multiplier mapping
        const multiplierMap = {
            "flame:m1a": { key: "m1lvl", base: m1, idx: 0 },
            "flame:m1b": { key: "m1lvl", base: m1, idx: 1 },
            "flame:m1c": { key: "m1lvl", base: m1, idx: 2 },
            "flame:m1d": { key: "m1lvl", base: m1, idx: 3 },
            "flame:m1e": { key: "m1lvl", base: m1, idx: 4 },
            "flame:form1": { key: "ab1", base: form1 },
            "flame:form2": { key: "ab2", base: form2 },
            "flame:form3": { key: "ab3", base: form3 },
            "flame:form4": { key: "ab4", base: form4 },
            "flame:form5": { key: "ab5", base: form5 },
            "flame:form9a": { key: "ab9", base: form9, idx: 0  },
            "flame:form9b": { key: "ab9", base: form9, idx: 1  }
        };
    
        const entry = multiplierMap[event.id];
        if (entry) {
            let level = getScore(entry.key, player);
            let percent;
            if (event.id.startsWith("flame:m1")) {
                // For m1, use the correct index for the array
                percent = Math.round(m1[entry.idx] * Math.pow(upgradebonus, level - 1));
            } else if (event.id === "flame:form9a" || event.id === "flame:form9b") {
                // For form9a and form9b, use the correct index for the array
                percent = Math.round(form9[entry.idx] * Math.pow(upgradebonus, level - 1));
            } else {
                // For other forms, use base multiplier and upgrade level
                percent = Math.round(entry.base * Math.pow(upgradebonus, level - 1));
            }
            player.runCommandAsync(`scoreboard players set @s multiplier ${percent}`);
            player.runCommandAsync(`execute as @s run scriptevent axell:damage`);
        }})

let flameCounter = 0;
system.runInterval(() => {
    flameCounter++;
    const entities = [
        ...world.getPlayers(),
        ...world.getDimension("overworld").getEntities({ families: ["slayer"] })
    ];
    for (const entity of entities) {
        const breathings = getScore("breathings", entity);
        
        if (breathings === 2) {
            const cd4 = getScore("cd4", entity);
            const ultimate = getScore("ultimate", entity);
            
            // Check form4 every 3 ticks
            if (flameCounter % 3 === 0) {
                if (cd4 <= -5) {
                    entity.runCommandAsync("scriptevent flame:form4");
                }
            }
            // Check form9a (ultimate phase 1) every 3 ticks
            if (flameCounter % 3 === 0) {
                if (ultimate >= 120 && ultimate <= 154) {
                    entity.runCommandAsync("scriptevent flame:form9a");
                }
            }
            // Check form9a (ultimate phase 2) every 5 ticks
            if (flameCounter % 5 === 0) {
                if (ultimate >= 10 && ultimate <= 105) {
                    entity.runCommandAsync("scriptevent flame:form9a");
                }
            }
        }
    }
}, 1);