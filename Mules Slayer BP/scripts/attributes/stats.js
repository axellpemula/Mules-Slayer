import { world, system } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { families, familyperks, ranks } from "./families";
import { formatAttack } from "./utils.js";
import { showFlameForms } from "./breathings/flame/base";
import { showWaterForms } from "./breathings/water/water";
import { showAkazaForms } from "./bda/akaza/base";
import { showWindForms } from "./breathings/wind/base";
import { showSoundForms } from "./breathings/sound/base";
import { showThunderForms } from "./breathings/thunder/base";
import { showMistForms } from "./breathings/mist/base";
import { showInsectForms } from "./breathings/insect/base";
import { showSunForms } from "./breathings/sun/base";

function getScore(player, objective) {
    const obj = world.scoreboard.getObjective(objective);
    if (!obj) return 0;
    const score = obj.getScore(player);
    return typeof score === "number" ? score : 0;
}

function formatStats(player) {
    // Get family index and name
    let familyIndex = world.scoreboard.getObjective("family")?.getScore(player) ?? 0;
    let family = (typeof families !== "undefined" && families[familyIndex]) ? families[familyIndex] : "Unknown";

    // ranks
    let rankIndex = world.scoreboard.getObjective("rank")?.getScore(player) ?? 0;
    let rank = (typeof ranks !== "undefined" && ranks[rankIndex]) ? ranks[rankIndex] : "Unknown";

    // Race
    let race = player.hasTag("demon") ? "§cDemon" : "§eHuman";

    // Max HP and MP
    let maxHP = Math.round(player.getComponent("health")?.effectiveMax ?? 20);
    let maxMP = getScore(player, "energyMax");

    // Stats
    const str = getScore(player, "str");
    const sp = getScore(player, "sp");
    const dex = getScore(player, "dex");
    const atk = formatAttack(str, dex);
    const dmgbonus = getScore(player, "dmgbonus");
    const critRate = getScore(player, "critRate");
    const critDMG = getScore(player, "critDMG");
    const pen = getScore(player, "pen");
    const def = getScore(player, "def");

    const playerName = player.name ?? "Player";

    const divider = "§8" + "=".repeat(32) + "§r";
    function justify(left, right, width = 33) {
        const leftLen = left.replace(/§./g, "").length;
        const rightLen = right.replace(/§./g, "").length;
        const spaces = Math.max(1, width - leftLen - rightLen);
        return left + " ".repeat(spaces) + right;
    }

    return (
        `§e${playerName}§r ${family}\n` +
        `§bRace:§r ${race} §bRank:§r ${rank}\n` +
        `§bMax HP:§r §c${maxHP} §bMax MP:§r §9${maxMP} §bSP:§r §r${sp} \n` +
        `${divider}\n` +
        justify(`§6STR§r: §c${str}  `, `§6DEX§r: §c${dex}        `) + "\n" +
        justify(`§6ATK§r: §c${atk}  `, `§6DEF§r: §c${def}       `) + "\n" +
        justify(`§6PEN§r: §c${pen}  `, `§6DMG+§r: §c${dmgbonus}％     `) + "\n" +
        justify(`§6Crit Rate§r: §c${critRate}％ `, `§6Crit DMG§r: §c${145+critDMG}％`) + "\n" +
        `${divider}`
    );
}

