// --- Utility Functions ---
import { world } from "@minecraft/server";


export function getScore(obj, player) {
    return world.scoreboard.getObjective(obj)?.getScore(player) ?? 0;
}

export function setScore(obj, player, value) {
    world.scoreboard.getObjective(obj)?.setScore(player, value);
}

export function getRequiredSP(level, ab) {
    const unlockCosts = {
        m1lvl: 1, ab1: 1, ab2: 1, ab3: 3, ab4: 2,
        ab5: 5, ab6: 2, ab7: 1, ab8: 2, ab9: 1,
        ab10: 5
    };

    if (level === 0 && ab in unlockCosts) return unlockCosts[ab];

    const upgradeScales = {
        m1lvl: l => 1 + Math.floor(l / 2),
        ab1:   l => 1 + Math.floor(l / 2),
        ab2:   l => 1 + Math.floor(l / 2),
        ab3:   l => 2 + Math.floor(l / 2),
        ab4:   l => 2 + Math.floor(l / 2),          
        ab5:   l => 3 + Math.floor(l / 2),
        ab6:   l => 2 + Math.floor(l / 2),
        ab7:   l => 1 + Math.floor(l / 2),
        ab8:   l => 2 + Math.floor(l / 2),
        ab9:   l => 4 + Math.floor(l * 0.7),        
        ab10:  l => 3 + Math.floor(l * 0.65),       
    };

    if (ab in upgradeScales) return upgradeScales[ab](level);

    return 1 + Math.floor(level / 2);
}


