import { world, system } from "@minecraft/server";
import { getScore } from "./akazaUtils";

export const m1 = [45, 42, 48, 40, 25, 90];
export const form1 = [220, 190], form2 = 56, form3 = [30, 75], form4 = 170, form5 = 90;
export const form6 = 35, form7 = 65, form8 = 150, form9 = 80;
export const form10 = 20;

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const m1lvl = getScore("bm1lvl", player);
        m1.forEach((base, idx) => {
            if (Array.isArray(base)) {
                base.forEach((b, i) => {
                    const percent = Math.round(b * Math.pow(1.1, m1lvl - 1));
                    // player.runCommandAsync(`scoreboard players set @s m1${String.fromCharCode(97 + idx)}_${i + 1} ${percent}`);
                });
            } else {
                const percent = Math.round(base * Math.pow(1.1, m1lvl - 1));
                // player.runCommandAsync(`scoreboard players set @s m1${String.fromCharCode(97 + idx)} ${percent}`);
            }
        });
        // (Form multipliers update omitted for brevity)
    }
}, 0);
