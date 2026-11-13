// --- UI Functions ---
import { ActionFormData } from "@minecraft/server-ui";
import { system } from "@minecraft/server";
import { stats } from "../../stats.js";
import { getScore, setScore, getRequiredSP, MAX_LEVEL, upgradebonus, calculateDamage } from "../../utils.js";
import { m1, form1, form2, form3, form4, form5, form9 } from "./flameMultipliers.js";

const flameForms = [
    { name: "text.axell:m1", desc: "Punch (5x)", ab: "m1lvl" },
    { name: "text.flame:form1", desc: "Right-Click (Half)", ab: "ab1" },
    { name: "text.flame:form2", desc: "Right-Click (tap)", ab: "ab2" },
    { name: "text.flame:form3", desc: "Sneak + Punch\nOn air + Punch", ab: "ab3" },
    { name: "text.flame:form4", desc: "Sneak + Right-Click (Tap)", ab: "ab4" },
    { name: "text.flame:form5", desc: "Sneak + Right-Click (Half)", ab: "ab5" },
    { name: "text.flame:form9", desc: "Double-sneak + Punch", ab: "ab9", rengokuOnly: true }
];

// Main flame breathing form
export function showFlameForms(player) {
    const familyIndex = getScore("family", player);
    const isRengoku = familyIndex === 4;
    const form = new ActionFormData()
        .title("§y§rtext.breathings:flame")
        .body("text.axell:selectform");

    // Add buttons for each form
    flameForms.forEach((formData) => {
        if (formData.rengokuOnly && !isRengoku) return;
        const abScore = getScore(formData.ab, player);
        const locked = abScore === 0;
        const color = locked ? "" : "b";
        const label = `${formData.name}${color}`;
        form.button(label);
    });

    form.button("text.axell:back");

    form.show(player).then(response => {
        if (response.canceled) return;
        const btnIdx = response.selection;
        if (btnIdx === flameForms.filter(f => !f.rengokuOnly || isRengoku).length) {
            stats.show(player);
            return;
        }
        const formData = flameForms.filter(f => !f.rengokuOnly || isRengoku)[btnIdx];
        showFlameFormDetail(player, formData);
    });
}

