import { system, world } from "@minecraft/server";
import "../../stats";
import { getScore, upgradebonus } from "../../utils.js";
import "./waterUI";
import { m1, form1, form2, form3, form4, form5, form6, form7, form8, form9, form10, form11 } from "./waterMultipliers";
import { showWaterForms } from "./waterUI";

export { showWaterForms };

// --- Script Event Handler ---

system.afterEvents.scriptEventReceive.subscribe((event) => {
    const player = event.sourceEntity;
    if (!player || !player.isValid()) return;

    // Set radius based on event.id
    let radius = 0;
    switch (event.id) {
        case "water:m1a": case "water:m1b": case "water:m1c": case "water:m1d": case "water:m1e": case "water:form1": radius = 22; break;
        case "water:form1": radius = 40; break;
        case "water:form2": radius = 30; break;
        case "water:form3": radius = 35; break;
        case "water:form4a": radius = 35; break;
        case "water:form8": radius = 40; break;
        case "water:form5a": radius = 40; break;
        case "water:form5c": radius = 40; break;
        case "water:form6": radius = 40; break;
        case "water:form10a": radius = 30; break;
        case "water:form10b": radius = 35; break;
        case "water:form10c": radius = 40; break;
        case "water:form10d": radius = 45; break;
        case "water:form10e": radius = 50; break;
        case "water:form10f": radius = 85; break;
        case "water:form11": radius = 120; break;
    }
    if (radius > 0) player.runCommandAsync(`scoreboard players set @s radius ${radius}`);

    // Multiplier mapping
    const multiplierMap = {
        "water:m1a": { key: "m1lvl", base: m1, idx: 0 },
        "water:m1b": { key: "m1lvl", base: m1, idx: 1 },
        "water:m1c1": { key: "m1lvl", base: m1[2], idx: 0 }, // m1[2] is [35, 39]
        "water:m1c2": { key: "m1lvl", base: m1[2], idx: 1 },
        "water:m1d": { key: "m1lvl", base: m1, idx: 3 },
        "water:m1e": { key: "m1lvl", base: m1, idx: 4 },
        "water:form1": { key: "ab1", base: form1 },
        "water:form2a": { key: "ab2", base: form2, idx: 0 },
        "water:form2b": { key: "ab2", base: form2, idx: 1 },
        "water:form2c": { key: "ab2", base: form2, idx: 2 },
        "water:form3": { key: "ab3", base: form3 },
        "water:form4a": { key: "ab4", base: form4, idx: 0 },
        "water:form4b": { key: "ab4", base: form4, idx: 1 },
        "water:form5a": { key: "ab5", base: form5, idx: 0 },
        "water:form5b": { key: "ab5", base: form5, idx: 1 },
        "water:form5c": { key: "ab5", base: form5, idx: 2 },
        "water:form6a": { key: "ab6", base: form6, idx: 0 },
        "water:form6b": { key: "ab6", base: form6, idx: 1 },
        "water:form6c": { key: "ab6", base: form6, idx: 2 },
        "water:form7": { key: "ab7", base: form7 },
        "water:form8": { key: "ab8", base: form8 },
        "water:form9": { key: "ab9", base: form9 },
        "water:form10a": { key: "ab10", base: form10, idx: 0 },
        "water:form10b": { key: "ab10", base: form10, idx: 1 },
        "water:form10c": { key: "ab10", base: form10, idx: 2 },
        "water:form10d": { key: "ab10", base: form10, idx: 3 },
        "water:form10e": { key: "ab10", base: form10, idx: 4 },
        "water:form10f": { key: "ab10", base: form10, idx: 5 },
        "water:form11": { key: "ab11", base: form11 }
    };

    const entry = multiplierMap[event.id];
    if (entry && event.id.startsWith("water:m1")) {
        let level = getScore(entry.key, player);
        const base = entry.base[entry.idx];
        let percent = Math.round(base * Math.pow(upgradebonus, level - 1));
        player.runCommandAsync(`scoreboard players set @s multiplier ${percent}`);
        player.runCommandAsync(`scriptevent axell:damage`);
    }
    if (entry && event.id.startsWith("water:form")) {
        // Special handling for form9: set cd9 instead of multiplier
        if (event.id === "water:form9") {
            let percent;
            if (typeof entry.key !== "undefined") {
                let level = getScore(entry.key, player);
                let base = (typeof entry.idx !== "undefined") ? entry.base[entry.idx] : entry.base;
                percent = Math.round(base * Math.pow(upgradebonus, level - 1));
            } else {
                percent = (typeof entry.idx !== "undefined") ? entry.base[entry.idx] : entry.base;
            }
            player.runCommandAsync(`scoreboard players set @s cd9 -${percent}`);
            return;
        }
        // Special handling for form5c
    if (event.id === "water:form5c") {
        
        const di = player.getViewDirection();
        let radius2 = world.scoreboard.getObjective("radius").getScore(player);
        let radius = radius2 / 10;
        let poskibidi = radius + 0.1;
        let targetPosition = {
            x: player.location.x + di.x * poskibidi,
            y: player.location.y + di.y * poskibidi,
            z: player.location.z + di.z * poskibidi
        };
            const targetEntities = player.dimension.getEntities({
                location: targetPosition,
                maxDistance: radius,
            });
            // Add tag "{playername}form5" to each found entity
            const tagName = `${player.name}form5`;
            for (const target of targetEntities) {
                target.addTag(tagName);
            }
            return;
        }
        // Special handling for form5b
        if (event.id === "water:form5b") {
            // Get player name
            const playerName = player.name;
            // Find the target entity with tag `${playerName}form5`
            const dimension = player.dimension;
            const targets = dimension.getEntities({ tags: [`${playerName}form5`] });
            if (targets.length > 0) {
                for (const target of targets) {
                    const healthComp = target.getComponent("health");
                    if (healthComp) {
                        const currentHp = healthComp.currentValue;
                        const maxHp = healthComp.effectiveMax;
                        const lostHp = Math.max(0, maxHp - currentHp);

                        // Use form5[1] as base, and for each level increase by 2 (additive)
                        let level = getScore("ab5", player);
                        let base = form5[1];
                        let lostHpPercent = base + (level - 1) * 3;
                        const damage = Math.floor(lostHp * (lostHpPercent / 100));
                        if (damage > 0) {
                            target.runCommand(`execute as @s run particle water:formb5 ~~~`);
                            target.runCommand(`damage @s ${damage}`);
                            target.runCommand(`execute as @s run summon axell:dmg "§4§l${damage}" ^^2^1`);
                            target.runCommand(`tag @s remove ${playerName}form5`);
                        }
                    }
                }
            }
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

let waterCounter = 0;
let toggleForm10 = true;

system.runInterval(() => {
    waterCounter++;
    const entities = [
        ...world.getPlayers(),
        ...world.getDimension("overworld").getEntities({ families: ["slayer"] })
    ];
    for (const entity of entities) {
        const breathings = getScore("breathings", entity);
        
        if (breathings === 1) {
            const cd9 = getScore("cd9", entity);
            const cd3 = getScore("cd3", entity);
            const cd10 = getScore("cd10", entity);
            
            // Check form9 every 8 ticks
            if (waterCounter % 8 === 0) {
                if (cd9 < -1) {
                    entity.runCommandAsync("particle water:form9 ~~-0.05~ ");
                    entity.runCommandAsync("particle smoke:water ~~-0.5~ ");
                }
            }
            // Check form10 particles every 5 ticks
            if (waterCounter % 5 === 0) {
                if (cd3 <= -1) {
                    const particleType = toggleForm10 ? "water:form10a ^1.5^^" : "water:form10b ^-1.5^^";
                    entity.runCommandAsync(`particle ${particleType}`);
                    entity.runCommandAsync("particle smoke:water ~~-0.5~ ");
                    toggleForm10 = !toggleForm10;
                }
            }
            // Check form3 every 4 ticks
            if (waterCounter % 4 === 0) {
                if (cd3 <= -1) {
                    entity.runCommandAsync("scriptevent water:form3");
                    entity.runCommandAsync("playsound bucket.empty_water @a ~~~ 1 0.75 1");
                }
            }
            // Check form10 cd every 8 ticks
            if (waterCounter % 8 === 0) {
                if (cd10 <= -1) {
                    entity.runCommandAsync("particle smoke:water ^^-0.5^1.5");
                }
            }
        }
    }
}, 1);

system.afterEvents.scriptEventReceive.subscribe((event) => {
    const player = event.sourceEntity;
    if (!player || !player.isValid()) return;
    const direction = player.getViewDirection();

    // Map cd10 values to particle offsets (x, y, z)
    const cd10Offsets = [
        { score: -37, offset: { x: -1.5, y: 0, z: 3.25 }, particle: "water:form10a" },
        { score: -30, offset: { x: 1.5, y: 0, z: 3.25 }, particle: "water:form10b" },
        { score: -20, offset: { x: 0, y: 0, z: 3.5 }, particle: "water:form10a" },
        { score: -10, offset: { x: 0, y: 0.5, z: 3.5 }, particle: "water:form10a" },
        { score: -1, offset: { x: 0, y: 1, z: 1.5 }, particle: "water:form3" }
    ];


    if (event.id === "water:form10A") {
        // Get player's cd10 score
        const cd10 = world.scoreboard.getObjective("cd10")?.getScore(player);
        if (typeof cd10 === "number") {
            for (const entry of cd10Offsets) {
                if (cd10 === entry.score) {
                    // Calculate particle spawn location relative to player view
                    // ^(l/r)^(vertical)^(front if positive)
                    const right = { x: -direction.z, y: 0, z: direction.x }; // Perpendicular to view
                    const spawnLocation = {
                        x: player.location.x + right.x * entry.offset.x + direction.x * entry.offset.z,
                        y: player.location.y + entry.offset.y,
                        z: player.location.z + right.z * entry.offset.x + direction.z * entry.offset.z
                    };
                    player.dimension.spawnParticle(entry.particle, spawnLocation);
                    player.runCommandAsync(`playsound axell.raiden.m1 @a ~~~ 1000 1.75 1000`);
                    player.runCommandAsync(`playsound bucket.empty_water @a ~~~ 1000 0.75 1000`);
                    player.runCommandAsync(`playsound bucket.empty_water @a ~~~ 1000 1.25 1000`);
                    player.runCommandAsync(`camerashake add @s 0.2 0.1`);
                    break;
                }
            }
        }
    }
});
