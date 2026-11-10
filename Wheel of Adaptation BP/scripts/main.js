import { EquipmentSlot as ft, system as de, world as I } from "@minecraft/server";
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
function h(e, t, n) {
    s(() => e.spawnParticle(t, n));
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
function ye(e, t = b.spin) {
    let n = Y(e);
    T(e.dimension, t, n), h(e.dimension, p.spin, n);
}
function jn(e, t, n = !0) {
    let i = Y(e);
    n && T(e.dimension, b.adapted, i), h(e.dimension, p.charge, i);
    for (let r of m.fullBuildTicks)
        R(r, () => {
            if (!e.isValid) return;
            let a = Y(e);
            h(e.dimension, p.spin, a), h(e.dimension, p.charge, a);
        });
    t && R(m.fullClickTick, t);
}
function Gn(e) {
    let t = Y(e);
    T(e.dimension, b.nullify, t), h(e.dimension, p.spin, t);
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
        poison: l.arcane,
        fatal_poison: l.arcane,
        wither: l.arcane,
        slowness: l.arcane,
        weakness: l.arcane,
        mining_fatigue: l.arcane,
        blindness: l.arcane,
        darkness: l.arcane,
        nausea: l.arcane,
        hunger: l.arcane,
        levitation: l.arcane,
        infested: l.arcane,
        oozing: l.arcane,
        weaving: l.arcane,
        wind_charged: l.arcane,
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
            for (let [a, o] of Object.entries(i.m ?? {}))
                (r && ci.includes(a)) || t.map.set(a, { s: o[0], n: o[1], used: o[2] ?? 0 });
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
function Xe(e, t) {
    let n = e.map.get(t.key);
    return n || ((n = { s: 0, n: t.spins, used: 0 }), e.map.set(t.key, n)), n;
}
function et(e) {
    return m.hitsPerKey[e] ?? m.hitsPerSpin[e.slice(0, e.indexOf(":"))] ?? m.hitsPerSpin.mob ?? 3;
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
    }
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
    (i.used = Date.now()), zr(t, n), Tr(e, t, n), Mr(e, n), jn(e, () => Z(e, Ki(n)), !0), R(J.fxDelay, () => Dr(e));
}
function Dr(e) {
    if (!e.isValid) return;
    let t = e.dimension,
        n = D(e),
        i = Y(e);
    h(t, p.pillar, n), h(t, p.seal, i), h(t, p.shockwave, n), T(t, b.adapted, i, 0.85, 1.3);
    let r =
        s(() =>
            t.getEntities({
                location: n,
                maxDistance: J.radius,
                excludeFamilies: ["inanimate"],
                excludeTypes: ["minecraft:item", "minecraft:xp_orb", "minecraft:player"],
            })
        ) ?? [];
    for (let a of r) {
        if (!a.isValid || !a.getComponent("minecraft:health")) continue;
        let o = a.location,
            c = o.x - n.x,
            g = o.z - n.z,
            _ = Math.hypot(c, g) || 1;
        s(() => a.applyDamage(J.damage, { cause: y.magic, damagingEntity: e })),
            s(() => a.applyKnockback({ x: (c / _) * J.knockback, z: (g / _) * J.knockback }, J.knockbackUp)),
            h(a.dimension, p.positive, D(a));
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
    i < 0.5 || (s(() => ie(e, i)), T(e.dimension, b.heal, e.location), h(e.dimension, p.rise, ge(e)));
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
            ye(e, b.first);
        return;
    }
    (t.lastSpin = i),
        (t.lastTurn = { key: n, at: i }),
        r === "fast" ? (te(e, "fast"), ye(e, b.fast)) : r === "adapting" && (te(e, "spin"), ye(e)),
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
                ye(e),
                T(e.dimension, b.undying, Y(e)));
        }),
        R(S.healDelay, () => {
            !e.isValid || !H(e.id) || (ie(e, nt(e)), h(e.dimension, p.rise, ge(e)));
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
function Yr(e) {
    e.isValid && (Gn(e), Ze(e.id, N.currentTick) || te(e, "react"));
}
function Zr(e, t) {
    let n = N.currentTick,
        i = le(t),
        r = qi(e.damageSource, t);
    if (!r) return;
    let a = e.damageSource.cause,
        o = e.damage;
    if (n < i.graceUntil && !an(a, e.damage)) {
        e.cancel = !0;
        return;
    }
    let c = Xe(i, r);
    if (c.s >= c.n) {
        (c.used = Date.now()),
            Jr(e)
                ? ((e.damage = 0),
                  Nr(t, i, n),
                  pr(
                      t,
                      s(() => t.getVelocity())
                  ),
                  `${r.key}`)
                : (e.cancel = !0),
            !Fi(r.key) && n - i.lastFlash >= m.nullifyFlashInterval && ((i.lastFlash = n), N.run(() => Yr(t)));
        return;
    }
    e.damage = e.damage * (1 - z.partialMax * (c.s / c.n));
    let g = e.damage,
        _ = c.s === 0;
    nn(i, r.key, Math.max(1, e.damage), g, n);
    let x = jr(t, o, g),
        $ = Gr(t, a, g, n);
    x && $ && wr(t.id, X(i), _) && ((e.cancel = !0), Ur(t, i, r.key, _, n));
}
function Qr(e) {
    return Math.min(Ve.maxLevelBonus, Ve.bonusPerLevel * e);
}
function Xr(e, t, n) {
    if (!H(t.id)) return;
    let i = le(t),
        r = X(i),
        a = Qr(r),
        o = i.map.get(He(n.typeId)),
        c = o && o.s > 0 ? Ve.maxBonus * Math.min(1, o.s / o.n) : 0;
    if (a <= 0 && c <= 0) return;
    let g = e.damage;
    e.damage = g * (1 + a) * (1 + c);
}
function ea(e) {
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
        (o.used = Date.now()), (e.cancel = !0);
        return;
    }
    (e.duration = Math.max(1, Math.round(e.duration * (1 - z.partialMax * (o.s / o.n))))),
        (i.recentEffects = i.recentEffects.filter((c) => r - c.tick <= $e.effectWindow)),
        i.recentEffects.push({ typeId: e.effectType, tick: r }),
        nn(i, n.key, 2, 0, r);
}
function ta(e) {
    if (!H(e.id)) return;
    Xi(e);
    let t = le(e);
    (t.lastKey = void 0), Qt(e), (t.graceUntil = 0), (t.newWheel = !0), (t.firstSpin = void 0), (t.lastTurn = void 0);
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
    Lr(e, n, t), Rr(e, n, t);
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
    vn = !1,
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
        .submitButton(P.save);
}
function va(e, t) {
    let [n] = t;
    gn({ mode: Te[typeof n == "number" ? n : 0] ?? "starter" }, e.name);
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
    En = new Set(f.zombieVillagers);
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
    let r = O.currentTick;
    r - (ct.get(t) ?? -f.strikeFxGap) < f.strikeFxGap || (ct.set(t, r), e.isValid && Dn(e), h(n, p.positive, i));
}
function Va(e, t, n, i, r) {
    $n(e, t.id, i, t.isValid ? D(t) : r), t.isValid && n && In(e, t);
}
function qa(e) {
    let t = q(e.damagingEntity);
    if (!t || !F.has(t.id)) return;
    let n = e.hitEntity,
        i = s(() => D(n));
    i && $n(t, n.id, n.dimension, i);
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
    O.run(() => Va(t, n, i, r, a));
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
function La(e, t, n) {
    if (!t.getComponent("minecraft:health") || t.typeId === "minecraft:player" || Da(t)) return;
    let i = t.dimension,
        r = An(t),
        a = r ? f.slashUndeadDamage : f.slashDamage;
    if (En.has(t.typeId) && Mn(t, a)) {
        zn(e, t);
        return;
    }
    s(() => t.applyDamage(a, { cause: st.magic, damagingEntity: e })),
        s(() => t.applyKnockback({ x: n.x * f.slashKnockback, z: n.z * f.slashKnockback }, 0.3)),
        T(i, b.slashHit, D(t)),
        h(i, p.positive, D(t)),
        h(i, p.inkSpark, D(t)),
        r && O.run(() => In(e, t));
}
function Wa(e) {
    if (!f.slashCutsBlocks) return !1;
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
function Fa(e) {
    let t = f.trailTicks;
    for (let n = 0; n < t; n++)
        R(f.slashWindup - t + n, () => {
            if (!e.isValid) return;
            let { eye: i, forward: r, right: a, up: o } = Vn(e),
                c = e.dimension,
                g = -f.trailArc + (2 * f.trailArc * n) / t,
                _ = -f.trailArc + (2 * f.trailArc * (n + 1)) / t;
            for (let x = g; x <= _ + 1e-6; x += 0.07) {
                let $ = -f.trailTilt * Math.sin(x),
                    M = E(E(C(r, Math.cos(x)), C(a, Math.sin(x))), C(o, $)),
                    ue = E(i, C(M, f.trailRadius));
                h(c, p.slashTrail, ue), h(c, p.ink, E(ue, E(C(o, -0.14), C(r, 0.12))));
            }
        });
}
function Ka(e) {
    if (!e.isValid || !Kn(e) || !F.has(e.id)) return;
    let t = e.dimension,
        { eye: n, forward: i, right: r } = Vn(e),
        a = Wa(e) ? { done: new Set(), blocked: new Set(), count: 0 } : void 0,
        o = a ? f.slashRange : Ra(e, n),
        c = new Set([e.id]),
        g = f.slashStart,
        _ = O.runInterval(() => {
            try {
                let x = Math.min(o, g + f.slashSpeed);
                for (let M = g; M <= x && M <= o; M += 0.35) {
                    let ue = E(n, C(i, M)),
                        ze = f.slashWidth;
                    for (let j = -ze; j <= ze + 1e-6; j += ze / 5) {
                        let qn = C(i, -j * j * 0.22),
                            Ie = E(E(ue, C(r, j)), qn);
                        h(t, p.slashTrail, Ie),
                            h(t, p.ink, E(Ie, C(i, -0.32))),
                            a && M >= f.slashCutStart && Ha(t, Ie, a) && Math.abs(j) < 1e-6 && (o = Math.min(o, M));
                    }
                }
                x = Math.min(x, o);
                let $ = E(n, C(i, x));
                h(t, p.inkSpark, E($, C(r, f.slashWidth))), h(t, p.inkSpark, E($, C(r, -f.slashWidth)));
                for (let M of Oa(t, $)) c.has(M.id) || (c.add(M.id), La(e, M, i));
                (g = x), g >= o && (h(t, p.positive, $), h(t, p.inkSpark, $), O.clearRun(_));
            } catch {
                O.clearRun(_);
            }
        }, 1);
}
function ja(e) {
    let t = e.source;
    if (e.itemStack?.typeId !== pe) return;
    let n = O.currentTick;
    n < (Se.get(t.id) ?? 0) ||
        (Se.set(t.id, n + f.slashCooldown),
        s(() => t.startItemCooldown(f.cooldownCategory, f.slashCooldown)),
        s(() => t.playAnimation(U.slash, { blendOutTime: 0.25, controller: U.controller, stopExpression: U.stop })),
        T(t.dimension, b.slash, t.location),
        Fa(t),
        R(f.slashWindup, () => Ka(t)));
}
function Ga(e) {
    ct.clear(), Se.delete(e), lt.delete(e);
}
hr(),
    Ca(),
    yn((e, t) => {
        if (e.mode !== t.mode) for (let n of I.getAllPlayers()) s(() => (e.mode === "starter" ? Sn(n) : Ia(n)));
    });
function Ua(e) {
    be.add(e.id), Qi(e), T(e.dimension, b.equip, e.location), Z(e, w.equip, 90);
}
function Ja(e) {
    be.delete(e.id), er(e), sn(e.id), Ut(e.id), Yi(e), s(() => e.onScreenDisplay.setActionBar(w.unequip));
}
function Na(e, t) {
    let n = e.getComponent("minecraft:equippable");
    if (!n) return;
    n.getEquipment(ft.Mainhand)?.typeId === pe ? F.add(e.id) : F.delete(e.id);
    let i = n.getEquipment(ft.Head)?.typeId,
        r = !!i && me.has(i),
        a = H(e.id);
    r && !a ? Ua(e) : !r && a && Ja(e),
        _r(e, t),
        t % 20 === 0 && Cr(e),
        !(!r || !i) && (ei(e, t), Sr(e, i, t), ia(e, t), ar(e, t));
}
de.runInterval(() => {
    let e = de.currentTick;
    for (let t of I.getAllPlayers()) s(() => Na(t, e));
}, 1),
    I.beforeEvents.entityHurt.subscribe((e) => {
        try {
            if (e.damage <= 0) return;
            let t = e.hurtEntity,
                n = q(t);
            if ((n && H(n.id) && Zr(e, n), e.cancel)) return;
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
        let t = e.deadEntity,
            n = q(t);
        !(!n || !H(n.id)) && (s(() => ta(n)), s(() => n.onScreenDisplay.setActionBar(w.death)));
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
    I.beforeEvents.playerLeave.subscribe((e) => {
        let t = e.player.id;
        de.run(() => {
            tr(t), sn(t), Ut(t), xr(t), Ga(t), Ar(t), Zi(t);
        });
    });