export function showFlameFormDetail(player, formData, style="flame") {
    

    // --- Player Stats ---
    const abScore = getScore(formData.ab, player);
    const m1lvl = getScore("m1lvl", player);
    const sp = getScore("sp", player);
    const requiredSP = abScore >= MAX_LEVEL ? null : getRequiredSP(style, abScore, formData.ab);
    const locked = abScore === 0;
    const canUpgrade = sp >= requiredSP && abScore < MAX_LEVEL;
    const upgradeLabel = locked ? "Unlock" : (abScore >= MAX_LEVEL ? "Max Level" : "Upgrade");
    const upgradeColor = abScore >= MAX_LEVEL ? "§7" : (canUpgrade ? "§a" : "§c");
    const upgradeDesc = abScore >= MAX_LEVEL
        ? "§eMax Level reached."
        : (canUpgrade
            ? `Cost §e${requiredSP} SP§r to ${upgradeLabel.toLowerCase()} this technique.`
            : `§cNot enough SP to ${upgradeLabel.toLowerCase()}.`);

    // Base stats
    const str = getScore("str", player);
    const dex = getScore("dex", player);
    const dmgBonus = getScore("dmgbonus", player); // % bonus to final damage
    const critRate = getScore("critRate", player);
    const critDMG = getScore("critDMG", player);
    const critMultiplier = 1.45 + (critDMG / 100);
    const atk = 5 + (str * 0.1) + (dex * 0.0375);   // corrected atk formula

    // --- Helper Functions ---
    // Base move % that scales by level (no dex applied yet)
    function calcBasePercent(base, lvl) {
        return Math.round(base * Math.pow(upgradebonus, Math.max(0, lvl - 1)));
    }

    // Apply dex as a multiplier on the move percent (each +1 DEX adds +7.5% to the move)
    function applyDexToPercent(percent, dex) {
        return percent + (0.075 * dex);
    }

    // Total damage for N hits; matches damage.js calculation
    function totalDamage(atk, perHitPercentAfterDex, hits, dmgBonus) {
        let multiplier = perHitPercentAfterDex; // already includes dex
        return calculateDamage(atk, multiplier, dmgBonus, hits);
    }

    // Single-hit damage (just a convenience wrapper)
    function singleHitDamage(atk, percentAfterDex, dmgBonus) {
        let multiplier = percentAfterDex;
        return calculateDamage(atk, multiplier, dmgBonus);
    }

    // For UI text: round a percent to 1 decimal but strip trailing .0
    function fmtPct(x) {
        const y = Math.round(x * 10) / 10;
        return (Math.abs(y - Math.round(y)) < 1e-9) ? String(Math.round(y)) : String(y);
    }

    // --- Info Calculation ---
    let extraInfo = "";
    let percent, nextPercent, damage, nextDamage, currentScore = abScore;

    // M1 (Normal attacks; sequences/arrays possible). We compute totals without per-hit flooring.
    if (formData.ab === "m1lvl") {
        const lvl = m1lvl;

        function compress(arr) {
            let result = [];
            let count = 1;
            for (let i = 1; i <= arr.length; i++) {
                if (arr[i] === arr[i - 1]) count++;
                else {
                    result.push(count > 1 ? `${arr[i - 1]}％x${count}` : `${arr[i - 1]}`);
                    count = 1;
                }
            }
            return result.join("+");
        }

        extraInfo = m1.map((val, idx) => {
            if (Array.isArray(val)) {
                // current & next percents (before dex), then apply dex for damage calc
                const percents = val.map(v => calcBasePercent(v, lvl));
                const nextPercents = val.map(v => calcBasePercent(v, Math.min(lvl + 1, MAX_LEVEL)));

                // After-dex percents (used for damage only)
                const percentsAfterDex = percents.map(p => applyDexToPercent(p, dex));
                const nextPercentsAfterDex = nextPercents.map(p => applyDexToPercent(p, dex));

                // Sum damage with floor at end (per sequence piece is 1 hit each here)
                const totalDmg = totalDamage(atk,
                    percentsAfterDex.reduce((a, b) => a + b, 0), // sum of percents == sum of 1-hit segments
                    1, // already summed in percent
                    dmgBonus
                );

                const totalNextDmg = totalDamage(atk,
                    nextPercentsAfterDex.reduce((a, b) => a + b, 0),
                    1,
                    dmgBonus
                );

                const percStr = compress(percents);
                const nextPercStr = compress(nextPercents);

                if (lvl >= MAX_LEVEL) {
                    return `§7M1${String.fromCharCode(97 + idx)}: §e${percStr} §7(§c${totalDmg} §6${calculateDamage(atk, percentsAfterDex.reduce((a, b) => a + b, 0), dmgBonus, 1, critMultiplier)}§7) §e`;
                }
                return `§7M1${String.fromCharCode(97 + idx)}: §e${percStr} §7(§c${totalDmg} §6${calculateDamage(atk, percentsAfterDex.reduce((a, b) => a + b, 0), dmgBonus, 1, critMultiplier)}§7)->§e${nextPercStr}％ §7(§c${totalNextDmg} §6${calculateDamage(atk, nextPercentsAfterDex.reduce((a, b) => a + b, 0), dmgBonus, 1, critMultiplier)}§7)`;
            } else {
                const perc = calcBasePercent(val, lvl);
                const nextPerc = calcBasePercent(val, Math.min(lvl + 1, MAX_LEVEL));
                const dmg = singleHitDamage(atk, applyDexToPercent(perc, dex), dmgBonus);
                const nextDmg = singleHitDamage(atk, applyDexToPercent(nextPerc, dex), dmgBonus);
                if (lvl >= MAX_LEVEL) {
                    return `§7M1${String.fromCharCode(97 + idx)}: §e${perc} §7(§c${dmg} §6${calculateDamage(atk, applyDexToPercent(perc, dex), dmgBonus, 1, critMultiplier)}§7) §e`;
                }
                return `§7M1${String.fromCharCode(97 + idx)}: §e${perc} §7(§c${dmg} §6${calculateDamage(atk, applyDexToPercent(perc, dex), dmgBonus, 1, critMultiplier)}§7)->§e${nextPerc}％ §7(§c${nextDmg} §6${calculateDamage(atk, applyDexToPercent(nextPerc, dex), dmgBonus, 1, critMultiplier)}§7)`;
            }
        }).join("\n");

        // For summary fields
        percent = calcBasePercent(m1[m1.length - 1], abScore);
        nextPercent = abScore >= MAX_LEVEL ? null : calcBasePercent(m1[m1.length - 1], Math.min(abScore + 1, MAX_LEVEL));
        damage = singleHitDamage(atk, applyDexToPercent(percent, dex), dmgBonus);
        nextDamage = abScore >= MAX_LEVEL ? null : singleHitDamage(atk, applyDexToPercent(nextPercent, dex), dmgBonus);
        currentScore = m1lvl;
    }

    // Multi-hit forms (ab2, ab3, ab5)
    else if (formData.ab === "ab2" || formData.ab === "ab3" || formData.ab === "ab4") {
        const hitMap = { ab2: 3, ab3: 3, ab4: 5 };
        const baseMap = { ab2: form2, ab3: form3, ab4: form4 };

        const hits = hitMap[formData.ab];
        const base = baseMap[formData.ab];

        const basePercent = calcBasePercent(base, abScore);                       // before dex
        const nextBasePercent = calcBasePercent(base, Math.min(abScore + 1, MAX_LEVEL));

        const perHitAfterDex = applyDexToPercent(basePercent, dex);              // dex applied
        const nextPerHitAfterDex = applyDexToPercent(nextBasePercent, dex);

        const totalDmg = totalDamage(atk, perHitAfterDex, hits, dmgBonus);       // floor once
        const totalNextDmg = totalDamage(atk, nextPerHitAfterDex, hits, dmgBonus);

        if (abScore === 0) {
            extraInfo = `§7Total: §e${fmtPct(nextPerHitAfterDex)}％ x${hits} §7(§c${totalNextDmg} §6${calculateDamage(atk, nextPerHitAfterDex, dmgBonus, hits, critMultiplier)}§7)`;
        } else if (abScore >= MAX_LEVEL) {
            extraInfo = `§7Total: §e${fmtPct(perHitAfterDex)}％ x${hits} §7(§c${totalDmg} §6${calculateDamage(atk, perHitAfterDex, dmgBonus, hits, critMultiplier)}§7) §e`;
        } else {
            extraInfo = `§7Total: §e${fmtPct(perHitAfterDex)}％ x${hits} §7(§c${totalDmg} §6${calculateDamage(atk, perHitAfterDex, dmgBonus, hits, critMultiplier)}§7)\nNext: §e${fmtPct(nextPerHitAfterDex)}％ x${hits} §7(§c${totalNextDmg} §6${calculateDamage(atk, nextPerHitAfterDex, dmgBonus, hits, critMultiplier)}§7)`;
        }

        // For the summary numbers (sum of percents * hits)
        percent = perHitAfterDex * hits;
        nextPercent = abScore >= MAX_LEVEL ? null : nextPerHitAfterDex * hits;
        damage = totalDmg;
        nextDamage = abScore >= MAX_LEVEL ? null : totalNextDmg;
        currentScore = abScore;
    }
    else if (formData.ab === "ab9") {
        // ab9 has two stages: idx 0 (initial hit), idx 1 (Ultimate)
        let lvl = getScore("ab9", player);
        const atMax = lvl >= MAX_LEVEL;
        let percA = Math.round(form9[0] * Math.pow(1.1, lvl - 1));
        let percB = Math.round(form9[1] * Math.pow(1.1, lvl - 1));
        let nextPercA = atMax ? percA : Math.round(form9[0] * Math.pow(1.1, lvl));
        let nextPercB = atMax ? percB : Math.round(form9[1] * Math.pow(1.1, lvl));
        let multA = percA + (dex * 0.05);
        let multB = percB + (dex * 0.05);
        let nextMultA = nextPercA + (dex * 0.05);
        let nextMultB = nextPercB + (dex * 0.05);
        let dmgA = calculateDamage(atk, multA, dmgBonus);
        let dmgB = calculateDamage(atk, multB, dmgBonus);
        let nextDmgA = calculateDamage(atk, nextMultA, dmgBonus);
        let nextDmgB = calculateDamage(atk, nextMultB, dmgBonus);
        if (lvl === 0) {
            extraInfo =
                `§7Initial Hit: §e${nextPercA}％ §7(§c${nextDmgA} §6${calculateDamage(atk, nextMultA, dmgBonus, 1, critMultiplier)}§7)\n` +
                `§7Ultimate: §e${nextPercB}％ §7(§c${nextDmgB} §6${calculateDamage(atk, nextMultB, dmgBonus, 1, critMultiplier)}§7)`;
        } else if (atMax) {
            extraInfo =
                `§7Initial Hit: §e${percA}％ §7(§c${dmgA} §6${calculateDamage(atk, multA, dmgBonus, 1, critMultiplier)}§7)\n` +
                `§7Ultimate: §e${percB}％ §7(§c${dmgB} §6${calculateDamage(atk, multB, dmgBonus, 1, critMultiplier)}§7)`;
        } else {
            extraInfo =
                `§7Initial Hit: §e${percA}％ §7(§c${dmgA} §6${calculateDamage(atk, multA, dmgBonus, 1, critMultiplier)}§7) -> §e${nextPercA}％ §7(§c${nextDmgA} §6${calculateDamage(atk, nextMultA, dmgBonus, 1, critMultiplier)}§7)\n` +
                `§7Ultimate: §e${percB}％ §7(§c${dmgB} §6${calculateDamage(atk, multB, dmgBonus, 1, critMultiplier)}§7) -> §e${nextPercB}％ §7(§c${nextDmgB} §6${calculateDamage(atk, nextMultB, dmgBonus, 1, critMultiplier)}§7)`;
        }
        percent = percA;
        nextPercent = nextPercA;
        damage = dmgA;
        nextDamage = nextDmgA;
        currentScore = lvl;
    } 
    // All other forms: single hit
    else {
        const formMult = {
            m1lvl: m1[m1.length - 1],
            ab1: form1,
            ab2: form2,
            ab3: form3,
            ab4: form4,
            ab5: form5,
            ab9: form9
        }[formData.ab] || 100;

        const basePercent = calcBasePercent(formMult, abScore);
        const nextBasePercent = abScore >= MAX_LEVEL ? null : calcBasePercent(formMult, Math.min(abScore + 1, MAX_LEVEL));

        const afterDex = applyDexToPercent(basePercent, dex);
        const nextAfterDex = abScore >= MAX_LEVEL ? null : applyDexToPercent(nextBasePercent, dex);

        damage = singleHitDamage(atk, afterDex, dmgBonus);
        nextDamage = abScore >= MAX_LEVEL ? null : singleHitDamage(atk, nextAfterDex, dmgBonus);

        percent = afterDex;
        nextPercent = nextAfterDex;
        currentScore = abScore;

        if (abScore === 0) {
            extraInfo = `§7Damage: §e${fmtPct(nextAfterDex)}％ §7(§c${nextDamage}§7)`;
        } else if (abScore >= MAX_LEVEL) {
            extraInfo = `§7Current: §e${fmtPct(afterDex)}％ §7(§c${damage}§7) §e`;
        } else {
            extraInfo = `§7Current: §e${fmtPct(afterDex)}％ §7(§c${damage}§7) -> Next: §e${fmtPct(nextAfterDex)}％ §7(§c${nextDamage}§7)`;
        }
    }


    // --- Form UI ---
    const form = new ActionFormData()
        .title('§y§r' + formData.name)
        .body(
            `§b${formData.desc}\n` +
            `§7Level: §e${currentScore === 0 ? "Locked" : currentScore}${abScore >= MAX_LEVEL ? " §e(Max)" : ""}  ` +
            `§7SP: §e${sp}\n` +
            (extraInfo ? extraInfo + "\n" : "") +
            (formData.ab !== "m1lvl" ? `${upgradeDesc}\n` : upgradeDesc)
        )
        .button(`${upgradeColor}${upgradeLabel}`)
        .button("text.axell:back");

    form.show(player).then(response => {
        if (response.canceled) return;
        if (response.selection === 1) {
            showFlameForms(player);
        } else if (response.selection === 0 && canUpgrade) {
            setScore(formData.ab, player, abScore + 1);
            setScore("sp", player, sp - requiredSP);
            const formName = formData.name || "Form";
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§a${abScore === 0 ? "Unlocked" : "Upgraded"}: "},{"translate":"§y§r${formName}"},{"text":"!"}]}`);
            system.runTimeout(() => showFlameFormDetail(player, formData), 2);
            player.runCommandAsync(`playsound note.pling @s ~~~ 2 2`);            
            player.runCommandAsync(`scoreboard players add @s spUsed ${requiredSP}`);
        } else {
            system.runTimeout(() => showFlameFormDetail(player, formData), 2);
        }
    });
}