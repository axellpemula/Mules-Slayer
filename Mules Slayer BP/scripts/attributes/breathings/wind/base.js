import { system, world } from "@minecraft/server";
import "../../stats.js";
import { getScore, upgradebonus } from "../../utils.js";
import "./windUI.js";
import { m1, form1, form2, form3, form4, form5, form6, form7, form8, form9 } from "./windMultipliers.js";
import { showWindForms } from "./windUI.js";

export { showWindForms };

// --- Script Event Handler ---

system.afterEvents.scriptEventReceive.subscribe((event) => {
    const player = event.sourceEntity;
    if (!player || !player.isValid()) return;

    // Set radius based on event.id
    let radius = 0;
    switch (event.id) {
        case "wind:m1a": case "wind:m1b": case "wind:m1c": case "wind:m1d": radius = 22; break;
        case "wind:m1e1": radius = 30; break;
        case "wind:form1": radius = 35; break;
        case "wind:form2": radius = 35; break;
        case "wind:form3a": radius = 40; break;
        case "wind:form3b": radius = 55; break;
        case "wind:form4a": radius = 40; break;
        case "wind:form4b": radius = 40; break;
        case "wind:form5": radius = 50; break;
        case "wind:form6": radius = 35; break;
        case "wind:form7": radius = 45; break;
        case "wind:form8": radius = 40; break;
        case "wind:form9": radius = 80; break;
        case "wind:form10": radius = 40; break;
    }
    if (radius > 0) 
        player.runCommandAsync(`scoreboard players set @s radius ${radius}`);

    // Multiplier mapping
    const multiplierMap = {
        "wind:m1a": { key: "m1lvl", base: m1, idx: 0 },
        "wind:m1b": { key: "m1lvl", base: m1, idx: 1 },
        "wind:m1c1": { key: "m1lvl", base: m1[2], idx: 0 },
        "wind:m1c2": { key: "m1lvl", base: m1[2], idx: 1 },
        "wind:m1d": { key: "m1lvl", base: m1, idx: 3 },
        "wind:m1e1": { key: "m1lvl", base: m1[4], idx: 0 },
        "wind:m1e2": { key: "m1lvl", base: m1[4], idx: 1 },
        "wind:m1e3": { key: "m1lvl", base: m1[4], idx: 2 },
        "wind:form1": { key: "ab1", base: form1},
        "wind:form2": { key: "ab2", base: form2 },
        "wind:form3a": { key: "ab3", base: form3, idx: 0 },
        "wind:form3b": { key: "ab3", base: form3, idx: 1 },
        "wind:form4a": { key: "ab4", base: form4, idx: 0 },
        "wind:form4b": { key: "ab4", base: form4, idx: 1 },
        "wind:form5": { key: "ab5", base: form5 },
        "wind:form6": { key: "ab6", base: form6 },
        "wind:form7": { key: "ab7", base: form7 },
        "wind:form8": { key: "ab8", base: form8, idx: 0 },
        "wind:form8b": { key: "ab8", base: form8, idx: 1 },
        "wind:form9": { key: "ab9", base: form9 }
    };

    const entry = multiplierMap[event.id];
    if (entry && event.id.startsWith("wind:m1")) {
        let level = getScore(entry.key, player);
        const base = entry.base[entry.idx];
        let percent = Math.round(base * Math.pow(upgradebonus, level - 1));
        player.runCommandAsync(`scoreboard players set @s multiplier ${percent}`);
        player.runCommandAsync(`scriptevent axell:damage`);
    }
    if (entry && event.id.startsWith("wind:form")) {
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

let windCounter = 0;
system.runInterval(() => {
    windCounter++;
    const entities = [
        ...world.getPlayers(),
        ...world.getDimension("overworld").getEntities({ families: ["slayer"] })
    ];
    for (const entity of entities) {
        const breathings = getScore("breathings", entity);
        
        if (breathings === 3) {
            const cd4 = getScore("cd4", entity);
            const cd7 = getScore("cd7", entity);
            
            // Check form4b every 3 ticks
            if (windCounter % 3 === 0) {
                if (cd4 <= -1) {
                    entity.runCommandAsync("scriptevent wind:form4b");
                }
            }
            // Check form7 every 3 ticks
            if (windCounter % 3 === 0) {
                if (cd7 <= -26) {
                    entity.runCommandAsync("scriptevent wind:form7");
                    entity.runCommandAsync("scoreboard players remove @s radpos 30");
                }
            }
        }
    }
}, 1);

system.afterEvents.scriptEventReceive.subscribe((event) => {
    const player = event.sourceEntity;
    const direction = player.getViewDirection();

    const particler = {
        "m1e:wind": { x: direction.x, z: direction.z, horizontal: 2.5, vertical: 0.75, particle: "wind:m1e" },
    };

    const action = particler[event.id];
    if (action) {
        // Spawn particle 2 blocks in front of the player
        const spawnLocation = {
            x: player.location.x + direction.x * 1,
            y: player.location.y + action.vertical,
            z: player.location.z + direction.z * 1
        };
        player.dimension.spawnParticle(action.particle, spawnLocation);
    }
});