# Initial triggers
execute as @s[scores={cd10=..-2}] run scriptevent axell:fw2
execute as @s[scores={cd10=..-1}] run scriptevent water:form10A
execute as @s[scores={cd10=..-1}] rotated ~ 0 positioned ^^^2.75 run tp @e[r=2.74,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real] ^^^3 facing ^^^-10

# Main ultimate activation and state setup
execute as @s[scores={cd10=-1},type=player] run scriptevent axell:up1
execute as @s[scores={cd10=-1},type=!player] run tp ~~1~
execute as @s[scores={cd10=-1},type=!player] run tp ~~1~
execute as @s[scores={cd10=-1},type=!player] run tp ~~1~
execute as @s[scores={cd10=-1},type=!player] run tp ~~1~
execute as @s[scores={cd10=-1}] run event entity @s axell:terbang
execute as @s[scores={cd10=-1}] run scoreboard players set @s cd10 600

# Camera and input control
execute as @s[scores={cd10=-5}] run tp @s ~~~ ~ 0
execute as @s[scores={cd10=..-1}] run inputpermission set @s movement disabled
execute as @s[scores={cd10=-6}] run inputpermission set @s camera disabled
execute at @s run camera @s[scores={cd10=-2}] set minecraft:free pos ^-3^1^5 rot ~-35~220

# Sequence events
execute as @s[scores={cd10=-37}] run scriptevent water:form10a
execute as @s[scores={cd10=-27}] run scriptevent water:form10b
execute as @s[scores={cd10=-35}] run scriptevent water:form10c
execute as @s[scores={cd10=-20}] run scriptevent water:form10d
execute as @s[scores={cd10=-10}] run scriptevent water:form10e

# Ultimate visual effects
execute as @s[scores={cd10=595..620}] run particle water:form10c ~~-1~
execute as @s[scores={cd10=589..595}] run particle water:form10c ~~~
execute as @s[scores={cd10=585..589}] run particle water:form10c ~~1~
execute as @s[scores={cd10=575..587}] run particle water:form10c ~~1.5~
execute as @s[scores={cd10=575..587}] run particle water:wheel3 ~~2.5~
execute as @s[scores={cd10=560..565}] run particle water:form10z ~~2.5~
execute as @s[scores={cd10=552..565}] run particle water:form10d ~~2.5~
execute as @s[scores={cd10=552..554}] run particle water:wheel3 ^^3^5
execute as @s[scores={cd10=-10..-1}] run particle water:form10c ~~~

# Camera shake
camerashake add @s[scores={cd10=575..620}] 0.1 0.1

# actionbar text
title @s[scores={cd10=..-21}] actionbar §b§lTotal Concentration..
title @s[scores={cd10=-20..-1}] actionbar §b§lWater Breathing..
title @s[scores={cd10=599}] actionbar §b§l10th Form!
title @s[scores={cd10=550}] actionbar §b§lConstant Flux!

# Camera transitions
execute at @s run camera @s[scores={cd10=585}] set minecraft:free pos ^-0.5^1.25^1 rot ~-35~210
execute at @s[scores={cd10=589}] run summon water:form10a ^^-2.25^ facing ^^^10
execute at @s[scores={cd10=-2}] run playsound mob.enderdragon.growl @a ~~~ 1 0.55 1
execute at @s[scores={cd10=582}] run playsound mob.enderdragon.growl @a ~~~ 10 0.95 10
execute at @s[scores={cd10=552}] run playsound axell.raiden.m1 @a ~~~ 10 0.75 10
execute at @s run camera @s[scores={cd10=580}] set minecraft:free ease 0.5 in_circ pos ^-1^3^3 rot ~-15~210
execute at @s run camera @s[scores={cd10=560}] set minecraft:free pos ~~15~ rot ~90~
execute at @s run camera @s[scores={cd10=544}] set minecraft:free pos ^-2^-2^1 rot ~~-20

# Animation and cleanup
playanimation @s[scores={cd10=550}] animation.water.form10b
execute as @s[scores={cd10=590}] run tp @s ~~~ ~ 0
execute as @s[scores={cd10=516..},type=!player] run tp @s ~~~ ~ 0
execute as @s[scores={cd10=544}] run scriptevent axell:dw3
execute as @s[scores={cd10=515}] run scriptevent axell:beatdowncancel
execute as @s[scores={cd10=540}] run scriptevent water:form10f
execute as @s[scores={cd10=516..}] run scoreboard players set @s ultimate 5