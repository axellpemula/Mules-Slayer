import * as mc from '@minecraft/server';
import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";

export default class Vec3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.xyz = {
            x: x,
            y: y,
            z: z
        };
        this.xyzRound = {
            x: Math.round(x),
            y: Math.round(y),
            z: Math.round(z)
        };
        this.xyzFloor = {
            x: Math.floor(x),
            y: Math.floor(y),
            z: Math.floor(z)
        };
        this.value = (xyz, type) => {
            try {
                return new mc[type](...Object.values(xyz));
            } catch (e) {
                return xyz;
            }
        };
    }
    Vector() {
        let xyz = this.xyz;
        return this.value(xyz, "Vector");
    }
    Position() {
        let xyz = this.xyz;
        return this.value(xyz, "Location");
    }
    PositionRound() {
        let xyz = this.xyzRound;
        return this.value(xyz, "BlockLocation");
    }
    PositionFloor() {
        let xyz = this.xyzFloor;
        return this.value(xyz, "BlockLocation");
    }
    Distance(x, y, z) {
        let p = {
            x: Math.pow(this.x - x, 2),
            y: Math.pow(this.y - y, 2),
            z: Math.pow(this.z - z, 2)
        };
        let distance = Math.sqrt(p.x + p.y + p.z);
        return distance;
    }
}

system.afterEvents.scriptEventReceive.subscribe(data => {
    const player = data.sourceEntity;
    const id = data.id;
    
    if(id === "akaza:air") {
        player.runCommandAsync(`summon akaza:air ^0.25^1^0.5 facing ^0.25^^10 spawn_medium "${player.name}"`);
        player.runCommandAsync(`execute as @s run scoreboard players operation @e[c=1,name="${player.name}",type=akaza:air] multiplier = @s multiplier`);
    }
    if(id === "akaza:air2") {
        player.runCommandAsync(`summon akaza:air ^-0.25^1^0.5 facing ^-0.25^^10 spawn_medium "${player.name}"`);
        player.runCommandAsync(`execute as @s run scoreboard players operation @e[c=1,name="${player.name}",type=akaza:air] multiplier = @s multiplier`);
    }
    if(id === "flame:tiger") {
        player.runCommandAsync(`execute as @s rotated ~ 0 run summon flame:tg ^^^1 facing ^^^10`);
    }
    if(id === "sun:solar") {
        player.runCommandAsync(`execute as @s[type=player] rotated ~ 0 run summon sun:solar ^^1^ facing ^^1^10 n "${player.name}"`);
        player.runCommandAsync(`execute as @s[type=!player] rotated ~ 0 run summon sun:solar ^^1^ facing ^^1^10 n "${player.nameTag}"`);
    }
    if(id === "water:form6d") {
        player.runCommandAsync(`execute as @s at @s run execute as @e[r=4.5,name=!"${player.name}"] at @s run tp ^^^1 facing @p[name="${player.name}"]`);
    }
});

// DPS state storage for "axell:dontol" entities
if (!globalThis._dpsState) globalThis._dpsState = new Map();

system.runInterval(() => {
    const dimension = world.getDimension("overworld");
    const entities = dimension.getEntities({ type: "axell:dontol" });
    const now = Date.now();

    for (const entity of entities) {
        let state = globalThis._dpsState.get(entity.id) || {
            damageLog: [], // {time, amount}
            lastHp: entity.getComponent("health")?.currentValue || 0,
            totalDamage: 0,
            lastDamageTime: 0,
            hitCount: 0,
            peakDps: 0,
            startTime: now
        };

        const healthComp = entity.getComponent("health");
        if (!healthComp) continue;

        const currentHp = Math.round(healthComp.currentValue);
        const maxHp = healthComp.effectiveMax;

        // Detect damage
        if (currentHp < state.lastHp) {
            const dmg = state.lastHp - currentHp;
            state.damageLog.push({ time: now, amount: dmg });
            state.totalDamage += dmg;
            state.lastDamageTime = now;
            state.hitCount += 1;
        }

        // Detect heal → full reset
        if (currentHp > state.lastHp) {
            state = {
                damageLog: [],
                lastHp: currentHp,
                totalDamage: 0,
                lastDamageTime: 0,
                hitCount: 0,
                peakDps: 0,
                startTime: now
            };
        }

        state.lastHp = currentHp;

        // Keep only last 5s of damage
        state.damageLog = state.damageLog.filter(d => now - d.time <= 5000);

        let avgDps = 0;

        // Calculate average DPS over the entity's lifetime (since first damage or spawn)
        const totalElapsed = (now - state.startTime) / 1000;
        avgDps = state.totalDamage / Math.max(totalElapsed, 1);

        // Reset everything if idle for 3s
        if (state.lastDamageTime && now - state.lastDamageTime > 3000) {
            state.damageLog = [];
            state.totalDamage = 0;
            state.hitCount = 0;
            state.peakDps = 0;
            avgDps = 0;
            state.startTime = now;
        }

        // Update nametag
        entity.nameTag =
            `DPS: ${avgDps.toFixed(1)} | Hits: ${state.hitCount} | Total: ${state.totalDamage} | HP: ${currentHp}/${maxHp}`;

        globalThis._dpsState.set(entity.id, state);
    }
}, 1); // every tick (~50ms)


