// --- UI Functions ---
import { ActionFormData } from "@minecraft/server-ui";
import { system } from "@minecraft/server";
import { stats } from "../../stats.js";
import { getScore, setScore, getRequiredSP, MAX_LEVEL, upgradebonus } from "../../utils.js";
import { m1, form1, form2, form3, form4, form5, form6, form7, form8, form9, form10, form11, form12 } from "./sunMultipliers.js";

export const sunForms = [
    { name: "text.axell:m1", desc: "Punch (5x)", ab: "m1lvl" },
    { name: "text.sun:form1", desc: "Right-Click (Half)", ab: "ab1" },
    { name: "text.sun:form2", desc: "Jump + Punch", ab: "ab2" },
    { name: "text.sun:form3", desc: "Right-Click (Tap)", ab: "ab3" },
    { name: "text.sun:form4", desc: "Right-Click + On Air", ab: "ab4" },
    { name: "text.sun:form5", desc: "Double Sneak + Punch", ab: "ab5" },
    { name: "text.sun:form6", desc: "Sneak + Right-Click (Tap)", ab: "ab6" },
    { name: "text.sun:form7", desc: "Sneak + Right-Click (Full)", ab: "ab7" },
    { name: "text.sun:form8", desc: "Sneak + Punch", ab: "ab8" },
    { name: "text.sun:form9", desc: "Double Sneak + Right-Click", ab: "ab9" },
    { name: "text.sun:form10", desc: "Right-Click (Full)", ab: "ab10" },
    { name: "text.sun:form11", desc: "Double Sneak + Look Down", ab: "ab11" },
    { name: "text.sun:form12", desc: "Sneak + Right-Click (Half)", ab: "ab12" },

];

export function showSunForms(player) {
    const form = new ActionFormData()
        .title("§y§rtext.breathings:sun")
        .body("text.axell:selectform");

    sunForms.forEach((formData) => {
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
        if (btnIdx === sunForms.length) {
            stats.show(player);
            return;
        }
        const formData = sunForms[btnIdx];
        showSunFormDetail(player, formData);
    });
}

