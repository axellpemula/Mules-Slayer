// --- UI Functions ---
import { ActionFormData } from "@minecraft/server-ui";
import { system } from "@minecraft/server";
import { stats } from "../../stats.js";
import { getScore, setScore, getRequiredSP, MAX_LEVEL, upgradebonus } from "../../utils.js";
import { m1, form1, form4, form5, special } from "./soundMultipliers.js";

export const SoundForms = [
    { name: "text.axell:m1", desc: "Punch (5x)", ab: "m1lvl" },
    { name: "text.sound:form1", desc: "Sneak + Right-Click (Tap)\nSneak + Punch", ab: "ab1" },
    { name: "text.sound:form4", desc: "Right-Click (Half)", ab: "ab4" },
    { name: "text.sound:form5", desc: "Right-Click (Tap)", ab: "ab5" },
    // Musical Score will be conditionally added in showSoundForms
];


export function showSoundForms(player) {
    // Clone base forms
    let forms = [...SoundForms];
    // Check if all moves are at least level 1


    const form = new ActionFormData()
        .title("§y§rSound Breathing")
        .body("text.axell:selectform");

    forms.forEach((formData) => {
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
        if (btnIdx === forms.length) {
            stats.show(player);
            return;
        }
        const formData = forms[btnIdx];
        showSoundFormDetail(player, formData);
    });
}

