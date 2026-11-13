//
import { system, world } from "@minecraft/server";

const bladeColors = {
    "§7Basic": 0,
    "§8Black": 1,
    "§1Blue": 2,
    "§4Red": 3,
    "§2Green": 4,
    "§3Cyan": 5,
    "§5Purple": 6,
    "§6Orange": 7,
    "§8Brown": 8,
    "§7Gray": 9,
    "§9Indigo": 10,
    "§fWhite": 11
};

const tsuba = {
    "§7Basic": 0,
    "§eFlame": 1,
    "§1Wagon": 2,
    "§8None": 3,
    "§5Flashy": 4,
    "§dLove": 5,
    "§bGeometric": 6,
    "§3Hexagon": 7,
    "§dButterfly": 8,
    "§2Tumbling": 9,
};

const bladeType = {
    "§7Basic": 0,
    "§8Jagged": 1,
    "§dStinger": 2,
   "§eCleaver": 3,
};

const handleColors = {
    "§7Basic": 0,
    "§6Yellow": 1,
    "§4Red": 2,
    "§1Blue": 3,
    "§3Aqua": 4,
    "§5Purple": 5,
    "§2Green": 6,
    "§cWhite-Red": 7,
    "§7White-Black": 8,
    "§bWhite-Aqua": 9,
    "§dWhite-Purple": 10,
    "§aWhite-Green": 11,
    "§eWhite-Yellow": 12,
};

const customSwords = {
    "§7Default": 0,
    "§dMistsplitter Reforged": 1,
    "§5Mussou Issin": 2
};

function getLoreLines(equipped) {
    const lore = equipped.getLore() ?? [];
    let customSword, bladeColor, tsubaVal, bladeTypeVal, handleColor;//, handleTypeVal;
    for (const line of lore) {
        if (line.includes("Custom:")) customSword = line;
        else if (line.includes("Blade Color:")) bladeColor = line;
        else if (line.includes("Tsuba:")) tsubaVal = line;
        else if (line.includes("Blade Type:")) bladeTypeVal = line;
        else if (line.includes("Handle Color:")) handleColor = line;
        //else if (line.includes("Handle Type:")) handleTypeVal = line;
    }
    return { customSword, bladeColor, tsubaVal, bladeTypeVal, handleColor};//, handleType: handleTypeVal };
}

function setLore(equipped, { customSword, bladeColor, tsubaVal, bladeTypeVal, handleColor, handleType }) {
    const lore = [];
    // Only add custom sword line if it's not default
    if (customSword && customSword !== `§rCustom: ${Object.keys(customSwords)[0]}`) {
        lore.push(customSword);
    }
    if (bladeColor) lore.push(bladeColor);
    if (tsubaVal) lore.push(tsubaVal);
    if (bladeTypeVal) lore.push(bladeTypeVal);
    if (handleColor) lore.push(handleColor);
    //if (handleType) lore.push(handleType);
    equipped.setLore(lore);
}