export const stats = {
    show(player) {
        const form = new ActionFormData()
            .title("§g§rtext.stats:stats")
            .body(formatStats(player))
            .button("text.stats:family", "textures/items/family.png")
            .button("text.stats:breathing", "textures/items/nichirin.png");

        if (player.hasTag("demon")) {
            form.button("text.stats:bda", "textures/items/bda.png");
        }

        form.button("text.stats:convertsp", "textures/items/stats.png");
        // Determine current skill_mode and set button accordingly
        const skillMode = getScore(player, "skill_mode");
        const isCycle = skillMode === 1;
        const skillButtonText = isCycle ? `text.stats:manual` : `text.stats:cycle`;
        form.button(skillButtonText, isCycle ? "textures/ui/manual.png" : "textures/ui/cycle.png");

        form.show(player).then(async response => {
            if (response.selection === 0) {
                // Family Perks
                let familyIndex = world.scoreboard.getObjective("family")?.getScore(player) ?? 0;
                let family = (typeof families !== "undefined" && families[familyIndex]) ? families[familyIndex] : "Unknown";
                let famperk = (typeof familyperks !== "undefined" && familyperks[familyIndex]) ? familyperks[familyIndex] : "Unknown";
                const perkForm = new ActionFormData()
                    .title(`§y§r${family}`)
                    .body(`§bPerks for §e${family}§r:\n\n${famperk}`)
                    .button("Back");
                perkForm.show(player).then(() => {
                    stats.show(player);
                });
            } else if (response.selection === 1) {
                // Show Breathing
                const breathingScore = getScore(player, "breathings");
                if (breathingScore < 1) {
                    const noBreathingForm = new ActionFormData()
                        .title("§y§rNo Breathing")
                        .body("You have no breathing style.")
                        .button("Back");
                    noBreathingForm.show(player).then(() => {
                        stats.show(player);
                    });
                } else {
                    const breathingFunctions = [
                        null, // 0: No breathing
                        showWaterForms,   // 1: Water Breathing
                        showFlameForms,   // 2: Flame Breathing
                        showWindForms,    // 3: Wind Breathing
                        showSoundForms,   // 4: Sound Breathing
                        showThunderForms, // 5: Thunder Breathing
                        showMistForms,    // 6: Mist Breathing
                        showInsectForms,  // 7: Insect Breathing
                        showSunForms    // 8: Sun Breathing
                    ];
                    const breathingFunc = breathingFunctions[breathingScore];
                    if (typeof breathingFunc === "function") {
                        breathingFunc(player);
                    }
                }
            }
            else if (player.hasTag("demon") && response.selection === 2) {
                // Just open showBreathing2
                const bdaScore = getScore(player, "bda");
                if (bdaScore < 1) {
                    const noBda = new ActionFormData()
                        .title("§y§rNo Blood Demon Art")
                        .body("You have no Blood Demon Art.")
                        .button("Back");
                    noBda.show(player).then(() => {
                        stats.show(player);
                    });
                } else {
                    // Dynamically call showBreathing{score}(player)
                    // Map breathing scores to their corresponding functions
                    const bdaFunctions = [
                        null, // 0: No breathing
                        showAkazaForms,  // 2: Flame Breathing
                    ];
                    const breathingFunc = bdaFunctions[bdaScore];
                    if (typeof breathingFunc === "function") {
                        breathingFunc(player);
                    }
                }
            }
            else if ((player.hasTag("demon") && response.selection === 3) ||
                     (!player.hasTag("demon") && response.selection === 2)) {
                // Convert SP using real Minecraft XP levels
                const xpLevel = player.level ?? 0;
                const sp = getScore(player, "sp");
                const maxConvert = Math.floor(xpLevel);
                if (maxConvert < 1) {
                    player.runCommandAsync(`playsound note.bass @s`);
                    player.sendMessage("§cNot enough level!");
                    stats.show(player);
                } else {
                    // Ask how much to convert
                    const convertForm = new ActionFormData()
                        .title("§y§rConvert SP")
                        .body(`You have §e${xpLevel} XP Levels§r.\n\nYou can convert up to \n§a${maxConvert} SP§r and\n§b${maxConvert*1} Max Energy§r\n\nHow many SP do you want to convert?`)
                        .button("Convert 1 SP")
                        .button("Convert Max")
                        .button("Back");
                    convertForm.show(player).then(async res => {
                        if (res.selection === 0) {
                            if (player.level >= 1) {
                                await player.runCommandAsync(`xp -1l @s`);
                                world.scoreboard.getObjective("sp")?.setScore(player, sp + 1);
                                // Grant 1 EnergyMax per upgrade
                                const energyMax = getScore(player, "energyMax");
                                world.scoreboard.getObjective("energyMax")?.setScore(player, energyMax + 1);
                                await player.runCommandAsync(`playsound note.pling @s ~~~ 2 2`);
                                player.sendMessage("§aConverted XP levels into 1 SP and gained 1 Max MP!");
                            } else {
                                await player.runCommandAsync(`playsound note.bass @s`);
                                player.sendMessage("§cNot enough level!");
                            }
                            stats.show(player);
                        } else if (res.selection === 1) {
                            if (player.level >= 1) {
                                await player.runCommandAsync(`xp -${maxConvert * 1}l @s`);
                                world.scoreboard.getObjective("sp")?.setScore(player, sp + maxConvert);
                                // Grant 1 EnergyMax per upgrade
                                const energyMax = getScore(player, "energyMax");
                                world.scoreboard.getObjective("energyMax")?.setScore(player, energyMax + maxConvert);
                                await player.runCommandAsync(`playsound note.pling @s ~~~ 2 2`);
                                player.sendMessage(`§aConverted ${maxConvert * 1} levels into ${maxConvert} SP and gained ${maxConvert} Max MP!`);
                            } else {
                                await player.runCommandAsync(`playsound note.bass @s`);
                                player.sendMessage("§cNot enough level!");
                            }
                            stats.show(player);
                        } else {
                            stats.show(player);
                        }
                    });
                }
            }
            else if ((player.hasTag("demon") && response.selection === 4) ||
                     (!player.hasTag("demon") && response.selection === 3)) {
                // Toggle skill_mode
                const skillModeObj = world.scoreboard.getObjective("skill_mode");
                if (skillModeObj) {
                    const currentMode = skillModeObj.getScore(player);
                    const newMode = currentMode === 1 ? 0 : 1;
                    skillModeObj.setScore(player, newMode);
                    await player.runCommandAsync(`playsound ui.button.click @s ~~~ 1 1`);
                    const modeText = newMode === 1 ? "Cycle" : "Manual";
                    player.sendMessage(`§aSwitched to ${modeText} Skill Mode.`);
                }
                stats.show(player);
            }
        });
    }
};

world.afterEvents.itemUse.subscribe((event) => {
    const {source, itemStack} = event
    switch (itemStack.typeId) {
        case "axell:stats": stats.show(source); break;
    }
});

// Run once for each player when their energyMax increases past a multiple of 3 above 100
// Run once for each player when their energyMax increases past a multiple of 3 above 100
system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const energyMax = getScore(player, "energyMax");
        if (energyMax < 100) {
            // Reset totalcon if energyMax drops below 100
            world.scoreboard.getObjective("totalcon")?.setScore(player, 0);
            continue;
        }
        const extra = Math.floor((energyMax - 100) / 10);
        const totalcon = getScore(player, "totalcon");
        if (totalcon !== extra) {
            world.scoreboard.getObjective("totalcon")?.setScore(player, extra);
        }
    }
}, 20); // Runs every second (20 ticks)
