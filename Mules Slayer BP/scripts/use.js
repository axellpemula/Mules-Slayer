import { world, system } from "@minecraft/server";

const use = {};
const useState = {}; // Track which "mode" was used at start
const itemEffects = {
    "axell:nichirin": (player) => {
        // Only set the scoreboard based on the initial state
        if (useState[player.id] === "sneak") {
            player.runCommandAsync('scoreboard players set @s[scores={dsneak=0,ultimate=0,skill_mode=0},tag=!stun,tag=!noab] rightS 1');
            player.runCommandAsync('scoreboard players set @s[scores={dsneak=1,ultimate=0,skill_mode=0},tag=!stun,tag=!noab] rightD 1');
            player.runCommandAsync('scoreboard players add @s[scores={dsneak=0,ultimate=0,skill_mode=0},tag=!stun,tag=!noab] holdS 1');
        } else {
            player.runCommandAsync('scoreboard players set @s[scores={dsneak=0,ultimate=0,skill_mode=0},tag=!stun,tag=!noab] right 1');
            player.runCommandAsync('scoreboard players add @s[scores={dsneak=0,ultimate=0,skill_mode=0},tag=!stun,tag=!noab] hold 1');
        }
    },
    "axell:bda": (player) => {
        // Same logic as axell:nichirin
        if (useState[player.id] === "sneak") {
            player.runCommandAsync('scoreboard players set @s[scores={dsneak=0,ultimate=0,skill_mode=0},tag=!stun,tag=!noab] rightS 1');
            player.runCommandAsync('scoreboard players set @s[scores={dsneak=1,ultimate=0,skill_mode=0},tag=!stun,tag=!noab] rightD 1');
            player.runCommandAsync('scoreboard players add @s[scores={dsneak=0,ultimate=0,skill_mode=0}] holdS 1');
        } else {
            player.runCommandAsync('scoreboard players set @s[scores={dsneak=0,ultimate=0,skill_mode=0},tag=!stun,tag=!noab] right 1');
            player.runCommandAsync('scoreboard players add @s[scores={dsneak=0,ultimate=0,skill_mode=0},tag=!stun,tag=!noab] hold 1');
        }
    },
};

// start use (start holding)!
world.afterEvents.itemStartUse.subscribe(({ itemStack, source }) => {
    if (itemEffects[itemStack.typeId]) {
        use[source.id] = itemStack.typeId;
        // Record the state at the start of use
        useState[source.id] = source.isSneaking ? "sneak" : "normal";
    }
});

// stop holding!
world.afterEvents.itemStopUse.subscribe(({ source, itemStack }) => {
    if (itemEffects[itemStack.typeId]) {
        use[source.id] = null;
        useState[source.id] = null;
    }
});

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const itemType = use[player.id];
        if (itemType && itemEffects[itemType]) {
            itemEffects[itemType](player);
        } else {
            // If not holding, reset right and rightS scores if they're 1 or more
            const rightObj = world.scoreboard.getObjective("right");
            if (rightObj && rightObj.hasParticipant(player)) {
                const rightScore = rightObj.getScore(player);
                if (rightScore >= 1) {
                    player.runCommand('scoreboard players set @s[scores={skill_mode=0}] right 0');
                }
            }
            const rightSObj = world.scoreboard.getObjective("rightS");
            if (rightSObj && rightSObj.hasParticipant(player)) {
                const rightSScore = rightSObj.getScore(player);
                if (rightSScore >= 1) {
                    player.runCommand('scoreboard players set @s[scores={skill_mode=0}] rightS 0');
                }
            }
            const rightDObj = world.scoreboard.getObjective("rightD");
            if (rightDObj && rightDObj.hasParticipant(player)) {
                const rightDScore = rightDObj.getScore(player);
                if (rightDScore >= 1) {
                    player.runCommand('scoreboard players set @s[scores={skill_mode=0}] rightD 0');
                }
            }
        }
    }
});

const slayerUsed = {};

world.afterEvents.itemStartUse.subscribe(({ itemStack, source }) => {
    const player = world.getPlayers().find(p => p.id === source.id);
    const skillModeObj = world.scoreboard.getObjective("skill_mode");
    if (
        itemStack.typeId === "axell:nichirin" &&
        skillModeObj &&
        skillModeObj.getScore(player) === 1 &&
        !slayerUsed[player.id]
    ) {
        player.runCommandAsync("function cycle/slayer");
        slayerUsed[player.id] = true;
    }
});

world.afterEvents.itemStopUse.subscribe(({ source, itemStack }) => {
    const player = world.getPlayers().find(p => p.id === source.id);
    if (itemStack.typeId === "axell:nichirin" && player) {
        slayerUsed[player.id] = false;
    }
});