import { world, system } from "@minecraft/server";

(function ensureObjectives() {
    try {
        // List of all objectives that need to exist
        const objectives = [
            // Core stats
            "energyMax", "energy", "skill_mode", "skill_cycle",
            "cooldown", "cooldown2", "tser", "right", "rightS", "rightD",
            "hold", "holdS", "jump", "ult", "sneak", "dsneak",
            "sneakTemp", "sneakTemp2", "dsneakSet", "ts", "tsed",
            "health", "stun", "stun2", "sp1", "m1", "aspd",
            "spUsed", "blade", "handle", "tsuba", "blades", "dual",
            "ultimateArt", "dashcd", "dashint", "customsword",
            // Cooldowns
            "bcd1", "bcd2", "bcd3", "bcd4", "bcd5", "bcd6", "bcd7",
            "bcd8", "bcd9", "bcd10", "bcd11", "bcd12", "bcd13",
            // Skill levels
            "bm1lvl", "bab1", "bab2", "bab3", "bab4", "bab5", "bab6",
            "bab7", "bab8", "bab9", "bab10", "bab11", "bab12", "bab13",
            // Base stats
            "cd_base", "sp_base", "vit_base", "str_base", "dex_base",
            "int_base", "def_base", "pen_base", "dmgbonus_base",
            "critDMG_base", "critRate_base",
            // Player stats
            "rank", "ultimate", "vit", "sp", "str", "dex", "int",
            "def", "pen", "dmgbonus", "family", "critRate", "critDMG",
            "placeholder", "radius", "radpos", "multiplier", "breathings",
            "bda", "skillani", "aircombo", "cd", "totalcon", "special",
            "combostopper",
            // Cooldowns 2
            "cd1", "cd2", "cd3", "cd4", "cd5", "cd6", "cd7", "cd8",
            "cd9", "cd10", "cd11", "cd12", "cd13",
            // Skill levels 2
            "m1lvl", "ab1", "ab2", "ab3", "ab4", "ab5", "ab6",
            "ab7", "ab8", "ab9", "ab10", "ab11", "ab12", "ab13",
            "specialCD",
            //
            "sword_state"
        ];

        // Get overworld dimension to run commands
        const overworld = world.getDimension("overworld");

        // Ensure all objectives exist
        for (const objective of objectives) {
            try {
                if (!world.scoreboard.getObjective(objective)) {
                    overworld.runCommandAsync(`scoreboard objectives add ${objective} dummy`);
                }
            } catch (e) {
                // Objective might already exist or creation failed - continue anyway
            }
        }

        // Initialize scores for all players
        system.run(() => {
            const players = world.getAllPlayers();
            for (const player of players) {
                for (const objective of objectives) {
                    try {
                        const score = player.scoreboardIdentity?.getScore(world.scoreboard.getObjective(objective));
                        if (score === null || score === undefined) {
                            overworld.runCommandAsync(`scoreboard players add @s ${objective} 0`, player);
                        }
                    } catch (e) {
                        // Continue even if setting score fails
                    }
                }
            }
        });

    } catch (e) {
        // Ignore errors - fallback mechanisms will handle missing objectives
    }
})();
