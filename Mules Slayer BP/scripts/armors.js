import { world, system } from "@minecraft/server";
import { familyStats } from "./attributes/families";

export const armorStatValues = {
    "minecraft:diamond_helmet":      { slot: "Head", def: 3, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§7DEF+3
    "minecraft:diamond_chestplate":  { slot: "Chest", def: 8, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§aDEF+8
    "minecraft:diamond_leggings":    { slot: "Legs", def: 6, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§aDEF+6
    "minecraft:diamond_boots":       { slot: "Feet", def: 3, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§7DEF+3
    "minecraft:netherite_helmet":    { slot: "Head", def: 4, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§aDEF+4
    "minecraft:netherite_chestplate":{ slot: "Chest", def: 10, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§9DEF+10
    "minecraft:netherite_leggings":  { slot: "Legs", def: 8, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§aDEF+8
    "minecraft:netherite_boots":     { slot: "Feet", def: 4, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§aDEF+4
    "minecraft:iron_helmet":         { slot: "Head", def: 2, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§7DEF+2
    "minecraft:iron_chestplate":     { slot: "Chest", def: 6, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§aDEF+6
    "minecraft:iron_leggings":       { slot: "Legs", def: 5, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§aDEF+5
    "minecraft:iron_boots":          { slot: "Feet", def: 2, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§7DEF+2
    "minecraft:golden_helmet":       { slot: "Head", def: 1, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§7DEF+1
    "minecraft:golden_chestplate":   { slot: "Chest", def: 5, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§aDEF+5
    "minecraft:golden_leggings":     { slot: "Legs", def: 3, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§7DEF+3
    "minecraft:golden_boots":        { slot: "Feet", def: 1, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§7DEF+1
    "minecraft:chainmail_helmet":    { slot: "Head", def: 2, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§7DEF+2
    "minecraft:chainmail_chestplate":{ slot: "Chest", def: 5, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§aDEF+5
    "minecraft:chainmail_leggings":  { slot: "Legs", def: 4, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§aDEF+4
    "minecraft:chainmail_boots":     { slot: "Feet", def: 2, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§7DEF+2
    "minecraft:leather_helmet":      { slot: "Head", def: 1, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§7DEF+1
    "minecraft:leather_chestplate":  { slot: "Chest", def: 3, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§7DEF+3
    "minecraft:leather_leggings":    { slot: "Legs", def: 2, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§7DEF+2
    "minecraft:leather_boots":       { slot: "Feet", def: 1, vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 }, // \n§7DEF+1

    // Custom armor
    "ds:uniform":           { slot: "axell", def: 24, vit: 20, str:  2, dex:  2, pen:  0, critRate:  5, critDMG:  0,  dmgBonus:  0 }, 
    "ds:giyuu_haori":       { slot: "axell", def: 14, vit: 10, str: 10, dex: 12, pen:  2, critRate: 15, critDMG: 20, dmgBonus:  0 }, 
    "ds:tanjiro_haori":     { slot: "axell", def:  7, vit: 12, str:  5, dex:  5, pen:  0, critRate: 10, critDMG: 15, dmgBonus:  0 },
    "ds:zenitsu_haori":     { slot: "axell", def:  5, vit:  8, str:  5, dex: 12, pen:  3, critRate: 25, critDMG: 10, dmgBonus:  0 }, 
    "ds:haori_cloud":       { slot: "axell", def: 20, vit: 15, str:  2, dex:  2, pen:  0, critRate:  5, critDMG: 10, dmgBonus:  0 }, 
    "ds:kocho_haori":       { slot: "axell", def:  8, vit: 13, str: 10, dex: 20, pen:  5, critRate: 10, critDMG: 15, dmgBonus:  0 }, 
    "ds:yorichi_haori":     { slot: "axell", def: 22, vit: 10, str: 15, dex: 15, pen: 14, critRate: 30, critDMG: 50, dmgBonus: 50 }, 
    "ds:rengoku_haori":     { slot: "axell", def: 10, vit:  5, str: 25, dex:  0, pen:  0, critRate:  5, critDMG: 15, dmgBonus:  0 },
    "ds:michikatsu_haori":  { slot: "axell", def: 15, vit:  8, str: 10, dex: 10, pen:  5, critRate: 20, critDMG: 25, dmgBonus:  0 },
    "ds:tokito_haori":      { slot: "axell", def: 12, vit:  8, str:  5, dex: 25, pen:  0, critRate: 15, critDMG: 20, dmgBonus:  0 }, 
    "ds:shinazugawa_haori": { slot: "axell", def: 16, vit: 10, str: 10, dex: 10, pen:  0, critRate: 10, critDMG: 30, dmgBonus:  0 },  
    "ds:xeno_haori":    { slot: "axell", def: 23, vit: 19, str: 21, dex: 10, pen: 19, critRate: 35, critDMG: 47, dmgBonus: 67 }, // blackpurple

    // xeno stuffs
    "ds:tanjiro_haori1": { slot: "axell", def: 8,  vit: 12, str: 6,  dex: 6,  pen: 0, critRate: 10, critDMG: 10, dmgBonus: 0 }, // red
    "ds:tanjiro_haori2": { slot: "axell", def: 9,  vit: 11, str: 5,  dex: 7,  pen: 2, critRate: 9,  critDMG: 10, dmgBonus: 0 }, // blue
    "ds:tanjiro_haori3": { slot: "axell", def: 7,  vit: 10, str: 6,  dex: 8,  pen: 2, critRate: 11, critDMG: 12, dmgBonus: 0 }, // purple
    "ds:tanjiro_haori4": { slot: "axell", def: 10, vit: 12, str: 7,  dex: 5,  pen: 0, critRate: 9,  critDMG: 11, dmgBonus: 0 }, // gold
    "ds:tanjiro_haori5": { slot: "axell", def: 7,  vit: 9,  str: 5,  dex: 9,  pen: 0, critRate: 12, critDMG: 10, dmgBonus: 0 }, // gray
    "ds:tanjiro_haori6": { slot: "axell", def: 11, vit: 10, str: 8,  dex: 5,  pen: 3, critRate: 8,  critDMG: 10, dmgBonus: 0 }, // black
    "ds:tanjiro_haori7": { slot: "axell", def: 8,  vit: 11, str: 5,  dex: 8,  pen: 1, critRate: 10, critDMG: 11, dmgBonus: 0 }, // dark

    "ds:rengoku_haori1": { slot: "axell", def: 9,  vit: 7,  str: 18, dex: 4,  pen: 3, critRate: 8,  critDMG: 12, dmgBonus: 5 }, // blue
    "ds:rengoku_haori2": { slot: "axell", def: 11, vit: 8,  str: 20, dex: 3,  pen: 4, critRate: 10, critDMG: 12, dmgBonus: 6 }, // gold
    "ds:rengoku_haori3": { slot: "axell", def: 8,  vit: 7,  str: 16, dex: 5,  pen: 2, critRate: 9,  critDMG: 11, dmgBonus: 3 }, // white
    "ds:rengoku_haori5": { slot: "axell", def: 9,  vit: 6,  str: 21, dex: 4,  pen: 4, critRate: 10, critDMG: 13, dmgBonus: 7 }, // crimson

    "ds:zenitsu_haori1": { slot: "axell", def: 6, vit: 7,  str: 5,  dex: 15, pen: 2, critRate: 25, critDMG: 11, dmgBonus: 0 }, // stormblue
    "ds:zenitsu_haori2": { slot: "axell", def: 7, vit: 8,  str: 6,  dex: 13, pen: 2, critRate: 24, critDMG: 12, dmgBonus: 0 }, // twilightpurple
    "ds:zenitsu_haori3": { slot: "axell", def: 8, vit: 9,  str: 7,  dex: 12, pen: 3, critRate: 20, critDMG: 13, dmgBonus: 0 }, // infernoorange
    "ds:zenitsu_haori4": { slot: "axell", def: 9, vit: 8,  str: 6,  dex: 12, pen: 4, critRate: 23, critDMG: 14, dmgBonus: 0 }, // voidblackgold

    "ds:giyuu_haori1": { slot: "axell", def: 13, vit: 11, str: 9,  dex: 11, pen: 2, critRate: 10, critDMG: 12, dmgBonus: 0 }, // frost
    "ds:giyuu_haori2": { slot: "axell", def: 11, vit: 9,  str: 12, dex: 10, pen: 3, critRate: 11, critDMG: 13, dmgBonus: 0 }, // inferno
    "ds:giyuu_haori3": { slot: "axell", def: 12, vit: 10, str: 9,  dex: 12, pen: 3, critRate: 12, critDMG: 12, dmgBonus: 0 }, // storm
    "ds:giyuu_haori4": { slot: "axell", def: 13, vit: 9,  str: 11, dex: 9,  pen: 4, critRate: 10, critDMG: 14, dmgBonus: 0 }, // shadow

    "ds:kocho_haori1": { slot: "axell", def: 8,  vit: 10, str: 6,  dex: 18, pen: 4, critRate: 12, critDMG: 12, dmgBonus: 0 }, // venom
    "ds:kocho_haori2": { slot: "axell", def: 7,  vit: 11, str: 5,  dex: 17, pen: 3, critRate: 13, critDMG: 11, dmgBonus: 0 }, // blossom
    "ds:kocho_haori3": { slot: "axell", def: 8,  vit: 10, str: 6,  dex: 19, pen: 4, critRate: 14, critDMG: 12, dmgBonus: 0 }  // aurora

};
    
// Randomize stats for haori items (ds:*_haori[1-9]) when taken from inventory
function randomizeHaoriStats(typeId) {
    const baseStats = armorStatValues[typeId];
    if (!baseStats) return null;
    let stats = {};
    for (const k of ["def", "vit", "str", "dex", "pen", "critRate", "critDMG", "dmgBonus"]) {
        const base = baseStats[k] || 0;
        // Define max increase/decrease for each stat
        const statRanges = {
            def:      { inc: 20, dec: 11 },
            vit:      { inc: 10, dec: 5 },
            str:      { inc: 20, dec: 5 },
            dex:      { inc: 10, dec: 5 },
            pen:      { inc: 5,  dec: 3 },
            critRate: { inc: 15, dec: 5 },
            critDMG:  { inc: 30, dec: 5 },
            dmgBonus: { inc: 20, dec: 5 }
        };
        const range = statRanges[k] || { inc: 0, dec: 0 };
        let value = Math.floor(base + (Math.random() * (range.inc + range.dec + 1) - range.dec));
        stats[k] = value;
    }
    return stats;
}

// Helper to check if item is a randomizable haori
function isRandomHaori(typeId) {
    return /^ds:.*_haori\d+$/.test(typeId);
}

// Override getStatLore to color stat red if below 0
function getStatLore(stats, typeId) {
    let statEntries = [];
    function color(val) {
        return val < 0 ? "§c" : "§9";
    }
    if (stats.def)      statEntries.push(`§r${color(stats.def)}${stats.def >= 0 ? "+" : ""}${stats.def} Defense`);
    if (stats.vit)      statEntries.push(`§r${color(stats.vit)}${stats.vit >= 0 ? "+" : ""}${stats.vit} Vitality`);
    if (stats.str)      statEntries.push(`§r${color(stats.str)}${stats.str >= 0 ? "+" : ""}${stats.str} Strength`);
    if (stats.dex)      statEntries.push(`§r${color(stats.dex)}${stats.dex >= 0 ? "+" : ""}${stats.dex} Dexterity`);
    if (stats.pen)      statEntries.push(`§r${color(stats.pen)}${stats.pen >= 0 ? "+" : ""}${stats.pen} Penetration`);
    if (stats.critRate) statEntries.push(`§r${color(stats.critRate)}${stats.critRate >= 0 ? "+" : ""}${stats.critRate}% Critical Chance`);
    if (stats.critDMG)  statEntries.push(`§r${color(stats.critDMG)}${stats.critDMG >= 0 ? "+" : ""}${stats.critDMG}% Critical Damage`);
    if (stats.dmgBonus) statEntries.push(`§r${color(stats.dmgBonus)}${stats.dmgBonus >= 0 ? "+" : ""}${stats.dmgBonus}% Damage Bonus`);

    let lore = "\n§rAttributes:\n";
    lore += statEntries.length ? statEntries.join('\n') : "§7None";
    let total = 0;
    for (const k of ["def", "vit", "str", "dex", "pen", "critRate", "dmgBonus"]) {
        total += stats[k] || 0;
    }
    // critDMG only worth half
    total += (stats.critDMG || 0) * 0.5;

    let tier = "§7Common";
    if (total >= 100) tier = "§cMythical";
    else if (total >= 70) tier = "§6Legendary";
    else if (total >= 50) tier = "§dEpic";
    else if (total >= 30) tier = "§1Rare";
    else if (total >= 15) tier = "§2Uncommon";
    else if (total <= 0) tier = "§4Trash";
    lore += `\n\n§rRarity: ${tier}`;
    return lore;
}

// Update item stat lore, randomize if haori and not yet randomized
function updateItemStatLore(item) {
    let stats;
    if (isRandomHaori(item.typeId)) {
        // Store randomized stats in item's dynamic property if available
        if (!item.getDynamicProperty || !item.getDynamicProperty("randomStats")) {
            stats = randomizeHaoriStats(item.typeId);
            if (item.setDynamicProperty) {
                item.setDynamicProperty("randomStats", JSON.stringify(stats));
            }
        } else {
            stats = JSON.parse(item.getDynamicProperty("randomStats"));
        }
    } else {
        stats = armorStatValues[item.typeId];
    }
    if (!stats) return;
    const expectedLore = getStatLore(stats, item.typeId);
    if (!item.getLore || !item.getLore().length) {
        item.setLore([expectedLore]);
    }
}

// Inventory tick: randomize haori stats when taken from inventory
system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const inventory = player.getComponent("inventory").container;
        for (let i = 0; i < inventory.size; i++) {
            const item = inventory.getItem(i);
            if (item && armorStatValues[item.typeId]) {
                // If haori and not yet randomized, randomize stats
                if (isRandomHaori(item.typeId)) {
                    if (!item.getDynamicProperty || !item.getDynamicProperty("randomStats")) {
                        updateItemStatLore(item);
                        inventory.setItem(i, item);
                    }
                } else if (!item.getLore || !item.getLore().length) {
                    updateItemStatLore(item);
                    inventory.setItem(i, item);
                }
            }
        }

        const equip = player.getComponent('equippable');
        if (equip) {
            const slots = ['Mainhand', 'axell', 'Head', 'Chest', 'Legs', 'Feet'];
            for (const slot of slots) {
                let equipped;
                try {
                    equipped = equip.getEquipment(slot);
                } catch (e) {
                    equipped = undefined;
                }
                if (equipped && armorStatValues[equipped.typeId]) {
                    if (isRandomHaori(equipped.typeId)) {
                        if (!equipped.getDynamicProperty || !equipped.getDynamicProperty("randomStats")) {
                            updateItemStatLore(equipped);
                            equip.setEquipment(slot, equipped);
                        }
                    } else if (!equipped.getLore || !equipped.getLore().length) {
                        updateItemStatLore(equipped);
                        equip.setEquipment(slot, equipped);
                    }
                }
            }
        }
    }
}, 1);

// Get stat value for a slot and stat name
export function getSlotStat(player, slot, stat) {
    const equip = player.getComponent("equippable");
    if (!equip) return 0;
    const equipment = equip.getEquipment(slot);
    if (!equipment || !armorStatValues[equipment.typeId]) return 0;

    // Try to get stat from lore if present
    if (equipment.getLore && equipment.getLore().length) {
        const lore = equipment.getLore().join('\n');
        // Match stat value from lore line, e.g. "+12 Strength"
        let regex;
        switch (stat) {
            case "def": regex = /([+-]?\d+)\s+Defense/; break;
            case "vit": regex = /([+-]?\d+)\s+Vitality/; break;
            case "str": regex = /([+-]?\d+)\s+Strength/; break;
            case "dex": regex = /([+-]?\d+)\s+Dexterity/; break;
            case "pen": regex = /([+-]?\d+)\s+Penetration/; break;
            case "critRate": regex = /([+-]?\d+)%\s+Critical Chance/; break;
            case "critDMG": regex = /([+-]?\d+)%\s+Critical Damage/; break;
            case "dmgBonus": regex = /([+-]?\d+)%\s+Damage Bonus/; break;
            default: return 0;
        }
        const match = lore.match(regex);
        if (match) return parseInt(match[1], 10);
    }

    // Fallback to armorStatValues
    return armorStatValues[equipment.typeId][stat] || 0;
}

// Helper to get base stat from scoreboard, fallback to 0 if not found
function getBaseScore(player, stat) {
    try {
        return world.scoreboard.getObjective(`${stat}_base`).getScore(player);
    } catch {
        return 0;
    }
}

// Update scoreboard for each armor slot and total stats (armor only)
export function updatePlayerArmorScoreboard(player) {
    let totalDef = 0, totalVit = 0, totalStr = 0, totalDex = 0, totalPen = 0, totalCritRate = 0, totalcritDMG = 0, totaldmgbonus = 0;
    for (const slot of ["Head", "Chest", "Legs", "Feet"]) {
        totalDef      += getSlotStat(player, slot, "def");
        totalVit      += getSlotStat(player, slot, "vit");
        totalStr      += getSlotStat(player, slot, "str");
        totalDex      += getSlotStat(player, slot, "dex");
        totalPen      += getSlotStat(player, slot, "pen");
        totalCritRate += getSlotStat(player, slot, "critRate");
        totalcritDMG  += getSlotStat(player, slot, "critDMG");
        totaldmgbonus += getSlotStat(player, slot, "dmgBonus");
    }
    // Get base stats for all
    const baseDef      = getBaseScore(player, "def");
    const baseVit      = getBaseScore(player, "vit");
    const baseStr      = getBaseScore(player, "str");
    const baseDex      = getBaseScore(player, "dex");
    const basePen      = getBaseScore(player, "pen");
    const baseCritRate = getBaseScore(player, "critRate");
    const basecritDMG  = getBaseScore(player, "critDMG");
    const baseDmgBonus = getBaseScore(player, "dmgbonus");

    // Check if player is holding axell:nichirin in mainhand
    let holdingNichirin = false;
    let mainhandItem;
    try {
        mainhandItem = player.getComponent("minecraft:equippable").getEquipment("Mainhand");
        holdingNichirin = mainhandItem && mainhandItem.typeId === "axell:nichirin";
    } catch {}

    // Get blades score
    let bladesScore = 0;
    try {
        bladesScore = world.scoreboard.getObjective("blades").getScore(player);
    } catch {}

    // If holding nichirin and blades == 2, decrease dmgbonus by 75
    if (holdingNichirin && bladesScore === 2) {
        totaldmgbonus -= 75;
    }
    if (holdingNichirin && bladesScore === 3) {
        totalcritDMG += 35;
        totalStr += 10;
    }
    if (holdingNichirin && bladesScore === 1) {
        totaldmgbonus -= 25;
    }

    let family = "other";
    try {
        const famObj = world.scoreboard.getObjective("family");
        if (famObj) {
            const famScore = famObj.getScore(player);
            if (typeof famScore === "string") {
                family = famScore;
            } else if (typeof famScore === "number") {
                family = Object.keys(familyStats)[famScore] || "other";
            }
        }
    } catch {}
    const famStats = familyStats[family] || {};
    // Apply family stats (can be negative)
    totalDef      += famStats.def      || 0;
    totalVit      += famStats.vit      || 0;
    totalStr      += famStats.str      || 0;
    totalDex      += famStats.dex      || 0;
    totalPen      += famStats.pen      || 0;
    totalCritRate += famStats.critRate || 0;
    totalcritDMG  += famStats.critDMG  || 0;
    totaldmgbonus += famStats.dmgBonus || 0;

    // Set scoreboard, allowing negative values
    player.runCommandAsync(`scoreboard players set @s def ${baseDef + totalDef}`);
    player.runCommandAsync(`scoreboard players set @s vit ${baseVit + totalVit}`);
    player.runCommandAsync(`scoreboard players set @s str ${baseStr + totalStr}`);
    player.runCommandAsync(`scoreboard players set @s dex ${baseDex + totalDex}`);
    player.runCommandAsync(`scoreboard players set @s pen ${basePen + totalPen}`);
    player.runCommandAsync(`scoreboard players set @s critRate ${baseCritRate + totalCritRate}`);
    player.runCommandAsync(`scoreboard players set @s critDMG ${basecritDMG + totalcritDMG}`);
    player.runCommandAsync(`scoreboard players set @s dmgbonus ${baseDmgBonus + totaldmgbonus}`);
}

// Update every tick for all players
system.runInterval(() => {
    for (const player of world.getPlayers()) {
        updatePlayerArmorScoreboard(player);
    }
}, 1);