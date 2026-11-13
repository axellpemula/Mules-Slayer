import { system, world } from "@minecraft/server";

const styleAbilities = {
  flame:   ['m1lvl', 'ab1', 'ab2', 'ab3', 'ab4', 'ab5', 'ab9'],
  wind:    ['m1lvl', 'ab1', 'ab2', 'ab3', 'ab4', 'ab5', 'ab6', 'ab7', 'ab8', 'ab9'],
  water:   ['m1lvl', 'ab1', 'ab2', 'ab3', 'ab4', 'ab5', 'ab6', 'ab7', 'ab8', 'ab9', 'ab10', 'ab11'],
  thunder: ['m1lvl', 'ab1', 'ab2', 'ab3', 'ab4', 'ab5'],
  sound:   ['m1lvl', 'ab1', 'ab4', 'ab5'],
  mist:    ['m1lvl', 'ab1', 'ab2', 'ab3', 'ab4', 'ab5'],
  insect:  ['m1lvl', 'ab1', 'ab2', 'ab3', 'ab4', 'ab5'],
  sun:     ['m1lvl', 'ab1', 'ab2', 'ab3', 'ab4', 'ab5', 'ab6', 'ab7', 'ab8', 'ab9', 'ab10', 'ab11', 'ab12'],
};

const TOTAL_SP_COST = 200;

export const upgradebonus = 1.01;

export const MAX_LEVEL = 50;

export function getRequiredSP(style, level, ab) {
    const abilities = styleAbilities[style];
    if (!abilities) return 0;

    const abIndex = abilities.indexOf(ab);
    if (abIndex === -1) return 0;

    // Distribute TOTAL_SP_COST evenly across all abilities and levels
    const totalSlots = abilities.length * MAX_LEVEL;
    const baseCost = Math.ceil(TOTAL_SP_COST / totalSlots);

    // Cost for unlocking (level 0) and upgrading (level 1 to MAX_LEVEL)
    const requiredSP = baseCost * (level + 1);

    return requiredSP;
}

// Returns the total SP cost to unlock and upgrade all abilities to max level for a style
export function getTotalSPForStyle(style) {
    const abilities = styleAbilities[style];
    if (!abilities) return 0;

    let total = 0;
    for (const ab of abilities) {
        for (let lvl = 0; lvl < MAX_LEVEL; lvl++) {
            total += getRequiredSP(style, lvl, ab);
        }
    }
    return total;
}


export function getScore(obj, player) {
    if (!obj) return 0;
    return world.scoreboard.getObjective(obj)?.getScore(player) ?? 0;
}

export function setScore(obj, player, value) {
    world.scoreboard.getObjective(obj)?.setScore(player, value);
}

export function formatAttack(str, dex) {
    return (10 + (str * 0.05) + (dex * 0.0125)).toFixed(1);
}

export function calculateDamage(atk, multiplier, dmgBonus, hits = 1, critMultiplier = 1) {
    let calculatedDamage = Math.round(atk * (multiplier / 100));
    let damagebonus = Math.round(calculatedDamage + (calculatedDamage * (dmgBonus / 100)));
    return Math.floor(damagebonus * hits * critMultiplier);
}




// Usage example:
// getRequiredSP('flame', 0, 'ab1')
// getRequiredSP('water', 2, 'ab10')
