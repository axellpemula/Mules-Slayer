execute as @s[scores={cd3=..-10}] rotated ~ 0 positioned ^^^2 run tp @e[r=1.9,type=!akaza:air,type=!xp_orb,type=!axell:dmg,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real] ^^^-1.25 facing ^^^-10
execute as @s[scores={cd3=-9}] rotated ~ 0 positioned ^^^2 run tp @e[r=1.9,type=!akaza:air,type=!xp_orb,type=!axell:dmg,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real] ^^^1 facing ^^^-10

execute as @s[scores={cd3=..-15}] run particle smoke:wind ~~-1~

execute as @s[scores={cd3=-6..-5}] at @s rotated ~ 0 run particle thunder:form4a ^^^2
execute as @s[scores={cd3=-5..-3}] at @s rotated ~ 0 run particle thunder:form4a ^^^3

execute as @s[scores={cd3=-17}] run playsound item.trident.thunder @a ~~~ 1 5 1
execute as @s[scores={cd3=-15}] run playsound item.trident.thunder @a ~~~ 1 6 1
execute as @s[scores={cd3=-13}] run playsound item.trident.thunder @a ~~~ 1 7 1
execute as @s[scores={cd3=-11}] run playsound item.trident.thunder @a ~~~ 1 8 1
execute as @s[scores={cd3=-9}] run playsound item.trident.thunder @a ~~~ 1 7 1
execute as @s[scores={cd3=-9}] run playsound ambient.weather.thunder @a ~~~ 1 8 1

execute as @s[scores={cd3=-17}] run scriptevent thunder:form3
execute as @s[scores={cd3=-13}] run scriptevent thunder:form3
execute as @s[scores={cd3=-11}] run scriptevent thunder:form3
execute as @s[scores={cd3=-7}] run scriptevent thunder:form3
execute as @s[scores={cd3=-5}] run scriptevent thunder:form3

camerashake add @s[scores={cd3=..-6}] 0.1 0.1
camerashake add @s[scores={cd3=-5}] 2 0.1

execute as @s[scores={cd3=..-5}] run tag @s add autoparry
execute as @s[scores={cd3=-1}] run scoreboard players reset @s radpos
execute as @s[scores={cd3=-1}] run tag @s remove autoparry

execute as @s[scores={cd3=-1}] at @s run scoreboard players set @s cd3 100