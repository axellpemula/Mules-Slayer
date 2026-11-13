execute as @s[scores={cd1=..-9}] at @s run particle minecraft:knockback_roar_particle ~~~
execute as @s[scores={cd1=..-9}] at @s run scriptevent axell:fw4
execute as @s[scores={cd1=..-7}] at @s run scriptevent wind:form1
execute as @s[scores={cd1=..-5}] at @s run playsound item.trident.riptide_3 @a ~~~ 1000 1.25 1000
execute as @s[scores={cd1=..-7}] at @s run playsound axell.raiden.m1 @a ~~~ 1000 2.25 1000
execute as @s[scores={cd1=..-7}] at @s run particle akaza:impact3
execute as @s[scores={cd1=..-7}] at @s run particle wind:form1a
execute as @s[scores={cd1=..-5}] at @s run particle wind:form1b ^^^2
execute as @s[scores={cd1=..-7}] at @s run particle wind:form1 ^^^0.5
execute as @s[scores={cd1=..-7}] at @s run particle wind:form1 ^^^2
execute as @s[scores={cd1=-7}] at @s run particle wind:form2b ^^^2
execute as @s[scores={cd1=-7}] at @s run particle wind:form2a ^^^2

execute as @s[scores={cd1=..-5}] at @s rotated ~ 0 run tp @e[r=2,rm=0.1,tag=!autoparry,type=!akaza:air,type=!xp_orb,type=!axell:dmg,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real] ^^^4

execute as @s[scores={cd1=-1}] at @s run scoreboard players set @s cd1 80