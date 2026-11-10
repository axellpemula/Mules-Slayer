import { EquipmentSlot as ft, MolangVariableMap as mv, system as de, world as I } from "@minecraft/server";
function ut(...e) {
    return e;
}
function dt(...e) {
    return e;
}
var Pn = ["wooden", "stone", "copper", "iron", "golden", "diamond", "netherite"];
function G(e) {
    return Pn.map((t) => `minecraft:${t}_${e}`);
}
var l = { light: 3, heavy: 4, arcane: 5, elite: 6, boss: 8 },
    L = "xvoid:wheel_of_adaptation",
    mt = {
        spin: "xvoid:wheel_of_adaptation_spin",
        full: "xvoid:wheel_of_adaptation_full",
        react: "xvoid:wheel_of_adaptation_react",
        first: "xvoid:wheel_of_adaptation_first",
        fast: "xvoid:wheel_of_adaptation_fast",
    },
    me = new Set([L, ...Object.values(mt)]),
    pe = "xvoid:sword_of_extermination",
    he = "xvoid:adaptation",
    De = { soulbound: !0, equipWheel: !0, delayTicks: 20 },
    On = { spin: 40, full: 88, react: 25, first: 86, fast: 20 },
    b = {
        spin: "xvoid.wheel.spin",
        first: "xvoid.wheel.first",
        fast: "xvoid.wheel.fast",
        adapted: "xvoid.wheel.adapted",
        nullify: "xvoid.wheel.nullify",
        heal: "xvoid.wheel.heal",
        slash: "xvoid.sword.slash",
        slashHit: "xvoid.sword.slash_hit",
        stab: "xvoid.sword.stab",
        equip: "armor.equip_netherite",
        purify: "xvoid.sword.purify",
        cure: "xvoid.sword.restore",
        undying: "xvoid.wheel.undying",
    },
    p = {
        spin: "xvoid:wheel_spin",
        charge: "xvoid:adapt_charge",
        regen: "xvoid:regen_pulse",
        rise: "xvoid:positive_rise",
        slashTrail: "xvoid:slash_trail",
        slashSpark: "xvoid:slash_spark",
        ink: "xvoid:slash_ink",
        inkSpark: "xvoid:slash_ink_spark",
        positive: "xvoid:positive_burst",
        pillar: "xvoid:adapt_pillar",
        seal: "xvoid:adapt_seal",
        shockwave: "xvoid:adapt_shockwave",
        flash: "xvoid:adapt_flash",
        burst: "xvoid:adapt_burst",
        ray: "xvoid:ray_spark",
        halo: "xvoid:adapt_halo",
        orb: "xvoid:adapt_orb",
        deflect: "xvoid:adapt_deflect",
        beamCore: "xvoid:adapt_beam_core",
        crescent: "xvoid:slash_crescent",
        slashDark: "xvoid:slash_wave_dark",
        runeRing: "xvoid:adapt_rune_ring",
        severCut: "xvoid:sever_cut",
        sonic: "xvoid:sonic_pulse",
        vortex: "xvoid:void_vortex",
    },
    U = {
        stab: "animation.extermination_sword.stab",
        slash: "animation.extermination_sword.slash",
        controller: "controller.xvoid.sword",
        stop: "q.any_animation_finished",
    },
    m = {
        handles: 8,
        heightAboveEyes: 0.7,
        spinInterval: 40,
        fastWindow: 60,
        firstJamTicks: 40,
        firstLock: 80,
        fullLock: 56,
        exposureWindow: 200,
        nullifyFlashInterval: 20,
        hitGap: 8,
        quickHitWindow: 40,
        quickHitValue: 1.5,
        attackPrefixes: ["mob:", "proj:", "weapon:"],
        hitsPerSpin: { mob: 3, proj: 3, env: 4, effect: 2, weapon: 3 },
        nonDotSpinTicks: 60,
        hitsPerKey: { "env:sonic_boom": 2 },
        fullClickTick: 38,
        fullBuildTicks: [13, 25, 36],
    },
    z = {
        useSlots: !1,
        useHunger: !1,
        partialMax: 1,
        spinHealBase: 0.5,
        spinHealPerLevel: 0.05,
        slots: 8,
        spinExhaustion: 2,
    },
    Ln = [
        { minLevel: 20, amount: 2, every: 20 },
        { minLevel: 10, amount: 1, every: 20 },
        { minLevel: 5, amount: 1, every: 40 },
        { minLevel: 1, amount: 1, every: 80 },
    ],
    $e = { effectWindow: 1 },
    S = {
        cooldown: 1200,
        minCooldown: 400,
        freshCooldown: 3600,
        freshMinCooldown: 1800,
        cooldownPerLevel: 40,
        oneHit: 40,
        healDelay: 20,
        graceAfterHeal: 10,
        freshChance: 30,
        analysedChance: 50,
        chancePerLevel: 1,
        maxChance: 75,
        saveEvery: 20,
    },
    Ve = { maxBonus: 0.5, bonusPerLevel: 0.01, maxLevelBonus: 0.25 },
    f = {
        undeadMultiplier: 1.75,
        purifyRatio: 0.2,
        purifyHeal: 2,
        purifyImmune: ut("minecraft:wither"),
        zombieVillagers: ut("minecraft:zombie_villager", "minecraft:zombie_villager_v2"),
        cureInto: "minecraft:villager_v2",
        stabCooldown: 14,
        strikeFxGap: 3,
        cooldownCategory: "xvoid:positive_slash",
        slashCooldown: 140,
        slashWindup: 8,
        slashStart: 1.4,
        slashRange: 12,
        slashSpeed: 1.5,
        slashRadius: 1.8,
        slashWidth: 1.8,
        slashUndeadDamage: 16,
        slashDamage: 6,
        slashKnockback: 1.2,
        trailTicks: 3,
        trailArc: 1.15,
        trailTilt: 0.35,
        trailRadius: 1.7,
        slashCutsBlocks: !0,
        slashMaxBlocks: 32,
        slashCutStart: 1.5,
        uncuttable: new Set([
            "minecraft:bedrock",
            "minecraft:barrier",
            "minecraft:command_block",
            "minecraft:chain_command_block",
            "minecraft:repeating_command_block",
            "minecraft:structure_block",
            "minecraft:structure_void",
            "minecraft:jigsaw",
            "minecraft:end_portal",
            "minecraft:end_portal_frame",
            "minecraft:end_gateway",
            "minecraft:portal",
            "minecraft:reinforced_deepslate",
            "minecraft:border_block",
            "minecraft:allow",
            "minecraft:deny",
            "minecraft:light_block",
        ]),
    },
    J = { radius: 6, damage: 7, knockback: 1.4, knockbackUp: 0.45, fxDelay: 4 },
    V = {
        tagPrefix: "xvoid_w_",
        scanRadius: 32,
        scanInterval: 20,
        kinds: [
            { id: "sword", spins: l.heavy, glyph: "weaponSword", items: G("sword") },
            { id: "axe", spins: l.heavy, glyph: "weaponAxe", items: G("axe") },
            { id: "spear", spins: l.heavy, glyph: "weaponSpear", items: G("spear") },
            { id: "trident", spins: l.heavy, glyph: "weaponTrident", items: dt("minecraft:trident") },
            { id: "mace", spins: l.arcane, glyph: "weaponMace", items: dt("minecraft:mace") },
            { id: "shovel", spins: l.light, glyph: "weaponShovel", items: G("shovel") },
            { id: "pickaxe", spins: l.light, glyph: "weaponPickaxe", items: G("pickaxe") },
            { id: "hoe", spins: l.light, glyph: "weaponHoe", items: G("hoe") },
        ],
    },
    W = {
        show: "\xA7s\xA7h\xA7s\xA7h",
        active: "\xA7s\xA7h\xA7g\xA7r",
        spin: "\xA7s\xA7p\xA7i\xA7n",
        fast: "\xA7s\xA7h\xA7f\xA7s",
        hide: "\xA7s\xA7h\xA7h\xA7s",
        refresh: 40,
        stay: 100,
        toastTicks: 70,
    },
    Wn = 58880;
import { EntityDamageCause as qe, system as N } from "@minecraft/server";
import { system as Hn } from "@minecraft/server";
function E(e, t) {
    return { x: e.x + t.x, y: e.y + t.y, z: e.z + t.z };
}
function Bn(e, t) {
    return { x: e.x - t.x, y: e.y - t.y, z: e.z - t.z };
}
function C(e, t) {
    return { x: e.x * t, y: e.y * t, z: e.z * t };
}
function Rn(e, t) {
    return e.x * t.x + e.y * t.y + e.z * t.z;
}
function pt(e) {
    return Math.sqrt(Rn(e, e));
}
function ht(e) {
    let t = pt(e);
    return t > 1e-6 ? C(e, 1 / t) : { x: 0, y: 0, z: 0 };
}
function Fn(e, t) {
    return pt(Bn(e, t));
}
function D(e) {
    let t = e.location;
    return { x: t.x, y: t.y + 0.9, z: t.z };
}
function ge(e, t = 0.06) {
    let n = e.location;
    return { x: n.x, y: n.y + t, z: n.z };
}
function q(e) {
    try {
        return e?.typeId === "minecraft:player" ? e : void 0;
    } catch {
        return;
    }
}
function s(e) {
    try {
        return e();
    } catch {
        return;
    }
}
function R(e, t) {
    return Hn.runTimeout(() => s(t), e);
}
function h(e, t, n, i) {
    s(() => (i ? e.spawnParticle(t, n, i) : e.spawnParticle(t, n)));
}
function T(e, t, n, i = 1, r = 1) {
    s(() => e.playSound(t, n, { pitch: i, volume: r }));
}
function ie(e, t) {
    let n = e.getComponent("minecraft:health");
    !n || n.currentValue <= 0 || n.setCurrentValue(Math.min(n.effectiveMax, n.currentValue + t));
}
function Kn(e) {
    return (s(() => e.getComponent("minecraft:health")?.currentValue) ?? 0) > 0;
}
function Y(e) {
    let t = e.getHeadLocation();
    return { x: t.x, y: t.y + m.heightAboveEyes, z: t.z };
}
var woaGold = { r: 1.0, g: 0.84, b: 0.28 },
    woaWhiteGold = { r: 1.0, g: 0.94, b: 0.68 },
    woaHealColor = { r: 0.55, g: 1.0, b: 0.68 },
    woaSurgeColor = { r: 1.0, g: 0.9, b: 0.35 },
    woaCrimsonColor = { r: 0.96, g: 0.16, b: 0.28 },
    woaCyanColor = { r: 0.14, g: 0.9, b: 0.95 },
    woaDotAt = new Map(),
    woaExposeAt = new Map(),
    woaGrounded = new Map(),
    woaSneakTicks = new Map(),
    woaSevered = new Map();
