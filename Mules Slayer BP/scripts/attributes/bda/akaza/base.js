import { system, world } from "@minecraft/server";
import "../../stats.js";
import { getScore, upgradebonus } from "../../utils.js";
import "./akazaUI.js";
import { m1, form1, form2, form3, form4, form5, form6, form7, form8, form9, form10 } from "./akazaMultipliers.js";
import { showAkazaForms } from "./akazaUI.js";

export { showAkazaForms };

// --- Script Event Handler ---

system.afterEvents.scriptEventReceive.subscribe((event) => {
    const player = event.sourceEntity;
    if (!player || !player.isValid()) return;

    // Set radius based on event.id
    let radius = 0;
    switch (event.id) {
        case "akaza:m1a": case "akaza:m1b": case "akaza:m1c": case "akaza:m1d": radius = 22; break;
        case "akaza:m1e": radius = 40; break;
        case "akaza:m1f": radius = 35; break;
        case "akaza:bda2": radius = 20; break;
        case "akaza:bda3a": radius = 35; break;
        case "akaza:bda3b": radius = 35; break;
        case "akaza:bda5": radius = 40; break;
        case "akaza:bda6": radius = 35; break;
        case "akaza:bda7": radius = 45; break;
        case "akaza:bda8": radius = 40; break;
        case "akaza:bda9": radius = 40; break;
        case "akaza:bda10": radius = 40; break;
    }
    if (radius > 0) 
        player.runCommandAsync(`scoreboard players set @s radius ${radius}`);

    // Multiplier mapping
    const multiplierMap = {
        "akaza:m1a": { key: "bm1lvl", base: m1, idx: 0 },
        "akaza:m1b": { key: "bm1lvl", base: m1, idx: 1 },
        "akaza:m1c": { key: "bm1lvl", base: m1, idx: 2 },
        "akaza:m1d": { key: "bm1lvl", base: m1, idx: 3 },
        "akaza:m1e": { key: "bm1lvl", base: m1, idx: 4 },
        "akaza:m1f": { key: "bm1lvl", base: m1, idx: 5 },
        "akaza:bda1": { key: "bab1", base: form1, idx: 0 },
        "akaza:bda1b": { key: "bab1", base: form1, idx: 1 },
        "akaza:bda2": { key: "bab2", base: form2 },
        "akaza:bda3a": { key: "bab3", base: form3, idx: 0 },
        "akaza:bda3b": { key: "bab3", base: form3, idx: 1 },
        "akaza:bda4": { key: "bab4", base: form4 },
        "akaza:bda5": { key: "bab5", base: form5 },
        "akaza:bda6": { key: "bab6", base: form6 },
        "akaza:bda7": { key: "bab7", base: form7 },
        "akaza:bda8": { key: "bab8", base: form8 },
        "akaza:bda9": { key: "bab9", base: form9 },
        "akaza:bda10": { key: "bab10", base: form10 },
    };

    const entry = multiplierMap[event.id];
    if (entry && event.id.startsWith("akaza:m1")) {
        let level = getScore(entry.key, player);
        const base = entry.base[entry.idx];
        let percent = Math.round(base * Math.pow(upgradebonus, level - 1));
        player.runCommandAsync(`scoreboard players set @s multiplier ${percent}`);
        player.runCommandAsync(`scriptevent axell:damage`);
    }
    if (entry && event.id.startsWith("akaza:bda")) {
        // Special handling for form9: set cd9 instead of multiplier
        if (event.id === "akaza:bda1") {
            let percent;
            if (typeof entry.key !== "undefined") {
            let level = getScore(entry.key, player);
            let base = (typeof entry.idx !== "undefined") ? entry.base[entry.idx] : entry.base;
            percent = Math.round(base * Math.pow(upgradebonus, level - 1));
            } else {
            percent = (typeof entry.idx !== "undefined") ? entry.base[entry.idx] : entry.base;
            }
            player.runCommandAsync(`scoreboard players set @s bcd1 -${percent ?? 0}`);
            return;
        } else if (event.id === "akaza:bda1b") {
            let level = getScore(entry.key, player);
            let base = entry.base[1]; // idx 1
            let percent = Math.round(base - (20 * (level - 1)));
            player.runCommandAsync(`scoreboard players set @s bcd1 ${percent}`);
            return;
        } else {
            // Calculate percent using upgrade level if available
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
});

system.runInterval(() => {
    const entities = [
        ...world.getPlayers(),
        ...world.getDimension("overworld").getEntities({ type: "axell:akaza" })
    ];
    for (const entity of entities) {
        const sp1 = getScore("sp1", entity);
        const bda = getScore("bda", entity);
        const skillani = getScore("skillani", entity);
        if (sp1 >= -45 && sp1 <= -25 && bda === 1 && skillani === 0 && (entity.typeId !== "minecraft:player" || entity.getComponent("minecraft:equippable")?.getEquipment("Mainhand")?.typeId === "axell:bda")) {
            entity.runCommandAsync("scriptevent akaza:m1e");
        }
    }
}, 3);

system.runInterval(() => {
    const entities = [
        ...world.getPlayers(),
        ...world.getDimension("overworld").getEntities({ type: "axell:akaza" })
    ];
    for (const entity of entities) {
        const bcd3 = getScore("bcd3", entity);
        const bda = getScore("bda", entity);
        if (bcd3 <= -22 && bda === 1) {
            entity.runCommandAsync("scriptevent akaza:bda3a");
        }
    }
}, 3);

system.runInterval(() => {
    const entities = [
        ...world.getPlayers(),
        ...world.getDimension("overworld").getEntities({ type: "axell:akaza" })
    ];
    for (const entity of entities) {
        const bcd3 = getScore("bcd6", entity);
        const bda = getScore("bda", entity);
        if (bcd3 <= -10 && bda === 1) {
            entity.runCommandAsync("scriptevent akaza:bda6");
        }
    }
}, 3);

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const bda = getScore("bda", player);
        const error = getScore("error", player);
        let mainhandItem;
        try {
            mainhandItem = player.getComponent("minecraft:equippable")?.getEquipment("Mainhand")?.typeId;
        } catch {
            mainhandItem = undefined;
        }
        if (
            bda === 1 &&
            (typeof error !== "number" || error > 1 || mainhandItem !== "axell:bda")
        ) {
                function cmd(c) {
        player.runCommandAsync(c);
    }

    // All commands, with {rengoku} replaced by playerName and {hidup} replaced by hidup
    const commands = [
        // Initial triggers
        `execute as @s[scores={bcd3=..-1}] run scoreboard players set @s bcd3 90`,
        `execute as @s[scores={bcd6=..-1}] run scoreboard players set @s bcd6 90`,
        `execute as @s[scores={bcd7=..-1}] run scoreboard players set @s bcd7 300`,
        `execute as @s[scores={bcd1=930..}] run scriptevent axell:beatdowncancel`,
        `execute as @s[scores={bcd1=930..}] run scoreboard players set @s bcd1 60`
    ];

    for (const c of commands) {
        cmd(c);
    }
        }
    }
}, 1);