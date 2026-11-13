import { system, world } from "@minecraft/server";
import "../../stats.js";
import { getScore, upgradebonus } from "../../utils.js";
import "./thunderUI.js";
import { m1, form1,form2,form3, form4, form5, form6 } from "./thunderMultipliers.js";
import { showThunderForms } from "./thunderUI.js";

export { showThunderForms };

// --- Script Event Handler ---

system.afterEvents.scriptEventReceive.subscribe((event) => {
    const player = event.sourceEntity;
    if (!player || !player.isValid()) return;

    // Set radius based on event.id
    let radius = 0;
    switch (event.id) {
        case "thunder:m1a": case "thunder:m1b": case "thunder:m1c": radius = 22; break;
        case "thunder:m1e": radius = 45; break;
        case "thunder:form1": radius = 60; break;
        case "thunder:form2": radius = 45; break;
        case "thunder:form3": radius = 35; break;
        case "thunder:form4": radius = 50; break;
        case "thunder:form5": radius = 55; break;
        case "thunder:form6": radius = 40; break;
    }
    if (radius > 0) 
        player.runCommandAsync(`scoreboard players set @s radius ${radius}`);

    // Multiplier mapping
    const multiplierMap = {
        "thunder:m1a": { key: "m1lvl", base: m1, idx: 0 },
        "thunder:m1b": { key: "m1lvl", base: m1, idx: 1 },
        "thunder:m1c": { key: "m1lvl", base: m1, idx: 2 },
        "thunder:m1d1": { key: "m1lvl", base: m1[3], idx: 0 },
        "thunder:m1d2": { key: "m1lvl", base: m1[3], idx: 1 },
        "thunder:m1d3": { key: "m1lvl", base: m1[3], idx: 2 },
        "thunder:m1e": { key: "m1lvl", base: m1, idx: 4 },
        "thunder:form1": { key: "ab1", base: form1},
        "thunder:form2": { key: "ab2", base: form2},
        "thunder:form3": { key: "ab3", base: form3},
        "thunder:form4": { key: "ab4", base: form4},
        "thunder:form5": { key: "ab5", base: form5},
        "thunder:form6": { key: "ab6", base: form6}

    };

    const entry = multiplierMap[event.id];
        if (entry && event.id.startsWith("thunder:m1")) {
            let level = getScore(entry.key, player);
            const base = entry.base[entry.idx];
            let percent = Math.round(base * Math.pow(upgradebonus, level - 1));
            player.runCommandAsync(`scoreboard players set @s multiplier ${percent}`);
            player.runCommandAsync(`scriptevent axell:damage`);
        }
        if (entry && event.id.startsWith("thunder:form")) {
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
