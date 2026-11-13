execute as @s[scores={cd1=-1}] at @s run scoreboard players set @s radpos 0
execute as @s[scores={cd1=-1}] at @s run scoreboard players set @s cd1 50
execute as @s[scores={cd1=..-1}] at @s run particle akaza:impact3 ~~1~
execute as @s[scores={cd1=..-1}] at @s run particle thunder:hold2 ~~0.5~
execute as @s[scores={cd1=..-1}] at @s run particle thunder:hold2 ~~1~
execute as @s[scores={cd1=..-1}] at @s run particle thunder:hold2 ~~~
execute as @s[scores={cd1=..-3}] at @s rotated ~ 0 run particle sound:form1d ^^^-0.5
execute as @s[scores={cd1=..-3}] at @s rotated ~ 0 run particle sound:form1d ^^^1
execute as @s[scores={cd1=..-1}] at @s rotated ~ 0 positioned ^^^3 run scoreboard players set @e[r=2.9,rm=0.1,tag=!autoparry,type=!akaza:air,type=!xp_orb,type=!axell:dmg,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real] stun2 5
execute as @s[scores={cd1=..-1}] at @s rotated ~ 0 run scriptevent thunder:form1