system.afterEvents.scriptEventReceive.subscribe(data => {
    const player = data.sourceEntity;
    const id = data.id;
    const equip = player.getComponent('equippable');
    if (!equip) return;
    let equipped;
    try {
        equipped = equip.getEquipment('Mainhand');
    } catch (e) {
        equipped = undefined;
    }
    if (!equipped || equipped.typeId !== "axell:nichirin") return;

    let loreLines = getLoreLines(equipped);

    // Helper to ensure all attributes are present
    function ensureAllLore(loreLines) {
        // Don't add custom sword if it's default
        // Blade Color
        if (!loreLines.bladeColor) {
            const color = Object.keys(bladeColors)[0];
            loreLines.bladeColor = `§rBlade Color: ${color}`;
        }
        // Tsuba
        if (!loreLines.tsubaVal) {
            const tsubaName = Object.keys(tsuba)[0];
            loreLines.tsubaVal = `§rTsuba: ${tsubaName}`;
        }
        // Blade Type
        if (!loreLines.bladeTypeVal) {
            const typeName = Object.keys(bladeType)[0];
            loreLines.bladeTypeVal = `§rBlade Type: ${typeName}`;
        }
        // Handle Color
        if (!loreLines.handleColor) {
            const handleName = Object.keys(handleColors)[0];
            loreLines.handleColor = `§rHandle Color: ${handleName}`;
        }
    }

    // Custom Sword (sword:custom0, sword:custom1, etc.)
    if (id.startsWith("sword:custom")) {
        const idxStr = id.substring("sword:custom".length);
        const idx = parseInt(idxStr);
        const customNames = Object.keys(customSwords);
        const customName = customNames[idx] ?? customNames[0];
        const customScore = customSwords[customName] ?? 0;
        
        if (customScore > 0) {
            // Set custom sword - only show custom sword name in lore
            equipped.setLore([`§rCustom: ${customName}`]);
            player.runCommandAsync(`scoreboard players set @s customsword ${customScore}`);
            // Clear other scores
            player.runCommandAsync(`scoreboard players set @s blade 0`);
            player.runCommandAsync(`scoreboard players set @s handle 0`);
            player.runCommandAsync(`scoreboard players set @s tsuba 0`);
            player.runCommandAsync(`scoreboard players set @s blades 0`);
        } else {
            // Reset to default - show all customization
            loreLines.customSword = `§rCustom: ${customName}`;
            ensureAllLore(loreLines);
            setLore(equipped, loreLines);
            player.runCommandAsync(`scoreboard players set @s customsword 0`);
        }
        equip.setEquipment('Mainhand', equipped);
        return;
    }

    // Blade Color
    if (id.startsWith("blade:color")) {
        const idxStr = id.substring("blade:color".length);
        const idx = parseInt(idxStr);
        const colorNames = Object.keys(bladeColors);
        const color = colorNames[idx] ?? colorNames[0];
        loreLines.bladeColor = `§rBlade Color: ${color}`;
        ensureAllLore(loreLines);
        setLore(equipped, loreLines);
        equip.setEquipment('Mainhand', equipped);
        player.runCommandAsync(`scoreboard players set @s blade ${bladeColors[color] ?? 0}`);
        return;
    }

    // Tsuba (blade:tsuba and tsuba:type)
    if (id.startsWith("tsuba:type") || id.startsWith("blade:tsuba")) {
        const prefix = id.startsWith("blade:tsuba") ? "blade:tsuba" : "tsuba:type";
        const idxStr = id.substring(prefix.length);
        const idx = parseInt(idxStr);
        const tsubaNames = Object.keys(tsuba);
        const tsubaName = tsubaNames[idx] ?? tsubaNames[0];
        loreLines.tsubaVal = `§rTsuba: ${tsubaName}`;
        ensureAllLore(loreLines);
        setLore(equipped, loreLines);
        equip.setEquipment('Mainhand', equipped);
        player.runCommandAsync(`scoreboard players set @s tsuba ${tsuba[tsubaName] ?? 0}`);
        return;
    }

    // Blade Type (blade:type)
    if (id.startsWith("blade:type")) {
        const idxStr = id.substring("blade:type".length);
        const idx = parseInt(idxStr);
        const typeNames = Object.keys(bladeType);
        const typeName = typeNames[idx] ?? typeNames[0];
        loreLines.bladeTypeVal = `§rBlade Type: ${typeName}`;
        ensureAllLore(loreLines);
        setLore(equipped, loreLines);
        equip.setEquipment('Mainhand', equipped);
        player.runCommandAsync(`scoreboard players set @s blades ${bladeType[typeName] ?? 0}`);
        return;
    }

    // Handle Color (blade:handle and handle:color)
    if (id.startsWith("handle:color")) {
        const prefix = "handle:color";
        const idxStr = id.substring(prefix.length);
        const idx = parseInt(idxStr);
        const handleNames = Object.keys(handleColors);
        const handleName = handleNames[idx] ?? handleNames[0];
        loreLines.handleColor = `§rHandle Color: ${handleName}`;
        ensureAllLore(loreLines);
        setLore(equipped, loreLines);
        equip.setEquipment('Mainhand', equipped);
        player.runCommandAsync(`scoreboard players set @s handle ${handleColors[handleName] ?? 0}`);
        return;
    }
});