export function showSoundFormDetail(player, formData, style="sound") {
    

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
            ? `Cost §e${requiredSP} SP§r to ${upgradeLabel.toLowerCase()} this move.`
            : `§cNot enough SP to ${upgradeLabel.toLowerCase()}.`);

    const str = getScore("str", player);
    const dex = getScore("dex", player);
    const dmgBonus = getScore("dmgbonus", player);

    // Base attack stat
    const atk = 10 + (str * 0.1) + (dex * 0.0375);

    // --- Helpers ---
    // Safe percent calc: treat level < 1 as level 1 for percent formula (prevents negative exponents)
    function calcPercent(base, lvl) {
        const level = Math.max(1, lvl);
        return Math.round(base * Math.pow(upgradebonus, level - 1));
    }

    // Dex additive: each +1 DEX adds +2.5% to the move's percent
    function applyDexAdditive(percent, dex) {
        return percent + (dex * 2.5);
    }

    // Sum percent-array and compute total damage once (no per-hit flooring)
    function totalDamageFromPercentArray(atk, percentArrayAfterDex, dmgBonus) {
        const totalPercent = percentArrayAfterDex.reduce((a, b) => a + b, 0);
        let raw = (atk * (totalPercent / 100)) * (1 + dmgBonus / 100);
        if (raw < 0.1) raw = 0.1;
        return Math.floor(raw);
    }

    // Single-hit convenience (uses same formula as totalDamageFromPercentArray)
    function singleHitDamage(atk, percentAfterDex, dmgBonus) {
        return totalDamageFromPercentArray(atk, [percentAfterDex], dmgBonus);
    }

    // Nicely format percent (one decimal if needed)
    function fmtPct(x) {
        const y = Math.round(x * 10) / 10;
        return (Math.abs(y - Math.round(y)) < 1e-9) ? String(Math.round(y)) : String(y);
    }

    // Compress consecutive identical percents like "50%x2+30"
    function compressPercents(arr) {
        if (!arr || arr.length === 0) return "";
        let result = [];
        let count = 1;
        for (let i = 1; i <= arr.length; i++) {
            if (arr[i] === arr[i - 1]) {
                count++;
            } else {
                result.push(count > 1 ? `${arr[i - 1]}％x${count}` : `${arr[i - 1]}％`);
                count = 1;
            }
        }
        return result.join("+");
    }

    // --- Info Calculation ---
    let extraInfo = "";
    let percent = null, nextPercent = null, damage = null, nextDamage = null, currentScore = abScore;

    // ----- M1 text.axell:m1 -----
    if (formData.ab === "m1lvl") {
        const lvl = m1lvl;

        extraInfo = m1.map((val, idx) => {
            if (Array.isArray(val)) {
                // Sequence of hits
                const basePercents = val.map(v => calcPercent(v, lvl));
                const nextBasePercents = val.map(v => calcPercent(v, Math.min(lvl + 1, MAX_LEVEL)));

                const afterDex = basePercents.map(p => applyDexAdditive(p, dex));
                const nextAfterDex = nextBasePercents.map(p => applyDexAdditive(p, dex));

                const totalDmg = totalDamageFromPercentArray(atk, afterDex, dmgBonus);
                const totalNextDmg = totalDamageFromPercentArray(atk, nextAfterDex, dmgBonus);

                const percStr = compressPercents(basePercents);
                const nextPercStr = compressPercents(nextBasePercents);

                if (lvl >= MAX_LEVEL) {
                    return `§7M1${String.fromCharCode(97 + idx)}: §e${percStr} §7(§c${totalDmg}§7) §e`;
                }
                return `§7M1${String.fromCharCode(97 + idx)}: §e${percStr}§7(§c${totalDmg}§7) -> §e${nextPercStr} §7(§c${totalNextDmg}§7)`;
            } else {
                const basePerc = calcPercent(val, lvl);
                const nextBasePerc = calcPercent(val, Math.min(lvl + 1, MAX_LEVEL));

                const dmg = singleHitDamage(atk, applyDexAdditive(basePerc, dex), dmgBonus);
                const nextDmg = singleHitDamage(atk, applyDexAdditive(nextBasePerc, dex), dmgBonus);

                if (lvl >= MAX_LEVEL) {
                    return `§7M1${String.fromCharCode(97 + idx)}: §e${basePerc}％ §7(§c${dmg}§7) §e`;
                }
                return `§7M1${String.fromCharCode(97 + idx)}: §e${basePerc}％§7(§c${dmg}§7) -> §e${nextBasePerc}％ §7(§c${nextDmg}§7)`;
            }
        }).join("\n");

        // Summary fields
        const lastBase = Array.isArray(m1[m1.length - 1]) ? m1[m1.length - 1].slice(-1)[0] : m1[m1.length - 1];
        percent = calcPercent(lastBase, abScore);
        nextPercent = abScore >= MAX_LEVEL ? null : calcPercent(lastBase, Math.min(abScore + 1, MAX_LEVEL));
        damage = singleHitDamage(atk, applyDexAdditive(percent, dex), dmgBonus);
        nextDamage = nextPercent === null ? null : singleHitDamage(atk, applyDexAdditive(nextPercent, dex), dmgBonus);
        currentScore = m1lvl;
    }

        else if (formData.ab === "ab1" || formData.ab === "ab4" || formData.ab === "ab5") {
        const hitMap = { ab1: 2, ab4: 11, ab5: 8 };
        const baseMap = { ab5: form5,  ab4: form4, ab1: form1 };

        const hits = hitMap[formData.ab];
        const base = baseMap[formData.ab];

        // ✅ Use base instead of form7
        const basePercents = Array.isArray(base) 
            ? base.map(v => calcPercent(v, abScore)) 
            : Array(hits).fill(calcPercent(base, abScore));

        const nextBasePercents = Array.isArray(base) 
            ? base.map(v => calcPercent(v, Math.min(abScore + 1, MAX_LEVEL))) 
            : Array(hits).fill(calcPercent(base, Math.min(abScore + 1, MAX_LEVEL)));

        const afterDex = basePercents.map(p => applyDexAdditive(p, dex));
        const nextAfterDex = nextBasePercents.map(p => applyDexAdditive(p, dex));

        const totalDmg = totalDamageFromPercentArray(atk, afterDex, dmgBonus);
        const totalNextDmg = totalDamageFromPercentArray(atk, nextAfterDex, dmgBonus);

        if (abScore === 0) {
            extraInfo = `§7Total: §e${nextBasePercents[0]}％ x${hits} §7(§c${totalNextDmg}§7)`;
        } else if (abScore >= MAX_LEVEL) {
            extraInfo = `§7Total: §e${basePercents[0]}％ x${hits} §7(§c${totalDmg}§7) §e`;
        } else {
            extraInfo = `§7Total: §e${basePercents[0]}％ x${hits} §7(§c${totalDmg}§7)\nNext: §e${nextBasePercents[0]}％ x${hits} §7(§c${totalNextDmg}§7)`;
        }

        percent = basePercents.reduce((a, b) => a + b, 0);
        nextPercent = abScore >= MAX_LEVEL ? null : nextBasePercents.reduce((a, b) => a + b, 0);
        damage = totalDmg;
        nextDamage = abScore >= MAX_LEVEL ? null : totalNextDmg;
        currentScore = abScore;
    }

    // ----- Single Value Forms (fallback) -----
    else {
        const formMult = {
            ab1: form1, ab4: form4, ab5: form5,
        }[formData.ab];

        const baseMult = (typeof formMult === "number") ? formMult : (Array.isArray(formMult) ? formMult[0] : 100);

        const basePercent = calcPercent(baseMult, abScore);
        const nextBasePercent = abScore >= MAX_LEVEL ? null : calcPercent(baseMult, Math.min(abScore + 1, MAX_LEVEL));

        const afterDex = applyDexAdditive(basePercent, dex);
        const nextAfterDex = nextBasePercent === null ? null : applyDexAdditive(nextBasePercent, dex);

        damage = singleHitDamage(atk, afterDex, dmgBonus);
        nextDamage = nextAfterDex === null ? null : singleHitDamage(atk, nextAfterDex, dmgBonus);

        percent = basePercent;
        nextPercent = nextBasePercent;
        currentScore = abScore;

        if (abScore === 0) {
            extraInfo = `§7Damage: §e${nextBasePercent}％ §7(§c${nextDamage}§7)`;
        } else if (abScore >= MAX_LEVEL) {
            extraInfo = `§7Current: §e${basePercent}％ §7(§c${damage}§7) §e`;
        } else {
            extraInfo = `§7Current: §e${basePercent}％ §7(§c${damage}§7) -> Next: §e${nextBasePercent}％ §7(§c${nextDamage}§7)`;
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
            showSoundForms(player);
        } else if (response.selection === 0 && canUpgrade) {
            setScore(formData.ab, player, abScore + 1);
            setScore("sp", player, sp - requiredSP);
            const formName = formData.name || "Form";
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§a${abScore === 0 ? "Unlocked" : "Upgraded"}: "},{"translate":"§y§r${formName}"},{"text":"!"}]}`);
            system.runTimeout(() => showSoundFormDetail(player, formData), 2);
            player.runCommandAsync(`playsound note.pling @s ~~~ 2 2`);            
            player.runCommandAsync(`scoreboard players add @s spUsed ${requiredSP}`);
        } else {
            system.runTimeout(() => showSoundFormDetail(player, formData), 2);
        }
    });
}