import { system, world } from "@minecraft/server";
import "../../stats.js";
import { getScore, upgradebonus } from "../../utils.js";
import "./soundUI.js";
import { m1, form1, form4, form5, special } from "./soundMultipliers.js";
import { showSoundForms } from "./soundUI.js";

export { showSoundForms };

// --- Script Event Handler ---

system.afterEvents.scriptEventReceive.subscribe((event) => {
    const player = event.sourceEntity;
    if (!player || !player.isValid()) return;

    // Set radius based on event.id
    let radius = 0;
    switch (event.id) {
        case "sound:m1a1": case "sound:m1b1": case "sound:m1c1": radius = 22; break;
        case "sound:m1d1": radius = 30; break;
        case "sound:m1d3": radius = 26; break;
        case "sound:m1e1": radius = 28; break;
        case "sound:m1e2": radius = 30; break;
        case "sound:form1": radius = 35; break;
        case "sound:form2": radius = 45; break;
        case "sound:form3": radius = 55; break;
        case "sound:form4": radius = 30; break;
        case "sound:form5": radius = 35; break;
    }
    if (radius > 0) 
        player.runCommand(`scoreboard players set @s radius ${radius}`);

    // Multiplier mapping
    const multiplierMap = {
        "sound:m1a1": { key: "m1lvl", base: m1[0], idx: 0 },
        "sound:m1a2": { key: "m1lvl", base: m1[0], idx: 1 },
        "sound:m1b1": { key: "m1lvl", base: m1[1], idx: 0 },
        "sound:m1b2": { key: "m1lvl", base: m1[1], idx: 1 },
        "sound:m1c1": { key: "m1lvl", base: m1[2], idx: 0 },
        "sound:m1c2": { key: "m1lvl", base: m1[2], idx: 1 },
        "sound:m1d1": { key: "m1lvl", base: m1[3], idx: 0 },
        "sound:m1d2": { key: "m1lvl", base: m1[3], idx: 1 },
        "sound:m1d3": { key: "m1lvl", base: m1[3], idx: 2 },
        "sound:m1e1": { key: "m1lvl", base: m1[4], idx: 0 },
        "sound:m1e2": { key: "m1lvl", base: m1[4], idx: 1 },
        "sound:m1e3": { key: "m1lvl", base: m1[4], idx: 2 },
        "sound:form1": { key: "ab1", base: form1},
        "sound:form4": { key: "ab4", base: form4},
        "sound:form5": { key: "ab5", base: form5}

    };

    const entry = multiplierMap[event.id];
        if (entry && event.id.startsWith("sound:m1")) {
            let level = getScore(entry.key, player);
            const base = entry.base[entry.idx];
            let percent = Math.round(base * Math.pow(upgradebonus, level - 1));
            player.runCommand(`scoreboard players set @s multiplier ${percent}`);
            player.runCommand(`scriptevent axell:damage`);
        }
        if (entry && event.id.startsWith("sound:form")) {
                let percent;
                if (typeof entry.key !== "undefined") {
                    let level = getScore(entry.key, player);
                    let base = (typeof entry.idx !== "undefined") ? entry.base[entry.idx] : entry.base;
                    percent = Math.round(base * Math.pow(upgradebonus, level - 1));
                } else {
                    percent = (typeof entry.idx !== "undefined") ? entry.base[entry.idx] : entry.base;
                }
                player.runCommand(`scoreboard players set @s multiplier ${percent}`);
                player.runCommand(`scriptevent axell:damage`);
            }
        }
    );

