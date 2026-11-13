// --- UI Functions ---
import { ActionFormData } from "@minecraft/server-ui";
import { system } from "@minecraft/server";
import { stats } from "../../stats";
import { getScore, setScore, getRequiredSP, MAX_LEVEL, upgradebonus, calculateDamage } from "../../utils.js";
import { m1, form1, form2, form3, form4, form5, form6, form7, form8, form9, form10, form11 } from "./waterMultipliers";

export const waterForms = [
    { name: "text.axell:m1", desc: "Punch (5x)", ab: "m1lvl" },
    { name: "text.water:form1", desc: "Right-Click (Tap)", ab: "ab1" },
    { name: "text.water:form2", desc: "On Air + Right-Click (Tap)", ab: "ab2" },
    { name: "text.water:form3", desc: "Sneak + Right Click (Half)", ab: "ab3" },
    { name: "text.water:form4", desc: "Punch 2x + Right-Click (Tap)", ab: "ab4" },
    { name: "text.water:form5", desc: "On Air + Right-Click (Half)§c\n(Must Release Before Full)", ab: "ab5" },
    { name: "text.water:form6", desc: "Right-Click (Half)\nOn Air + Right Click (Full)", ab: "ab6" },
    { name: "text.water:form7", desc: "Sneak + Punch", ab: "ab7" },
    { name: "text.water:form8", desc: "On Air + Punch", ab: "ab8" },
    { name: "text.water:form9", desc: "Sneak + Right-Click (Tap)", ab: "ab9" },
    { name: "text.water:form10", desc: "Double Sneak + Punch", ab: "ab10" },
    { name: "text.water:form11", desc: "Double Sneak + Right Click (Tomioka)", ab: "ab11", TomiokaOnly: true }
];

export function showWaterForms(player) {
    const familyIndex = getScore("family", player);
    const isTomioka = familyIndex === 9;
    const form = new ActionFormData()
        .title("§y§rtext.breathings:water")
        .body("text.axell:selectform");

    waterForms.forEach((formData) => {
        if (formData.TomiokaOnly && !isTomioka) return;
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
        const availableForms = waterForms.filter(f => !f.TomiokaOnly || isTomioka);
        if (btnIdx === availableForms.length) {
            stats.show(player);
            return;
        }
        const formData = availableForms[btnIdx];
        showWaterFormDetail(player, formData);
    });
}

