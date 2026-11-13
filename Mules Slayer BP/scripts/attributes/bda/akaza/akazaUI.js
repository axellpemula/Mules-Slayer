// --- UI Functions ---
import { ActionFormData } from "@minecraft/server-ui";
import { system } from "@minecraft/server";
import { stats } from "../../stats";
import  "./akazaUtils";

export const akazaForms = [
    { name: "text.axell:m1", desc: "A flurry of rapid, destructive punches.", ab: "bm1lvl" },
    { name: "Compass Needle", desc: "Detects and predicts enemy movements.", ab: "bab1" },
    { name: "Air Type", desc: "A shockwave punch that hits from a distance.", ab: "bab2" },
    { name: "Disorder", desc: "A barrage of unpredictable, wild strikes.", ab: "bab3" },
    { name: "Annihilation Type", desc: "A devastating, focused punch.", ab: "bab4" },
    { name: "Crown Splitter", desc: "A reverse, rising axe kick.", ab: "bab5" },
    { name: "Explosive Fury", desc: "Unleashes a series of explosive kicks.", ab: "bab6" },
    { name: "Eight-Layered Demon Core", desc: "Eight consecutive, high-speed attacks.", ab: "bab7" },
    { name: "Ten Thousand Leaves Flashing Willow", desc: "A powerful downward strike.", ab: "bab8" },
    { name: "Flying Planet Thousand Wheels", desc: " A kick with flowing motion which launches target.", ab: "bab9" },
    { name: "Blue Silver Chaotic Afterglow", desc: "An omni-directional barrage of countless thin and sharp shockwaves.", ab: "bab10" }
];

export function showAkazaForms(player) {
    const form = new ActionFormData()
        .title("§y§rDestructive Death")
        .body("Select a technique to view or upgrade:");

    akazaForms.forEach((formData) => {
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
        if (btnIdx === akazaForms.length) {
            stats.show(player);
            return;
        }
        const formData = akazaForms[btnIdx];
        showAkazaFormDetail(player, formData);
    });
}

