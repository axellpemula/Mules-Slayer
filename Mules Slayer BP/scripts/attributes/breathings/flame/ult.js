import { system } from "@minecraft/server";

system.afterEvents.scriptEventReceive.subscribe((event) => {
    if (event.id !== "ult:flame") return;
    const player = event.sourceEntity;
    if (!player || !player.isValid()) return;
    const playerName = player.name;

    // Define the hidup selector
    const hidup = 'family=!inanimate,type=!axell:dmg,type=!xp_orb,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real';

    // Helper to run a command as the player
    function cmd(c) {
        player.runCommandAsync(c);
    }

    // All commands, with {rengoku} replaced by playerName and {hidup} replaced by hidup
    const commands = [
        `execute as @s[scores={cd9=1..,ultimate=133..150}] at @s run tp @e[type=flame:rengoku9,name="${playerName}"] ^^0.25^1.5 facing ^^^10`,
        `execute as @s[scores={cd9=1..,ultimate=80..130}] at @s run tp @e[type=flame:rengoku9,name="${playerName}"] ~~1000~`,
        `execute as @s[scores={cd9=1..,ultimate=145}] at @s run summon flame:rengoku9 ^^0.5^1.5 facing ^^^10 spawn_medium "${player.name}"`,
    ];

    // Helper to run commands sequentially with a delay to avoid command queue overflow
    async function runCommandsWithDelay(cmds) {
        for (const c of cmds) {
           cmd(c);
        }
    }

    runCommandsWithDelay(commands);
});