export function showSunFormDetail(player, formData, style="sun") {
    

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
        let calculatedDamage = Math.round(atk * (multiplier / 100));
        let damagebonus = Math.round(calculatedDamage + (calculatedDamage * (dmgBonus / 100)));
        let raw = damagebonus * hits;
        if (raw < 0.1) raw = 0.1;
        return Math.floor(raw);
    }

    // Single-hit damage (just a convenience wrapper)
    function singleHitDamage(atk, percentAfterDex, dmgBonus) {
        let multiplier = percentAfterDex;
        let calculatedDamage = Math.round(atk * (multiplier / 100));
        let damagebonus = Math.round(calculatedDamage + (calculatedDamage * (dmgBonus / 100)));
        if (damagebonus < 0.1) damagebonus = 0.1;
        return Math.floor(damagebonus);
    }

    // For UI text: round a percent to 1 decimal but strip trailing .0
    function fmtPct(x) {
        const y = Math.round(x * 10) / 10;
        return (Math.abs(y - Math.round(y)) < 1e-9) ? String(Math.round(y)) : String(y);
    }

    // --- Info Calculation ---
    let extraInfo = "";
    let percent, nextPercent, damage, nextDamage, currentScore = abScore;

    const hitMap = {
        ab1: 5,
        ab2: 5,
        ab3: 2,
        ab4: 7,
        ab5: 1,
        ab6: [9, 1],
        ab7: [8, 1],
        ab8: 6,
        ab9: 0,
        ab10: 4,
        ab11: 3,
        ab12: 9
    };
    const baseMap = {
        ab1: form1,
        ab2: form2,
        ab3: form3,
        ab4: form4,
        ab5: form5,
        ab6: form6,
        ab7: form7,
        ab8: form8,
        ab9: form9,
        ab10: form10,
        ab11: form11,
        ab12: form12
    };

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
                    return `§7M1${String.fromCharCode(97 + idx)}: §e${percStr} §7(§c${totalDmg} §6${Math.floor(totalDmg * critMultiplier)}§7) §e`;
                }
                return `§7M1${String.fromCharCode(97 + idx)}: §e${percStr} §7(§c${totalDmg} §6${Math.floor(totalDmg * critMultiplier)}§7)->§e${nextPercStr}％ §7(§c${totalNextDmg} §6${Math.floor(totalNextDmg * critMultiplier)}§7)`;
            } else {
                const perc = calcBasePercent(val, lvl);
                const nextPerc = calcBasePercent(val, Math.min(lvl + 1, MAX_LEVEL));
                const dmg = singleHitDamage(atk, applyDexToPercent(perc, dex), dmgBonus);
                const nextDmg = singleHitDamage(atk, applyDexToPercent(nextPerc, dex), dmgBonus);
                if (lvl >= MAX_LEVEL) {
                    return `§7M1${String.fromCharCode(97 + idx)}: §e${perc} §7(§c${dmg} §6${Math.floor(dmg * critMultiplier)}§7) §e`;
                }
                return `§7M1${String.fromCharCode(97 + idx)}: §e${perc} §7(§c${dmg} §6${Math.floor(dmg * critMultiplier)}§7)->§e${nextPerc}％ §7(§c${nextDmg} §6${Math.floor(nextDmg * critMultiplier)}§7)`;
            }
        }).join("\n");

        // For summary fields
        percent = calcBasePercent(m1[m1.length - 1], abScore);
        nextPercent = abScore >= MAX_LEVEL ? null : calcBasePercent(m1[m1.length - 1], Math.min(abScore + 1, MAX_LEVEL));
        damage = singleHitDamage(atk, applyDexToPercent(percent, dex), dmgBonus);
        nextDamage = abScore >= MAX_LEVEL ? null : singleHitDamage(atk, applyDexToPercent(nextPercent, dex), dmgBonus);
        currentScore = m1lvl;
    }

    // Multi-hit forms (ab1 to ab12 if hits > 1 or array)
    else if (hitMap[formData.ab] > 1 || Array.isArray(hitMap[formData.ab])) {
        if (Array.isArray(hitMap[formData.ab])) {
            // Multi-part forms like ab6, ab7
            const hitsArr = hitMap[formData.ab];
            const baseArr = baseMap[formData.ab];
            let totalDmg = 0;
            let totalNextDmg = 0;
            let infoParts = [];
            let infoNextParts = [];
            for (let i = 0; i < hitsArr.length; i++) {
                const hits = hitsArr[i];
                const base = baseArr[i];
                const basePercent = calcBasePercent(base, abScore);
                const nextBasePercent = calcBasePercent(base, Math.min(abScore + 1, MAX_LEVEL));
                const perHitAfterDex = applyDexToPercent(basePercent, dex);
                const nextPerHitAfterDex = applyDexToPercent(nextBasePercent, dex);
                const dmg = totalDamage(atk, perHitAfterDex, hits, dmgBonus);
                const nextDmg = totalDamage(atk, nextPerHitAfterDex, hits, dmgBonus);
                totalDmg += dmg;
                totalNextDmg += nextDmg;
                const partName = i === 0 ? "Initial" : "Final";
                infoParts.push(`${partName}: §e${fmtPct(perHitAfterDex)}％ x${hits} §7(§c${dmg} §6${Math.floor(dmg * critMultiplier)}§7)`);
                infoNextParts.push(`${partName}: §e${fmtPct(nextPerHitAfterDex)}％ x${hits} §7(§c${nextDmg} §6${Math.floor(nextDmg * critMultiplier)}§7)`);
            }
            if (abScore === 0) {
                extraInfo = infoNextParts.join("\n") + `\n§7Total: §7(§c${totalNextDmg} §6${Math.floor(totalNextDmg * critMultiplier)}§7)`;
            } else if (abScore >= MAX_LEVEL) {
                extraInfo = infoParts.join("\n") + `\n§7Total: §7(§c${totalDmg} §6${Math.floor(totalDmg * critMultiplier)}§7) §e`;
            } else {
                extraInfo = infoParts.join("\n") + `\n§7Total: §7(§c${totalDmg} §6${Math.floor(totalDmg * critMultiplier)}§7)\n` +
                    infoNextParts.join("\n") + `\n§7Next Total: §7(§c${totalNextDmg} §6${Math.floor(totalNextDmg * critMultiplier)}§7)`;
            }
            percent = (totalDmg / atk) * 100;
            nextPercent = (totalNextDmg / atk) * 100;
            damage = totalDmg;
            nextDamage = totalNextDmg;
            currentScore = abScore;
        } else {
            // Uniform multi-hit
            const hits = hitMap[formData.ab];
            const base = baseMap[formData.ab];
            const basePercent = calcBasePercent(base, abScore);
            const nextBasePercent = calcBasePercent(base, Math.min(abScore + 1, MAX_LEVEL));
            const perHitAfterDex = applyDexToPercent(basePercent, dex);
            const nextPerHitAfterDex = applyDexToPercent(nextBasePercent, dex);
            const totalDmg = totalDamage(atk, perHitAfterDex, hits, dmgBonus);
            const totalNextDmg = totalDamage(atk, nextPerHitAfterDex, hits, dmgBonus);
            if (abScore === 0) {
                extraInfo = `§7Total: §e${fmtPct(nextPerHitAfterDex)}％ x${hits} §7(§c${totalNextDmg} §6${Math.floor(totalNextDmg * critMultiplier)}§7)`;
            } else if (abScore >= MAX_LEVEL) {
                extraInfo = `§7Total: §e${fmtPct(perHitAfterDex)}％ x${hits} §7(§c${totalDmg} §6${Math.floor(totalDmg * critMultiplier)}§7) §e`;
            } else {
                extraInfo = `§7Total: §e${fmtPct(perHitAfterDex)}％ x${hits} §7(§c${totalDmg} §6${Math.floor(totalDmg * critMultiplier)}§7)\nNext: §e${fmtPct(nextPerHitAfterDex)}％ x${hits} §7(§c${totalNextDmg} §6${Math.floor(totalNextDmg * critMultiplier)}§7)`;
            }
            percent = perHitAfterDex * hits;
            nextPercent = abScore >= MAX_LEVEL ? null : nextPerHitAfterDex * hits;
            damage = totalDmg;
            nextDamage = abScore >= MAX_LEVEL ? null : totalNextDmg;
            currentScore = abScore;
        }
    }

    // All other single-hit forms
    else {
        const formMult = {
            m1lvl: m1[m1.length - 1],
            ab1: form1,
            ab2: form2,
            ab3: form3,
            ab4: form4,
            ab5: form5,
            ab6: form6,
            ab7: form7,
            ab8: form8,
            ab9: form9,
            ab10: form10,
            ab11: form11,
            ab12: form12
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

        if (formData.ab === "ab9") {
            extraInfo = "§7Work in progress.";
        } else if (formData.ab === "ab5") {
            if (abScore === 0) {
                extraInfo = `§7Damage from Lost HP: §e${fmtPct(nextAfterDex)}％ §7(§c${nextDamage}§7)`;
            } else if (abScore >= MAX_LEVEL) {
                extraInfo = `§7Current Damage from Lost HP: §e${fmtPct(afterDex)}％ §7(§c${damage}§7) §e`;
            } else {
                extraInfo = `§7Current Damage from Lost HP: §e${fmtPct(afterDex)}％ §7(§c${damage}§7) -> Next: §e${fmtPct(nextAfterDex)}％ §7(§c${nextDamage}§7)`;
            }
        } else if (abScore === 0) {
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
            showSunForms(player);
        } else if (response.selection === 0 && canUpgrade) {
            setScore(formData.ab, player, abScore + 1);
            setScore("sp", player, sp - requiredSP);
            const formName = formData.name || "Form";
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§a${abScore === 0 ? "Unlocked" : "Upgraded"}: "},{"translate":"§y§r${formName}"},{"text":"!"}]}`);
            system.runTimeout(() => showSunFormDetail(player, formData), 2);
            player.runCommandAsync(`playsound note.pling @s ~~~ 2 2`);
            player.runCommandAsync(`scoreboard players add @s spUsed ${requiredSP}`);
        } else {
            system.runTimeout(() => showSunFormDetail(player, formData), 2);
        }
    });
}