export function showAkazaFormDetail(player, formData) {
    // --- Stat & Multiplier Definitions ---
    const m1 = [35, 42, 38, 40, 5, 80];
    const form1 = [220, 190], form2 = 56, form3 = [10, 75], form4 = 170, form5 = 90;
    const form6 = 15, form7 = 35, form8 = 150, form9 = 80;
    const form10 = 20;
    

    // --- Player Stats ---
    const abScore = getScore(formData.ab, player);
    const m1lvl = getScore("bm1lvl", player);
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

    const str = getScore("str", player);
    const dex = getScore("dex", player);
    const dmgBonus = getScore("dmgbonus", player);
    const atk = 10 + (str * 0.1) + (dex * 0.0375);

    // --- Helper Functions ---
    function calcPercent(base, lvl) { return Math.round(base * Math.pow(1.1, lvl - 1)); }
    function calcDmg(atk, percent, bonus) {
        let dmg = (Number(atk) * (percent / 100)) * (1 + dmgBonus / 100) + (dex * 2);
        if (dmg < 0.1) dmg = 0.1;
        return Math.floor(dmg);
    }
    function calcNextDmg(atk, percent, bonus) {
        let dmg = ((Number(atk) * (percent / 100)) * (1 + dmgBonus / 100) + (dex * 0.05)) * 1.1;
        if (dmg < 0.1) dmg = 0.1;
        return Math.floor(dmg);
    }
    // --- Info Calculation ---
    let extraInfo = "";
    let percent, nextPercent, damage, nextDamage, currentScore = abScore;

    // M1 text.axell:m1
    if (formData.ab === "bm1lvl") {
        let lvl = m1lvl;
        extraInfo = m1.map((val, idx) => {
            if (Array.isArray(val)) {
                let percents = val.map(v => calcPercent(v, lvl));
                let nextPercents = val.map(v => calcPercent(v, Math.min(lvl + 1, MAX_LEVEL)));
                let dmgs = percents.map(p => calcDmg(atk, p, dmgBonus));
                let nextDmgs = nextPercents.map(p => calcNextDmg(atk, p, dmgBonus));
                let totalDmg = dmgs.reduce((a, b) => a + b, 0);
                let totalNextDmg = nextDmgs.reduce((a, b) => a + b, 0);
                if (lvl >= MAX_LEVEL) {
                    return `§7M1${String.fromCharCode(97 + idx)}: §e${percents.join("+")}％ §7(§c${totalDmg}§7) §e`;
                }
                return `§7M1${String.fromCharCode(97 + idx)}: §e${percents.join("+")}％ §7(§c${totalDmg}§7) -> §e${nextPercents.join("+")}％ §7(§c${totalNextDmg}§7)`;
            } else {
                let perc = calcPercent(val, lvl);
                let nextPerc = calcPercent(val, Math.min(lvl + 1, MAX_LEVEL));
                let dmg = calcDmg(atk, perc, dmgBonus);
                let nextDmg = calcNextDmg(atk, nextPerc, dmgBonus);
                if (lvl >= MAX_LEVEL) {
                    return `§7M1${String.fromCharCode(97 + idx)}: §e${perc}％ §7(§c${dmg}§7) §e`;
                }
                return `§7M1${String.fromCharCode(97 + idx)}: §e${perc}％ §7(§c${dmg}§7) -> §e${nextPerc}％ §7(§c${nextDmg}§7)`;
            }
        }).join("\n");
        percent = calcPercent(m1[m1.length - 1], abScore);
        nextPercent = abScore >= MAX_LEVEL ? null : Math.round(percent * 1.1);
        damage = calcDmg(atk, percent, dmgBonus);
        nextDamage = abScore >= MAX_LEVEL ? null : calcNextDmg(atk, nextPercent, dmgBonus);
        currentScore = m1lvl;
    }
    // Special: ab9 (Duration)
    else if (formData.ab === "bab1") {
        let baseDuration = form1[0]; // in ticks
        let baseCooldown = form1[1]; // in seconds

        // Duration increases per level
        let duration = (baseDuration / 20) * Math.pow(upgradebonus, abScore - 1);
        let nextDuration = (baseDuration / 20) * Math.pow(upgradebonus, Math.min(abScore, MAX_LEVEL) - 1);

        // Cooldown decreases per level (min 1s)
        let cooldown = Math.max(1, (baseCooldown/20) - (abScore - 1));
        let nextCooldown = Math.max(1, baseCooldown/20 - abScore);

        if (abScore === 0) {
            extraInfo = `§7Duration: §e${nextDuration.toFixed(1)}s\n§7Cooldown: §e${nextCooldown}s`;
        } else if (abScore >= MAX_LEVEL) {
            extraInfo = `§7Current Duration: §e${duration.toFixed(1)}s §e\n§7Current Cooldown: §e${cooldown}s §e`;
        } else {
            extraInfo = `§7Current Duration: \n§e${duration.toFixed(1)}s -> §7Next: §e${nextDuration.toFixed(1)}s\n§7Current Cooldown: \n§e${cooldown}s -> §7Next: §e${nextCooldown}s`;
        }
        percent = null;
        nextPercent = null;
        damage = null;
        nextDamage = null;
    }
        else if (
        formData.ab === "bab3"
    ) {
        let base, hits;
        if (formData.ab === "bab3") { base = form3; hits = 2; }

        let percents = Array.isArray(base) ? base.map(v => calcPercent(v, abScore)) : Array(hits).fill(calcPercent(base, abScore));
        let nextPercents = Array.isArray(base) ? base.map(v => calcPercent(v, Math.min(abScore + 1, MAX_LEVEL))) : Array(hits).fill(calcPercent(base, Math.min(abScore + 1, MAX_LEVEL)));
        let dmgs = percents.map(p => calcDmg(atk, p, dmgBonus));
        let nextDmgs = nextPercents.map(p => calcNextDmg(atk, p, dmgBonus));
        let totalDmg = dmgs.reduce((a, b) => a + b, 0);
        let totalNextDmg = nextDmgs.reduce((a, b) => a + b, 0);

        if (abScore === 0) {
            extraInfo = percents.map((_, i) =>
                `§7Hit${i + 1}: §e${nextPercents[i]}％ §7(§c${nextDmgs[i]}§7)`
            ).join("\n");
        } else if (abScore >= MAX_LEVEL) {
            extraInfo = percents.map((_, i) =>
                `§7Hit${i + 1}: §e${percents[i]}％ §7(§c${dmgs[i]}§7) §e`
            ).join("\n");
        } else {
            extraInfo = percents.map((_, i) =>
                `§7Hit${i + 1}: §e${percents[i]}％ §7(§c${dmgs[i]}§7) -> Next: §e${nextPercents[i]}％ §7(§c${nextDmgs[i]}§7)`
            ).join("\n");
        }
        percent = percents.reduce((a, b) => a + b, 0);
        nextPercent = abScore >= MAX_LEVEL ? null : nextPercents.reduce((a, b) => a + b, 0);
        damage = totalDmg;
        nextDamage = abScore >= MAX_LEVEL ? null : totalNextDmg;
    }
    else if (formData.ab === "bab7") { // Claws-Purifying Wind (4 hits, form2)
            let hits = 8;
            let percents = Array(hits).fill(calcPercent(form7, abScore));
            let nextPercents = Array(hits).fill(calcPercent(form7, Math.min(abScore + 1, MAX_LEVEL)));
            let dmgs = percents.map(p => calcDmg(atk, p, dmgBonus));
            let nextDmgs = nextPercents.map(p => calcNextDmg(atk, p, dmgBonus));
            let totalDmg = dmgs.reduce((a, b) => a + b, 0);
            let totalNextDmg = nextDmgs.reduce((a, b) => a + b, 0);
    
            if (abScore === 0) {
                extraInfo = `§7Total: §e${nextPercents[0]}％ x${hits} §7(§c${totalNextDmg}§7)`;
            } else if (abScore >= MAX_LEVEL) {
                extraInfo = `§7Total: §e${percents[0]}％ x${hits} §7(§c${totalDmg}§7) §e`;
            } else {
                extraInfo = `§7Total: §e${percents[0]}％ x${hits} §7(§c${totalDmg}§7) -> \nNext: §e${nextPercents[0]}％ x${hits} §7(§c${totalNextDmg}§7)`;
            }
            percent = percents.reduce((a, b) => a + b, 0);
            nextPercent = abScore >= MAX_LEVEL ? null : nextPercents.reduce((a, b) => a + b, 0);
            damage = totalDmg;
            nextDamage = abScore >= MAX_LEVEL ? null : totalNextDmg;
            currentScore = abScore;
            }
    // All other forms: single hit
    else {
        let formMult = {
            bm1lvl: m1[m1.length - 1],
            bab2: form2,
            bab3: form3,
            bab4: form4,
            bab5: form5,
            bab6: form6,
            bab7: form7,
            bab8: form8,
            bab9: form9,
            bab10: form10
        }[formData.ab] || 100;
        percent = calcPercent(formMult, abScore);
        nextPercent = abScore >= MAX_LEVEL ? null : calcPercent(formMult, Math.min(abScore + 1, MAX_LEVEL));
        damage = calcDmg(atk, percent, dmgBonus);
        nextDamage = abScore >= MAX_LEVEL ? null : calcNextDmg(atk, nextPercent, dmgBonus);
        currentScore = abScore;
        if (abScore === 0) {
            extraInfo = `§7Damage: §e${nextPercent}％ §7(§c${nextDamage}§7)`;
        } else if (abScore >= MAX_LEVEL) {
            extraInfo = `§7Current: §e${percent}％ §7(§c${damage}§7) §e`;
        } else {
            extraInfo = `§7Current: §e${percent}％ §7(§c${damage}§7) -> Next: §e${nextPercent}％ §7(§c${nextDamage}§7)`;
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
            showAkazaForms(player);
        } else if (response.selection === 0 && canUpgrade) {
            setScore(formData.ab, player, abScore + 1);
            setScore("sp", player, sp - requiredSP);
            const formName = formData.name || "Form";
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§a${abScore === 0 ? "Unlocked" : "Upgraded"}: "},{"translate":"§y§r${formName}"},{"text":"!"}]}`);
            system.runTimeout(() => showAkazaFormDetail(player, formData), 2);
            player.runCommandAsync(`playsound note.pling @s ~~~ 2 2`);            
            player.runCommandAsync(`scoreboard players add @s spUsed ${requiredSP}`);
        } else {
            system.runTimeout(() => showAkazaFormDetail(player, formData), 2);
        }
    });
}