const sleep = (t) => new Promise((r) => system.runTimeout(r, t));

world.afterEvents.playerInteractWithEntity.subscribe(async ({ player, target }) => {
    const bookEntities = {
        "axell:rengoku": "flame",
        "axell:giyuu": "water",
        "axell:sanemi": "wind",
        "axell:kocho": "insect",
        "axell:tanjiro": "sun",
        "axell:tengen": "sound",
        "axell:tokito": "mist",
        "axell:zenitsu": "thunder"
    };

    const bookType = bookEntities[target.typeId];
    if (bookType) {
        const name = target.typeId.split(':')[1];
        const tag = name + "bossstart";
        if (target.hasTag(tag)) return;
        const level = player.level;
        if (level > 15) {
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"You're worthy"}]}`);
            player.runCommandAsync(`give @s breathings:${bookType}`);
            player.runCommandAsync(`xp -15l`);
        } else {
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"Come back when you have level 15 kid"}]}`);
        }
        return;
    }

    if (target?.typeId !== "axell:haganezuka") return;

    const equip = player.getComponent('equippable');
    if (!equip) return;
    let equipped;
    try {
        equipped = equip.getEquipment('Mainhand');
    } catch (e) {
        equipped = undefined;
    }
    if (!equipped || equipped.typeId !== "axell:nichirin") return;

    const chatKeys = [
        "text.haganezuka:chat1",
        "text.haganezuka:chat2",
        "text.haganezuka:chat3",
        "text.haganezuka:chat4"
    ];

    player.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"translate":""}]}`);
    player.runCommandAsync(`playsound mob.villager.yes @s ~ ~ ~ 1 0.5`);

    for (const key of chatKeys) {
        await player.runCommandAsync(`tellraw @s {"rawtext":[{"translate":"${key}"}]}`);
        await player.runCommandAsync(`playsound mob.villager.haggle @s ~ ~ ~ 1 0.75`);
        await player.runCommandAsync(`playsound note.snare @s ~ ~ ~ 1 2`);
        await sleep(5);
    }

    // Show all options in one scroll form (using ModalFormData, dropdown is the only scrollable option available in Minecraft Bedrock scripting API)
const tsubaOptions = [
    "Basic",
    "§eFlame",
    "§1Wagon",
    "§8None",
    "§5Flashy",
    "§dLove",
    "§bGeometric",
    "§3Hexagon",
    "§dButterfly",
    "§2Tumbling",
];

const bladeTypeOptions = [
    "Basic",
    "§8Jagged",
    "§dStinger",
    "§eCleaver",
];

const handleColorOptions = [
    "Basic",
    "§6Yellow",
    "§4Red",
    "§1Blue",
    "§3Aqua",
    "§5Purple",
    "§2Green",
    "§cWhite-Red",
    "§7White-Black",
    "§bWhite-Aqua",
    "§dWhite-Purple",
    "§aWhite-Green",
    "§eWhite-Yellow",
];

const form = new ModalFormData()
    .title("§g§rCustomize Sword")
    .dropdown("Blade Type", bladeTypeOptions, 0)
    .dropdown("Tsuba", tsubaOptions, 0)
    .dropdown("Handle Color", handleColorOptions, 0);

const res = await form.show(player);
if (res.canceled || !Array.isArray(res.formValues)) return;

// Save selections to a global map for persistence
if (!globalThis._playerSwordCustomizations) globalThis._playerSwordCustomizations = new Map();
globalThis._playerSwordCustomizations.set(player.id, {
    bladeType: res.formValues[0],
    tsuba: res.formValues[1],
    handleColor: res.formValues[2]
});

// Update in real time after each selection
await player.runCommandAsync(`scriptevent blade:type${res.formValues[0]}`);
await player.runCommandAsync(`scriptevent tsuba:type${res.formValues[1]}`);
await player.runCommandAsync(`scriptevent handle:color${res.formValues[2]}`);

player.runCommandAsync("playsound mob.villager.no @s ~ ~ ~ 1 1.5");
player.runCommandAsync("playsound random.anvil_use @s ~ ~ ~ 1000 0.8");
player.runCommandAsync("execute as @s run particle minecraft:knockback_roar_particle ~~~");
target.triggerEvent("despawn_event");
});

