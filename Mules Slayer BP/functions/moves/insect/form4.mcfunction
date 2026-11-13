execute as @s[scores={cd4=-35..-10}] run playanimation @s animation.flame.form9d
execute as @s[scores={cd4=-35..-7}] run scriptevent axell:fw3
playanimation @s[scores={cd4=-2}] animation.insect.idle
scoreboard players set @s[scores={cd4=-1}] radpos 0
scoreboard players set @s[scores={cd4=-1}] cd4 100
scoreboard players set @s[scores={cd4=-85}] radpos 0
scoreboard players set @s[scores={cd4=-85}] cd4 400
scoreboard players set @s[scores={cd4=..-7}] sp1 -5

execute as @s[scores={cd4=-119..-100}] run scoreboard players set @s radius 40
execute as @s[scores={cd4=-119..-100}] run scoreboard players set @s multiplier 1
execute as @s[scores={cd4=-119..-100}] run scriptevent axell:damage
execute as @s[scores={cd4=-90}] run scriptevent insect:form4
execute as @s[scores={cd4=-91}] run scriptevent insect:form4
execute as @s[scores={cd4=-92}] run scriptevent insect:form4

execute as @s[scores={cd4=-7..-2}] at @s rotated ~ 0 positioned ^^^3.5 if entity @e[r=3.4,tag=!autoparry,type=!akaza:air,type=!xp_orb,type=!axell:dmg,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real] run scoreboard players set @s cd4 -121
execute as @s[scores={cd4=-35..-7}] at @s rotated ~ 0 positioned ^^^3.5 rotated ~ 0 run tp @e[r=3.4,tag=!autoparry,type=!akaza:air,type=!xp_orb,type=!axell:dmg,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real] ^^^5 facing ^^^-10
execute as @s[scores={cd4=-120..-95}] at @s run scoreboard players set @e[rm=0.1,r=4,tag=!autoparry,type=!akaza:air,type=!xp_orb,type=!axell:dmg,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real] stun2 3

execute as @s[scores={cd4=-120..-95}] at @s rotated ~ 0 run tp @e[rm=0.1,c=1,r=5,tag=!autoparry,type=!akaza:air,type=!xp_orb,type=!axell:dmg,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real] ^^^1 facing ^^^-10
execute as @s[scores={cd4=-119}] run scoreboard players set @s ultimate 45
execute as @s[scores={cd4=-119}] run titleraw @s actionbar {"rawtext":[{"text":"§4"},{"translate":"§y§rtext.insect:form4"}]}
execute as @s[scores={cd4=-119}] at @s rotated ~ 0 run particle insect:centipedess ^^^1
playanimation @s[scores={cd4=-95}] animation.insect.form4

execute as @s[scores={cd4=-35..-2}] run damage @e[r=10,rm=0.1] 0 override
execute as @s[scores={cd4=-35..-2}] run execute as @e[r=10,rm=0.1] run particle akaza:impact2 ^^^3
execute as @s[scores={cd4=-35..-2}] run camerashake add @s 0.1 0.1
execute as @s[scores={cd4=..-100}] run camerashake add @s 0.2 0.1
execute as @s[scores={cd4=-93}] run camerashake add @s 2 0.1

execute as @s[scores={cd4=-120..-100}] run playsound mob.bee.hurt 
execute as @s[scores={cd4=-93}] run playsound axell.raiden.m1 @a ^^^1 1005 1 1006
execute as @s[scores={cd4=-93}] run playsound axell.raiden.m1 @a ^^^1 1005 1.5 1006
execute as @s[scores={cd4=-93}] run playsound axell.raiden.m1 @a ^^^1 1005 3.5 1006