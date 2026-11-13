particle akaza:air ~~0.5~
scoreboard players add @s cd 1

execute as @s run scoreboard players set @s radpos 0
execute as @s run scoreboard players set @s pen 0
execute as @s run scriptevent akaza:bda2

execute at @s if block ^^0.5^0.5 air positioned ^^^1 unless entity @e[r=0.9,family=!inanimate,type=!axell:dmg,type=!xp_orb,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real] run tp ^^^0.5
execute at @s  unless block ^^0.5^0.7 air run scoreboard players set @s cd 20
execute as @s[scores={cd=15..}] at @s run playsound random.explode @a ^^^1 5 1 0.5
execute as @s[scores={cd=15..}] at @s run particle akaza:impact3 ~~.5~
kill @s[scores={cd=15..}]
execute as @e[rm=0.1,r=1.4] at @s run tp ~~~