system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const inventory = player.getComponent("inventory");
        if (!inventory) continue;
        for (let i = 0; i < inventory.container.size; i++) {
            const item = inventory.container.getItem(i);
            if (
                item &&
                item.typeId === "axell:nichirin" &&
                (!item.getLore() || item.getLore().length === 0)
            ) {
                const baseLore = [
                    `§rBlade Color: ${Object.keys(bladeColors)[0]}`,
                    `§rTsuba: ${Object.keys(tsuba)[0]}`,
                    `§rBlade Type: ${Object.keys(bladeType)[0]}`,
                    `§rHandle Color: ${Object.keys(handleColors)[0]}`//,
                    //`§rHandle Type: ${Object.keys(handleType)[0]}`
                ];
                item.setLore(baseLore);
                inventory.container.setItem(i, item);
            }
        }
    }
}, 1);

// Scoreboard updater for all attributes
system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const equip = player.getComponent('equippable');
        let equipped;
        try {
            equipped = equip.getEquipment('Mainhand');
        } catch (e) {
            equipped = undefined;
        }
        if (
            equipped &&
            equipped.typeId === "axell:nichirin" &&
            equipped.getLore() &&
            equipped.getLore().length > 0
        ) {
            const lore = equipped.getLore();
            // Check if custom sword line exists
            const hasCustom = lore.some(line => line.includes("Custom:"));
            if (!hasCustom) {
                player.runCommandAsync(`scoreboard players set @s customsword 0`);
            }
            for (const line of lore) {
                if (line.includes("Custom:")) {
                    const customName = line.split(":")[1]?.trim();
                    player.runCommandAsync(`scoreboard players set @s customsword ${customSwords[customName] ?? 0}`);
                }
                if (line.includes("Blade Color:")) {
                    const color = line.split(":")[1]?.trim();
                    player.runCommandAsync(`scoreboard players set @s blade ${bladeColors[color] ?? 0}`);
                }
                if (line.includes("Tsuba:")) {
                    const tsubaName = line.split(":")[1]?.trim();
                    player.runCommandAsync(`scoreboard players set @s tsuba ${tsuba[tsubaName] ?? 0}`);
                }
                if (line.includes("Blade Type:")) {
                    const typeName = line.split(":")[1]?.trim();
                    player.runCommandAsync(`scoreboard players set @s blades ${bladeType[typeName] ?? 0}`);
                }
                if (line.includes("Handle Color:")) {
                    const handleName = line.split(":")[1]?.trim();
                    player.runCommandAsync(`scoreboard players set @s handle ${handleColors[handleName] ?? 0}`);
                }
            }
        }
    }
}, 1);


system.runInterval(() => {
    for (const player of world.getPlayers()) {
        try {
            const customswordScore = world.scoreboard.getObjective("customsword")?.getScore(player) ?? 0;
            
            // If custom sword is active, run custom sword event based on score
            if (customswordScore > 0) {
                const eventMap = {
                    1: "swordskin:mist",
                    2: "swordskin:mussou",
                };
                const event = eventMap[customswordScore] ?? "swordskin:default";
                player.runCommandAsync(`event entity @s ${event}`);
            } else {
                // Run default sword appearance events
                player.runCommandAsync(`event entity @s swordskin:default`);
                
                // Blade Color
                const bladeScore = world.scoreboard.getObjective("blade")?.getScore(player);
                let blade = (bladeScore ?? 0) + 1;
                if (blade < 1) blade = 1;
                player.runCommandAsync(`event entity @s axell:blade${blade}`);

                // Handle Color
                const handleScore = world.scoreboard.getObjective("handle")?.getScore(player);
                let handle = (handleScore ?? 0) + 1;
                if (handle < 1) handle = 1;
                player.runCommandAsync(`event entity @s axell:handle${handle}`);

                // Tsuba
                const tsubaScore = world.scoreboard.getObjective("tsuba")?.getScore(player);
                let tsubaVal = (tsubaScore ?? 0) + 1;
                if (tsubaVal < 1) tsubaVal = 1;
                player.runCommandAsync(`event entity @s axell:tsuba${tsubaVal}`);

                // Blade Type
                const bladesScore = world.scoreboard.getObjective("blades")?.getScore(player);
                let blades = (bladesScore ?? 0) + 1;
                if (blades < 1) blades = 1;
                player.runCommandAsync(`event entity @s axell:blades${blades}`);
            }
        } catch (e) {
            // Ignore errors if not found
        }
    }
}, 1);