system.runInterval(() => {
    const entities = [
        ...world.getPlayers(),
        ...world.getDimension("overworld").getEntities({ families: ["slayer"] })
    ];
    for (const entity of entities) {
        const cd5 = getScore("cd5", entity);
        const cd4 = getScore("cd4", entity);
        const sp1 = getScore("sp1", entity);
        const breathings = getScore("breathings", entity);

        if (breathings === 4) {
            if (cd5 <= -25) {
                entity.runCommand("scriptevent sound:form5");
                entity.runCommand("execute as @s at @s run particle sound:dordor1 ^^^2");
                entity.runCommand("execute as @s at @s run particle sound:dordor2 ^^^2");
                entity.runCommand("execute as @s at @s run particle sound:dordor3 ^^^2");
                entity.runCommand("execute as @s at @s run particle smoke:wind ^^1^2");
                entity.runCommand("execute as @s at @s run particle smoke:flame ^^1^4");
                entity.runCommand("playsound firework.blast @a ~~~ 10000 2 1000");
                entity.runCommand("playsound firework.twinkle @a ~~~ 1000 0.7 1");
            } else if (cd5 >= -20 && cd5 <= -10) {
                entity.runCommand("scriptevent sound:form5");
                entity.runCommand("execute as @s at @s run particle sound:dordor1 ^^^2");
                entity.runCommand("execute as @s at @s run particle sound:dordor2 ^^^2");
                entity.runCommand("execute as @s at @s run particle sound:dordor3 ^^^2");
                entity.runCommand("execute as @s at @s run particle smoke:wind ^^1^2");
                entity.runCommand("execute as @s at @s run particle smoke:flame ^^1^4");
                entity.runCommand("playsound firework.twinkle @a ~~~ 1000 0.7 1");
                entity.runCommand("playsound firework.blast @a ~~~ 10000 1 1000");
                entity.runCommand("playsound item.trident.riptide_3 @a ~~~ 1 5 1");
            } else if (sp1 <= -1005) {
                entity.runCommand("execute as @s at @s run particle sound:dordor1 ^^^2");
                entity.runCommand("execute as @s at @s run particle sound:dordor2 ^^^2");
                entity.runCommand("execute as @s at @s run particle sound:dordor3 ^^^2");
                entity.runCommand("execute as @s at @s run particle akaza:impact3 ^^1^2");
                entity.runCommand("execute as @s at @s run particle smoke:wind ^^1^2");
                entity.runCommand("execute as @s at @s run particle smoke:flame ^^1^4");
                entity.runCommand("playsound firework.blast @a ~~~ 10000 2 1000");
                entity.runCommand("playsound firework.blast @a ~~~ 10000 1 1000");
            } else if (cd4 <= -1) {
                entity.runCommand("scriptevent sound:form4");
                entity.runCommand("execute as @s at @s run particle sound:dordor1 ^^^1");
                entity.runCommand("execute as @s at @s run particle sound:dordor2 ^^^1");
                entity.runCommand("execute as @s at @s run particle sound:dordor3 ^^^1");
                entity.runCommand("execute as @s at @s run particle akaza:impact3 ~~1~");
                entity.runCommand("execute as @s at @s run particle smoke:flame ^^1^");
                entity.runCommand("execute as @s at @s run particle smoke:wind ^^1^");
                entity.runCommand("playsound firework.twinkle @a ~~~ 10000 1.2 1000");
            } else if (cd4 <= -4) {
                entity.runCommand("execute as @s at @s run particle sound:form4 ~~0.5~");
                entity.runCommand("playsound firework.blast @a ~~~ 10000 2 1000");
                entity.runCommand("playsound firework.blast @a ~~~ 10000 1 1000");
                entity.runCommand("camerashake add @s 0.1 0.2");
            }
        }
    }
}, 3);

system.runInterval(() => {
    const entities = [
        ...world.getPlayers(),
        ...world.getDimension("overworld").getEntities({ families: ["slayer"] })
    ];
    for (const entity of entities) {
        const cd4 = getScore("cd4", entity);
        const breathings = getScore("breathings", entity);
        if (cd4 <= -4 && breathings === 4) {
            entity.runCommand("execute as @s at @s run particle sound:form4 ~~0.5~");
            entity.runCommand("playsound firework.blast @a ~~~ 10000 2 1000");
            entity.runCommand("playsound firework.blast @a ~~~ 10000 1 1000");
            entity.runCommand("camerashake add @s 0.1 0.2");
        }
    }
}, 2);
