import { world, system } from "@minecraft/server";

export const familyperks = [
    "§daccess to Hinokami kagura\n§6Immunity to Sun as demon\n§e+10% Crit DMG",
    "§daccess to sun breathing\n§3start with slayer mark\n§6+100% DMG Bonus\n§e+10% Crit Rate",
    "§4debuff as a human\n§dextra buff as a demon",
    "§eaccess to mist breathing 7th form\n§d+20% DMG Bonus",
    "access to flame breathing 9th form\n§d+30% Crit DMG",
    "§d+20 MaxHP\n+5 ATK\n§6+30% DMG Bonus",
    "+10 PEN",
    "§d+30% Crit DMG\n§6Haori Cosmetic",
    "+5 DEX\nFaster attack and move speed",
    "+10% Crit DMG\n+5% Crit Rate\n§dacces to water breathing 11th form",
    "+10% Crit DMG\n§dslight chance to dodge attacks",
    "§6Access to thunder breathing 7th form",
    "§6boar head cosmetic\n§r+5 STR",
    "+5 DEX",
    "+10% Crit DMG"
];

export const familyStats = {
    // Kamado: +10% Crit DMG
    "Kamado":      { vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 10, dmgBonus: 0 },
    // Tsugikuni: +10% Crit Rate, +100% DMG Bonus
    "Tsugikuni":   { vit: 0, str: 0, dex: 0, pen: 0, critRate: 10, critDMG: 0, dmgBonus: 100 },
    // Kibutsuji: No direct stat, debuff/buff handled elsewhere
    "Kibutsuji":   { vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 },
    // Tokito: +20% DMG Bonus
    "Tokito":      { vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 20 },
    // Rengoku: +30% Crit DMG
    "Rengoku":     { vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 30, dmgBonus: 0 },
    // Himejima: +20 MaxHP, +5 ATK, +30% DMG Bonus
    "Himejima":    { vit: 4, str: 5, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 30 },
    // Shinazugawa: 10 pen
    "Shinazugawa": { vit: 0, str: 0, dex: 0, pen: 10, critRate: 0, critDMG: 0, dmgBonus: 0 },
    // Kanroji: +30% Crit DMG
    "Kanroji":     { vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 30, dmgBonus: 0 },
    // Uzui: Faster attack/move speed, not direct stat
    "Uzui":        { vit: 0, str: 0, dex: 5, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 },
    // Tomioka: +10% Crit DMG, +5% Crit Rate
    "Tomioka":     { vit: 0, str: 0, dex: 0, pen: 0, critRate: 5, critDMG: 10, dmgBonus: 0 },
    // Iguro: +10% Crit DMG
    "Iguro":       { vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 10, dmgBonus: 0 },
    // Agatsuma: +15% Crit Rate (thunder breathing 7th form)
    "Agatsuma":    { vit: 0, str: 0, dex: 0, pen: 0, critRate: 15, critDMG: 0, dmgBonus: 0 },
    // Hashibira: Immune to poison, no direct stat
    "Hashibira":   { vit: 0, str: 5, dex: 0, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 },
    // Kocho: Attack inflicts poison, no direct stat
    "Kocho":       { vit: 0, str: 0, dex: 5, pen: 0, critRate: 0, critDMG: 0, dmgBonus: 0 },
    // Tsuyuri: +10% Crit DMG
    "Tsuyuri":     { vit: 0, str: 0, dex: 0, pen: 0, critRate: 0, critDMG: 10, dmgBonus: 0 },
};

export const families = [
    "§6Kamado",
    "§6Tsugikuni",
    "§6Kibutsuji",
    "§dTokito",
    "§dRengoku",
    "§dHimejima",
    "§dShinazugawa",
    "§eKanroji",
    "§eUzui",
    "§dTomioka",
    "§dIguro",
    "§dAgatsuma",
    "§eHashibira",
    "§eKocho",
    "§eTsuyuri"
];

export const ranks = [
    "Unranked",
    "Mizunoto",
    "Mizunoe",
    "Kanoto",
    "Kanoue",
    "Tsuchinoto",
    "Tsuchinoe",
    "Hinoto",
    "Hinoe",
    "Kinoto",
    "Kinoe",
    "Hashira",
]

/**
 * Initiates a family roll for the player, animates the roll in the actionbar,
 * sets the "ultimate" score to 5 during the roll, and assigns the result at the end.
 * @param {Player} player - The player to roll for.
 */
system.afterEvents.scriptEventReceive.subscribe((event) => {
    if (event.id !== "family:start") return;
    const player = event.sourceEntity;
    if (!player || !player.isValid()) return;
    const playerName = player.name;

    startFamilyRoll(player);
    player.runCommandAsync(`tag @s add rolling`);
});

export function startFamilyRoll(player) {
    let rollIndex = Math.floor(Math.random() * families.length);
    let ticks = 0;
    let delay = 2;
    let maxDelay = 16;
    let rolling = true;

    const rollTask = system.runInterval(() => {
        if (!rolling) return;

        // Show current family in actionbar
        player.onScreenDisplay.setActionBar(`§bRolling Family: ${families[rollIndex]}`);
        player.runCommandAsync(`playsound note.hat @s ~~~ 1 0.8 1`);

        // Roll to next family
        rollIndex = (rollIndex + 1) % families.length;
        ticks++;

        // Gradually slow down the roll
        if (ticks % 10 === 0 && delay < maxDelay) {
            delay++;
        }

        // Stop after enough ticks
        if (ticks > 40 + Math.floor(Math.random() * 20)) {
            rolling = false;
            system.clearRun(rollTask);

            // Final family assignment
            // Determine rarity weights based on color codes
            const rarityWeights = families.map(fam => {
                if (fam.startsWith("§6")) return 1; // Legendary (gold)
                if (fam.startsWith("§d")) return 33; // Epic (pink)
                if (fam.startsWith("§e")) return 66; // Rare (yellow)
                return 100; // Default/common (if any)
            });

            // Weighted random selection
            function weightedRandomIndex(weights) {
                const total = weights.reduce((a, b) => a + b, 0);
                let r = Math.random() * total;
                for (let i = 0; i < weights.length; i++) {
                    if (r < weights[i]) return i;
                    r -= weights[i];
                }
                return weights.length - 1;
            }

            const finalIndex = weightedRandomIndex(rarityWeights);
            const familyName = families[finalIndex].replace(/§[0-9a-fk-or]/gi, "");
            player.onScreenDisplay.setActionBar(`§aYou got: ${families[finalIndex]}!`);
            try {
                player.setDynamicProperty("family", familyName);
                player.runCommandAsync(`scoreboard players set @s family ${finalIndex}`);
                player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aYou have joined the ${families[finalIndex]} family!\\n§7${familyperks[finalIndex]}"}]}`);
                player.runCommandAsync(`playsound random.levelup @s ~~~ 1 1 1`);
                player.runCommandAsync(`tag @s remove rolling`);
            } catch {}
        }
    }, delay);
}

world.afterEvents.itemUse.subscribe((event) => {
    const {source, itemStack} = event
    switch (itemStack.typeId) {
        case "axell:heavenly_dna": 
        source.runCommandAsync(`scriptevent family:start`);
        source.runCommandAsync(`replaceitem entity @s slot.weapon.mainhand 0 air `);
         break;
    }
});