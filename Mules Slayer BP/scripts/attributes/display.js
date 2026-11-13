import { world, system } from "@minecraft/server";
system.runInterval(() => {
    for (const player of world.getPlayers()) {
        
        if (player.hasTag("rolling")) {
            continue;
        }
        
        if (player.hasTag("customing")) {
            continue;
        }

        const skillaniObj = world.scoreboard.getObjective("ultimate");
        if (!skillaniObj || !skillaniObj.hasParticipant(player) || skillaniObj.getScore(player) !== 0) {
            continue;
        }

        // Ultimate Art display
        let ultimateArtDisplay = "";
        let ultimateArtObj = world.scoreboard.getObjective("ultimateArt");
        if (ultimateArtObj && ultimateArtObj.hasParticipant(player)) {
            let ultimateArtScore = ultimateArtObj.getScore(player);
            if (ultimateArtScore > 0) {
                let blink = Math.floor(system.currentTick / 10) % 2 === 0;
                ultimateArtDisplay = blink ? `§eUltimate Art` : `§fUltimate Art`;
            }
        }

        let cycleDisplay = "";

        const skillModeObj = world.scoreboard.getObjective("skill_mode");
        const skillCycleObj = world.scoreboard.getObjective("skill_cycle");
        const breathingsObj = world.scoreboard.getObjective("breathings");

        if (
            skillModeObj &&
            skillModeObj.hasParticipant(player) &&
            skillModeObj.getScore(player) === 1
        ) {
            // Check if holding nichirin
            const inventory = player.getComponent("minecraft:inventory");
            let selectedSlot = Number(player.selectedSlotIndex);
            let holdingNichirin = false;
            if (
            inventory &&
            Number.isInteger(selectedSlot) &&
            selectedSlot >= 0 &&
            selectedSlot < inventory.container.size
            ) {
            const mainhand = inventory.container.getItem(selectedSlot);
            if (mainhand && mainhand.typeId === "axell:nichirin") {
                holdingNichirin = true;
            }
            }

            if (player.isSneaking && holdingNichirin && !player.hasTag("cycled_skill")) {
            let currentCycle = skillCycleObj && skillCycleObj.hasParticipant(player)
                ? skillCycleObj.getScore(player)
                : 0;

            // Get breathing style
            let breathingStyle = breathingsObj && breathingsObj.hasParticipant(player)
                ? breathingsObj.getScore(player)
                : 0;

            // Define allowed skills per breathing style (shifted so index 0 is unused)
            const allowedSkills = [
                null,                                 // 0: unused (so breathingStyle-1 is valid)
                new Set([1,2,3,4,5,6,7,8,9,10,11]),   // 1: 12345678910, 11 (family 9)
                new Set([1,2,3,4,5,9]),               // 2: 12345, 9 (family 4)
                new Set([1,2,3,4,5,6,7,8,9]),         // 3: 123456789
                new Set([1,4,5]),                     // 4: 145
                new Set([1,2,3,4,5,6]),               // 5: 123456
                new Set([1,2,3,4,5]),             // 6: 123456, 7 (family 11)
                new Set([1,2,3,4]),                   // 7: 1234
                new Set([1,2,3,4,5,6,7,8,9,10,11,12]),                            // 8: not specified
                new Set(),                            // 9: not specified
                new Set(),                            // 10: not specified
                new Set(),                            // 11: not specified
                new Set(),                            // 12: not specified
                new Set(),                            // 13: not specified
            ];

            // Find next available ab{i} > 0, skip ab{i} < 0, and only if allowed for this breathing
            for (let offset = 1; offset <= 13; offset++) {
                let i = ((currentCycle + offset - 1) % 13) + 1; // 1-based, fix: subtract 1 before mod
                if (
                breathingStyle > 0 &&
                allowedSkills[breathingStyle] &&
                allowedSkills[breathingStyle].has(i)
                ) {
                let abObj = world.scoreboard.getObjective(`ab${i}`);
                if (abObj && abObj.hasParticipant(player)) {
                    let abScore = abObj.getScore(player);
                    if (abScore > 0) {
                    player.runCommandAsync(`scoreboard players set @s skill_cycle ${i}`);
                    player.addTag("cycled_skill");
                    break;
                    }
                }
                }
            }
            }
            // Remove the tag as soon as player is not sneaking, so next sneak can cycle again
            if (!player.isSneaking && player.hasTag("cycled_skill")) {
            player.removeTag("cycled_skill");
            }

            // Display logic
            let skillCycle = skillCycleObj && skillCycleObj.hasParticipant(player)
            ? skillCycleObj.getScore(player)
            : 0;
            let breathingStyle = breathingsObj && breathingsObj.hasParticipant(player)
            ? breathingsObj.getScore(player)
            : 0;

            let breathingMap = [
            "water",
            "flame",
            "wind",
            "sound",
            "thunder",
            "mist",
            "insect",
            "sun",
            "beast",
            "love",
            "serpent",
            "stone",
            "moon"
            ];

            if (holdingNichirin) {
            if (breathingStyle === 0 || skillCycle === 0) {
                cycleDisplay = "";
            } else {
                cycleDisplay = `§y§rtext.${breathingMap[breathingStyle-1]}:form${skillCycle}`;
            }
            }
        }

        // Ultimate Art display
        let stun = "";
        let stunObj = world.scoreboard.getObjective("stun");
        if (stunObj && stunObj.hasParticipant(player)) {
            let stunscore = stunObj.getScore(player);
            if (stunscore > 0) {
                    stun = `§c> You are Stunned ${(stunscore/20).toFixed(1)}s <`;
                }
            }

        // BDA CD display
        let bcdDisplay = "";
            for (let i = 1; i <= 13; i++) {
            let bcdObj = world.scoreboard.getObjective(`bcd${i}`);
            if (bcdObj && bcdObj.hasParticipant(player)) {
                let bcdScore = bcdObj.getScore(player);
                if (bcdScore > 1) {
                bcdDisplay += `§4Art ${i}: ${(bcdScore/20).toFixed(1)} `;
                } else if (bcdScore < 0) {
                bcdDisplay += `§bArt ${i}: ${(Math.abs(bcdScore)/20).toFixed(1)} `;
                }
            }
            }
            bcdDisplay = bcdDisplay.trim();
        

        // CD display
        let cdDisplay = "";

            for (let i = 1; i <= 13; i++) {
            let cdObj = world.scoreboard.getObjective(`cd${i}`);
            if (cdObj && cdObj.hasParticipant(player)) {
                let cdScore = cdObj.getScore(player);
                if (cdScore > 1) {
                cdDisplay += `§cform ${i}: ${(cdScore/20).toFixed(1)} `;
                } else if (cdScore < 0) {
                cdDisplay += `§bform ${i}: ${(Math.abs(cdScore)/20).toFixed(1)} `;
                }
            }
            }
            cdDisplay = cdDisplay.trim();
        
        // CD display
        let specialDisplay = "";
            let cdObj = world.scoreboard.getObjective(`specialCD`);
            if (cdObj && cdObj.hasParticipant(player)) {
                let cdScore = cdObj.getScore(player);
                if (cdScore > 1) {
                specialDisplay += `§6Special: ${(cdScore/20).toFixed(1)} `;
                } else if (cdScore < 0) {
                specialDisplay += `§eSpecial: ${(Math.abs(cdScore)/20).toFixed(1)} `;
                }
            }
            specialDisplay = specialDisplay.trim();
        

        if (player) {


            // Build the actionbar as titleraw JSON in {"rawtext":[...]} format
            let rawtext = [];

            if (stun) {
                rawtext.push({ "text": stun + "\n§r" });
            }
            if (bcdDisplay) {
                rawtext.push({ "text": bcdDisplay + "\n§r" });
            }
            if (cdDisplay) {
                rawtext.push({ "text": cdDisplay + "\n§r" });
            }
            if (specialDisplay) {
                rawtext.push({ "text": specialDisplay + "\n§r" });
            }
            if (ultimateArtDisplay) {
                rawtext.push({ "text": ultimateArtDisplay + "\n§r" });
            }
            if (cycleDisplay) {
                // Use translate for cycleDisplay if it starts with "text."
                if (cycleDisplay.startsWith("§y§rtext.")) {
                    rawtext.push({ "translate": cycleDisplay });
                } else {
                    rawtext.push({ "text": cycleDisplay });
                }
            }

            // Remove trailing newlines
            if (rawtext.length > 0 && rawtext[rawtext.length - 1].text && rawtext[rawtext.length - 1].text.endsWith("\n")) {
                rawtext[rawtext.length - 1].text = rawtext[rawtext.length - 1].text.replace(/\n$/, "");
            }

            player.runCommandAsync(`titleraw @s actionbar ${JSON.stringify({ rawtext })}`);

        } else {
            player.onScreenDisplay.setActionBar(`konol`);
        }}});