//color
system.runInterval(() => {
    for (const player of world.getPlayers()) {
        // Only if player has learned_breathing and not swordcolor
        if (!player.hasTag("learned_breathing") || player.hasTag("swordcolor")) continue;

        const equip = player.getComponent('equippable');
        if (!equip) continue;
        let equipped;
        try {
            equipped = equip.getEquipment('Mainhand');
        } catch (e) {
            equipped = undefined;
        }
        if (!equipped || equipped.typeId !== "axell:nichirin") continue;

        // Get blade color from lore
        const lore = equipped.getLore() ?? [];
        
        // Skip if custom sword is active
        if (lore.some(line => line.includes("Custom:") && line !== `§rCustom: ${Object.keys(customSwords)[0]}`)) continue;
        
        let bladeColorLine = lore.find(line => line.includes("Blade Color:"));
        let bladeColor = bladeColorLine ? bladeColorLine.split(":")[1]?.trim() : null;

        // Only if blade color is 0 or Basic
        if (bladeColor && (bladeColor === Object.keys(bladeColors)[0] || bladeColors[bladeColor] === 0)) {
            // Special: if player has family score 0 or 1, always black
            let familyScore = world.scoreboard.getObjective("family")?.getScore(player);
            let newColorIdx;

            // Pity system: if player doesn't get preferred color the first time, guarantee preferred next time
            let pity = player.getDynamicProperty("bladeColorPity") ?? false;

            if (familyScore === 0 || familyScore === 1) {
                newColorIdx = Object.keys(bladeColors).indexOf("§8Black");
                player.setDynamicProperty("bladeColorPity", false); // reset pity
            } else {
                // Get breathing style (scoreboard "breath")
                let breathScore = world.scoreboard.getObjective("breath")?.getScore(player) ?? 0;

                // Define preferred color indices for each breathing style
                // 1 water - blueish, 2 flame - red-orange, 3 wind - greenish, 4 sound - orangeish,
                // 5 thunder - yellow/orange, 6 mist - white/cyan, 7 insect - purpleish
                const colorPref = {
                    1: [2, 5], // blue, cyan, red, white
                    2: [3, 7, 1],  // red, orange, blue, black
                    3: [4, 5], // green, purple, white, gray
                    4: [7, 1, 3],  // orange, black, red, blue
                    5: [7, 12], // black, orange, yellow, red
                    6: [11, 5, 9], // white, cyan, gray, blue
                    7: [6, 5, 11], // purple, cyan, gray, white
                };

                const colorNames = Object.keys(bladeColors);
                let preferred = colorPref[breathScore] ?? [];

                if (pity && preferred.length > 0) {
                    // Guarantee preferred color
                    newColorIdx = preferred[Math.floor(Math.random() * preferred.length)];
                    player.setDynamicProperty("bladeColorPity", false); // reset pity
                } else {
                    // Weighted random: 75% preferred, 25% any
                    let roll = Math.random();
                    if (preferred.length > 0 && roll < 0.75) {
                        newColorIdx = preferred[Math.floor(Math.random() * preferred.length)];
                        player.setDynamicProperty("bladeColorPity", false); // reset pity
                    } else {
                        newColorIdx = Math.floor(Math.random() * (colorNames.length - 1)) + 1;
                        // If not preferred, set pity for next time
                        if (!preferred.includes(newColorIdx)) {
                            player.setDynamicProperty("bladeColorPity", true);
                        } else {
                            player.setDynamicProperty("bladeColorPity", false);
                        }
                    }
                }
            }
            const colorName = Object.keys(bladeColors)[newColorIdx];
            // Update lore
            const newLore = lore.map(line =>
                line.includes("Blade Color:") ? `§rBlade Color: ${colorName}` : line
            );
            equipped.setLore(newLore);
            equip.setEquipment('Mainhand', equipped);
            player.runCommandAsync(`scoreboard players set @s blade ${bladeColors[colorName]}`);
            player.runCommandAsync(`playsound random.levelup @s ~~~ 1 5 1`);
            player.runCommandAsync(`particle akaza:impact3 ~~~`);
            player.runCommandAsync(`particle akaza:impact3 ~~0.5~`);
            player.addTag("swordcolor");
            // Save color for future
            player.setDynamicProperty("savedSwordColor", newColorIdx);
        }
    }
}, 2);


