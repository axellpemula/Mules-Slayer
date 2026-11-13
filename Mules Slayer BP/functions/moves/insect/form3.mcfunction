execute as @s[scores={cd3=-119}] run playsound axell.raiden.m1 @a ^^^1 1005 3.25 1006
execute as @s[scores={cd3=-117}] run playsound axell.raiden.m1 @a ^^^1 1005 3.05 1006
execute as @s[scores={cd3=-115}] run playsound axell.raiden.m1 @a ^^^1 1005 2.95 1006
execute as @s[scores={cd3=-113}] run playsound axell.raiden.m1 @a ^^^1 1005 2.85 1006
execute as @s[scores={cd3=-111}] run playsound axell.raiden.m1 @a ^^^1 1005 2.75 1006
execute as @s[scores={cd3=-109}] run playsound axell.raiden.m1 @a ^^^1 1005 2.65 1006


execute as @s[scores={cd3=-120}] at @s rotated ~ 0 if entity @e[rm=0.1,r=2.5] run tp @s ~~~
execute as @s[scores={cd3=-119}] at @s run event entity @e[type=insect:dragonfly,c=1] despawn_event

execute as @s[scores={cd3=-119}] at @s run tag @s add barrage
execute as @s[scores={cd3=-119}] at @s run particle smoke:insect
execute as @s[scores={cd3=-119}] at @s run scoreboard players set @s ultimate 22
execute as @s[scores={cd3=-119}] at @s rotated ~ 0 run particle akaza:impact ^^1^1

playanimation @s[scores={cd3=-119}] animation.insect.form3
execute as @s[scores={cd3=-35..-3}] at @s positioned ^^^3.5 rotated ~ 0 if entity @e[r=3.4,tag=!autoparry,type=!akaza:air,type=!xp_orb,type=!axell:dmg,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real] run scoreboard players set @s cd3 -120
execute as @s[scores={cd3=-2}] at @s rotated ~ 0 if entity @e[rm=0.1,r=2.5] run scriptevent axell:fw10

execute as @s[scores={cd3=-119}] run scriptevent insect:form3
execute as @s[scores={cd3=-117}] run scriptevent insect:form3
execute as @s[scores={cd3=-115}] run scriptevent insect:form3
execute as @s[scores={cd3=-113}] run scriptevent insect:form3
execute as @s[scores={cd3=-111}] run scriptevent insect:form3
execute as @s[scores={cd3=-110}] run scriptevent insect:form3

execute as @s[scores={cd3=-115}] run titleraw @s actionbar {"rawtext":[{"text":"§d"},{"translate":"§y§rtext.insect:form3"}]}

execute as @s[scores={cd3=..-109}] at @s rotated ~ 0 run tp @e[r=2.5,rm=0.1] ^^^3
execute as @s[scores={cd3=-109}] run scriptevent axell:fw8
execute as @s[scores={cd3=..-110}] run scriptevent axell:mist2

execute as @s[scores={cd3=-35..-10}] run playanimation @s animation.flame.form9d
execute as @s[scores={cd3=-30..-7}] run playsound mob.bee.hurt 

execute as @s[scores={cd3=-30..-7}] run scriptevent axell:form3w
execute as @s[scores={cd3=-30}] rotated ~ 0 run summon insect:dragonfly ^^1.65^1 facing ^^1^10

execute as @s[scores={cd3=-35..-5}] rotated ~ 0 run particle smoke:insect6 ^^0.8^1
execute as @s[scores={cd3=..-105}] run particle smoke:insect ~~1~
execute as @s[scores={cd3=-110..-107}] run particle smoke:insect2 ~~1~

execute as @s[scores={cd3=-5}] run particle smoke:insect5 ~~1~
execute as @s[scores={cd3=-5}] at @s run event entity @e[type=insect:dragonfly,c=1] despawn_event

execute as @s[scores={cd3=..-109}] run camerashake add @s 0.2 0.1

playanimation @s[scores={cd3=-7}] animation.insect.m1a


tag @s[scores={cd3=-101}] remove barrage
tag @s[scores={cd3=-1}] remove barrage
execute as @s[scores={cd3=-101}] run scoreboard players set @s sp1 -7
execute as @s[scores={cd3=-1}] run scoreboard players set @s sp1 -7
execute as @s[scores={cd3=-101}] run scoreboard players set @s dsneak 0
execute as @s[scores={cd3=-1}] run scoreboard players set @s dsneak 0
execute as @s[scores={cd3=-101}] run scoreboard players set @s cd3 50
execute as @s[scores={cd3=-1}] run scoreboard players set @s cd3 50