function woaLowFx() {
    return !!(s(() => pa("lowFx")) ?? !1);
}
function woaTheme(e) {
    if (!e) return woaGold;
    let t = e.indexOf(":"),
        n = t >= 0 ? e.slice(0, t) : "",
        i = t >= 0 ? e.slice(t + 1) : e;
    if (n === "env") {
        if (i === "soul_fire" || i === "soul_campfire") return { r: 0.25, g: 0.88, b: 1.0 };
        if (
            i === "fire" ||
            i === "burning" ||
            i === "campfire" ||
            i === "lava" ||
            i === "magma" ||
            i === "sulfur_cube_magma" ||
            i === "temperature"
        )
            return { r: 1.0, g: 0.42, b: 0.1 };
        if (i === "end_crystal_explosion" || i === "wither_birth_explosion" || i === "wither_skull_explosion")
            return { r: 0.9, g: 0.28, b: 0.96 };
        if (i.includes("explosion") || i.startsWith("firework") || i === "elytra_firework")
            return { r: 1.0, g: 0.3, b: 0.14 };
        if (i === "lightning") return { r: 0.35, g: 0.85, b: 1.0 };
        if (i === "drowning") return { r: 0.22, g: 0.76, b: 1.0 };
        if (i === "freezing") return { r: 0.65, g: 0.95, b: 1.0 };
        if (i === "sonic_boom") return { r: 0.1, g: 0.88, b: 0.88 };
        if (i === "wither") return { r: 0.66, g: 0.22, b: 0.95 };
        if (i === "magic") return { r: 0.78, g: 0.36, b: 1.0 };
        if (i === "guardian_spikes" || i === "elder_guardian_spikes") return { r: 0.24, g: 0.86, b: 0.86 };
        if (i === "thorns" || i === "contact" || i === "cactus" || i === "sweet_berry_bush")
            return { r: 0.44, g: 0.94, b: 0.4 };
        return { r: 0.88, g: 0.93, b: 1.0 };
    }
    if (n === "effect") {
        if (i === "poison" || i === "fatal_poison" || i === "oozing" || i === "infested")
            return { r: 0.34, g: 0.96, b: 0.28 };
        if (i === "wither") return { r: 0.66, g: 0.22, b: 0.95 };
        if (i === "wind_charged") return { r: 0.72, g: 0.95, b: 1.0 };
        if (i === "bad_omen") return { r: 0.72, g: 0.34, b: 0.42 };
        if (i === "raid_omen") return { r: 1.0, g: 0.28, b: 0.3 };
        if (i === "trial_omen") return { r: 0.22, g: 0.9, b: 0.8 };
        if (i === "darkness" || i === "blindness") return { r: 0.36, g: 0.54, b: 0.96 };
        if (i === "slowness" || i === "mining_fatigue") return { r: 0.56, g: 0.76, b: 0.96 };
        if (i === "levitation") return { r: 0.96, g: 0.78, b: 1.0 };
        return { r: 0.78, g: 0.36, b: 1.0 };
    }
    if (n === "proj") {
        if (i.includes("fireball")) return i.includes("dragon") ? { r: 0.92, g: 0.3, b: 0.96 } : { r: 1.0, g: 0.4, b: 0.1 };
        if (i.includes("wither_skull")) return { r: 0.68, g: 0.24, b: 0.96 };
        if (i.includes("trident")) return { r: 0.25, g: 0.82, b: 1.0 };
        if (i.includes("snowball")) return { r: 0.68, g: 0.95, b: 1.0 };
        if (i.includes("wind_charge")) return { r: 0.72, g: 0.95, b: 1.0 };
        if (i.includes("potion")) return { r: 0.78, g: 0.36, b: 1.0 };
        if (i.includes("shulker")) return { r: 0.88, g: 0.42, b: 1.0 };
        return { r: 0.94, g: 0.94, b: 0.84 };
    }
    if (n === "weapon") {
        if (i === "mace") return { r: 0.46, g: 0.86, b: 1.0 };
        if (i === "trident") return { r: 0.25, g: 0.82, b: 1.0 };
        return { r: 0.92, g: 0.96, b: 1.0 };
    }
    if (n === "mob") {
        if (i === "minecraft:warden") return { r: 0.1, g: 0.88, b: 0.88 };
        if (i === "minecraft:wither" || i === "minecraft:wither_skeleton") return { r: 0.66, g: 0.22, b: 0.95 };
        if (i === "minecraft:ender_dragon" || i === "minecraft:enderman" || i === "minecraft:shulker")
            return { r: 0.88, g: 0.34, b: 1.0 };
        if (i === "minecraft:blaze" || i === "minecraft:magma_cube" || i === "minecraft:ghast")
            return { r: 1.0, g: 0.42, b: 0.1 };
        if (i === "minecraft:creeper") return { r: 0.45, g: 0.96, b: 0.35 };
        if (i === "minecraft:breeze" || i === "minecraft:phantom") return { r: 0.68, g: 0.92, b: 1.0 };
        if (i === "minecraft:guardian" || i === "minecraft:elder_guardian" || i === "minecraft:drowned")
            return { r: 0.24, g: 0.8, b: 1.0 };
        if (i === "minecraft:witch" || i === "minecraft:evocation_illager") return { r: 0.78, g: 0.36, b: 1.0 };
        if (i === "minecraft:slime" || i === "minecraft:cave_spider" || i === "minecraft:bogged")
            return { r: 0.36, g: 0.95, b: 0.3 };
        if (i === "minecraft:stray") return { r: 0.64, g: 0.94, b: 1.0 };
        if (i === "minecraft:player") return { r: 1.0, g: 0.36, b: 0.36 };
        return woaWhiteGold;
    }
    return woaGold;
}
function woaVm(e = woaGold, t = 1, n = 1) {
    let i = new mv();
    return (
        i.setFloat("variable.tint", 1),
        i.setFloat("variable.r", e.r),
        i.setFloat("variable.g", e.g),
        i.setFloat("variable.b", e.b),
        t !== 1 && i.setFloat("variable.scale", t),
        n !== 1 && i.setFloat("variable.spin", n),
        i
    );
}
function woaShake(e, t, n, i = "rotational") {
    if (woaLowFx() || !e?.isValid) return;
    let r = String(e.name ?? "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    r && s(() => e.dimension.runCommand(`camerashake add "${r}" ${t} ${n} ${i}`));
}
function woaHoriz(e) {
    let t = s(() => e.getViewDirection()) ?? { x: 0, y: 0, z: 1 },
        n = ht({ x: t.x, y: 0, z: t.z });
    return n.x === 0 && n.z === 0 && (n = { x: 0, y: 0, z: 1 }), { f: n, r: { x: -n.z, y: 0, z: n.x } };
}
function woaPerip(e, t, n, i = 1, r = 0.75, a = 0.88, o = -0.16) {
    if (!e.isValid) return;
    let c = e.getHeadLocation(),
        { f: g, r: _ } = woaHoriz(e),
        x = woaVm(n, i),
        $ = { x: c.x + g.x * r, y: c.y + o, z: c.z + g.z * r };
    h(e.dimension, t, { x: $.x + _.x * a, y: $.y, z: $.z + _.z * a }, x),
        h(e.dimension, t, { x: $.x - _.x * a, y: $.y, z: $.z - _.z * a }, x);
}
function woaRing(e, t, n, i, r = 1, a = woaGold, o = 1, c = 0) {
    let g = (Math.PI * 2) / i,
        _ = woaVm(a, o);
    for (let x = 0; x < i; x++) {
        let $ = c + x * g;
        h(e, t, { x: n.x + Math.cos($) * r, y: n.y, z: n.z + Math.sin($) * r }, _);
    }
}
function woaEquipFx(e) {
    if (!e?.isValid) return;
    let t = e.dimension,
        n = ge(e, 0.05),
        i = D(e),
        r = Y(e);
    h(t, p.seal, n, woaVm(woaGold, 0.98, 1)),
        h(t, p.runeRing, n, woaVm(woaGold, 1.05, -1.35)),
        h(t, p.beamCore, n, woaVm(woaGold, 0.9)),
        h(t, p.halo, i, woaVm(woaGold, 1.05)),
        h(t, p.halo, r, woaVm(woaWhiteGold, 0.9)),
        h(t, p.flash, r, woaVm(woaGold, 0.88)),
        woaPerip(e, p.orb, woaGold, 0.95),
        woaLowFx() || (woaRing(t, p.orb, i, 8, 1.1, woaGold, 0.9, 0.4), woaRing(t, p.ray, r, 4, 0.95, woaWhiteGold, 0.85, 0));
}
function woaExposeFx(e, t, n = 0.5) {
    if (!e?.isValid) return;
    let i = Hn.currentTick,
        r = woaExposeAt.get(e.id) ?? -20;
    if (i - r < 8) return;
    woaExposeAt.set(e.id, i);
    let a = e.dimension,
        o = woaTheme(t),
        c = Y(e),
        g = 0.68 + 0.35 * Math.min(1, n);
    h(a, p.charge, c, woaVm(o, g)),
        woaPerip(e, p.ray, o, 0.65 + 0.25 * n, 0.82, 0.85, -0.15),
        !woaLowFx() && n >= 0.65 && (h(a, p.charge, D(e), woaVm(woaGold, 0.75)), woaPerip(e, p.orb, woaGold, 0.8));
}
function woaSpinFx(e, t, n) {
    if (!e?.isValid) return;
    let i = woaTheme(n),
        r = woaLowFx(),
        a = (o, c, g = 0.95, _ = 0.9) => {
            if (!e.isValid) return;
            let x = e.dimension,
                $ = Y(e),
                M = D(e);
            h(x, p.ray, { x: $.x + Math.cos(o) * g, y: $.y, z: $.z + Math.sin(o) * g }, woaVm(c, _)),
                r ||
                    h(
                        x,
                        p.orb,
                        { x: M.x + Math.cos(o + Math.PI) * (g + 0.15), y: M.y + 0.15, z: M.z + Math.sin(o + Math.PI) * (g + 0.15) },
                        woaVm(c, _ * 0.9)
                    );
        };
    if (t === "fast") {
        let o = e.dimension,
            c = Y(e);
        h(o, p.spin, c, woaVm(woaGold, 1.05)),
            h(o, p.halo, c, woaVm(i, 1.0)),
            h(o, p.runeRing, ge(e, 0.05), woaVm(i, 0.85, -1.6)),
            h(o, p.flash, c, woaVm(i, 0.82)),
            woaPerip(e, p.orb, i, 0.98),
            r ||
                ([3, 6, 9].forEach((g, _) =>
                    R(g, () => {
                        a(_ * 1.45, _ % 2 ? woaGold : i, 0.98, 0.9),
                            e.isValid &&
                                (woaPerip(e, p.ray, _ % 2 ? woaGold : i, 0.78, 0.78, 0.88, -0.12 + _ * 0.08),
                                _ === 1 && h(e.dimension, p.crescent, D(e), woaVm(i, 0.85, 1.2)));
                    })
                ),
                R(12, () => {
                    if (!e.isValid) return;
                    let g = e.dimension,
                        _ = Y(e);
                    h(g, p.flash, _, woaVm(woaGold, 0.9)),
                        h(g, p.halo, _, woaVm(woaGold, 1.1)),
                        h(g, p.spin, _, woaVm(i, 0.95)),
                        h(g, p.crescent, D(e), woaVm(woaGold, 0.95, -1.3)),
                        woaShake(e, 0.08, 0.14);
                }));
        return;
    }
    if (t === "first") {
        let o = e.dimension,
            c = ge(e, 0.05),
            g = Y(e);
        h(o, p.seal, c, woaVm(woaGold, 0.98, 1)),
            h(o, p.runeRing, c, woaVm(i, 0.95, -1.3)),
            h(o, p.spin, g, woaVm(woaGold, 0.95)),
            woaPerip(e, p.orb, woaGold, 0.95),
            r ||
                ([6, 13, 19, 26, 32, 38].forEach((_, x) =>
                    R(_, () => {
                        if (!e.isValid) return;
                        let $ = e.dimension,
                            M = Y(e),
                            ue = 0.68 + x * 0.09;
                        h($, p.charge, M, woaVm(x % 2 ? woaGold : i, ue)),
                            woaRing($, p.ray, M, 4, 0.92, i, 0.78, x * 0.45),
                            woaPerip(e, p.orb, i, 0.88, 0.8, 0.88, -0.18),
                            (x === 2 || x === 4) && h($, p.runeRing, ge(e, 0.05), woaVm(woaGold, 0.9 + x * 0.08, -1.5)),
                            (x === 3 || x === 5) && (h($, p.halo, M, woaVm(i, 0.88 + x * 0.07)), woaShake(e, 0.06, 0.12));
                    })
                ),
                R(41, () => {
                    if (!e.isValid) return;
                    let _ = e.dimension,
                        x = Y(e),
                        $ = D(e);
                    h(_, p.flash, x, woaVm(woaGold, 1.3)),
                        h(_, p.shockwave, x, woaVm(i, 0.75)),
                        h(_, p.sonic, $, woaVm(woaGold, 1.0)),
                        h(_, p.burst, x, woaVm(i, 0.85)),
                        h(_, p.halo, $, woaVm(woaGold, 1.15)),
                        woaRing(_, p.crescent, $, 4, 0.9, i, 0.85, 0),
                        woaPerip(e, p.ray, woaGold, 1.0),
                        woaShake(e, 0.16, 0.28);
                }),
                [46, 51, 56, 61, 66, 71].forEach((_, x) =>
                    R(_, () => {
                        a(x * 1.1, x % 2 ? woaGold : i, 1.08, 0.98),
                            e.isValid && woaPerip(e, p.orb, x % 2 ? i : woaGold, 0.92);
                    })
                ),
                R(78, () => {
                    if (!e.isValid) return;
                    let _ = e.dimension,
                        x = Y(e);
                    h(_, p.flash, x, woaVm(woaGold, 1.0)),
                        h(_, p.halo, x, woaVm(woaGold, 1.2)),
                        h(_, p.seal, ge(e, 0.05), woaVm(i, 1.05, -1.2)),
                        h(_, p.runeRing, ge(e, 0.05), woaVm(woaGold, 1.05, 1.2));
                }));
        return;
    }
    let o = e.dimension,
        c = Y(e);
    h(o, p.spin, c, woaVm(woaGold, 1.05)),
        h(o, p.halo, c, woaVm(i, 0.96)),
        h(o, p.runeRing, ge(e, 0.05), woaVm(woaGold, 0.82, -1.2)),
        woaPerip(e, p.orb, i, 0.92),
        r ||
            ([6, 10, 14, 18, 22].forEach((g, _) =>
                R(g, () => {
                    a(_ * 1.15, _ % 2 ? woaGold : i, 0.98, 0.92),
                        e.isValid && woaPerip(e, p.ray, _ % 2 ? woaGold : i, 0.76, 0.8, 0.88, -0.14 + _ * 0.06);
                })
            ),
            R(17, () => {
                if (!e.isValid) return;
                let g = e.dimension,
                    _ = Y(e);
                h(g, p.flash, _, woaVm(i, 0.85)),
                    h(g, p.spin, _, woaVm(i, 0.98)),
                    h(g, p.crescent, D(e), woaVm(i, 0.85, 1.1));
            }),
            R(26, () => {
                if (!e.isValid) return;
                let g = e.dimension,
                    _ = Y(e);
                h(g, p.flash, _, woaVm(woaGold, 0.95)),
                    h(g, p.halo, _, woaVm(woaGold, 1.15)),
                    h(g, p.spin, _, woaVm(woaGold, 1.05)),
                    h(g, p.sonic, D(e), woaVm(woaGold, 0.85)),
                    woaShake(e, 0.09, 0.16);
            }));
}
function woaFullFx(e, t) {
    if (!e?.isValid) return;
    let n = woaTheme(t),
        i = woaLowFx(),
        r = e.dimension,
        a = Y(e);
    h(r, p.charge, a, woaVm(n, 1.12)),
        h(r, p.halo, ge(e, 0.05), woaVm(n, 1.02)),
        h(r, p.runeRing, ge(e, 0.05), woaVm(woaGold, 1.0, -1.4)),
        woaPerip(e, p.orb, n, 1.05),
        !i &&
            ([11, 21, 31].forEach((o, c) =>
                R(o, () => {
                    if (!e.isValid) return;
                    let g = e.dimension,
                        _ = Y(e),
                        x = D(e),
                        $ = 0.9 + c * 0.24;
                    h(g, p.charge, _, woaVm(c % 2 ? woaGold : n, $)),
                        h(g, p.halo, _, woaVm(n, 0.88 + c * 0.26)),
                        h(g, p.spin, _, woaVm(woaGold, 0.95 + c * 0.16)),
                        h(g, p.runeRing, ge(e, 0.05), woaVm(c % 2 ? n : woaGold, 0.95 + c * 0.18, c % 2 ? 1.5 : -1.5)),
                        woaRing(g, p.orb, x, 6, 1.2, c % 2 ? woaGold : n, 0.98, c * 0.6),
                        woaPerip(e, p.ray, woaGold, 0.9 + c * 0.12),
                        woaShake(e, 0.07 + c * 0.035, 0.16);
                })
            ),
            R(m.fullClickTick, () => {
                if (!e.isValid) return;
                let o = e.dimension,
                    c = ge(e, 0.05),
                    g = D(e),
                    _ = Y(e);
                h(o, p.seal, c, woaVm(woaGold, 1.48, 1.1)),
                    h(o, p.seal, { x: c.x, y: c.y + 0.03, z: c.z }, woaVm(n, 1.14, -1.5)),
                    h(o, p.runeRing, c, woaVm(woaGold, 1.55, -1.6)),
                    h(o, p.runeRing, { x: c.x, y: c.y + 0.04, z: c.z }, woaVm(n, 1.22, 1.8)),
                    h(o, p.shockwave, c, woaVm(woaGold, 1.3)),
                    h(o, p.shockwave, { x: c.x, y: c.y + 0.02, z: c.z }, woaVm(n, 1.62)),
                    h(o, p.sonic, g, woaVm(n, 1.35)),
                    h(o, p.vortex, c, woaVm(woaGold, 1.15)),
                    h(o, p.beamCore, c, woaVm(woaGold, 1.25)),
                    h(o, p.pillar, c, woaVm(woaGold, 1.25)),
                    h(o, p.pillar, c, woaVm(n, 1.08)),
                    h(o, p.flash, _, woaVm(woaGold, 1.7)),
                    h(o, p.flash, g, woaVm(n, 1.05)),
                    h(o, p.burst, _, woaVm(n, 1.15)),
                    h(o, p.burst, g, woaVm(woaGold, 1.05)),
                    woaRing(o, p.crescent, g, 6, 1.1, n, 0.95, 0),
                    woaRing(o, p.ray, _, 8, 1.22, woaGold, 1.2, 0),
                    woaPerip(e, p.orb, woaGold, 1.3, 0.85, 0.95, -0.1),
                    woaShake(e, 0.28, 0.48);
            }),
            [42, 46, 50, 54, 58, 62, 66, 70, 74].forEach((o, c) =>
                R(o, () => {
                    if (!e.isValid) return;
                    let g = e.dimension,
                        _ = e.location,
                        x = c * 0.95,
                        $ = _.y + 0.35 + c * 0.26,
                        M = 1.12 - c * 0.03;
                    h(g, p.ray, { x: _.x + Math.cos(x) * M, y: $, z: _.z + Math.sin(x) * M }, woaVm(woaGold, 0.95)),
                        h(
                            g,
                            p.orb,
                            { x: _.x + Math.cos(x + Math.PI) * M, y: $, z: _.z + Math.sin(x + Math.PI) * M },
                            woaVm(n, 1.0)
                        ),
                        c % 2 === 0 && h(g, p.halo, Y(e), woaVm(c % 4 ? woaGold : n, 0.95));
                })
            ));
}
function woaNullFx(e, t, n = !1) {
    if (!e?.isValid) return;
    let i = woaTheme(t),
        r = e.dimension;
    if (n) {
        if (woaLowFx()) return;
        let a = Hn.currentTick;
        if (a - (woaDotAt.get(e.id) ?? -20) < m.nullifyFlashInterval) return;
        woaDotAt.set(e.id, a), woaRing(r, p.orb, D(e), 4, 0.85, i, 0.72, (a % 10) * 0.5);
        return;
    }
    let a = Y(e),
        o = e.getHeadLocation(),
        { f: c } = woaHoriz(e),
        g = { x: o.x + c.x * 0.92, y: o.y - 0.26, z: o.z + c.z * 0.92 };
    h(r, p.spin, a, woaVm(woaGold, 0.92)),
        h(r, p.flash, a, woaVm(i, 0.72)),
        h(r, p.halo, a, woaVm(woaGold, 0.88)),
        h(r, p.deflect, g, woaVm(i, 0.92)),
        woaPerip(e, p.ray, i, 0.82, 0.82, 0.72, -0.2),
        woaLowFx() || (h(r, p.deflect, g, woaVm(woaGold, 0.65)), woaShake(e, 0.05, 0.1));
}
var woaDeflected = new Map(),
    woaLastVel = new Map(),
    woaPassiveProjs = new Set([
        "minecraft:ender_pearl",
        "minecraft:fishing_hook",
        "minecraft:xp_bottle",
        "minecraft:eye_of_ender_signal",
    ]),
    woaFireBlocks = new Set([
        "minecraft:fire",
        "minecraft:soul_fire",
        "minecraft:lava",
        "minecraft:flowing_lava",
        "minecraft:magma",
        "minecraft:campfire",
        "minecraft:soul_campfire",
    ]);
function woaIsAdapted(e, t) {
    let n = e.map.get(t);
    return !!n && n.s >= n.n;
}
function woaIsAnyAdapted(e, t) {
    return t.some((n) => woaIsAdapted(e, n));
}
function woaHasRangedAdapt(e) {
    for (let [t, n] of e.map) if (n.s >= n.n && (t.startsWith("proj:") || t.startsWith("mob:"))) return !0;
    return !1;
}
function woaProjAdaptedKey(e, t, n) {
    if (!t || woaPassiveProjs.has(t)) return;
    let i = `proj:${t}`;
    if (woaIsAdapted(e, i)) return i;
    let r = oe(n);
    if (r && r !== "minecraft:player" && woaIsAdapted(e, `mob:${r}`)) return `mob:${r}`;
}
function woaIsPoiseCause(e) {
    return (
        e === qe.entityExplosion ||
        e === qe.blockExplosion ||
        e === qe.sonicBoom ||
        e === qe.ramAttack ||
        e === qe.projectile
    );
}
function woaDeflectProjectile(e, t, n, i, r, a) {
    if (!e?.isValid || !i?.isValid || woaDeflected.has(i.id)) return !1;
    let o = oe(i);
    if (!o || woaPassiveProjs.has(o)) return !1;
    let c = s(() => i.getComponent("minecraft:projectile")),
        g = a ?? s(() => c?.owner),
        _ = woaProjAdaptedKey(t, o, g);
    if (!_) return !1;
    woaDeflected.set(i.id, n + 60);
    let x = D(e),
        $ = s(() => i.location) ?? x,
        M = s(() => i.getVelocity()) ?? r ?? { x: 0, y: 0, z: 0 },
        ue =
            g?.isValid && g.id !== e.id
                ? ht(Bn(D(g), $))
                : Math.hypot(M.x, M.y, M.z) > 0.05
                  ? ht({ x: -M.x, y: -M.y * 0.4 + 0.12, z: -M.z })
                  : ht(Bn($, x));
    Math.hypot(ue.x, ue.y, ue.z) < 0.01 && (ue = ht(e.getViewDirection()));
    let ze = Math.max(1.05, Math.min(2.8, Math.hypot(M.x, M.y, M.z) * 1.25)),
        j = E(x, C(ht(Bn($, x)), 1.05)),
        qn = e.dimension,
        Ie = woaTheme(_);
    if (
        (h(qn, p.deflect, j, woaVm(Ie, 1.0)),
        h(qn, p.flash, j, woaVm(woaGold, 0.72)),
        woaLowFx() || h(qn, p.ray, j, woaVm(Ie, 0.85)),
        n - t.lastFlash >= 8 &&
            ((t.lastFlash = n),
            T(qn, b.nullify, Y(e), 1.08, 0.9),
            Ze(e.id, n) || te(e, "react"),
            woaShake(e, 0.04, 0.08)),
        o === "minecraft:thrown_trident")
    )
        s(() => i.clearVelocity()), s(() => i.applyImpulse(C(ue, Math.min(1.6, ze * 0.75))));
    else if (o === "minecraft:shulker_bullet")
        s(() => i.remove()), h(qn, p.burst, j, woaVm(Ie, 0.7));
    else {
        let je0 = s(() => qn.spawnEntity(o, E(x, C(ue, 1.5)))),
            je1 = je0 ? s(() => je0.getComponent("minecraft:projectile")) : void 0;
        je0 && je1
            ? (woaDeflected.set(je0.id, n + 200),
              s(() => (je1.owner = e)),
              s(() => je1.shoot(C(ue, ze))),
              s(() => i.remove()))
            : (je0 && s(() => je0.remove()),
              s(() => i.clearVelocity()),
              s(() => i.applyImpulse(C(ue, Math.min(2.0, ze)))));
    }
    return !0;
}
function woaScanProjectiles(e, t, n) {
    if (n % 100 === 0 && woaDeflected.size)
        for (let [a, o] of woaDeflected) o <= n && woaDeflected.delete(a);
    if (!woaHasRangedAdapt(t)) return;
    let i = D(e),
        r =
            s(() =>
                e.dimension.getEntities({
                    location: i,
                    maxDistance: 2.8,
                    excludeTypes: ["minecraft:player", "minecraft:item", "minecraft:xp_orb"],
                })
            ) ?? [];
    for (let a of r) {
        if (!a.isValid || woaDeflected.has(a.id)) continue;
        let o = oe(a);
        if (!o || woaPassiveProjs.has(o)) continue;
        let c = s(() => a.getComponent("minecraft:projectile"));
        if (!c && o !== "minecraft:shulker_bullet") continue;
        let g = s(() => c?.owner);
        if (g?.id === e.id) continue;
        let _ = woaProjAdaptedKey(t, o, g);
        if (!_) continue;
        let x = s(() => a.getVelocity()) ?? { x: 0, y: 0, z: 0 };
        if (Math.hypot(x.x, x.y, x.z) < 0.08) continue;
        let $ = Bn(i, a.location);
        Rn(x, $) <= 0 || woaDeflectProjectile(e, t, n, a, x, g);
    }
}
function woaFallSlam(e, t, n) {
    if (!e?.isValid) return;
    let i = e.dimension,
        r = e.location,
        a = ge(e, 0.05),
        o = woaTheme(t),
        breeze = woaIsAnyAdapted(le(e), ["mob:minecraft:breeze", "proj:minecraft:breeze_wind_charge_projectile"]),
        c = Math.min(8.0, 3.5 + n * 0.25) + (breeze ? 2.2 : 0),
        g = Math.min(18, 4 + n * 0.65),
        _ = Math.min(1.6, 0.85 + n * 0.04);
    T(i, b.adapted, a, 0.75, 1.0),
        T(i, b.nullify, a, 0.7, 1.0),
        h(i, p.shockwave, a, woaVm(woaGold, _ * 1.22)),
        h(i, p.shockwave, a, woaVm(o, _ * 1.02)),
        h(i, p.sonic, a, woaVm(breeze ? woaCyanColor : woaGold, _ * 1.1)),
        h(i, p.halo, a, woaVm(woaGold, _)),
        h(i, p.burst, D(e), woaVm(o, _ * 0.92)),
        breeze && h(i, p.deflect, a, woaVm(woaCyanColor, _ * 1.15)),
        woaLowFx() ||
            (h(i, p.seal, a, woaVm(woaGold, _ * 1.08, 1)),
            h(i, p.runeRing, a, woaVm(breeze ? woaCyanColor : o, _ * 1.18, -1.5)),
            woaRing(i, p.crescent, D(e), 6, 1.25, breeze ? woaCyanColor : o, 0.95, 0.3),
            woaRing(i, p.ray, a, 8, 1.45, o, 0.95, 0)),
        woaShake(e, Math.min(0.32, 0.12 + n * 0.012), 0.3);
    let x =
        s(() =>
            i.getEntities({
                location: r,
                maxDistance: c,
                excludeFamilies: ["inanimate"],
                excludeTypes: ["minecraft:item", "minecraft:xp_orb", "minecraft:player"],
            })
        ) ?? [];
    for (let $ of x) {
        if (!$.isValid || !$.getComponent("minecraft:health") || Da($)) continue;
        let M = $.location,
            ue = M.x - r.x,
            ze = M.z - r.z,
            j = Math.hypot(ue, ze) || 1;
        s(() => $.applyDamage(g, { cause: qe.magic, damagingEntity: e })),
            s(() => $.applyKnockback({ x: (ue / j) * (breeze ? 1.85 : 1.35), z: (ze / j) * (breeze ? 1.85 : 1.35) }, Math.min(0.95, (breeze ? 0.58 : 0.45) + n * 0.02))),
            h($.dimension, p.ray, D($), woaVm(breeze ? woaCyanColor : woaGold, 0.8));
    }
}
function woaLightningCharge(e) {
    if (!e?.isValid) return;
    let t = e.dimension,
        n = ge(e, 0.05),
        i = Y(e),
        r = { r: 0.35, g: 0.88, b: 1.0 };
    s(() => e.extinguishFire(!1)),
        s(() => ie(e, 8)),
        s(() => e.addEffect("speed", 160, { amplifier: 1, showParticles: !1 })),
        s(() => e.addEffect("strength", 160, { amplifier: 0, showParticles: !1 })),
        s(() => e.addEffect("resistance", 160, { amplifier: 0, showParticles: !1 })),
        T(t, b.adapted, i, 1.25, 0.95),
        Z(e, w.evoSupercharge),
        h(t, p.vortex, n, woaVm(r, 1.12)),
        h(t, p.pillar, n, woaVm(r, 1.1)),
        h(t, p.beamCore, n, woaVm(woaGold, 1.05)),
        h(t, p.sonic, D(e), woaVm(r, 1.15)),
        h(t, p.halo, i, woaVm(r, 1.15)),
        h(t, p.flash, i, woaVm(r, 1.3)),
        woaLowFx() || (h(t, p.runeRing, n, woaVm(r, 1.18, -1.6)), woaRing(t, p.crescent, D(e), 4, 1.1, r, 0.95, 0)),
        woaRing(t, p.ray, D(e), 8, 1.25, r, 1.1, 0),
        woaShake(e, 0.18, 0.3);
}
function woaCounterShockwave(e, t, n) {
    if (!e?.isValid) return;
    let i = e.dimension,
        r = e.location,
        a = D(e),
        o = ge(e, 0.05),
        c = woaTheme(t);
    T(i, b.nullify, Y(e), 0.78, 1.0),
        Z(e, w.evoCounter),
        h(i, p.shockwave, o, woaVm(woaGold, 1.12)),
        h(i, p.sonic, a, woaVm(c, 1.18)),
        h(i, p.halo, a, woaVm(c, 1.05)),
        h(i, p.burst, a, woaVm(woaGold, 0.92)),
        woaLowFx() || (h(i, p.runeRing, o, woaVm(woaGold, 1.1, -1.5)), woaRing(i, p.crescent, a, 6, 1.1, c, 0.95, 0)),
        woaRing(i, p.ray, a, 8, 1.15, c, 0.95, 0),
        woaShake(e, 0.14, 0.24);
    let g =
            s(() =>
                i.getEntities({
                    location: r,
                    maxDistance: 4.8,
                    excludeFamilies: ["inanimate"],
                    excludeTypes: ["minecraft:item", "minecraft:xp_orb", "minecraft:player"],
                })
            ) ?? [],
        _ = new Set();
    for (let x of g) {
        if (!x.isValid || !x.getComponent("minecraft:health") || Da(x)) continue;
        _.add(x.id);
        let $ = x.location,
            M = $.x - r.x,
            ue = $.z - r.z,
            ze = Math.hypot(M, ue) || 1;
        s(() => x.applyDamage(6, { cause: qe.magic, damagingEntity: e })),
            s(() => x.applyKnockback({ x: (M / ze) * 1.4, z: (ue / ze) * 1.4 }, 0.42)),
            h(x.dimension, p.ray, D(x), woaVm(c, 0.85));
    }
    if (n?.isValid && n.id !== e.id && !_.has(n.id) && !Da(n) && n.getComponent("minecraft:health")) {
        let $ = n.location,
            M = $.x - r.x,
            ue = $.z - r.z,
            ze = Math.hypot(M, ue) || 1;
        ze <= 5.5 &&
            (s(() => n.applyDamage(6, { cause: qe.magic, damagingEntity: e })),
            s(() => n.applyKnockback({ x: (M / ze) * 1.4, z: (ue / ze) * 1.4 }, 0.42)),
            h(n.dimension, p.ray, D(n), woaVm(c, 0.85)));
    }
}
function woaTrackCounter(e, t, n, i, r) {
    if (!i?.isValid || i.id === e.id) return;
    let surge = woaInSurge(t, r),
        need = surge ? 2 : 3,
        cd = surge ? 50 : 100;
    (t.counterHits = (t.counterHits ?? []).filter((a) => r - a <= 80)), t.counterHits.push(r);
    t.counterHits.length >= need &&
        r - (t.lastCounter ?? -100) >= cd &&
        ((t.counterHits = []), (t.lastCounter = r), Hn.run(() => woaCounterShockwave(e, n, i)));
}
function woaInSurge(e, t) {
    return t < (e?.surgeUntil ?? 0);
}
function woaIsCombatThreat(e, t) {
    if (!e?.isValid || e.id === t.id || Da(e) || !e.getComponent("minecraft:health")) return !1;
    let tid = oe(e);
    if (tid === "minecraft:armor_stand") return !1;
    if (tid === "minecraft:player") return !0;
    let fam = s(() => e.getComponent("minecraft:type_family")?.hasTypeFamily("monster"));
    return fam !== void 0
        ? fam
        : (s(() => e.matches({ families: ["monster"] })) ?? !1) || s(() => e.target?.id) === t.id;
}
function woaTrySurge(e, t, n) {
    if (!e?.isValid || s(() => e.getGameMode()) === Cn.Spectator || n - (t.lastSurge ?? -1200) < 1200) return;
    let i = s(() => e.getComponent("minecraft:health")),
        lowHp = !!i && i.currentValue > 0 && i.currentValue <= i.effectiveMax * 0.5,
        near = 0;
    if (!lowHp) {
        let ents =
            s(() =>
                e.dimension.getEntities({
                    location: e.location,
                    maxDistance: 7.5,
                    excludeFamilies: ["inanimate"],
                    excludeTypes: ["minecraft:item", "minecraft:xp_orb", "minecraft:armor_stand"],
                })
            ) ?? [];
        for (let g of ents) woaIsCombatThreat(g, e) && near++;
    }
    if (!lowHp && near < 2) return;
    (t.surgeUntil = n + 200), (t.lastSurge = n);
    let dim = e.dimension,
        a = ge(e, 0.05),
        hd = Y(e);
    s(() => ie(e, 4)),
        s(() => e.addEffect("speed", 200, { amplifier: 1, showParticles: !1 })),
        s(() => e.addEffect("strength", 200, { amplifier: 0, showParticles: !1 })),
        T(dim, b.adapted, hd, 1.15, 1.1),
        T(dim, b.undying, hd, 1.0, 0.7),
        Z(e, w.evoSurge),
        h(dim, p.seal, a, woaVm(woaSurgeColor, 1.38, 1.15)),
        h(dim, p.runeRing, a, woaVm(woaCrimsonColor, 1.45, -1.6)),
        h(dim, p.vortex, a, woaVm(woaSurgeColor, 1.2)),
        h(dim, p.pillar, a, woaVm(woaSurgeColor, 1.15)),
        h(dim, p.beamCore, a, woaVm(woaSurgeColor, 1.18)),
        h(dim, p.shockwave, a, woaVm(woaSurgeColor, 1.25)),
        h(dim, p.shockwave, { x: a.x, y: a.y + 0.02, z: a.z }, woaVm(woaCrimsonColor, 1.45)),
        h(dim, p.halo, hd, woaVm(woaSurgeColor, 1.25)),
        h(dim, p.flash, D(e), woaVm(woaSurgeColor, 1.4)),
        woaLowFx() ||
            (woaRing(dim, p.crescent, D(e), 6, 1.1, woaSurgeColor, 0.95, 0),
            woaRing(dim, p.orb, D(e), 8, 1.2, woaSurgeColor, 0.98, 0)),
        woaShake(e, 0.24, 0.36);
}
function woaTickSurge(e, t, n) {
    if (!woaInSurge(t, n)) return;
    if (n % 2 === 0 && !woaLowFx()) {
        let ang = n * 0.32,
            c = D(e),
            dim = e.dimension;
        h(dim, p.orb, { x: c.x + Math.cos(ang) * 0.95, y: c.y + 0.15, z: c.z + Math.sin(ang) * 0.95 }, woaVm(woaSurgeColor, 0.85)),
            h(dim, p.ray, { x: c.x + Math.cos(ang + Math.PI) * 0.95, y: c.y - 0.15, z: c.z + Math.sin(ang + Math.PI) * 0.95 }, woaVm(woaCrimsonColor, 0.78));
    }
    n % 10 === 0 && !Ze(e.id, n) && te(e, "fast"),
        n % 20 === 0 &&
            (h(e.dimension, p.halo, Y(e), woaVm(woaSurgeColor, 0.95)),
            woaLowFx() || h(e.dimension, p.runeRing, ge(e, 0.05), woaVm(woaSurgeColor, 0.9, -1.3)));
}
function woaCanStand(e, t, n, i, r = !1) {
    let a = s(() => e.getBlock({ x: t, y: n, z: i })),
        o = s(() => e.getBlock({ x: t, y: n + 1, z: i })),
        b0 = !r && s(() => e.getBlock({ x: t, y: n - 1, z: i })),
        ok = (blk) => {
            if (!blk) return !1;
            let tid = s(() => blk.typeId) ?? "";
            return (!tid.includes("lava") || r) && (blk.isAir || blk.isLiquid || blk.isSolid === !1);
        };
    return (!b0 || !(s(() => b0.typeId) ?? "").includes("lava")) && ok(a) && ok(o);
}
function woaCheckBlink(e, t, n, i, r) {
    if (!r || !i || !s(() => e.isSneaking) || !woaIsAdapted(t, "mob:minecraft:enderman") || n - (t.lastBlink ?? -120) < 120)
        return;
    let dim = e.dimension,
        loc = e.location,
        dir = ht(s(() => e.getViewDirection()) ?? { x: 0, y: 0, z: 1 }),
        minY = s(() => dim.heightRange?.min) ?? (dim.id === "minecraft:overworld" ? -64 : 0),
        lavaOk = woaIsAdapted(t, "env:lava"),
        dest;
    for (let dist of [5.5, 4.5, 3.5, 2.5]) {
        let tx = loc.x + dir.x * dist,
            ty = Math.max(minY + 1, loc.y + dir.y * dist),
            tz = loc.z + dir.z * dist,
            bx = Math.floor(tx),
            bz = Math.floor(tz);
        for (let dy of [0, 1, -1]) {
            let by = Math.floor(ty + dy);
            if (by > minY && woaCanStand(dim, bx, by, bz, lavaOk)) {
                dest = { x: bx + 0.5, y: by + 0.05, z: bz + 0.5 };
                break;
            }
        }
        if (dest) break;
    }
    if (!dest) return;
    let from = D(e),
        fromGnd = ge(e, 0.05),
        ok = !1;
    try {
        ok =
            typeof e.tryTeleport == "function"
                ? e.tryTeleport(dest, { checkForBlocks: !0 })
                : (e.teleport(dest, { checkForBlocks: !0 }), !0);
    } catch {
        ok = !1;
    }
    if (!ok) return;
    t.lastBlink = n;
    let clr = { r: 0.82, g: 0.36, b: 1.0 };
    h(dim, p.deflect, from, woaVm(clr, 0.95)),
        h(dim, p.runeRing, fromGnd, woaVm(clr, 0.92, -1.6)),
        woaLowFx() || (h(dim, p.vortex, fromGnd, woaVm(clr, 0.82)), woaRing(dim, p.orb, from, 6, 0.75, clr, 0.82, 0)),
        h(dim, p.sonic, { x: dest.x, y: dest.y + 0.9, z: dest.z }, woaVm(clr, 1.05)),
        h(dim, p.crescent, { x: dest.x, y: dest.y + 0.9, z: dest.z }, woaVm(woaGold, 0.95, 1.4)),
        h(dim, p.deflect, { x: dest.x, y: dest.y + 0.9, z: dest.z }, woaVm(woaGold, 1.0)),
        h(dim, p.orb, { x: dest.x, y: dest.y + 0.9, z: dest.z }, woaVm(clr, 0.95)),
        woaLowFx() || h(dim, p.seal, { x: dest.x, y: dest.y + 0.05, z: dest.z }, woaVm(clr, 0.88, 1.2)),
        T(dim, b.nullify, dest, 1.45, 0.85),
        Z(e, w.trophyBlink);
}
function woaCheckSonicSense(e, t, n) {
    let sn = s(() => e.isSneaking) ? (woaSneakTicks.get(e.id) ?? 0) + 1 : 0;
    if ((woaSneakTicks.set(e.id, sn), sn < 20 || !woaIsAnyAdapted(t, ["mob:minecraft:warden", "env:sonic_boom"]))) return;
    if (n - (t.lastSonic ?? -60) < 40) return;
    t.lastSonic = n;
    let dim = e.dimension,
        loc = e.location,
        ents =
            s(() =>
                dim.getEntities({
                    location: loc,
                    maxDistance: 18,
                    excludeFamilies: ["inanimate"],
                    excludeTypes: ["minecraft:item", "minecraft:xp_orb", "minecraft:armor_stand"],
                })
            ) ?? [],
        targets = [],
        shown = 0;
    for (let g of ents) {
        if (!g.isValid || g.id === e.id || !g.getComponent("minecraft:health")) continue;
        targets.push({ g, threat: woaIsCombatThreat(g, e) ? 1 : 0, dist: Fn(g.location, loc) });
    }
    targets.sort((a, o) => o.threat - a.threat || a.dist - o.dist);
    h(dim, p.sonic, D(e), woaVm(woaCyanColor, 1.35)),
        h(dim, p.halo, D(e), woaVm(woaCyanColor, 1.1)),
        woaLowFx() || h(dim, p.runeRing, ge(e, 0.05), woaVm(woaCyanColor, 1.15, -1.3)),
        T(dim, b.nullify, Y(e), 0.55, 0.45);
    for (let { g } of targets) {
        let gl = D(g);
        h(dim, p.sonic, gl, woaVm(woaCyanColor, 0.85)),
            h(dim, p.ray, gl, woaVm(woaCyanColor, 1.1)),
            h(dim, p.orb, { x: gl.x, y: gl.y + 1.25, z: gl.z }, woaVm(woaCyanColor, 1.0)),
            woaLowFx() || h(dim, p.pillar, ge(g, 0.05), woaVm(woaCyanColor, 0.72)),
            shown++;
        if (shown >= 12) break;
    }
    sn < 25 && Z(e, w.trophySonic);
}
function woaCheckBreezeStep(e, t, n, i, r) {
    if (
        !r ||
        !i ||
        s(() => e.isSneaking) ||
        !F.has(e.id) ||
        !woaIsAnyAdapted(t, ["mob:minecraft:breeze", "proj:minecraft:breeze_wind_charge_projectile"]) ||
        n - (t.lastBreeze ?? -20) < 20
    )
        return;
    t.lastBreeze = n;
    let { f: fwd } = woaHoriz(e),
        gnd = ge(e, 0.1);
    s(() => e.applyKnockback({ x: fwd.x * 0.48, z: fwd.z * 0.48 }, 0.54)),
        h(e.dimension, p.sonic, gnd, woaVm(woaCyanColor, 0.95)),
        h(e.dimension, p.crescent, gnd, woaVm({ r: 0.88, g: 0.98, b: 1.0 }, 0.95, 1.5)),
        h(e.dimension, p.halo, gnd, woaVm(woaCyanColor, 0.92)),
        h(e.dimension, p.ray, ge(e, 0.2), woaVm({ r: 0.88, g: 0.98, b: 1.0 }, 0.85)),
        T(e.dimension, b.slash, e.location, 1.5, 0.45);
}
function woaTickTrophies(e, t, n) {
    if (!e?.isValid || s(() => e.getGameMode()) === Cn.Spectator) return;
    let onGround = s(() => e.isOnGround) ?? !0,
        prevGround = woaGrounded.get(e.id) ?? !0;
    woaGrounded.set(e.id, onGround);
    let velY = s(() => e.getVelocity().y) ?? 0,
        jumping = (s(() => e.isJumping) ?? !1) || (prevGround && !onGround && velY > 0.2);
    woaCheckBlink(e, t, n, jumping, prevGround),
        woaCheckBreezeStep(e, t, n, jumping, prevGround),
        woaCheckSonicSense(e, t, n);
}
function woaVoidRescue(e, t, n) {
    if (!e?.isValid || s(() => e.getGameMode()) === Cn.Spectator) return;
    let dim = e.dimension,
        r = e.location,
        minY = s(() => dim.heightRange?.min) ?? (dim.id === "minecraft:overworld" ? -64 : 0);
    if (r.y >= minY - 2 || !woaIsAnyAdapted(t, ["env:fall", "env:void"]) || n - (t.lastVoidRescue ?? -1200) < 1200)
        return;
    (t.lastVoidRescue = n), (t.graceUntil = Math.max(t.graceUntil, n + 100));
    r.y < minY - 4 && s(() => e.teleport({ x: r.x, y: minY + 1, z: r.z }));
    let { f: fwd } = woaHoriz(e);
    s(() => e.clearVelocity()),
        s(() => e.applyKnockback({ x: fwd.x * 0.45, z: fwd.z * 0.45 }, 1.95)),
        R(16, () => {
            e?.isValid &&
                (s(() => e.addEffect("levitation", 45, { amplifier: 2, showParticles: !1 })),
                s(() => e.addEffect("slow_falling", 160, { amplifier: 0, showParticles: !1 })));
        }),
        te(e, "full"),
        T(dim, b.undying, Y(e)),
        Z(e, w.evoVoid),
        h(dim, p.seal, ge(e, 0.05), woaVm(woaGold, 1.35, 1.1)),
        h(dim, p.runeRing, ge(e, 0.05), woaVm(woaGold, 1.4, -1.5)),
        h(dim, p.vortex, ge(e, 0.05), woaVm(woaGold, 1.2)),
        h(dim, p.pillar, ge(e, 0.05), woaVm(woaGold, 1.2)),
        h(dim, p.beamCore, ge(e, 0.05), woaVm(woaGold, 1.25)),
        h(dim, p.shockwave, ge(e, 0.05), woaVm(woaGold, 1.3)),
        h(dim, p.halo, Y(e), woaVm(woaGold, 1.25)),
        woaLowFx() ||
            [4, 8, 12, 16].forEach((dt) =>
                R(dt, () => {
                    e?.isValid &&
                        (h(e.dimension, p.halo, ge(e, 0.05), woaVm(woaGold, 0.95)),
                        h(e.dimension, p.sonic, ge(e, 0.05), woaVm(woaWhiteGold, 0.88)));
                })
            );
}
function woaSuffocationPhase(e) {
    if (!e?.isValid) return;
    let gm = s(() => e.getGameMode());
    if (gm === Cn.Adventure || gm === Cn.Spectator) return;
    let dim = e.dimension,
        loc = e.location,
        head = e.getHeadLocation(),
        xs = [Math.floor(loc.x - 0.28), Math.floor(loc.x), Math.floor(loc.x + 0.28)],
        zs = [Math.floor(loc.z - 0.28), Math.floor(loc.z), Math.floor(loc.z + 0.28)],
        ys = [Math.floor(head.y), Math.floor(loc.y)],
        seen = new Set(),
        broke = 0;
    for (let by of ys)
        for (let bx of xs)
            for (let bz of zs) {
                let key = `${bx},${by},${bz}`;
                if (seen.has(key)) continue;
                seen.add(key);
                let blk = s(() => dim.getBlock({ x: bx, y: by, z: bz }));
                if (
                    !blk ||
                    blk.isAir ||
                    blk.isLiquid ||
                    blk.isSolid === !1 ||
                    f.uncuttable.has(blk.typeId) ||
                    s(() => blk.getComponent("minecraft:inventory"))
                )
                    continue;
                let c = { x: bx + 0.5, y: by + 0.5, z: bz + 0.5 };
                Ba(dim, blk, c) &&
                    (h(dim, p.deflect, c, woaVm(woaGold, 0.95)),
                    h(dim, p.severCut, c, woaVm(woaGold, 0.92)),
                    woaLowFx() || h(dim, p.burst, c, woaVm(woaGold, 0.72)),
                    broke++);
            }
    broke > 0 && (T(dim, b.nullify, Y(e), 1.3, 0.7), Z(e, w.evoPhase));
}
function woaBlastJump(e, t) {
    if (!e?.isValid) return;
    let dim = e.dimension,
        { f: fwd } = woaHoriz(e),
        clr = woaTheme(t);
    s(() => e.applyKnockback({ x: fwd.x * 1.35, z: fwd.z * 1.35 }, 1.15)),
        T(dim, b.nullify, Y(e), 1.25, 0.95),
        Z(e, w.evoBlast),
        h(dim, p.shockwave, ge(e, 0.1), woaVm(clr, 1.18)),
        h(dim, p.sonic, D(e), woaVm(woaGold, 1.15)),
        h(dim, p.crescent, D(e), woaVm(clr, 1.05, 1.3)),
        h(dim, p.deflect, D(e), woaVm(woaGold, 1.0)),
        woaLowFx() || h(dim, p.runeRing, ge(e, 0.05), woaVm(clr, 1.05, -1.5));
}
function woaEnvEvolution(e, t, n) {
    if ((n % 4 === 0 && woaVoidRescue(e, t, n), n % 10 !== 0)) return;
    let i = e.dimension,
        r = e.location,
        a = Math.floor(r.x),
        o = Math.floor(r.y),
        c = Math.floor(r.z);
    if (woaIsAdapted(t, "env:drowning") && s(() => e.isInWater)) {
        s(() => e.addEffect("water_breathing", 60, { amplifier: 0, showParticles: !1 })),
            s(() => e.addEffect("conduit_power", 60, { amplifier: 0, showParticles: !1 })),
            n % 30 === 0 && h(i, p.orb, D(e), woaVm({ r: 0.22, g: 0.76, b: 1.0 }, 0.6));
    }
    let g = woaIsAdapted(t, "env:lava"),
        _ =
            g ||
            woaIsAnyAdapted(t, [
                "env:fire",
                "env:soul_fire",
                "env:burning",
                "env:magma",
                "env:campfire",
                "env:soul_campfire",
                "env:sulfur_cube_magma",
            ]);
    if (_) {
        let x = s(() => i.getBlock({ x: a, y: o, z: c })?.typeId),
            $ = s(() => i.getBlock({ x: a, y: o - 1, z: c })?.typeId),
            M = (x && woaFireBlocks.has(x)) || ($ && woaFireBlocks.has($)),
            ue = !!s(() => e.getComponent("minecraft:onfire"));
        (M || ue) &&
            (s(() => e.extinguishFire(!1)),
            s(() => e.addEffect("fire_resistance", 60, { amplifier: 0, showParticles: !1 })),
            M &&
                n % 20 === 0 &&
                nt(e) > 0 &&
                (s(() => ie(e, 1)),
                h(i, p.regen, ge(e, 0.1), woaVm(g ? { r: 1.0, g: 0.42, b: 0.1 } : woaHealColor, 0.7))));
    }
    if (woaIsAdapted(t, "env:freezing")) {
        let x = s(() => i.getBlock({ x: a, y: o, z: c })),
            $ = s(() => i.getBlock({ x: a, y: o + 1, z: c })),
            M = x?.typeId === "minecraft:powder_snow",
            ue = $?.typeId === "minecraft:powder_snow";
        if (M || ue) {
            s(() => e.addEffect("speed", 60, { amplifier: 0, showParticles: !1 }));
            let ze = s(() => e.getGameMode());
            ze !== Cn.Adventure &&
                ze !== Cn.Spectator &&
                (M && s(() => x.setType("minecraft:air")),
                ue && s(() => $.setType("minecraft:air")),
                h(i, p.orb, D(e), woaVm({ r: 0.65, g: 0.95, b: 1.0 }, 0.75)));
        }
    }
}
function woaUndyingFx(e, t) {
    if (!e?.isValid) return;
    let n = e.dimension,
        i = woaTheme(t),
        r = ge(e, 0.05),
        a = Y(e);
    h(n, p.seal, r, woaVm(woaGold, 1.18, 1)),
        h(n, p.shockwave, r, woaVm(woaGold, 1.05)),
        h(n, p.beamCore, r, woaVm(woaGold, 0.95)),
        h(n, p.pillar, r, woaVm(woaGold, 1.0)),
        h(n, p.flash, a, woaVm(woaGold, 1.35)),
        h(n, p.burst, D(e), woaVm(i, 0.95)),
        woaPerip(e, p.orb, woaGold, 1.15),
        woaShake(e, 0.22, 0.35);
}
function ye(e, t = b.spin, n = "spin", i) {
    let r = Y(e);
    T(e.dimension, t, r), woaSpinFx(e, n, i);
}
function jn(e, t, n = !0, i) {
    let r = Y(e);
    n && T(e.dimension, b.adapted, r), woaFullFx(e, i), t && R(m.fullClickTick, t);
}
function Gn(e, t) {
    let n = Y(e);
    T(e.dimension, b.nullify, n), woaNullFx(e, t, !1);
}
import { system as Un } from "@minecraft/server";
import "@minecraft/server";
var Jn = {
        wheel: 0,
        shield: 1,
        heart: 2,
        heartDim: 3,
        handleOn: 4,
        handleOff: 5,
        pipOn: 6,
        pipOff: 7,
        skull: 8,
        arrow: 9,
        flame: 10,
        lava: 11,
        explosion: 12,
        impact: 13,
        water: 14,
        snow: 15,
        lightning: 16,
        magic: 17,
        wither: 18,
        sonic: 19,
        thorn: 20,
        anvil: 21,
        potion: 22,
        thermo: 23,
        player: 24,
        sword: 25,
        sparkle: 26,
        check: 27,
        suffocation: 28,
        magma: 29,
        hourglass: 30,
        dot: 31,
        swordDim: 33,
        weaponSword: 34,
        weaponAxe: 35,
        weaponSpear: 36,
        weaponTrident: 37,
        weaponMace: 38,
        weaponShovel: 39,
        weaponPickaxe: 40,
        weaponHoe: 41,
    },
    u = Object.fromEntries(Object.entries(Jn).map(([e, t]) => [e, String.fromCharCode(Wn + t)]));
function gt(e, t) {
    let n = "";
    for (let i = 0; i < t; i++) n += i < e ? u.pipOn : u.pipOff;
    return n;
}
function Nn(e, t) {
    let n = "";
    for (let i = 0; i < t; i++) n += (i ? " " : "") + (i === e ? u.handleOn : u.handleOff);
    return n;
}
import { EntityDamageCause as y, EntityTypes as Yn, EquipmentSlot as Zn } from "@minecraft/server";
import { EquipmentSlot as Qn } from "@minecraft/server";
var yt = Math.max(1, Math.floor(V.scanInterval / V.kinds.length));
function wt(e) {
    return V.tagPrefix + e.id;
}
function Xn(e, t) {
    let n = wt(t),
        i = `r=${V.scanRadius},type=!player`;
    s(() => e.runCommand(`tag @e[${i},tag=${n}] remove ${n}`));
    for (let r of t.items)
        s(() => e.runCommand(`tag @e[${i},hasitem={item=${r},location=slot.weapon.mainhand}] add ${n}`));
}
function ei(e, t) {
    let n = t % V.scanInterval;
    if (n % yt !== 0) return;
    let i = V.kinds[n / yt];
    i && Xn(e, i);
}
function ti(e) {
    let t = s(() => e.getComponent("minecraft:equippable")?.getEquipment(Qn.Mainhand)?.typeId);
    if (t) return V.kinds.find((n) => n.items.includes(t));
}
function ni(e) {
    let t = q(e);
    return t ? ti(t) : V.kinds.find((n) => s(() => e.hasTag(wt(n))));
}
function vt(e) {
    return V.kinds.find((t) => t.id === e);
}
function ii(e) {
    return vt(e)?.glyph;
}
function _t(e) {
    return typeof e == "string" ? { text: e } : e;
}
function k(...e) {
    return { rawtext: e.map(_t) };
}
function d(e, ...t) {
    return t.length ? { translate: e, with: { rawtext: t.map(_t) } } : { translate: e };
}
var ri = new Set([
        "fire",
        "soul_fire",
        "burning",
        "campfire",
        "soul_campfire",
        "lava",
        "magma",
        "sulfur_cube_magma",
        "explosion",
        "creeper_explosion",
        "charged_creeper_explosion",
        "tnt_explosion",
        "end_crystal_explosion",
        "bed_explosion",
        "fireball_explosion",
        "wither_birth_explosion",
        "wither_skull_explosion",
        "sulfur_cube_explosion",
        "elytra_firework",
        "firework",
        "fall",
        "fly_into_wall",
        "anvil",
        "falling_block",
        "piston",
        "stalactite",
        "stalagmite",
        "drowning",
        "suffocation",
        "freezing",
        "lightning",
        "magic",
        "wither",
        "sonic_boom",
        "contact",
        "cactus",
        "sweet_berry_bush",
        "thorns",
        "guardian_spikes",
        "elder_guardian_spikes",
        "temperature",
        "starvation",
        "unknown",
        "projectile",
        "charging",
    ]),
    ai = new Set(["sword", "axe", "spear", "trident", "mace", "shovel", "pickaxe", "hoe"]),
    xt = {
        poison: "potion.poison",
        fatal_poison: "woa.effect.fatal_poison",
        wither: "woa.effect.wither",
        slowness: "potion.moveSlowdown",
        weakness: "potion.weakness",
        mining_fatigue: "potion.digSlowDown",
        blindness: "potion.blindness",
        darkness: "effect.darkness",
        nausea: "potion.confusion",
        hunger: "potion.hunger",
        levitation: "potion.levitation",
        infested: "potion.infested",
        oozing: "potion.oozing",
        weaving: "potion.weaving",
        wind_charged: "potion.windCharged",
        bad_omen: "woa.effect.bad_omen",
        raid_omen: "woa.effect.raid_omen",
        trial_omen: "woa.effect.trial_omen",
    },
    w = {
        hudTitle: d("woa.hud.title"),
        adapted: d("woa.hud.adapted"),
        idle: d("woa.hud.idle"),
        sword: d("woa.hud.slash"),
        ready: d("woa.hud.ready"),
        seconds: (e) => d("woa.hud.seconds", String(e)),
        equip: k("\xA78\u300C \xA7f", d("woa.toast.equip"), " \xA78\u300D"),
        unequip: k(`${u.wheel} \xA77`, d("woa.toast.unequip")),
        death: k(`${u.wheel} \xA77`, d("woa.toast.death")),
        progress: (e, t, n) => k(`${e} \xA7f`, t, `  ${n}`),
        adaptedTag: k("\xA76\xA7l", d("woa.toast.adapted")),
        cure: k(`${u.sword} \xA7f`, d("woa.toast.cured")),
        forgotten: (e, t) => k(`${u.wheel} \xA77`, d("woa.toast.forgotten"), ` \xA78\xB7 ${e} \xA7f`, t),
        starving: k(`${u.heartDim} \xA77`, d("woa.toast.starving")),
        evoSupercharge: k(`${u.lightning} \xA7b`, d("woa.evo.supercharge")),
        evoCounter: k(`${u.shield} \xA76`, d("woa.evo.counter")),
        evoSurge: k(`${u.sparkle} \xA76\xA7l`, d("woa.evo.surge")),
        evoVoid: k(`${u.sparkle} \xA76`, d("woa.evo.void")),
        evoPhase: k(`${u.suffocation} \xA7e`, d("woa.evo.phase")),
        evoBlast: k(`${u.explosion} \xA76`, d("woa.evo.blast")),
        trophyBlink: k(`${u.sparkle} \xA7d`, d("woa.trophy.blink")),
        trophySonic: k(`${u.sonic} \xA7b`, d("woa.trophy.sonic")),
        swordPierce: k(`${u.sword} \xA7e`, d("woa.sword.pierce")),
        swordPrimed: k(`${u.sparkle} \xA76`, d("woa.sword.primed")),
        swordSever: k(`${u.sword} \xA7c`, d("woa.sword.sever")),
        swordSlash: (e, t) => k(t ? `${u.sparkle} \xA76\xA7l` : `${u.sword} \xA7f`, d(`woa.sword.${e}`)),
        soulbound: k("\xA78", d("woa.lore.soulbound")),
        env: (e) => d(`woa.env.${e}`),
        weapon: (e) => d(`woa.weapon.${e}`),
        explosionOf: (e) => d("woa.env.explosion_of", e),
        fireworkBy: (e) => d("woa.env.firework_by", e),
    };
import { EntityDamageCause as v } from "@minecraft/server";
var re = { spins: l.heavy, icon: u.flame },
    A = { spins: l.arcane, icon: u.explosion },
    kt = { spins: l.light, icon: u.impact },
    Pe = { spins: l.light, icon: u.anvil },
    bt = { spins: l.heavy, icon: u.anvil },
    Oe = { spins: l.light, icon: u.thorn },
    Le = { spins: l.heavy, icon: u.thorn },
    St = { spins: l.heavy, icon: u.magma },
    oi = {
        fire: re,
        soul_fire: re,
        burning: re,
        campfire: re,
        soul_campfire: re,
        explosion: A,
        creeper_explosion: A,
        charged_creeper_explosion: A,
        tnt_explosion: A,
        end_crystal_explosion: A,
        bed_explosion: A,
        fireball_explosion: A,
        wither_birth_explosion: A,
        wither_skull_explosion: A,
        sulfur_cube_explosion: A,
        elytra_firework: A,
        fall: kt,
        fly_into_wall: kt,
        anvil: Pe,
        falling_block: Pe,
        piston: Pe,
        stalactite: bt,
        stalagmite: bt,
        contact: Oe,
        cactus: Oe,
        sweet_berry_bush: Oe,
        thorns: Le,
        guardian_spikes: Le,
        elder_guardian_spikes: Le,
        magma: St,
        sulfur_cube_magma: St,
    },
    si = [
        ["explosion_", A],
        ["firework_", A],
    ],
    li = ["fire", "soul_fire", "burning", "campfire", "soul_campfire"],
    ci = [
        "env:fire",
        "env:explosion",
        "env:impact",
        "env:crushing",
        "env:stalactite",
        "env:contact",
        "env:thorns",
        "env:magma",
    ];
function Ct(e) {
    return oi[e] ?? si.find(([t]) => e.startsWith(t))?.[1];
}
function ae(e) {
    try {
        return e?.typeId;
    } catch {
        return;
    }
}
function fi(e, t) {
    try {
        return !!e && !!t && e.id === t.id;
    } catch {
        return !1;
    }
}
function Et(e) {
    let t = e.indexOf(":");
    return t >= 0 ? e.slice(t + 1) : e;
}
function At(e, t) {
    try {
        let { x: n, y: i, z: r } = e.location;
        return e.dimension.getBlock({ x: Math.floor(n) + t.x, y: Math.floor(i) + t.y, z: Math.floor(r) + t.z })?.typeId;
    } catch {
        return;
    }
}
var we = [];
for (let e of [0, 1, -1])
    for (let [t, n] of [
        [0, 0],
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ])
        we.push({ x: t, y: e, z: n });
var ui = "minecraft:fire",
    di = "minecraft:soul_fire",
    mi = "minecraft:cactus",
    pi = "minecraft:sweet_berry_bush";
function hi(e) {
    if (!e) return "fire";
    for (let t of [we[0], we[5]]) {
        let n = At(e, t);
        if (n === di) return "soul_fire";
        if (n === ui) return "fire";
    }
    return "fire";
}
function gi(e) {
    if (!e) return "contact";
    let t = we.map((n) => At(e, n));
    return t.includes(pi) ? "sweet_berry_bush" : t.includes(mi) ? "cactus" : "contact";
}
function yi(e) {
    try {
        return !!e?.getComponent("minecraft:is_charged");
    } catch {
        return !1;
    }
}
var Mt = {
        "minecraft:tnt": "tnt_explosion",
        "minecraft:ender_crystal": "end_crystal_explosion",
        "minecraft:sulfur_cube": "sulfur_cube_explosion",
        "minecraft:ghast": "fireball_explosion",
        "minecraft:wither": "wither_birth_explosion",
    },
    Tt = {
        "minecraft:fireball": "fireball_explosion",
        "minecraft:wither_skull": "wither_skull_explosion",
        "minecraft:wither_skull_dangerous": "wither_skull_explosion",
    };
function wi(e) {
    let t = ae(e.damagingProjectile),
        n = e.damagingEntity,
        i = ae(n);
    if (t && Tt[t]) return Tt[t];
    if (i === "minecraft:creeper") return yi(n) ? "charged_creeper_explosion" : "creeper_explosion";
    if (i && Mt[i]) return Mt[i];
    let r = t ?? i;
    return r ? `explosion_${Et(r)}` : "explosion";
}
function vi(e, t) {
    let n = e.damagingEntity,
        i = ae(n);
    return !i || fi(n, t) ? "elytra_firework" : `firework_${Et(i)}`;
}
function _i(e) {
    let t = ae(e.damagingEntity);
    return t === "minecraft:guardian"
        ? "guardian_spikes"
        : t === "minecraft:elder_guardian"
          ? "elder_guardian_spikes"
          : "thorns";
}
function xi(e) {
    return ae(e.damagingEntity) === "minecraft:sulfur_cube" ? "sulfur_cube_magma" : "magma";
}
function ki(e, t) {
    switch (e.cause) {
        case v.fire:
            return hi(t);
        case v.fireTick:
            return "burning";
        case v.campfire:
            return "campfire";
        case v.soulCampfire:
            return "soul_campfire";
        case v.blockExplosion:
            return "bed_explosion";
        case v.entityExplosion:
            return wi(e);
        case v.fireworks:
            return vi(e, t);
        case v.fall:
            return "fall";
        case v.flyIntoWall:
            return "fly_into_wall";
        case v.anvil:
            return "anvil";
        case v.fallingBlock:
            return "falling_block";
        case v.piston:
            return "piston";
        case v.stalactite:
            return "stalactite";
        case v.stalagmite:
            return "stalagmite";
        case v.contact:
            return gi(t);
        case v.thorns:
            return _i(e);
        case v.magma:
            return xi(e);
        default:
            return;
    }
}
var bi = [
        ["lava", l.heavy, u.lava, [y.lava]],
        ["drowning", l.heavy, u.water, [y.drowning]],
        ["suffocation", l.heavy, u.suffocation, [y.suffocation]],
        ["freezing", l.heavy, u.snow, [y.freezing]],
        ["lightning", l.heavy, u.lightning, [y.lightning]],
        ["magic", l.arcane, u.magic, [y.magic]],
        ["wither", l.arcane, u.wither, [y.wither]],
        ["sonic_boom", l.boss, u.sonic, [y.sonicBoom]],
        ["temperature", l.light, u.thermo, [y.temperature]],
        ["starvation", l.light, u.heartDim, [y.starve]],
    ],
    Si = new Set([y.void, y.selfDestruct]),
    Ci = { [y.none]: "unknown", [y.override]: "unknown" },
    zt = l.light,
    Ei = {
        "minecraft:warden": l.boss,
        "minecraft:wither": l.boss,
        "minecraft:ender_dragon": l.boss,
        "minecraft:vindicator": l.elite,
        "minecraft:ravager": l.elite,
        "minecraft:piglin_brute": l.elite,
        "minecraft:iron_golem": l.elite,
        "minecraft:elder_guardian": l.elite,
        "minecraft:player": l.elite,
        "minecraft:evocation_illager": l.arcane,
        "minecraft:witch": l.arcane,
        "minecraft:enderman": l.heavy,
        "minecraft:phantom": l.heavy,
        "minecraft:hoglin": l.heavy,
        "minecraft:zoglin": l.heavy,
        "minecraft:piglin": l.heavy,
        "minecraft:wither_skeleton": l.heavy,
        "minecraft:blaze": l.heavy,
        "minecraft:guardian": l.heavy,
        "minecraft:shulker": l.heavy,
        "minecraft:breeze": l.heavy,
        "minecraft:polar_bear": l.heavy,
    },
    Ai = {
        "minecraft:wither_skull": l.boss,
        "minecraft:wither_skull_dangerous": l.boss,
        "minecraft:dragon_fireball": l.boss,
        "minecraft:fireball": l.arcane,
        "minecraft:splash_potion": l.arcane,
        "minecraft:lingering_potion": l.arcane,
        "minecraft:snowball": l.light,
        "minecraft:llama_spit": l.light,
    },
    Mi = {
        poison: l.light,
        fatal_poison: l.light,
        wither: l.light,
        slowness: l.light,
        weakness: l.light,
        mining_fatigue: l.light,
        blindness: l.light,
        darkness: l.light,
        nausea: l.light,
        hunger: l.light,
        levitation: l.light,
        infested: l.light,
        oozing: l.light,
        weaving: l.light,
        wind_charged: l.light,
        bad_omen: l.light,
        raid_omen: l.light,
        trial_omen: l.light,
    },
    Ti = l.light,
    zi = l.heavy,
    It = new Map(),
    Dt = {},
    $t = {};
for (let [e, t, n, i] of bi) {
    (Dt[e] = n), ($t[e] = t);
    for (let r of i) It.set(r, { key: `env:${e}`, spins: t });
}
function Vt(e) {
    return $t[e] ?? Ct(e)?.spins ?? zt;
}
function We(e) {
    let t = e.indexOf(":");
    return t >= 0 ? e.slice(t + 1) : e;
}
function He(e) {
    return `mob:${e}`;
}
function ve(e) {
    return { key: He(e), spins: Ei[e] ?? Ti };
}
function oe(e) {
    try {
        return e?.typeId;
    } catch {
        return;
    }
}
var Ii = 3.5,
    qt = {
        "minecraft:skeleton": "minecraft:arrow",
        "minecraft:stray": "minecraft:arrow",
        "minecraft:bogged": "minecraft:arrow",
        "minecraft:parched": "minecraft:arrow",
        "minecraft:pillager": "minecraft:arrow",
        "minecraft:piglin": "minecraft:arrow",
        "minecraft:blaze": "minecraft:small_fireball",
        "minecraft:ghast": "minecraft:fireball",
        "minecraft:shulker": "minecraft:shulker_bullet",
        "minecraft:llama": "minecraft:llama_spit",
        "minecraft:trader_llama": "minecraft:llama_spit",
        "minecraft:snow_golem": "minecraft:snowball",
        "minecraft:wither": "minecraft:wither_skull",
        "minecraft:breeze": "minecraft:breeze_wind_charge_projectile",
        "minecraft:witch": "minecraft:splash_potion",
    };
function Pt(e) {
    if (e) {
        if (/(^|:|_)(bow|crossbow)$/.test(e)) return "minecraft:arrow";
        if (/(^|:|_)trident$/.test(e)) return "minecraft:thrown_trident";
    }
}
function Di(e) {
    try {
        return e.getComponent("minecraft:equippable")?.getEquipment(Zn.Mainhand)?.typeId;
    } catch {
        return;
    }
}
function $i(e, t) {
    try {
        let n = e.location,
            i = t.location;
        return Math.hypot(n.x - i.x, n.y - i.y, n.z - i.z) <= Ii;
    } catch {
        return !1;
    }
}
function Vi(e, t, n, i) {
    return n !== void 0 ? !Pt(n) : qt[t] ? !1 : !!i && $i(e, i);
}
function Be(e) {
    return { key: `proj:${e}`, spins: Ai[e] ?? zi };
}
function qi(e, t) {
    let n = e.cause;
    if (n === y.projectile) {
        let o = e.damagingEntity,
            c = oe(o),
            g = o ? Di(o) : void 0,
            _ = oe(e.damagingProjectile) ?? Pt(g) ?? (c ? qt[c] : void 0);
        if (o && c && c !== "minecraft:player" && Vi(o, c, g, t)) return ve(c);
        if (_) return Be(_);
    }
    if (n === y.entityAttack || n === y.maceSmash) {
        let o = e.damagingEntity,
            c = o ? ni(o) : void 0;
        if (c) return { key: `weapon:${c.id}`, spins: c.spins };
    }
    if (n === y.magic || n === y.wither) {
        let o = Li(e, t);
        if (o) return o;
    }
    let i = ki(e, t);
    if (i) return { key: `env:${i}`, spins: Vt(i) };
    let r = It.get(n);
    if (r) return r;
    if (Si.has(n)) return;
    let a = oe(e.damagingEntity);
    return a
        ? ve(a)
        : {
              key: `env:${
                  Ci[n] ??
                  String(n ?? "unknown")
                      .replace(/([a-z])([A-Z])/g, "$1_$2")
                      .toLowerCase()
              }`,
              spins: zt,
          };
}
var Pi = { [y.magic]: ["fatal_poison", "poison"], [y.wither]: ["wither"] };
function Oi(e, t) {
    if (e)
        return t.find((n) => {
            try {
                return !!e.getEffect(n);
            } catch {
                return !1;
            }
        });
}
function Ot(e) {
    try {
        return e?.id;
    } catch {
        return;
    }
}
function Li(e, t) {
    let n = oe(e.damagingProjectile);
    if (n) return Be(n);
    let i = e.damagingEntity,
        r = oe(i);
    if (i && r && Ot(i) !== Ot(t)) return ve(r);
    let a = Oi(t, Pi[e.cause] ?? []);
    if (a) return _e(a);
}
function Lt(e) {
    return `env:${e}`;
}
function Wi(e) {
    return `proj:${e}`;
}
function Hi(e) {
    let t = e.indexOf(":"),
        n = e.slice(0, t),
        i = e.slice(t + 1);
    if (n === "mob") return ve(i);
    if (n === "proj") return Be(i);
    if (n === "env") return { key: e, spins: Vt(i) };
    if (n === "effect") return _e(i);
    if (n === "weapon") {
        let r = vt(i);
        return r ? { key: e, spins: r.spins } : void 0;
    }
}
function _e(e) {
    let t = We(e),
        n = Mi[t];
    return n ? { key: `effect:${t}`, spins: n } : void 0;
}
function se(e) {
    return We(e)
        .replace(/_v\d+$/, "")
        .split("_")
        .filter(Boolean)
        .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
        .join(" ");
}
function Wt(e) {
    let t = e.indexOf(":");
    return [e.slice(0, t), e.slice(t + 1)];
}
function Bi(e) {
    if (e.startsWith("explosion_")) return w.explosionOf(Re(`minecraft:${e.slice(10)}`));
    if (e.startsWith("firework_")) return w.fireworkBy(Re(`minecraft:${e.slice(9)}`));
}
function Re(e) {
    if (!e.startsWith("minecraft:")) return se(e);
    let t = s(() => Yn.get(e)?.localizationKey);
    return t ? d(t) : se(e);
}
function Ht(e) {
    let [t, n] = Wt(e);
    return t === "env"
        ? ri.has(n)
            ? w.env(n)
            : (Bi(n) ?? se(n))
        : t === "effect"
          ? xt[n]
              ? d(xt[n])
              : se(n)
          : t === "weapon"
            ? ai.has(n)
                ? w.weapon(n)
                : se(n)
            : Re(n);
}
var Ri = new Set([
    "env:starvation",
    "env:unknown",
    "env:fire",
    "env:soul_fire",
    "env:burning",
    "env:campfire",
    "env:soul_campfire",
    "env:lava",
    "env:magma",
    "env:sulfur_cube_magma",
    "env:drowning",
    "env:suffocation",
    "env:freezing",
    "env:contact",
    "env:cactus",
    "env:sweet_berry_bush",
    "env:temperature",
    "env:wither",
]);
function Fi(e) {
    return Ri.has(e) || e.startsWith("effect:");
}
function Fe(e) {
    return Ht(e);
}
function Ki(e) {
    return k(w.adaptedTag, ` \xA78\xB7 ${xe(e)} \xA7f`, Fe(e));
}
function xe(e) {
    let [t, n] = Wt(e);
    if (t === "env") return Dt[n] ?? Ct(n)?.icon ?? u.magic;
    if (t === "effect") return n === "wither" ? u.wither : u.potion;
    if (t === "proj") return u.arrow;
    if (t === "weapon") {
        let i = ii(n);
        return i ? u[i] : u.skull;
    }
    return n === "minecraft:player"
        ? u.player
        : n === "minecraft:wither" || n === "minecraft:wither_skeleton"
          ? u.wither
          : u.skull;
}
var Ke = new Map();
function Bt(e) {
    let t = Ke.get(e);
    return t || ((t = { sent: "", sub: "", refreshAt: 0 }), Ke.set(e, t)), t;
}
function ke(e) {
    return typeof e == "string" ? e : JSON.stringify(e);
}
function Z(e, t, n) {
    try {
        e.onScreenDisplay.setActionBar(t);
    } catch {}
}
function ji(e) {
    return !e.key || !e.entry
        ? [`${u.hourglass} \xA78`, w.idle]
        : [`${xe(e.key)} \xA7f`, Ht(e.key), ` ${gt(e.entry.s, e.entry.n)}`];
}
function Gi(e, t) {
    let n = e.slots ? `\xA7f${e.adapted}\xA78/${e.slots}` : `\xA7f${e.adapted}`;
    return k(
        t,
        w.hudTitle,
        `
${u.shield} ${n} \xA77`,
        w.adapted,
        `
`,
        ...ji(e)
    );
}
function Ui(e) {
    return e.swordTicks === void 0
        ? ["\xA78", w.sword, ` ${u.swordDim}`]
        : e.swordTicks > 0
          ? ["\xA77", w.seconds(Math.ceil(e.swordTicks / 20)), ` ${u.sword}`]
          : ["\xA7a", w.ready, ` ${u.sword}`];
}
function Ji(e) {
    return k(
        `${Nn(e.spin, m.handles)}
`,
        ...Ui(e)
    );
}
function Rt(e, t, n, i, r) {
    t.sent, (t.sent = ke(n)), (t.sub = ke(i)), (t.refreshAt = Un.currentTick + W.refresh);
    try {
        e.onScreenDisplay.setTitle(n, { subtitle: i, fadeInDuration: 0, stayDuration: r, fadeOutDuration: 0 });
    } catch {
        t.sent = "";
    }
}
function Ni(e, t, n) {
    let i = Bt(e.id),
        r = (t.active ? W.active : "") + (t.motion === "still" ? "" : W.spin) + (t.motion === "fast" ? W.fast : ""),
        a = Gi(t, W.show + r),
        o = Ji(t);
    (ke(a) === i.sent && ke(o) === i.sub && n < i.refreshAt) || Rt(e, i, a, o, W.stay);
}
function Yi(e) {
    let t = Bt(e.id);
    t.sent !== W.hide && Rt(e, t, W.hide, " ", 1);
}
function Zi(e) {
    Ke.delete(e);
}
var Ft = 2,
    Q = new Map(),
    be = new Set(),
    F = new Set(),
    Se = new Map();
function Kt() {
    return {
        map: new Map(),
        pending: new Map(),
        spin: 0,
        lastSpin: 0,
        lastFlash: 0,
        lastKey: void 0,
        lastKeyAt: 0,
        graceUntil: 0,
        shieldTick: -10,
        recentEffects: [],
        dirty: !1,
        newWheel: !0,
        firstSpin: void 0,
        lastTurn: void 0,
        lastSlam: -40,
        lastLightning: -40,
        lastCounter: -100,
        counterHits: [],
        surgeUntil: 0,
        lastSurge: -1200,
        lastBlink: -120,
        lastSonic: -60,
        lastBreeze: -20,
        lastVoidRescue: -1200,
        lastPhase: -20,
        lastBlast: -20,
    };
}
function H(e) {
    return be.has(e);
}
function le(e) {
    let t = Q.get(e.id);
    return t || ((t = Kt()), Q.set(e.id, t)), t;
}
function Qi(e) {
    let t = Kt(),
        n = e.getDynamicProperty(he);
    if (typeof n == "string")
        try {
            let i = JSON.parse(n),
                r = (i.v ?? 1) < Ft;
            for (let [a, o] of Object.entries(i.m ?? {})) {
                if (r && ci.includes(a)) continue;
                let g = a.startsWith("effect:") ? _e(a.slice(7)) : void 0,
                    x = g ? g.spins : o[1],
                    c = Math.min(o[0], x);
                t.map.set(a, { s: c, n: x, used: o[2] ?? 0 });
            }
            t.spin = (i.p ?? 0) % m.handles;
        } catch {
            t.map.clear();
        }
    return Q.set(e.id, t), t;
}
function je(e, t) {
    let n = {};
    for (let [r, a] of t.map) a.s > 0 && (n[r] = [a.s, a.n, a.used ?? 0]);
    let i = { m: n, p: t.spin, v: Ft };
    e.setDynamicProperty(he, JSON.stringify(i));
}
function Xi(e) {
    let t = Q.get(e.id);
    t ? (t.map.clear(), t.pending.clear(), je(e, t)) : e.setDynamicProperty(he, void 0);
}
function er(e) {
    Q.delete(e.id), e.setDynamicProperty(he, void 0);
}
function tr(e) {
    Q.delete(e), be.delete(e), F.delete(e);
}
function X(e) {
    let t = 0;
    for (let n of e.map.values()) n.s >= n.n && t++;
    return t;
}
function B(...e) {
    return e.map(He);
}
function jt(...e) {
    return e.map(Wi);
}
function ee(...e) {
    return e.map(Lt);
}
var nr = [
    B(
        "minecraft:zombie",
        "minecraft:husk",
        "minecraft:drowned",
        "minecraft:zombie_villager",
        "minecraft:zombie_villager_v2",
        "minecraft:zombie_pigman"
    ),
    B("minecraft:skeleton", "minecraft:stray", "minecraft:bogged", "minecraft:parched"),
    B("minecraft:spider", "minecraft:cave_spider"),
    B("minecraft:vindicator", "minecraft:pillager", "minecraft:evocation_illager", "minecraft:vex"),
    B("minecraft:piglin", "minecraft:piglin_brute", "minecraft:zombie_pigman"),
    B("minecraft:hoglin", "minecraft:zoglin"),
    B("minecraft:slime", "minecraft:magma_cube"),
    B("minecraft:guardian", "minecraft:elder_guardian"),
    [
        ...ee(
            "explosion",
            "creeper_explosion",
            "charged_creeper_explosion",
            "tnt_explosion",
            "end_crystal_explosion",
            "bed_explosion",
            "fireball_explosion",
            "wither_birth_explosion",
            "wither_skull_explosion",
            "sulfur_cube_explosion",
            "elytra_firework"
        ),
        ...jt("minecraft:fireball", "minecraft:wither_skull", "minecraft:wither_skull_dangerous"),
    ],
    [
        ...ee("fire", "soul_fire", "burning", "campfire", "soul_campfire", "lava", "magma", "sulfur_cube_magma"),
        ...jt("minecraft:small_fireball"),
    ],
    ee("anvil", "falling_block", "piston", "stalactite", "stalagmite"),
    ee("fall", "fly_into_wall"),
    ee("contact", "cactus", "sweet_berry_bush"),
    ee("thorns", "guardian_spikes", "elder_guardian_spikes"),
    ["effect:poison", "effect:fatal_poison"],
    ["effect:wither", "env:wither"],
    ["effect:blindness", "effect:darkness"],
    ["effect:bad_omen", "effect:raid_omen", "effect:trial_omen"],
];
function ir(e) {
    return e.startsWith("env:explosion_") || e.startsWith("env:firework_") ? Lt("explosion") : e;
}
function rr(e) {
    let t = new Set(),
        n = ir(e);
    for (let i of nr) if (i.includes(n)) for (let r of i) r !== e && t.add(r);
    return [...t];
}
import { system as Ge } from "@minecraft/server";
var Ue = new Map(),
    Ce = new Map();
function Gt(e) {
    let t = new Map();
    for (let n of s(() => e.getEffects()) ?? []) {
        let i = s(() => ({ typeId: n.typeId, duration: n.duration, amplifier: n.amplifier }));
        i && _e(i.typeId) && t.set(i.typeId, { duration: i.duration, amplifier: i.amplifier });
    }
    return t;
}
function ar(e, t) {
    Ue.set(e.id, { tick: t, effects: Gt(e) });
}
function or(e, t) {
    return Ce.get(e)?.has(t) ?? !1;
}
function sr(e, t, n) {
    let i = Ce.get(e.id);
    i || ((i = new Set()), Ce.set(e.id, i)),
        i.add(t),
        s(() => e.removeEffect(t)),
        s(() => e.addEffect(t, n.duration, { amplifier: n.amplifier })),
        Ge.run(() => i.delete(t));
}
function lr(e) {
    let t = Ue.get(e.id);
    t &&
        Ge.run(() => {
            if (!e.isValid) return;
            let n = Ge.currentTick;
            for (let [i, r] of Gt(e)) {
                let a = t.effects.get(i);
                if (!a) {
                    s(() => e.removeEffect(i));
                    continue;
                }
                if (a.duration < 0) continue;
                let o = Math.max(1, a.duration - (n - t.tick));
                (r.duration <= o + 2 && r.amplifier <= a.amplifier) ||
                    sr(e, i, { duration: o, amplifier: a.amplifier });
            }
        });
}
function Ut(e) {
    Ue.delete(e), Ce.delete(e);
}
import { system as cr, world as fr } from "@minecraft/server";
var ur = 0.01,
    Ee = new Map();
function dr(e, t) {
    try {
        return e.clearVelocity(), !0;
    } catch {
        try {
            return e.applyKnockback({ x: 0, z: 0 }, 0), !0;
        } catch {
            return !1;
        }
    }
}
function mr(e, t) {
    if (!(Math.hypot(t.x, t.y, t.z) < ur))
        try {
            e.applyKnockback({ x: t.x, z: t.z }, t.y);
        } catch {}
}
function Jt(e, t) {
    let n = Ee.get(e.id);
    !n || !e.isValid || (Ee.delete(e.id), dr(e, t) && n.velocity && mr(e, n.velocity));
}
function pr(e, t) {
    Ee.set(e.id, { entity: e, velocity: t }), cr.run(() => Jt(e, "next tick"));
}
function hr() {
    fr.afterEvents.entityHurt.subscribe((e) => {
        Ee.has(e.hurtEntity.id) && Jt(e.hurtEntity, "after hurt");
    });
}
import { system as gr } from "@minecraft/server";
var Nt = "xvoid:undying_cooldown",
    ce = new Map(),
    Yt = new Map();
function yr(e, t) {
    let n = t ? S.freshChance : S.analysedChance;
    return Math.min(S.maxChance, n + S.chancePerLevel * e);
}
function wr(e, t, n) {
    let i = Yt.get(e) ?? "normal",
        r = i === "always" ? 100 : i === "never" ? 0 : yr(t, n);
    return Math.random() * 100 < r;
}
function Je(e, t) {
    s(() => e.setDynamicProperty(Nt, t));
}
function Zt(e, t) {
    let n = ce.get(e.id);
    if (n === void 0) {
        let i = s(() => e.getDynamicProperty(Nt));
        (n = typeof i == "number" && i > 0 ? t + i : 0), ce.set(e.id, n), n > 0;
    }
    return n;
}
function vr(e, t, n) {
    ce.set(e.id, t + n), gr.run(() => Je(e, n));
}
function Qt(e) {
    ce.set(e.id, 0), Je(e, void 0);
}
function _r(e, t) {
    let n = Zt(e, t);
    n !== 0 && (t >= n ? Qt(e) : t % S.saveEvery === 0 && Je(e, n - t));
}
function xr(e) {
    ce.delete(e), Yt.delete(e);
}
import { EquipmentSlot as Xt, ItemStack as kr, system as en } from "@minecraft/server";
var Ae = new Map();
function Ne(e) {
    return !!e && e !== L && me.has(e);
}
function Ye(e, t) {
    let n = new kr(t, 1);
    e.nameTag && (n.nameTag = e.nameTag),
        e.keepOnDeath && (n.keepOnDeath = !0),
        e.lockMode && s(() => (n.lockMode = e.lockMode));
    let i = s(() => e.getRawLore()) ?? [];
    i.length && s(() => n.setLore(i));
    let r = s(() => e.getComponent("minecraft:enchantable")?.getEnchantments()) ?? [];
    return r.length && s(() => n.getComponent("minecraft:enchantable")?.addEnchantments(r)), n;
}
function tn(e) {
    let t = e.getComponent("minecraft:equippable");
    if (!t) return;
    let n = t.getEquipment(Xt.Head);
    if (!(!n || !me.has(n.typeId))) return { equipment: t, item: n };
}
function Me(e, t) {
    let n = tn(e);
    return !n || n.item.typeId === t ? !1 : (n.equipment.setEquipment(Xt.Head, Ye(n.item, t)), !0);
}
function te(e, t) {
    let n = mt[t],
        i = tn(e);
    if (!n || !i) return;
    let r = en.currentTick;
    if ((Ae.set(e.id, { kind: t, start: r, until: r + On[t] + 1 }), i.item.typeId === n)) {
        Me(e, L), en.run(() => s(() => Me(e, n)));
        return;
    }
    Me(e, n);
}
function Ze(e, t) {
    return t < (Ae.get(e)?.until ?? 0);
}
function br(e, t) {
    let n = Ae.get(e);
    return !n || t >= n.until || n.kind === "react" || (n.kind === "first" && t < n.start + m.firstJamTicks)
        ? "still"
        : n.kind === "fast"
          ? "fast"
          : "spin";
}
function Sr(e, t, n) {
    Ne(t) && !Ze(e.id, n) && Me(e, L);
}
function Cr(e) {
    let t = e.getComponent("minecraft:inventory")?.container;
    if (t)
        for (let n = 0; n < t.size; n++) {
            let i = t.getItem(n);
            i && Ne(i.typeId) && t.setItem(n, Ye(i, L));
        }
}
function Er(e) {
    if (e.typeId !== "minecraft:item") return;
    let t = s(() => e.getComponent("minecraft:item")?.itemStack);
    if (!t || !Ne(t.typeId)) return;
    let n = e.location,
        i = e.dimension;
    e.remove(), i.spawnItem(Ye(t, L), n);
}
function Ar(e) {
    Ae.delete(e);
}
var Qe = new Map();
var woaDotEffects = new Set(["poison", "fatal_poison", "wither"]);
function isNonDotEffect(e) {
    return e.startsWith("effect:") && !woaDotEffects.has(e.slice(7));
}
function Xe(e, t) {
    let n = e.map.get(t.key);
    return n || ((n = { s: 0, n: t.spins, used: 0 }), e.map.set(t.key, n)), n;
}
function et(e) {
    if (isNonDotEffect(e)) return m.nonDotSpinTicks;
    return m.hitsPerKey[e] ?? m.hitsPerSpin[e.slice(0, e.indexOf(":"))] ?? m.hitsPerSpin.mob ?? 3;
}
function woaTickEffects(e, t, n) {
    let i = s(() => e.getEffects());
    if (!i?.length) return;
    for (let r of i) {
        let a = s(() => r.typeId),
            o = a ? _e(a) : void 0;
        if (!o) continue;
        let c = t.map.get(o.key);
        if (c && c.s >= c.n) {
            or(e.id, a) || (s(() => e.removeEffect(a)), woaNullFx(e, o.key, !0));
            continue;
        }
        if (!isNonDotEffect(o.key)) continue;
        c = c || Xe(t, o);
        let g = t.pending.get(o.key);
        g || ((g = { weight: 2, taken: 0, last: n, hits: 0, lastHit: n }), t.pending.set(o.key, g)), (g.last = n);
        if (t.firstSpin) continue;
        (g.hits = Math.min(m.nonDotSpinTicks, g.hits + 1)),
            (g.lastHit = n),
            g.hits > 0 &&
                g.hits < m.nonDotSpinTicks &&
                g.hits % 20 === 0 &&
                woaExposeFx(e, o.key, g.hits / m.nonDotSpinTicks);
    }
}
function nn(e, t, n, i, r) {
    let a = e.pending.get(t);
    if (
        (a || ((a = { weight: 0, taken: 0, last: r, hits: 0, lastHit: -m.hitGap }), e.pending.set(t, a)),
        (a.weight += n),
        (a.taken += i),
        (a.last = r),
        r - a.lastHit >= m.hitGap)
    ) {
        let o = tt(t) && r - a.lastHit <= m.quickHitWindow;
        (a.hits += o ? m.quickHitValue : 1), (a.lastHit = r), tt(t);
        return !0;
    }
    return !1;
}
function tt(e) {
    return m.attackPrefixes.some((t) => e.startsWith(t));
}
function Mr(e, t) {
    if (t.startsWith("effect:")) {
        let n = t.slice(7);
        for (let i of e.getEffects()) We(i.typeId) === n && s(() => e.removeEffect(i.typeId));
    }
    (t === "env:lava" || li.some((n) => t === `env:${n}`)) && s(() => e.extinguishFire(!1));
}
function Tr(e, t, n) {
    if (!z.useSlots) return;
    let i = [...t.map.entries()].filter(([o, c]) => c.s >= c.n && o !== n);
    if (i.length < z.slots) return;
    i.sort((o, c) => o[1].used - c[1].used);
    let [r, a] = i[0];
    (a.s = 0),
        R(m.fullClickTick + 40, () => {
            e.isValid && Z(e, w.forgotten(xe(r), Fe(r)));
        });
}
function zr(e, t) {
    for (let n of rr(t)) {
        let i = Hi(n);
        if (!i) continue;
        let r = Xe(e, i);
        r.s < Math.floor(r.n / 2) && r.s++;
    }
}
function Ir(e, t, n, i) {
    (i.used = Date.now()),
        zr(t, n),
        Tr(e, t, n),
        Mr(e, n),
        jn(e, () => Z(e, Ki(n)), !0, n),
        R(J.fxDelay, () => Dr(e, n)),
        woaTrySurge(e, t, Hn.currentTick);
}
function Dr(e, t) {
    if (!e.isValid) return;
    let n = e.dimension,
        i = D(e),
        r = Y(e),
        a = ge(e, 0.05),
        o = woaTheme(t);
    h(n, p.pillar, a, woaVm(o, 0.9)),
        h(n, p.shockwave, a, woaVm(o, 0.95)),
        h(n, p.burst, i, woaVm(o, 0.85)),
        T(n, b.adapted, r, 0.85, 1.3);
    let c =
        s(() =>
            n.getEntities({
                location: i,
                maxDistance: J.radius,
                excludeFamilies: ["inanimate"],
                excludeTypes: ["minecraft:item", "minecraft:xp_orb", "minecraft:player"],
            })
        ) ?? [];
    for (let g of c) {
        if (!g.isValid || !g.getComponent("minecraft:health") || Da(g)) continue;
        let _ = g.location,
            x = _.x - i.x,
            $ = _.z - i.z,
            M = Math.hypot(x, $) || 1;
        s(() => g.applyDamage(J.damage, { cause: y.magic, damagingEntity: e })),
            s(() => g.applyKnockback({ x: (x / M) * J.knockback, z: ($ / M) * J.knockback }, J.knockbackUp)),
            h(g.dimension, p.positive, D(g));
    }
}
function $r(e) {
    if (!z.useHunger) return;
    let t = e.getComponent("minecraft:player.exhaustion");
    t && s(() => t.setCurrentValue(Math.min(t.effectiveMax, t.currentValue + z.spinExhaustion)));
}
function Vr(e) {
    if (!z.useHunger) return !1;
    let t = s(() => e.getComponent("minecraft:player.hunger")?.currentValue);
    return typeof t == "number" && t <= 0;
}
function qr(e, t) {
    return t ? 1 : Math.min(1, z.spinHealBase + z.spinHealPerLevel * e);
}
function nt(e) {
    let t = s(() => e.getComponent("minecraft:health"));
    return !t || t.currentValue <= 0 ? 0 : Math.max(0, t.effectiveMax - t.currentValue);
}
function Pr(e, t, n) {
    let i = nt(e) * qr(X(t), n);
    i < 0.5 ||
        (s(() => ie(e, i)),
        T(e.dimension, b.heal, e.location),
        h(e.dimension, p.rise, ge(e)),
        h(e.dimension, p.regen, ge(e, 0.08), woaVm(woaHealColor, n ? 1.05 : 0.72)));
}
function Or(e) {
    return Ln.find((t) => e >= t.minLevel);
}
function Lr(e, t, n) {
    let i = Or(X(t));
    !i || n % i.every !== 0 || nt(e) <= 0 || s(() => ie(e, i.amount));
}
function Wr(e, t) {
    let n = e.pending.get(t),
        i = n ? n.hits - et(t) : 0;
    if (!n || !tt(t) || i <= 0) {
        e.pending.delete(t);
        return;
    }
    (n.hits = i), (n.weight = 0), (n.taken = 0);
}
function Hr(e, t, n) {
    let i = e.map.get(t);
    return i && i.s < i.n && i.s + 1 >= i.n
        ? "adapted"
        : e.newWheel
          ? "first"
          : e.lastTurn?.key === t && n - e.lastTurn.at <= m.fastWindow
            ? "fast"
            : "adapting";
}
function rn(e, t, n, i) {
    (t.spin = (t.spin + 1) % m.handles), (t.lastKey = n), (t.lastKeyAt = i);
    let r = t.map.get(n),
        a = !!r && r.s < r.n;
    a && r.s++;
    let o = a && r.s >= r.n;
    o
        ? (te(e, "full"), (t.lastSpin = i + m.fullLock - m.spinInterval), Ir(e, t, n, r))
        : a && r && Z(e, w.progress(xe(n), Fe(n), gt(r.s, r.n))),
        Pr(e, t, o),
        $r(e),
        s(() => je(e, t));
}
function Br(e, t, n, i) {
    let r = Hr(t, n, i);
    if (((t.newWheel = !1), Wr(t, n), r === "first")) {
        (t.lastSpin = i + m.firstLock - m.spinInterval),
            (t.firstSpin = { key: n, at: i + m.firstLock }),
            te(e, "first"),
            ye(e, b.first, "first", n);
        return;
    }
    (t.lastSpin = i),
        (t.lastTurn = { key: n, at: i }),
        r === "fast"
            ? (te(e, "fast"), ye(e, b.fast, "fast", n))
            : r === "adapting" && (te(e, "spin"), ye(e, b.spin, "spin", n)),
        rn(e, t, n, i);
}
function Rr(e, t, n) {
    let i = t.firstSpin;
    !i || n < i.at || ((t.firstSpin = void 0), rn(e, t, i.key, n));
}
function Fr(e, t) {
    let n = t ? S.freshCooldown : S.cooldown,
        i = t ? S.freshMinCooldown : S.minCooldown;
    return Math.max(i, n - S.cooldownPerLevel * e);
}
var Kr = new Set([qe.void, qe.selfDestruct, qe.override]);
function an(e, t) {
    return Kr.has(e) || t >= S.oneHit;
}
function jr(e, t, n) {
    let i = s(() => e.getComponent("minecraft:health")?.currentValue);
    return typeof i == "number" && i + t - n < 1;
}
function Gr(e, t, n, i) {
    return !an(t, n) && i >= Zt(e, i);
}
function Ur(e, t, n, i, r) {
    vr(e, r, Fr(X(t), i)),
        (t.graceUntil = r + S.healDelay + S.graceAfterHeal),
        (t.lastSpin = Math.max(t.lastSpin, r)),
        (t.spin = (t.spin + 1) % m.handles),
        (t.lastKey = n),
        (t.lastKeyAt = r),
        N.run(() => {
            e.isValid &&
                (s(() => e.getComponent("minecraft:health")?.setCurrentValue(1)),
                te(e, "spin"),
                ye(e, b.spin, "spin", n),
                woaUndyingFx(e, n),
                T(e.dimension, b.undying, Y(e)));
        }),
        R(S.healDelay, () => {
            !e.isValid ||
                !H(e.id) ||
                (ie(e, nt(e)),
                h(e.dimension, p.rise, ge(e)),
                h(e.dimension, p.regen, ge(e, 0.08), woaVm(woaHealColor, 1.15)),
                h(e.dimension, p.halo, Y(e), woaVm(woaGold, 1.1)),
                h(e.dimension, p.positive, D(e)));
        });
}
function Jr(e) {
    let t = e.damageSource;
    return !!(s(() => t.damagingEntity) ?? s(() => t.damagingProjectile));
}
function Nr(e, t, n) {
    (t.shieldTick = n), lr(e);
    let i = t.recentEffects.filter((r) => n - r.tick <= $e.effectWindow);
    (t.recentEffects = []),
        i.length &&
            N.run(() => {
                if (e.isValid) for (let r of i) s(() => e.removeEffect(r.typeId));
            });
}
function Yr(e, t) {
    e.isValid && (Gn(e, t), Ze(e.id, N.currentTick) || te(e, "react"));
}
function Zr(e, t) {
    let n = N.currentTick,
        i = le(t),
        r = qi(e.damageSource, t);
    if (!r) return;
    let a = e.damageSource.cause,
        o = e.damage,
        c = Xe(i, r);
    if (c.s < c.n && n < i.graceUntil && !an(a, e.damage)) {
        e.cancel = !0;
        return;
    }
    if (c.s >= c.n) {
        (c.used = Date.now());
        let blastJump =
            (a === y.entityExplosion || a === y.blockExplosion) &&
            (s(() => t.isOnGround) === !1 || (s(() => t.isJumping) ?? !1));
        Jr(e)
            ? ((e.damage = 0),
              Nr(t, i, n),
              !blastJump &&
                  pr(
                      t,
                      s(() => t.getVelocity())
                  ),
              woaTrackCounter(t, i, r.key, s(() => e.damageSource.damagingEntity), n))
            : ((e.cancel = !0),
              !blastJump &&
                  woaIsPoiseCause(a) &&
                  pr(
                      t,
                      s(() => t.getVelocity())
                  ));
        if (blastJump && n - (i.lastBlast ?? -20) >= 10) {
            (i.lastBlast = n), N.run(() => woaBlastJump(t, r.key));
            return;
        }
        if (a === y.suffocation && n - (i.lastPhase ?? -20) >= 10) {
            (i.lastPhase = n), N.run(() => woaSuffocationPhase(t));
            return;
        }
        if (a === y.lightning && n - (i.lastLightning ?? -40) >= 20) {
            (i.lastLightning = n), N.run(() => woaLightningCharge(t));
            return;
        }
        if ((a === y.fall || a === y.flyIntoWall) && o >= 3 && n - (i.lastSlam ?? -40) >= 20) {
            (i.lastSlam = n), N.run(() => woaFallSlam(t, r.key, o));
            return;
        }
        !Fi(r.key) && n - i.lastFlash >= m.nullifyFlashInterval
            ? ((i.lastFlash = n), N.run(() => Yr(t, r.key)))
            : Fi(r.key) && N.run(() => woaNullFx(t, r.key, !0));
        return;
    }
    e.damage = e.damage * (1 - z.partialMax * (c.s / c.n));
    let g = e.damage,
        _ = c.s === 0,
        k0 = nn(i, r.key, Math.max(1, e.damage), g, n);
    let x = jr(t, o, g),
        $ = Gr(t, a, g, n);
    if (x && $ && wr(t.id, X(i), _)) {
        (e.cancel = !0), Ur(t, i, r.key, _, n);
        return;
    }
    if (k0) {
        let p0 = Math.min(1, (i.pending.get(r.key)?.hits ?? 1) / et(r.key));
        N.run(() => t.isValid && woaExposeFx(t, r.key, p0));
    }
}
function Qr(e) {
    return Math.min(Ve.maxLevelBonus, Ve.bonusPerLevel * e);
}
function Xr(e, t, n) {
    if (!H(t.id) || woaInPierce.has(n.id)) return;
    let i = le(t),
        r = X(i),
        a = Qr(r),
        o = i.map.get(He(n.typeId)),
        c = o && o.s > 0 ? Ve.maxBonus * Math.min(1, o.s / o.n) : 0,
        surge = woaInSurge(i, N.currentTick) ? 1.2 : 1;
    if (a <= 0 && c <= 0 && surge === 1) return;
    let g = e.damage;
    e.damage = g * (1 + a) * (1 + c) * surge;
}
function ea(e) {
    let sv = woaSevered.get(e.entity?.id);
    if (sv && N.currentTick < sv.until) {
        let etype = We(e.effectType ?? "");
        if (etype === "regeneration" || etype === "instant_health") {
            e.cancel = !0;
            return;
        }
    }
    let t = q(e.entity);
    if (!t || !H(t.id) || or(t.id, e.effectType)) return;
    let n = _e(e.effectType);
    if (!n) return;
    let i = le(t),
        r = N.currentTick,
        a = e.duration;
    if (r - i.shieldTick <= $e.effectWindow) {
        e.cancel = !0;
        return;
    }
    let o = Xe(i, n);
    if (o.s >= o.n) {
        (o.used = Date.now()), (e.cancel = !0), N.run(() => t.isValid && woaNullFx(t, n.key, !0));
        return;
    }
    e.duration > 0 && (e.duration = Math.max(1, Math.round(e.duration * (1 - z.partialMax * (o.s / o.n))))),
        (i.recentEffects = i.recentEffects.filter((c) => r - c.tick <= $e.effectWindow)),
        i.recentEffects.push({ typeId: e.effectType, tick: r });
    if (isNonDotEffect(n.key)) {
        let p0 = i.pending.get(n.key);
        if (!p0) {
            (p0 = { weight: 2, taken: 0, last: r, hits: 0, lastHit: r }), i.pending.set(n.key, p0);
            N.run(() => t.isValid && woaExposeFx(t, n.key, 0.05));
        } else p0.last = r;
    } else if (nn(i, n.key, 2, 0, r)) {
        let p0 = Math.min(1, (i.pending.get(n.key)?.hits ?? 1) / et(n.key));
        N.run(() => t.isValid && woaExposeFx(t, n.key, p0));
    }
}
function ta(e) {
    if (!H(e.id)) return;
    Xi(e);
    let t = le(e);
    (t.lastKey = void 0),
        Qt(e),
        (t.graceUntil = 0),
        (t.newWheel = !0),
        (t.firstSpin = void 0),
        (t.lastTurn = void 0),
        (t.lastSlam = -40),
        (t.lastLightning = -40),
        (t.lastCounter = -100),
        (t.counterHits = []),
        (t.surgeUntil = 0),
        (t.lastSurge = -1200),
        (t.lastBlink = -120),
        (t.lastSonic = -60),
        (t.lastBreeze = -20),
        (t.lastVoidRescue = -1200),
        (t.lastPhase = -20),
        (t.lastBlast = -20),
        woaSwordHealAt.delete(e.id),
        woaSwordCombo.delete(e.id),
        woaSwordPrimed.delete(e.id);
}
function on(e, t) {
    let n,
        i = -1,
        r,
        a = -1;
    for (let [o, c] of e.pending) {
        let g = e.map.get(o);
        if (t - c.last > m.exposureWindow || !g || g.s >= g.n) {
            e.pending.delete(o);
            continue;
        }
        let _ = et(o);
        c.hits >= _ && c.weight > i && ((i = c.weight), (n = o));
        let x = c.hits / _;
        x > a && ((a = x), (r = o));
    }
    return { ready: n, watching: r };
}
function na(e, t, n, i) {
    let r = t.newWheel || !!t.firstSpin,
        a = r ? void 0 : i;
    !a && !r && t.lastKey && n - t.lastKeyAt <= m.exposureWindow && (a = t.lastKey);
    let o = a ? t.map.get(a) : void 0,
        c = a ? t.pending.get(a) : void 0;
    return {
        adapted: X(t),
        slots: z.useSlots ? z.slots : void 0,
        key: o ? a : void 0,
        entry: o,
        hits: c?.hits ?? 0,
        need: a ? et(a) : 0,
        spin: t.spin,
        swordTicks: F.has(e.id) ? Math.max(0, (Se.get(e.id) ?? 0) - n) : void 0,
        active: !!i || Ze(e.id, n),
        motion: br(e.id, n),
    };
}
function ia(e, t) {
    let n = le(e);
    Lr(e, n, t),
        Rr(e, n, t),
        woaTickEffects(e, n, t),
        woaEnvEvolution(e, n, t),
        woaTickSurge(e, n, t),
        woaTickTrophies(e, n, t),
        woaScanProjectiles(e, n, t);
    let i = on(n, t);
    i.ready &&
        t - n.lastSpin >= m.spinInterval &&
        (Vr(e)
            ? t >= (Qe.get(e.id) ?? 0) && (Qe.set(e.id, t + 200), Z(e, w.starving))
            : (Br(e, n, i.ready, t), (i = on(n, t)))),
        n.dirty && t % 100 === 0 && ((n.dirty = !1), s(() => je(e, n))),
        Ni(e, na(e, n, t, i.watching), t);
}
function sn(e) {
    Qe.delete(e);
}
import { EquipmentSlot as K, GameMode as ra, ItemLockMode as it, ItemStack as aa } from "@minecraft/server";
import { system as oa, world as ln } from "@minecraft/server";
import {
    CommandPermissionLevel as cn,
    CustomCommandParamType as fn,
    CustomCommandStatus as rt,
    system as un,
} from "@minecraft/server";
import { PlayerPermissionLevel as sa, system as la } from "@minecraft/server";
import { FormCancelationReason as ca, ModalFormData as fa } from "@minecraft/server-ui";
import { world as dn } from "@minecraft/server";
var ua = ["mode", "cut", "keepOnDeath", "lowFx"],
    Te = ["starter", "crafting"],
    mn = "xvoid:world_config",
    da = 1,
    ne = { mode: "starter", cut: !0, keepOnDeath: !1, lowFx: !1 },
    fe,
    pn = [];
function ma(e) {
    if (typeof e != "string") return { ...ne };
    try {
        let t = JSON.parse(e);
        return {
            mode: Te.includes(t.mode) ? t.mode : ne.mode,
            cut: typeof t.cut == "boolean" ? t.cut : ne.cut,
            keepOnDeath: typeof t.keepOnDeath == "boolean" ? t.keepOnDeath : ne.keepOnDeath,
            lowFx: typeof t.lowFx == "boolean" ? t.lowFx : ne.lowFx,
        };
    } catch {
        return { ...ne };
    }
}
function at() {
    if (!fe) {
        fe = ma(dn.getDynamicProperty(mn));
        let e = fe;
    }
    return fe;
}
function pa(e) {
    return at()[e];
}
function hn(e, t) {
    return ua.filter((n) => e[n] !== t[n]);
}
function gn(e, t) {
    let n = at(),
        i = { ...n, ...e },
        r = hn(i, n);
    if (!r.length) return r;
    (fe = i), dn.setDynamicProperty(mn, JSON.stringify({ v: da, ...i }));
    for (let a of pn) a(i, n, t);
    return r;
}
function yn(e) {
    pn.push(e);
}
var wn = {
        mode: "woa.config.mode",
        cut: "woa.config.cut",
        keepOnDeath: "woa.config.keep_on_death",
        lowFx: "woa.config.low_fx",
    },
    P = {
        title: d("woa.config.title"),
        save: d("woa.config.save"),
        opsOnly: k("\xA7c", d("woa.config.ops_only")),
        itemGiven: k("\xA77", d("woa.config.item_given")),
        starter: d("woa.config.mode.starter"),
        crafting: d("woa.config.mode.crafting"),
        label: (e) => d(wn[e]),
        value: (e, t) => {
            let n = t[e];
            return d(e === "mode" ? `woa.config.mode.${n}` : n ? "woa.config.on" : "woa.config.off");
        },
        changed: (e, t, n) => k("\xA76[WoA] \xA7f", d("woa.config.changed", e, d(wn[t]), P.value(t, n))),
    },
    vn = !0,
    ha = 10,
    ga = 20;
function ya(e) {
    return e.playerPermissionLevel === sa.Operator;
}
function wa() {
    let e = at();
    return new fa()
        .title(P.title)
        .dropdown(P.label("mode"), [P.starter, P.crafting], { defaultValueIndex: Te.indexOf(e.mode) })
        .toggle(P.label("cut"), { defaultValue: e.cut })
        .toggle(P.label("keepOnDeath"), { defaultValue: e.keepOnDeath })
        .toggle(P.label("lowFx"), { defaultValue: e.lowFx })
        .submitButton(P.save);
}
function va(e, t) {
    let [n, i, r, a] = t,
        cur = at();
    gn(
        {
            mode: Te[typeof n == "number" ? n : 0] ?? "starter",
            cut: typeof i == "boolean" ? i : cur.cut,
            keepOnDeath: typeof r == "boolean" ? r : cur.keepOnDeath,
            lowFx: typeof a == "boolean" ? a : cur.lowFx,
        },
        e.name
    );
}
function ot(e, t = 0) {
    if (!ya(e)) {
        e.sendMessage(P.opsOnly);
        return;
    }
    wa()
        .show(e)
        .then((n) => {
            if (n.cancelationReason === ca.UserBusy && t < ga) {
                la.runTimeout(() => ot(e, t + 1), ha);
                return;
            }
            !(n.canceled || !n.formValues || !e.isValid) && va(e, n.formValues);
        })
        .catch((n) => {});
}
import { ItemStack as _a } from "@minecraft/server";
var _n = "xvoid:adaptation_config";
function xa(e) {
    let t = e.getComponent("minecraft:inventory")?.container,
        n = new _a(_n, 1),
        i = t ? t.addItem(n) : n;
    i && e.dimension.spawnItem(i, e.location), e.sendMessage(P.itemGiven);
}
function ka(e) {
    e.itemStack.typeId === _n && ot(e.source);
}
var ba = ["open", "item"];
function Sa(e) {
    let t = e.customCommandRegistry;
    t.registerEnum("woa:item_mode", [...Te]),
        vn &&
            (t.registerEnum("woa:config_action", [...ba]),
            t.registerCommand(
                {
                    name: "woa:config",
                    description: "Wheel of Adaptation: open the world settings (open) or get the settings item (item)",
                    permissionLevel: cn.Admin,
                    cheatsRequired: !1,
                    optionalParameters: [{ name: "woa:config_action", type: fn.Enum }],
                },
                (n, i) => {
                    let r = q(n.sourceEntity);
                    return r
                        ? (un.run(() => (i === "item" ? xa(r) : ot(r))), { status: rt.Success })
                        : { status: rt.Failure, message: "Run this command as a player." };
                }
            )),
        t.registerCommand(
            {
                name: "woa:mode",
                description:
                    "Wheel of Adaptation: item acquisition mode (starter = free items on spawn, crafting = craft them)",
                permissionLevel: cn.GameDirectors,
                cheatsRequired: !1,
                mandatoryParameters: [{ name: "woa:item_mode", type: fn.Enum }],
            },
            (n, i) => {
                let r = q(n.sourceEntity)?.name ?? n.sourceBlock?.typeId ?? "server";
                return un.run(() => gn({ mode: i }, r)), { status: rt.Success, message: `Item mode: ${i}` };
            }
        );
}
function Ca() {
    oa.beforeEvents.startup.subscribe((e) => Sa(e)),
        vn &&
            ln.afterEvents.itemUse.subscribe((e) => {
                try {
                    ka(e);
                } catch {}
            }),
        yn((e, t, n) => {
            for (let i of hn(e, t)) ln.sendMessage(P.changed(n, i, e));
        });
}
var xn = [
        { id: L, owns: (e) => me.has(e) },
        { id: pe, owns: (e) => e === pe },
    ],
    kn = [K.Head, K.Chest, K.Legs, K.Feet, K.Offhand];
function Ea(e) {
    let t = new Set(),
        n = e.getComponent("minecraft:inventory")?.container;
    if (n)
        for (let a = 0; a < n.size; a++) {
            let o = n.getItem(a);
            o && t.add(o.typeId);
        }
    let i = e.getComponent("minecraft:equippable");
    for (let a of kn) {
        let o = s(() => i?.getEquipment(a));
        o && t.add(o.typeId);
    }
    let r = s(() => e.getComponent("minecraft:cursor_inventory")?.item);
    return r && t.add(r.typeId), t;
}
function Aa(e) {
    let t = new aa(e, 1);
    return De.soulbound && ((t.keepOnDeath = !0), (t.lockMode = it.inventory), s(() => t.setLore([w.soulbound]))), t;
}
function Ma(e, t) {
    let n = e.getComponent("minecraft:inventory")?.container,
        i = n ? n.addItem(t) : t;
    i && e.dimension.spawnItem(i, e.location);
}
function Ta(e, t) {
    if (!De.equipWheel) return !1;
    let n = e.getComponent("minecraft:equippable");
    return !n || n.getEquipment(K.Head) ? !1 : n.setEquipment(K.Head, t);
}
function za(e) {
    return xn.some((t) => t.owns(e));
}
function bn(e) {
    if (za(e.typeId) && !(e.lockMode === it.none && !e.keepOnDeath))
        return (e.lockMode = it.none), (e.keepOnDeath = !1), s(() => e.setLore([])), e;
}
function Ia(e) {
    if (!e.isValid) return;
    let t = 0,
        n = e.getComponent("minecraft:inventory")?.container;
    if (n)
        for (let r = 0; r < n.size; r++) {
            let a = n.getItem(r),
                o = a && bn(a);
            o && s(() => (n.setItem(r, o), !0)) && t++;
        }
    let i = e.getComponent("minecraft:equippable");
    for (let r of kn) {
        let a = s(() => i?.getEquipment(r)),
            o = a && bn(a);
        o && s(() => i?.setEquipment(r, o)) && t++;
    }
}
function Sn(e) {
    if (pa("mode") !== "starter" || !e.isValid || s(() => e.getGameMode()) === ra.Spectator) return;
    let t = Ea(e);
    for (let n of xn) {
        if ([...t].some(n.owns)) continue;
        let i = Aa(n.id);
        (n.id === L && Ta(e, i)) || Ma(e, i);
    }
}
import { EntityDamageCause as st, GameMode as Cn, system as O } from "@minecraft/server";
var lt = new Map(),
    En = new Set(f.zombieVillagers),
    woaInPierce = new Set(),
    woaPierceTrack = new Map(),
    woaPierceTick = new Map(),
    woaSwordHealAt = new Map(),
    woaSwordCombo = new Map(),
    woaSwordPrimed = new Set(),
    woaSlashSpecs = {
        fire: { id: "fire", color: { r: 1.0, g: 0.42, b: 0.1 }, slashBonus: 3 },
        storm: { id: "storm", color: { r: 0.25, g: 0.88, b: 1.0 }, slashBonus: 4 },
        venom: { id: "venom", color: { r: 0.48, g: 0.96, b: 0.32 }, slashBonus: 2 },
        frost: { id: "frost", color: { r: 0.55, g: 0.82, b: 1.0 }, slashBonus: 3 },
        pure: { id: "pure", color: woaGold, slashBonus: 0 },
    };
function woaClassifyElement(e) {
    if (!e) return;
    let [t, n] = Wt(e);
    if (t === "env") {
        if (
            n === "fire" ||
            n === "soul_fire" ||
            n === "burning" ||
            n === "lava" ||
            n === "magma" ||
            n === "campfire" ||
            n === "soul_campfire" ||
            n === "sulfur_cube_magma"
        )
            return "fire";
        if (n === "lightning" || n === "sonic_boom") return "storm";
        if (n === "wither") return "venom";
        if (n === "freezing") return "frost";
    } else if (t === "effect") {
        if (n === "wind_charged") return "storm";
        if (
            n === "poison" ||
            n === "fatal_poison" ||
            n === "wither" ||
            n === "oozing" ||
            n === "infested" ||
            n === "hunger" ||
            n === "nausea"
        )
            return "venom";
        if (n === "freezing" || n === "slowness" || n === "mining_fatigue" || n === "darkness" || n === "blindness" || n === "weakness")
            return "frost";
    } else if (t === "mob") {
        if (n === "minecraft:blaze" || n === "minecraft:magma_cube" || n === "minecraft:ghast") return "fire";
        if (n === "minecraft:breeze" || n === "minecraft:warden") return "storm";
        if (
            n === "minecraft:cave_spider" ||
            n === "minecraft:bogged" ||
            n === "minecraft:wither" ||
            n === "minecraft:wither_skeleton" ||
            n === "minecraft:witch" ||
            n === "minecraft:slime"
        )
            return "venom";
        if (
            n === "minecraft:stray" ||
            n === "minecraft:shulker" ||
            n === "minecraft:enderman" ||
            n === "minecraft:ender_dragon"
        )
            return "frost";
    } else if (t === "proj") {
        if (n === "minecraft:fireball" || n === "minecraft:small_fireball") return "fire";
        if (n === "minecraft:breeze_wind_charge_projectile" || n === "minecraft:wind_charge_projectile") return "storm";
        if (
            n === "minecraft:wither_skull" ||
            n === "minecraft:wither_skull_dangerous" ||
            n === "minecraft:splash_potion" ||
            n === "minecraft:lingering_potion"
        )
            return "venom";
        if (n === "minecraft:snowball" || n === "minecraft:shulker_bullet" || n === "minecraft:dragon_fireball")
            return "frost";
    } else if (t === "weapon" && n === "mace") return "storm";
}
function woaGetSlashElement(e) {
    if (e.lastKey && woaIsAdapted(e, e.lastKey)) {
        let t = woaClassifyElement(e.lastKey);
        if (t) return woaSlashSpecs[t];
    }
    let n = -1,
        i;
    for (let [r, a] of e.map) {
        if (a.s < a.n) continue;
        let o = woaClassifyElement(r);
        o && (a.used ?? 0) >= n && ((n = a.used ?? 0), (i = o));
    }
    return i ? woaSlashSpecs[i] : X(e) > 0 ? woaSlashSpecs.pure : void 0;
}
function woaIsShieldBlocking(e) {
    if (e.typeId !== "minecraft:player" || !s(() => e.isSneaking)) return !1;
    let t = s(() => e.getComponent("minecraft:equippable"));
    if (!t) return !1;
    return (
        s(() => t.getEquipment(K.Offhand)?.typeId) === "minecraft:shield" ||
        s(() => t.getEquipment(K.Mainhand)?.typeId) === "minecraft:shield"
    );
}
function woaBumpPierce(e, t) {
    if (woaPierceTrack.size > 64) {
        for (let [r, a] of woaPierceTrack) t - a.tick > 120 && woaPierceTrack.delete(r);
        woaPierceTick.clear();
    }
    let n = woaPierceTrack.get(e),
        i = n && t - n.tick <= 120 ? n.count + 1 : 1;
    return woaPierceTrack.set(e, { count: i, tick: t }), i;
}
function woaApplyPierce(e, t, n, i = woaGold, r = !1) {
    if (!e?.isValid || !t?.isValid || n <= 0) return;
    let a = s(() => t.getComponent("minecraft:health")?.currentValue);
    if (typeof a == "number" && a <= 0) return;
    woaInPierce.add(t.id);
    try {
        s(() => t.applyDamage(n, { cause: st.magic, damagingEntity: e }));
    } finally {
        woaInPierce.delete(t.id);
    }
    let o = D(t);
    h(t.dimension, p.deflect, o, woaVm(i, r ? 1.12 : 0.82)),
        h(t.dimension, p.ray, o, woaVm(i, r ? 1.05 : 0.82)),
        h(t.dimension, p.crescent, o, woaVm(i, r ? 1.05 : 0.75, 1.3)),
        r &&
            (h(t.dimension, p.severCut, o, woaVm(woaGold, 1.05)),
            h(t.dimension, p.flash, o, woaVm(woaGold, 0.95)),
            T(t.dimension, b.nullify, o, 1.15, 0.9),
            Z(e, w.swordPierce));
}
function woaApplyElementalHit(e, t, n, i = !1) {
    if (!n || !t?.isValid || t.id === e.id || Da(t)) return;
    let r = t.dimension,
        a = D(t);
    if (n.id === "fire")
        s(() => t.setOnFire(i ? 5 : 3, !0)), h(r, p.ray, a, woaVm(n.color, i ? 0.95 : 0.7));
    else if (n.id === "storm")
        s(() => t.addEffect("slowness", i ? 40 : 20, { amplifier: i ? 1 : 0, showParticles: !1 })),
            h(r, p.halo, a, woaVm(n.color, i ? 0.95 : 0.65));
    else if (n.id === "venom")
        An(t) ||
            (s(() => t.addEffect(i ? "wither" : "poison", i ? 60 : 40, { amplifier: i ? 1 : 0, showParticles: !1 })),
            i && s(() => t.addEffect("weakness", 80, { amplifier: 0, showParticles: !1 }))),
            h(r, p.ray, a, woaVm(n.color, i ? 0.9 : 0.68));
    else if (n.id === "frost")
        s(() => t.addEffect("slowness", i ? 80 : 40, { amplifier: i ? 2 : 0, showParticles: !1 })),
            i && s(() => t.addEffect("weakness", 80, { amplifier: 0, showParticles: !1 })),
            h(r, p.orb, a, woaVm(n.color, i ? 0.9 : 0.68));
    else if (n.id === "pure") h(r, p.ray, a, woaVm(woaGold, i ? 0.85 : 0.65));
}
function An(e) {
    let t = s(() => e.getComponent("minecraft:type_family")?.hasTypeFamily("undead"));
    return t !== void 0 ? t : (s(() => e.matches({ families: ["undead"] })) ?? !1);
}
function Da(e) {
    return s(() => e.getComponent("minecraft:tameable")?.isTamed) ?? !1;
}
function Mn(e, t) {
    let n = e.getComponent("minecraft:health");
    return n ? n.currentValue - t <= n.effectiveMax * f.purifyRatio : !1;
}
function Tn(e) {
    let t = e.dimension;
    h(t, p.positive, D(e)), h(t, p.rise, ge(e)), h(t, p.regen, ge(e));
}
function zn(e, t) {
    if (!t.isValid) return;
    let n = t.dimension,
        i = t.location,
        r = s(() => t.getRotation().y) ?? 0,
        a = t.nameTag;
    Tn(t), T(n, b.cure, i), t.remove();
    let o = s(() => n.spawnEntity(f.cureInto, i, { initialRotation: r }));
    if ((o && a && s(() => (o.nameTag = a)), e?.isValid)) {
        s(() => ie(e, f.purifyHeal));
        let c = q(e);
        c && H(c.id) && Z(c, w.cure);
    }
}
function $a(e, t) {
    Tn(t),
        T(t.dimension, b.purify, D(t), 1.3),
        s(() => t.applyDamage(1e4, { cause: st.magic, damagingEntity: e })),
        e.isValid && s(() => ie(e, f.purifyHeal));
}
function In(e, t) {
    if (!t.isValid || !e.isValid || f.purifyImmune.includes(t.typeId)) return;
    let n = t.getComponent("minecraft:health");
    !n || n.currentValue <= 0 || (n.currentValue <= n.effectiveMax * f.purifyRatio && $a(e, t));
}
function Dn(e) {
    let t = O.currentTick;
    t < (lt.get(e.id) ?? 0) ||
        (lt.set(e.id, t + f.stabCooldown),
        s(() => e.playAnimation(U.stab, { blendOutTime: 0.2, controller: U.controller, stopExpression: U.stop })),
        T(e.dimension, b.stab, e.location));
}
var ct = new Map();
function $n(e, t, n, i) {
    let r = O.currentTick,
        k0 = `${e.id}:${t}`;
    r - (ct.get(k0) ?? -f.strikeFxGap) < f.strikeFxGap || (ct.set(k0, r), e.isValid && Dn(e), h(n, p.positive, i));
}
function Va(e, t, n, i, r) {
    $n(e, t.id, i, t.isValid ? D(t) : r), t.isValid && n && In(e, t);
}
function qa(e) {
    let t = q(e.damagingEntity);
    if (!t || !F.has(t.id)) return;
    let n = e.hitEntity,
        i = s(() => D(n));
    if ((i && $n(t, n.id, n.dimension, i), !H(t.id) || !n?.isValid)) return;
    let r = O.currentTick;
    if (woaIsShieldBlocking(n)) {
        let a = le(t),
            o = woaBumpPierce(n.id, r),
            c = woaIsAdapted(a, He(n.typeId));
        if ((c || o >= 2) && woaPierceTick.get(n.id) !== r) {
            woaPierceTick.set(n.id, r);
            let g = woaGetSlashElement(a)?.color ?? woaGold;
            O.run(() => woaApplyPierce(t, n, 4.5, g, !0));
        }
    }
}
function woaInflictSever(e, t, n, i = 120) {
    if (!t?.isValid || (e && t.id === e.id) || Da(t)) return;
    let r = s(() => t.getComponent("minecraft:health"));
    if (!r || r.currentValue <= 0) return;
    s(() => t.removeEffect("regeneration"));
    let prev = woaSevered.get(t.id),
        cap = prev ? Math.min(prev.lastHp, r.currentValue) : r.currentValue,
        lastToast = prev?.lastToast ?? -60;
    woaSevered.set(t.id, { entity: t, until: n + i, lastHp: cap, lastFx: prev?.lastFx ?? -20, lastToast });
    let o = D(t);
    h(t.dimension, p.severCut, o, woaVm(woaCrimsonColor, 0.98)),
        h(t.dimension, p.ray, o, woaVm(woaCrimsonColor, 1.0)),
        h(t.dimension, p.inkSpark, o),
        e?.isValid && n - lastToast >= 60 && ((woaSevered.get(t.id).lastToast = n), Z(e, w.swordSever));
}
function woaTickSevered(e) {
    if (!woaSevered.size) return;
    for (let [t, n] of woaSevered) {
        if (e >= n.until || !n.entity?.isValid) {
            woaSevered.delete(t);
            continue;
        }
        let i = s(() => n.entity.getComponent("minecraft:health"));
        if (!i || i.currentValue <= 0) {
            woaSevered.delete(t);
            continue;
        }
        s(() => n.entity.getEffect("regeneration")) && s(() => n.entity.removeEffect("regeneration")),
            (n.lastHp = Math.min(n.lastHp, i.effectiveMax)),
            i.currentValue > n.lastHp
                ? (s(() => i.setCurrentValue(Math.min(i.effectiveMax, n.lastHp))),
                  e - n.lastFx >= 12 &&
                      ((n.lastFx = e),
                      h(n.entity.dimension, p.severCut, D(n.entity), woaVm(woaCrimsonColor, 0.85, -1.2)),
                      h(n.entity.dimension, p.ray, D(n.entity), woaVm(woaCrimsonColor, 0.9)),
                      h(n.entity.dimension, p.inkSpark, D(n.entity))))
                : (n.lastHp = i.currentValue);
    }
}
function Pa(e, t, n) {
    if (e.damageSource.cause !== st.entityAttack || !F.has(t.id)) return;
    let i = An(n);
    if ((i && (e.damage = e.damage * f.undeadMultiplier), En.has(n.typeId) && Mn(n, e.damage))) {
        (e.cancel = !0),
            O.run(() => {
                t.isValid && Dn(t), zn(t, n);
            });
        return;
    }
    let r = n.dimension,
        a = D(n);
    if (!H(t.id)) {
        O.run(() => Va(t, n, i, r, a));
        return;
    }
    let o = O.currentTick,
        c = le(t),
        g = woaGetSlashElement(c),
        _ = woaIsAdapted(c, He(n.typeId)),
        x = woaBumpPierce(n.id, o),
        $ = s(() => n.getEffect("resistance")),
        M = woaIsShieldBlocking(n),
        ue =
            _ || $ || M || x >= 2
                ? Math.min(
                      8,
                      (_ ? 2.5 : 0) +
                          ($ ? ($.amplifier + 1) * 2.5 : 0) +
                          (M ? 3.5 : 0) +
                          (x >= 2 && !_ && !$ && !M ? 1.5 : 0)
                  )
                : 0,
        ze = (woaSwordCombo.get(t.id) ?? 0) + 1;
    ze >= 3
        ? (woaSwordCombo.set(t.id, 0),
          woaSwordPrimed.has(t.id) || (woaSwordPrimed.add(t.id), Z(t, w.swordPrimed)))
        : woaSwordCombo.set(t.id, ze);
    let severNow =
        ze >= 3 ||
        woaSwordPrimed.has(t.id) ||
        woaSevered.has(n.id) ||
        n.typeId === "minecraft:player" ||
        !!s(() => n.getEffect("regeneration")) ||
        !!s(() => n.getEffect("absorption")) ||
        (s(() => n.getComponent("minecraft:health")?.effectiveMax) ?? 20) >= 40;
    ue > 0 && woaPierceTick.set(n.id, o),
        O.run(() => {
            Va(t, n, i, r, a),
                t.isValid &&
                    n.isValid &&
                    (_ &&
                        o - (woaSwordHealAt.get(t.id) ?? -20) >= 20 &&
                        (woaSwordHealAt.set(t.id, o), nt(t) > 0 && (s(() => ie(t, 1)), h(t.dimension, p.regen, ge(t, 0.1), woaVm(woaHealColor, 0.7)))),
                    ue > 0 && woaApplyPierce(t, n, ue, g?.color ?? woaGold, M || !!$),
                    g && woaApplyElementalHit(t, n, g, !1),
                    severNow && woaInflictSever(t, n, O.currentTick, 120));
        });
}
function Oa(e, t) {
    return (
        s(() =>
            e.getEntities({
                location: t,
                maxDistance: f.slashRadius,
                excludeFamilies: ["inanimate"],
                excludeTypes: ["minecraft:item", "minecraft:xp_orb"],
            })
        ) ?? []
    );
}
function La(e, t, n, i) {
    if (!t.getComponent("minecraft:health") || t.typeId === "minecraft:player" || Da(t)) return;
    let r = t.dimension,
        a = An(t),
        o = a ? f.slashUndeadDamage : f.slashDamage;
    if (i && H(e.id)) {
        let c = le(e),
            g = 1 + Qr(X(c)),
            _ = c.map.get(He(t.typeId)),
            x = _ && _.s > 0 ? 1 + Ve.maxBonus * Math.min(1, _.s / _.n) : 1,
            $ = s(() => t.getEffect("resistance")),
            M = $ ? ($.amplifier + 1) * 2.5 : 0,
            surge = woaInSurge(c, O.currentTick) ? 1.2 : 1;
        o = (o * g * x + (i.el?.slashBonus ?? 0) + M) * (i.primed ? 1.35 : 1) * surge;
    }
    if (En.has(t.typeId) && Mn(t, o)) {
        zn(e, t);
        return;
    }
    s(() => t.applyDamage(o, { cause: st.magic, damagingEntity: e })),
        s(() => t.applyKnockback({ x: n.x * f.slashKnockback, z: n.z * f.slashKnockback }, 0.3)),
        T(r, b.slashHit, D(t)),
        h(r, p.positive, D(t)),
        h(r, p.inkSpark, D(t)),
        h(r, p.crescent, D(t), woaVm(i?.el?.color ?? woaGold, i?.primed ? 1.18 : 0.92, 1.4)),
        h(r, p.severCut, D(t), woaVm(i?.el?.color ?? woaCrimsonColor, i?.primed ? 1.05 : 0.82)),
        i?.el && woaApplyElementalHit(e, t, i.el, !0),
        H(e.id) && woaInflictSever(e, t, O.currentTick, i?.primed ? 160 : 120),
        a && O.run(() => In(e, t));
}
function Wa(e) {
    if (!f.slashCutsBlocks || !pa("cut")) return !1;
    let t = s(() => e.getGameMode());
    return t !== Cn.Adventure && t !== Cn.Spectator;
}
function Ha(e, t, n) {
    let i = Math.floor(t.x),
        r = Math.floor(t.y),
        a = Math.floor(t.z),
        o = `${i},${r},${a}`;
    if (n.done.has(o)) return n.blocked.has(o);
    n.done.add(o);
    let c = s(() => e.getBlock({ x: i, y: r, z: a }));
    return !c || c.isAir || c.isLiquid
        ? !1
        : !s(() => c.getComponent("minecraft:inventory")) &&
            !f.uncuttable.has(c.typeId) &&
            n.count < f.slashMaxBlocks &&
            Ba(e, c, { x: i + 0.5, y: r + 0.5, z: a + 0.5 })
          ? (n.count++, !1)
          : (n.blocked.add(o), !0);
}
function Ba(e, t, n) {
    let i = s(() => t.getItemStack(1, !1));
    return s(() => t.setType("minecraft:air")) === void 0 && !t.isAir
        ? !1
        : (i && s(() => e.spawnItem(i, n)), h(e, p.inkSpark, n), !0);
}
function Vn(e) {
    let t = e.getHeadLocation(),
        n = ht(e.getViewDirection()),
        i = ht({ x: -n.z, y: 0, z: n.x });
    i.x === 0 && i.z === 0 && (i = { x: 1, y: 0, z: 0 });
    let r = { x: i.y * n.z - i.z * n.y, y: i.z * n.x - i.x * n.z, z: i.x * n.y - i.y * n.x };
    return { eye: t, forward: n, right: i, up: r };
}
function Ra(e, t) {
    let n = s(() => e.getBlockFromViewDirection({ maxDistance: f.slashRange }));
    return n ? Math.min(f.slashRange, Fn(t, E(n.block.location, n.faceLocation))) : f.slashRange;
}
function Fa(e, t) {
    let n = f.trailTicks,
        low = woaLowFx(),
        clr = t?.el?.color ?? woaWhiteGold;
    for (let i = 0; i < n; i++)
        R(f.slashWindup - n + i, () => {
            if (!e.isValid) return;
            let { eye: r, forward: a, right: o, up: c } = Vn(e),
                g = e.dimension,
                _ = -f.trailArc + (2 * f.trailArc * i) / n,
                x = -f.trailArc + (2 * f.trailArc * (i + 1)) / n,
                $ = 0;
            for (let M = _; M <= x + 1e-6; M += 0.07) {
                let ue = -f.trailTilt * Math.sin(M),
                    ze = E(E(C(a, Math.cos(M)), C(o, Math.sin(M))), C(c, ue)),
                    j = E(r, C(ze, f.trailRadius));
                h(g, p.slashTrail, j),
                    h(g, p.ink, E(j, E(C(c, -0.14), C(a, 0.12)))),
                    !low &&
                        $ % 4 === 0 &&
                        (h(g, p.slashDark, j, woaVm(clr, 0.72, 1.3)),
                        h(g, p.crescent, j, woaVm(clr, t?.primed ? 0.92 : 0.68, 1.4))),
                    t && $ % 3 === 0 && h(g, p.ray, j, woaVm(t.el.color, t.primed ? 1.05 : 0.78)),
                    $++;
            }
        });
}
function Ka(e, t) {
    if (!e.isValid || !Kn(e) || !F.has(e.id)) return;
    let n = e.dimension,
        { eye: i, forward: r, right: a } = Vn(e),
        o = Wa(e) ? { done: new Set(), blocked: new Set(), count: 0 } : void 0,
        c = o ? f.slashRange : Ra(e, i),
        g = new Set([e.id]),
        _ = f.slashStart,
        low = woaLowFx(),
        clr = t?.el?.color ?? woaGold,
        x = O.runInterval(() => {
            try {
                let $ = Math.min(c, _ + f.slashSpeed);
                for (let M = _; M <= $ && M <= c; M += 0.35) {
                    let ue = E(i, C(r, M)),
                        ze = f.slashWidth;
                    for (let j = -ze; j <= ze + 1e-6; j += ze / 5) {
                        let qn = C(r, -j * j * 0.22),
                            Ie = E(E(ue, C(a, j)), qn);
                        h(n, p.slashTrail, Ie),
                            h(n, p.ink, E(Ie, C(r, -0.32))),
                            o && M >= f.slashCutStart && Ha(n, Ie, o) && Math.abs(j) < 1e-6 && (c = Math.min(c, M));
                    }
                }
                $ = Math.min($, c);
                let M = E(i, C(r, $));
                h(n, p.inkSpark, E(M, C(a, f.slashWidth))),
                    h(n, p.inkSpark, E(M, C(a, -f.slashWidth))),
                    low ||
                        (h(n, p.slashDark, M, woaVm(clr, t?.primed ? 1.28 : 1.0, 1.1)),
                        h(n, p.crescent, M, woaVm(clr, t?.primed ? 1.32 : 1.02, 1.35))),
                    t &&
                        (h(n, p.ray, M, woaVm(t.el.color, t.primed ? 1.15 : 0.88)),
                        h(n, p.orb, E(M, C(a, f.slashWidth * 0.65)), woaVm(t.el.color, 0.75)),
                        h(n, p.orb, E(M, C(a, -f.slashWidth * 0.65)), woaVm(t.el.color, 0.75)));
                for (let ue of Oa(n, M)) g.has(ue.id) || (g.add(ue.id), La(e, ue, r, t));
                (_ = $),
                    _ >= c &&
                        (h(n, p.positive, M),
                        h(n, p.inkSpark, M),
                        h(n, p.crescent, M, woaVm(clr, t?.primed ? 1.45 : 1.12, 1.5)),
                        h(n, p.severCut, M, woaVm(clr, t?.primed ? 1.3 : 0.98)),
                        low || h(n, p.sonic, M, woaVm(clr, t?.primed ? 1.25 : 0.92)),
                        t &&
                            (t.primed || t.level >= 3 || t.el.id !== "pure") &&
                            (h(n, p.halo, M, woaVm(t.el.color, t.primed ? 1.28 : 0.98)),
                            h(n, p.burst, M, woaVm(t.el.color, t.primed ? 1.12 : 0.85))),
                        O.clearRun(x));
            } catch {
                O.clearRun(x);
            }
        }, 1);
}
function ja(e) {
    let t = e.source;
    if (e.itemStack?.typeId !== pe) return;
    let n = O.currentTick;
    if (n < (Se.get(t.id) ?? 0)) return;
    Se.set(t.id, n + f.slashCooldown),
        s(() => t.startItemCooldown(f.cooldownCategory, f.slashCooldown)),
        s(() => t.playAnimation(U.slash, { blendOutTime: 0.25, controller: U.controller, stopExpression: U.stop })),
        T(t.dimension, b.slash, t.location);
    let i;
    if (H(t.id)) {
        let r = le(t),
            a = woaGetSlashElement(r),
            o = woaSwordPrimed.delete(t.id),
            c = X(r);
        (a || o || c > 0) &&
            ((i = { el: a ?? woaSlashSpecs.pure, primed: o, level: c }),
            (i.el.id !== "pure" || o) && Z(t, w.swordSlash(i.el.id, o)));
    }
    Fa(t, i), R(f.slashWindup, () => Ka(t, i));
}
function Ga(e) {
    let pfx = `${e}:`;
    for (let k0 of ct.keys()) k0.startsWith(pfx) && ct.delete(k0);
    Se.delete(e),
        lt.delete(e),
        woaSwordHealAt.delete(e),
        woaSwordCombo.delete(e),
        woaSwordPrimed.delete(e);
}
hr(),
    Ca(),
    yn((e, t) => {
        if (e.mode !== t.mode) for (let n of I.getAllPlayers()) s(() => (e.mode === "starter" ? Sn(n) : Ia(n)));
    });
function Ua(e) {
    be.add(e.id), Qi(e), T(e.dimension, b.equip, e.location), Z(e, w.equip, 90), woaEquipFx(e);
}
function Ja(e) {
    be.delete(e.id),
        er(e),
        sn(e.id),
        Ut(e.id),
        Yi(e),
        woaSwordHealAt.delete(e.id),
        woaSwordCombo.delete(e.id),
        woaSwordPrimed.delete(e.id),
        woaGrounded.delete(e.id),
        woaSneakTicks.delete(e.id),
        s(() => e.onScreenDisplay.setActionBar(w.unequip));
}
function Na(e, t) {
    let n = e.getComponent("minecraft:equippable");
    if (!n) return;
    n.getEquipment(ft.Mainhand)?.typeId === pe ? F.add(e.id) : F.delete(e.id);
    let i = n.getEquipment(ft.Head)?.typeId,
        r = !!i && me.has(i),
        a = H(e.id);
    woaLastVel.set(e.id, s(() => e.getVelocity()) ?? { x: 0, y: 0, z: 0 }),
        r && !a ? Ua(e) : !r && a && Ja(e),
        _r(e, t),
        t % 20 === 0 && Cr(e),
        !(!r || !i) && (ei(e, t), Sr(e, i, t), ia(e, t), ar(e, t));
}
de.runInterval(() => {
    let e = de.currentTick;
    e % 2 === 0 && woaSevered.size > 0 && woaTickSevered(e);
    for (let t of I.getAllPlayers()) s(() => Na(t, e));
}, 1),
    I.beforeEvents.entityHurt.subscribe((e) => {
        try {
            if (e.damage <= 0) return;
            let t = e.hurtEntity,
                n = q(t);
            if ((n && H(n.id) && Zr(e, n), e.cancel || e.damage <= 0)) return;
            let i = e.damageSource.damagingEntity,
                r = q(i);
            if (!r || r.id === t.id) return;
            Xr(e, r, t), Pa(e, r, t);
        } catch {}
    }),
    I.beforeEvents.effectAdd.subscribe((e) => {
        s(() => ea(e));
    }),
    I.afterEvents.entityDie.subscribe((e) => {
        let t = e.deadEntity;
        woaSevered.delete(t.id);
        let n = q(t);
        if (!n || !H(n.id)) return;
        if (pa("keepOnDeath")) {
            let d0 = le(n);
            d0.pending.clear(),
                (d0.firstSpin = void 0),
                (d0.surgeUntil = 0),
                woaSwordCombo.delete(n.id),
                woaSwordPrimed.delete(n.id),
                s(() => je(n, d0));
            return;
        }
        s(() => ta(n)), s(() => n.onScreenDisplay.setActionBar(w.death));
    }),
    I.afterEvents.playerSpawn.subscribe((e) => {
        let t = e.player;
        de.runTimeout(() => s(() => Sn(t)), De.delayTicks);
    }),
    I.afterEvents.entitySpawn.subscribe((e) => {
        s(() => Er(e.entity));
    }),
    I.afterEvents.entityHitEntity.subscribe((e) => {
        s(() => qa(e));
    }),
    I.afterEvents.itemUse.subscribe((e) => {
        s(() => ja(e));
    }),
    I.afterEvents.projectileHitEntity?.subscribe((e) => {
        try {
            let t = q(e.getEntityHit()?.entity);
            if (!t || !H(t.id)) return;
            let n = e.projectile;
            if (!n?.isValid || woaDeflected.has(n.id)) return;
            let i = le(t),
                r = s(() => e.source),
                a = woaProjAdaptedKey(i, oe(n), r);
            if (!a) return;
            pr(t, woaLastVel.get(t.id) ?? { x: 0, y: 0, z: 0 }),
                woaDeflectProjectile(t, i, de.currentTick, n, e.hitVector, r);
        } catch {}
    }),
    I.beforeEvents.playerLeave.subscribe((e) => {
        let t = e.player.id;
        de.run(() => {
            tr(t),
                sn(t),
                Ut(t),
                xr(t),
                Ga(t),
                Ar(t),
                Zi(t),
                woaDotAt.delete(t),
                woaExposeAt.delete(t),
                woaLastVel.delete(t),
                woaGrounded.delete(t),
                woaSneakTicks.delete(t),
                woaSevered.delete(t);
        });
    });
