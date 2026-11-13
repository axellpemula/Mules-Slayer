// --- UI Functions ---
import { ActionFormData } from "@minecraft/server-ui";
import { system } from "@minecraft/server";
import { stats } from "../../stats.js";
import { getScore, setScore, getRequiredSP, MAX_LEVEL, upgradebonus, calculateDamage } from "../../utils.js";
import { m1, form1, form2, form3, form4, special } from "./insectMultipliers.js";

export const InsectForms = [
    { name: "text.axell:m1", desc: "Punch (5x)", ab: "m1lvl" },
    { name: "text.insect:form1", desc: "Sneak + Punch\nSneak + Right Click (Tap)", ab: "ab1" },
    { name: "text.insect:form2", desc: "Right-Click (Half)", ab: "ab2" },
    { name: "text.insect:form3", desc: "Right-Click (Tap)", ab: "ab3" },
    { name: "text.insect:form4", desc: "Sneak + Right-Click (Half)", ab: "ab4" }
];

export function showInsectForms(player) {
    const form = new ActionFormData()
        .title("§y§rtext.breathings:insect")
        .body("text.axell:selectform");

    InsectForms.forEach((formData) => {
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
        if (btnIdx === InsectForms.length) {
            stats.show(player);
            return;
        }
        const formData = InsectForms[btnIdx];
        showInsectFormDetail(player, formData);
    });
}

export function showInsectFormDetail(player, formData, style="insect") {
    

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

    // For UI text: round a percent to 1 decimal but strip trailing .0
    function fmtPct(x) {
        const y = Math.round(x * 10) / 10;
        return (Math.abs(y - Math.round(y)) < 1e-9) ? String(Math.round(y)) : String(y);
    }

    // Compute total damage from a percent (percentAfterDex is a percent value, not array)
    function totalDamage(atk, percentAfterDex, hits = 1, dmgBonus = 0) {
        let raw = (atk * (percentAfterDex / 100)) * (1 + dmgBonus / 100);
        if (raw < 0.1) raw = 0.1;
        return Math.floor(raw * hits);
    }

    // Single-hit convenience
    function singleHitDamage(atk, percentAfterDex, dmgBonus = 0) {
        return totalDamage(atk, percentAfterDex, 1, dmgBonus);
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

    // Multi-hit forms (ab2, ab3, ab5)
    else if (formData.ab === "ab1" || formData.ab === "ab3") {
        const hitMap = { ab1: 3, ab3: 6};
        const baseMap = { ab1: form1, ab3: form3};

        const hits = hitMap[formData.ab];
        const base = baseMap[formData.ab];

        const basePercent = calcBasePercent(base, abScore);                       // before dex
        const nextBasePercent = calcBasePercent(base, Math.min(abScore + 1, MAX_LEVEL));

        const perHitAfterDex = applyDexToPercent(basePercent, dex);              // dex applied
        const nextPerHitAfterDex = applyDexToPercent(nextBasePercent, dex);

        const totalDmg = totalDamage(atk, perHitAfterDex, hits, dmgBonus);       // floor once
        const totalNextDmg = totalDamage(atk, nextPerHitAfterDex, hits, dmgBonus);

        if (abScore === 0) {
            extraInfo = `§7Total: §e${fmtPct(nextPerHitAfterDex)}％ x${hits} §7(§c${totalNextDmg} §6${Math.floor(totalNextDmg * critMultiplier)}§7)`;
        } else if (abScore >= MAX_LEVEL) {
            extraInfo = `§7Total: §e${fmtPct(perHitAfterDex)}％ x${hits} §7(§c${totalDmg} §6${Math.floor(totalDmg * critMultiplier)}§7) §e`;
        } else {
            extraInfo = `§7Total: §e${fmtPct(perHitAfterDex)}％ x${hits} §7(§c${totalDmg} §6${Math.floor(totalDmg * critMultiplier)}§7)\nNext: §e${fmtPct(nextPerHitAfterDex)}％ x${hits} §7(§c${totalNextDmg} §6${Math.floor(totalNextDmg * critMultiplier)}§7)`;
        }

        // For the summary numbers (sum of percents * hits)
        percent = perHitAfterDex * hits;
        nextPercent = abScore >= MAX_LEVEL ? null : nextPerHitAfterDex * hits;
        damage = totalDmg;
        nextDamage = abScore >= MAX_LEVEL ? null : totalNextDmg;
        currentScore = abScore;
    }

    // All other single-hit forms
    else {
        const formMult = {
            m1lvl: m1[m1.length - 1],
            ab1: form1,
            ab2: form2,
            ab3: form3,
            ab4: form4
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
            extraInfo = `§7Damage: §e${fmtPct(nextAfterDex)}％ §7(§c${nextDamage} §6${Math.floor(nextDamage * critMultiplier)}§7)`;
        } else if (abScore >= MAX_LEVEL) {
            extraInfo = `§7Current: §e${fmtPct(afterDex)}％ §7(§c${damage} §6${Math.floor(damage * critMultiplier)}§7) §e`;
        } else {
            extraInfo = `§7Current: §e${fmtPct(afterDex)}％ §7(§c${damage} §6${Math.floor(damage * critMultiplier)}§7) -> Next: §e${fmtPct(nextAfterDex)}％ §7(§c${nextDamage} §6${Math.floor(nextDamage * critMultiplier)}§7)`;
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
            showInsectForms(player);
        } else if (response.selection === 0 && canUpgrade) {
            setScore(formData.ab, player, abScore + 1);
            setScore("sp", player, sp - requiredSP);
            const formName = formData.name || "Form";
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§a${abScore === 0 ? "Unlocked" : "Upgraded"}: "},{"translate":"§y§r${formName}"},{"text":"!"}]}`);
            system.runTimeout(() => showInsectFormDetail(player, formData), 2);
            player.runCommandAsync(`playsound note.pling @s ~~~ 2 2`);            
            player.runCommandAsync(`scoreboard players add @s spUsed ${requiredSP}`);
        } else {
            system.runTimeout(() => showInsectFormDetail(player, formData), 2);
        }
    });
}