export function showWaterFormDetail(player, formData, style="water") {
    

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

    const critRate = getScore("critRate", player);
    const critDMG = getScore("critDMG", player);
    const critMultiplier = 1.45 + (critDMG / 100);

    // Base attack stat
    const atk = 5 + (str * 0.1) + (dex * 0.0375);

    // --- Helpers ---
    // Safe percent calc: treat level < 1 as level 1 for percent formula (prevents negative exponents)
    function calcPercent(base, lvl) {
        const level = Math.max(1, lvl);
        return Math.round(base * Math.pow(upgradebonus, level - 1));
    }

    // Dex additive: each +1 DEX adds +7.5% to the move's percent
    function applyDexAdditive(percent, dex) {
        return percent + (dex * 0.05);
    }

    // Sum percent-array and compute total damage once (matches damage.js)
    function totalDamageFromPercentArray(atk, percentArrayAfterDex, dmgBonus) {
        const totalPercent = percentArrayAfterDex.reduce((a, b) => a + b, 0);
        return calculateDamage(atk, totalPercent, dmgBonus);
    }

    // Single-hit convenience (uses same formula as totalDamageFromPercentArray)
    function singleHitDamage(atk, percentAfterDex, dmgBonus) {
        return calculateDamage(atk, percentAfterDex, dmgBonus);
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
                return `§7M1${String.fromCharCode(97 + idx)}: §e${percStr} §7(§c${totalDmg}§7) -> §e${nextPercStr} §7(§c${totalNextDmg}§7)`;
            } else {
                const basePerc = calcPercent(val, lvl);
                const nextBasePerc = calcPercent(val, Math.min(lvl + 1, MAX_LEVEL));

                const dmg = singleHitDamage(atk, applyDexAdditive(basePerc, dex), dmgBonus);
                const nextDmg = singleHitDamage(atk, applyDexAdditive(nextBasePerc, dex), dmgBonus);

                if (lvl >= MAX_LEVEL) {
                    return `§7M1${String.fromCharCode(97 + idx)}: §e${basePerc}％ §7(§c${dmg}§7) §e`;
                }
                return `§7M1${String.fromCharCode(97 + idx)}: §e${basePerc}％ §7(§c${dmg}§7) -> §e${nextBasePerc}％ §7(§c${nextDmg}§7)`;
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

    // ----- Multi-hit Forms (ab2, ab4, ab6, ab10) -----
    else if (["ab2", "ab4", "ab6", "ab10"].includes(formData.ab)) {
        let base, hits;
        if (formData.ab === "ab2") { base = form2; hits = 3; }
        else if (formData.ab === "ab4") { base = form4; hits = 2; }
        else if (formData.ab === "ab6") { base = form6; hits = 3; }
        else { base = form10; hits = 3; }

        // If base itself is an array (different percent per hit), use that; otherwise repeat base for hits
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
            extraInfo = basePercents.map((_, i) =>
                `§7Hit${i + 1}: §e${nextBasePercents[i]}％ §7(§c${totalDamageFromPercentArray(atk, [nextAfterDex[i]], dmgBonus)}§7)`
            ).join("\n");
        } else if (abScore >= MAX_LEVEL) {
            extraInfo = basePercents.map((_, i) =>
                `§7Hit${i + 1}: §e${basePercents[i]}％ §7(§c${totalDamageFromPercentArray(atk, [afterDex[i]], dmgBonus)}§7) §e`
            ).join("\n");
        } else {
            extraInfo = basePercents.map((_, i) =>
                `§7Hit${i + 1}: §e${basePercents[i]}％ §7(§c${totalDamageFromPercentArray(atk, [afterDex[i]], dmgBonus)}§7) -> Next: §e${nextBasePercents[i]}％ §7(§c${totalDamageFromPercentArray(atk, [nextAfterDex[i]], dmgBonus)}§7)`
            ).join("\n");
        }

        percent = basePercents.reduce((a, b) => a + b, 0);
        nextPercent = abScore >= MAX_LEVEL ? null : nextBasePercents.reduce((a, b) => a + b, 0);
        damage = totalDmg;
        nextDamage = abScore >= MAX_LEVEL ? null : totalNextDmg;
        currentScore = abScore;
    }

    // ----- ab5: Lost HP scaling (special) -----
    else if (formData.ab === "ab5") {
        // Expecting form5 to be something like [initialPercent, baseLostHpValue]
        const initialBase = Array.isArray(form5) ? form5[0] : (typeof form5 === "number" ? form5 : 100);
        const lostHpBase = Array.isArray(form5) ? (form5[1] || 0) : 0;

        const perc = calcPercent(initialBase, abScore);
        const nextPerc = calcPercent(initialBase, Math.min(abScore + 1, MAX_LEVEL));

        const dmg = singleHitDamage(atk, applyDexAdditive(perc, dex), dmgBonus);
        const nextDmg = singleHitDamage(atk, applyDexAdditive(nextPerc, dex), dmgBonus);

        const lostHpPercent = lostHpBase + Math.max(0, abScore - 1) * 3;
        const nextLostHpPercent = lostHpBase + abScore * 3;

        if (abScore === 0) {
            extraInfo = `§7Initial: §e${nextPerc}％ §7(§c${nextDmg}§7)\n§7Lost HP: §e${nextLostHpPercent}％ of lost HP §4\n(Ignore all defense)§7`;
        } else if (abScore >= MAX_LEVEL) {
            extraInfo = `§7Initial: §e${perc}％ §7(§c${dmg}§7) §e\n§7Lost HP: §c${lostHpPercent}％§7 of lost HP §4\n(Ignore all defense)§7`;
        } else {
            extraInfo = `§7Initial: §e${perc}％ §7(§c${dmg}§7) -> Next: §e${nextPerc}％ §7(§c${nextDmg}§7)\n§7Lost HP: §c${lostHpPercent}％ §7-> Next: §c${nextLostHpPercent}％ §7of lost HP §4\n(Ignore all defense)§7`;
        }

        percent = perc;
        nextPercent = abScore >= MAX_LEVEL ? null : nextPerc;
        damage = dmg;
        nextDamage = abScore >= MAX_LEVEL ? null : nextDmg;
        currentScore = abScore;
    }

    // ----- ab9: Duration-based (special) -----
    else if (formData.ab === "ab9") {
        const baseScore = typeof form9 === "number" ? form9 : 0;
        const baseSeconds = baseScore / 20;

        const secondsCurrent = abScore <= 0 ? null : baseSeconds * Math.pow(upgradebonus, Math.max(0, abScore - 1));
        const secondsNext = baseSeconds * Math.pow(upgradebonus, Math.max(0, Math.min(abScore + 1, MAX_LEVEL) - 1));

        if (abScore === 0) {
            extraInfo = `§7Duration: §e${secondsNext.toFixed(1)}s`;
        } else if (abScore >= MAX_LEVEL) {
            extraInfo = `§7Current: §e${secondsCurrent.toFixed(1)}s §e`;
        } else {
            extraInfo = `§7Current: §e${secondsCurrent.toFixed(1)}s -> Next: §e${secondsNext.toFixed(1)}s`;
        }

        percent = null;
        nextPercent = null;
        damage = null;
        nextDamage = null;
        currentScore = abScore;
    }

    // ----- ab7: 3-hit example (same treatment as multi-hit) -----
    else if (formData.ab === "ab7") {
        const hits = 3;
        const basePercents = Array.isArray(form7) ? form7.map(v => calcPercent(v, abScore)) : Array(hits).fill(calcPercent(form7, abScore));
        const nextBasePercents = Array.isArray(form7) ? form7.map(v => calcPercent(v, Math.min(abScore + 1, MAX_LEVEL))) : Array(hits).fill(calcPercent(form7, Math.min(abScore + 1, MAX_LEVEL)));

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
            ab1: form1, ab3: form3, ab4: form4, ab5: form5,
            ab7: form7, ab8: form8, ab9: form9, ab11: form11
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
            showWaterForms(player);
        } else if (response.selection === 0 && canUpgrade) {
            setScore(formData.ab, player, abScore + 1);
            setScore("sp", player, sp - requiredSP);
            const formName = formData.name || "Form";
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§a${abScore === 0 ? "Unlocked" : "Upgraded"}: "},{"translate":"§y§r${formName}"},{"text":"!"}]}`);
            system.runTimeout(() => showWaterFormDetail(player, formData), 2);
            player.runCommandAsync(`playsound note.pling @s ~~~ 2 2`);
            player.runCommandAsync(`scoreboard players add @s spUsed ${requiredSP}`);
        } else {
            system.runTimeout(() => showWaterFormDetail(player, formData), 2);
        }
    });
}
