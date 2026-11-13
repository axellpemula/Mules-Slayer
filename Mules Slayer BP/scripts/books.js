import { world } from "@minecraft/server";

world.afterEvents.itemUse.subscribe(async (event) => {
    const { source, itemStack } = event;
    if (!source || source.typeId !== "minecraft:player") return;

    // Check if the item is a breathing book
    const player = source;
    const scoreboard = world.scoreboard;
    const breathingTypes = [
        "§9Water Breathing",
        "§6Flame Breathing",
        "§2Wind Breathing",
        "§cSound Breathing",
        "§eThunder Breathing",
        "§fMist Breathing",
        "§dInsect Breathing",
        "§e§lSun Breathing",
        "§3Beast Breathing",
        "§dLove Breathing",
        "§5Serpent Breathing",
        "§8Stone Breathing",
        "§5§lMoon Breathing"
    ];

    // Helper to get/set scores
    function getScore(obj, objective) {
        try {
            return scoreboard.getObjective(objective)?.getScore(obj) ?? 0;
        } catch {
            return 0;
        }
    }
    function setScore(obj, objective, value) {
        try {
            scoreboard.getObjective(objective)?.setScore(obj, value);
        } catch {
            // If objective doesn't exist, create it
            try {
                scoreboard.addObjective(objective, objective);
                scoreboard.getObjective(objective)?.setScore(obj, value);
            } catch {}
        }
    }

    // Helper to send message
    function warn(msg) {
        player.sendMessage(`§c${msg}`);
    }

    switch (itemStack.typeId) {
        case "breathings:water":
        case "breathings:flame":
        case "breathings:wind":
        case "breathings:sound":
        case "breathings:thunder":
        case "breathings:beast":
        case "breathings:mist":
        case "breathings:love":
        case "breathings:serpent":
        case "breathings:stone":
        case "breathings:insect":
        case "breathings:sun":
        case "breathings:moon": {
            // Map typeId to index in breathingTypes array
            const breathingMap = {
                "breathings:water": 1,
                "breathings:flame": 2,
                "breathings:wind": 3,
                "breathings:sound": 4,
                "breathings:thunder": 5,
                "breathings:mist": 6,
                "breathings:insect": 7,
                "breathings:sun": 8,
                "breathings:beast": 14,
                "breathings:love": 10,
                "breathings:serpent": 9,
                "breathings:stone": 11,
                "breathings:moon": 13
            };
            const breathingIndex = breathingMap[itemStack.typeId];
            const current = getScore(player, "breathings");
            if (current === 0) {
                setScore(player, "breathings", breathingIndex);
                player.sendMessage(`You have learned ${breathingTypes[breathingIndex - 1]}!`);
                player.runCommandAsync(`playsound random.levelup @s ~~~ 1 0.5 1`);
                player.runCommandAsync(`particle minecraft:heart ~~~`);
                player.runCommandAsync(`/replaceitem entity @s slot.weapon.mainhand 0 air `);
            } else {
                warn("§cYou already have a breathing style!");
                player.runCommandAsync(`playsound note.bass @s ~~~ 1 0.5 1`);
            }
            break;
        }
        case "breathings:cancel": {
            const current = getScore(player, "breathings");
            const spUsed = getScore(player, "spUsed");
            if (current !== 0) {
                setScore(player, "breathings", 0);
                setScore(player, "skill_cycle", 0);
                player.sendMessage("§cYour breathing style has been reset.");
                // Give the player back the corresponding breathing book
                const breathingBookMap = {
                    1: "breathings:water",
                    2: "breathings:flame",
                    3: "breathings:wind",
                    4: "breathings:sound",
                    5: "breathings:thunder",
                    6: "breathings:mist",
                    7: "breathings:insect",
                    8: "breathings:sun",
                    9: "breathings:serpent",
                    10: "breathings:stone",
                    11: "breathings:love",
                    12: "breathings:moon",
                    13: "breathings:beast"
                };
                const bookId = breathingBookMap[current];
                if (bookId) {
                    player.runCommandAsync(`/replaceitem entity @s slot.weapon.mainhand 0 ${bookId} 1`);
                }
                player.runCommandAsync("tag @s remove learned_breathing");
                player.runCommandAsync("tag @s remove swordcolor");
                if (spUsed > 1) {
                    player.sendMessage("§6You gained " + Math.floor(spUsed * (80 / 100)) + " SP back.");
                }
                // Optionally, reset other related scores
                setScore(player, "m1lvl", 0);
                setScore(player, "ab1", 0);
                setScore(player, "ab2", 0);
                setScore(player, "ab3", 0);
                setScore(player, "ab4", 0);
                setScore(player, "ab5", 0);
                setScore(player, "ab6", 0);
                setScore(player, "ab7", 0);
                setScore(player, "ab8", 0);
                setScore(player, "ab9", 0);
                setScore(player, "ab10", 0);
                setScore(player, "ab11", 0);
                setScore(player, "ab12", 0);
                setScore(player, "ab13", 0);
                setScore(player, "special", 0);
                player.runCommandAsync(`scoreboard players add @s sp ${Math.floor(spUsed*(80/100))}`);
                player.runCommandAsync(`playsound random.totem @s ~~~`);
                player.runCommandAsync(`particle minecraft:knockback_roar_particle ~~~`);
                player.runCommandAsync(`scoreboard players reset @s spUsed`);

            
            } else {
                warn("§cYou dont have a breathing style!");
            }
            break;
        }
    }
});