system.runInterval(() => {
    for (const player of world.getPlayers()) {
        if (!player.hasTag("learned_breathing")) continue;
        if (!player.hasTag("swordcolor")) continue;

        const equip = player.getComponent('equippable');
        if (!equip) continue;
        let equipped;
        try {
            equipped = equip.getEquipment('Mainhand');
        } catch (e) {
            equipped = undefined;
        }
        if (!equipped || equipped.typeId !== "axell:nichirin") continue;

        // Get blade color from lore
        const lore = equipped.getLore() ?? [];
        
        // Skip if custom sword is active
        if (lore.some(line => line.includes("Custom:") && line !== `§rCustom: ${Object.keys(customSwords)[0]}`)) continue;
        
        let bladeColorLine = lore.find(line => line.includes("Blade Color:"));
        let bladeColor = bladeColorLine ? bladeColorLine.split(":")[1]?.trim() : null;

        // Only if blade color is 0 or Basic
        if (!(bladeColor && (bladeColor === Object.keys(bladeColors)[0] || bladeColors[bladeColor] === 0))) continue;

        // Look down and double sneak detection
        if (player.getRotation().x > 60) { // looking down
            // Use dynamic property to track sneak state
            let sneakTicks = player.getDynamicProperty("sneakTicks") ?? 0;
            if (player.isSneaking) {
                sneakTicks++;
            } else if (sneakTicks > 0) {
                sneakTicks = 0;
            }
            player.setDynamicProperty("sneakTicks", sneakTicks);

            // Double sneak within short time
            let lastSneakTime = player.getDynamicProperty("lastSneakTime") ?? 0;
            let now = Date.now();
            if (player.isSneaking && sneakTicks === 1) {
                player.setDynamicProperty("lastSneakTime", now);
            }
            if (player.isSneaking && sneakTicks === 2 && now - lastSneakTime < 500) {
                // Restore saved color
                let savedIdx = player.getDynamicProperty("savedSwordColor");
                if (typeof savedIdx === "number" && savedIdx > 0) {
                    const colorName = Object.keys(bladeColors)[savedIdx];
                    const newLore = lore.map(line =>
                        line.includes("Blade Color:") ? `§rBlade Color: ${colorName}` : line
                    );
                    equipped.setLore(newLore);
                    equip.setEquipment('Mainhand', equipped);
                    player.runCommandAsync(`scoreboard players set @s blade ${bladeColors[colorName]}`);
                    player.runCommandAsync(`playsound random.levelup @s ~~~ 1 5 1`);
                    player.runCommandAsync(`particle akaza:impact3 ~~~`);
                    player.runCommandAsync(`particle akaza:impact3 ~~0.5~`);
                }
                player.setDynamicProperty("sneakTicks", 0);
                player.setDynamicProperty("lastSneakTime", 0);
            }
        } else {
            player.setDynamicProperty("sneakTicks", 0);
            player.setDynamicProperty("lastSneakTime", 0);
        }
    }
}, 2);