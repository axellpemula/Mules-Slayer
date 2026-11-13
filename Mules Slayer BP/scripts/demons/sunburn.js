import { world, system } from "@minecraft/server";

// === Sunburn settings & helpers ===
const BURN_PCT_PER_SEC = 0.25;   // 1% of MAX HP per second
const MIN_BURN_PER_TICK = 4;     // never less than 1 HP per second
const MAX_BURN_PER_TICK = 200;    // cap so mega-bosses don't insta-melt

function readHealth(entity) {
    try {
        const h = entity.getComponent?.('minecraft:health');
        if (!h) return { current: 20, max: 20 };
        const current = (h.current ?? h.value ?? h.currentValue ?? 20);
        const max     = (h.max ?? h.value ?? h.defaultValue ?? current ?? 20);
        return { current, max };
    } catch (_) {
        return { current: 20, max: 20 };
    }
}

function calcSunBurnAmount(entity) {
    const { max } = readHealth(entity);
    let dmg = Math.round(max * BURN_PCT_PER_SEC);
    if (!Number.isFinite(dmg)) dmg = MIN_BURN_PER_TICK;
    if (dmg < MIN_BURN_PER_TICK) dmg = MIN_BURN_PER_TICK;
    if (dmg > MAX_BURN_PER_TICK) dmg = MAX_BURN_PER_TICK;
    return dmg;
}

// scripts/tick.js

/*
  Behavior:
  - read time using world.getTimeOfDay() (ticks 0..24000)
  - when day (0 <= t < 12000) -> kill all dcb:basic_demon
  - when night         -> give Resistance amplifier 255 (long)
  - only run commands when mode changes (day <-> night)
*/

system.runInterval(() => {
    try {
        const time = typeof world.getTimeOfDay === "function"
            ? world.getTimeOfDay()
            : null;

        if (typeof time !== "number") return;

        // Daylight sensor logic: day if time is between 0 and 12000
        const isDay = time >= 0 && time < 12000;

        const demons = [
          ...world.getDimension("overworld").getEntities({ families: ["demon"] }),
          ...world.getDimension("nether").getEntities({ families: ["demon"] }),
          ...world.getDimension("the_end").getEntities({ families: ["demon"] }),
        ];

        for (const demon of demons) {
            if (isDay) {
                // Check if demon is exposed to the sky (no blocks above)
                const { x, y, z } = demon.location;
                let exposed = true;
                // Get the dimension object for this demon
                let dimension;
                try {
                    dimension = demon.dimension ?? world.getDimension(demon.dimension?.id ?? "overworld");
                } catch {
                    dimension = world.getDimension("overworld");
                }
                // Check blocks above up to world height (assume 320 for 1.18+)
                for (let yy = Math.ceil(y) + 1; yy <= 320; yy++) {
                    const block = dimension.getBlock({ x: Math.floor(x), y: yy, z: Math.floor(z) });
                    if (block && block.typeId !== "minecraft:air") {
                        exposed = false;
                        break;
                    }
                }
                if (exposed && !demon.hasTag("sunproof")) {
                    // Percentage-based sun burn (override cause)
                    // Base percentage burn
                    const burnBase = calcSunBurnAmount(demon);
                    // Midday intensity boost: 1.0 at sunrise/sunset -> 1.5 at noon
                    const dayFrac = (time % 12000) / 12000; // 0..1
                    const midday = 1 - Math.abs(dayFrac - 0.5) * 2; // 0..1, peaks at noon
                    const intensity = 1 + 0.5 * midday; // 1..1.5
                    let burn = Math.round(burnBase * intensity);
                    if (burn < MIN_BURN_PER_TICK) burn = MIN_BURN_PER_TICK;
                    if (burn > MAX_BURN_PER_TICK) burn = MAX_BURN_PER_TICK;
                    demon.addTag("sunburn");
                    demon.runCommand('particle akaza:impact3 ~~1~');
                    demon.runCommand('particle minecraft:knockback_roar_particle ~~1~');
                    demon.setOnFire(3, true);
                    demon.runCommand(`damage @s ${burn} override`);
                } else {
                    // shaded or sunproof -> clear marker if present
                    try { if (demon.hasTag("sunburn")) demon.removeTag("sunburn"); } catch(_){}
                }
            } else {
                demon.runCommand('effect @s resistance 99999 255 true');
            }
        }
    } catch (err) {
        // Ignore errors
    }
}, 20); // check every second (20 ticks)