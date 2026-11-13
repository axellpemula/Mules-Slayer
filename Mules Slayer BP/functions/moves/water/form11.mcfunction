execute as @s[scores={cd11=-198}] run summon water:form11
execute as @s[scores={cd11=-198}] run camera @s set minecraft:free pos ^^2^5 rot ~15~180
execute as @s[scores={cd11=-197}] run camera @s set minecraft:free ease 3 in_circ pos ^^0.7^-12 rot ~~180
execute as @s[scores={cd11=-160}] run camera @s set minecraft:free ease 3 in_circ pos ^^1.5^ rot ~~180
execute as @s[scores={cd11=-130}] run camera @s set minecraft:free pos ^^2^-3 rot ~20~
execute as @s[scores={cd11=-129}] run camera @s set minecraft:free ease 7 in_circ pos ^^2.25^-14 rot ~22~
execute as @s[scores={cd11=-95}] run /camera @s fade time 1 1 2 color 206 226 255

fog @s[scores={cd11=-199}] push "minecraft:fog_cold_taiga" "ult"

# actionbar text
title @s[scores={cd11=-190}] actionbar §b§lTotal Concentration..
title @s[scores={cd11=-180}] actionbar §b§lTotal Concentration...
title @s[scores={cd11=-160}] actionbar §b§lWater Breathing.
title @s[scores={cd11=-150}] actionbar §b§lWater Breathing..
title @s[scores={cd11=-140}] actionbar §b§lWater Breathing...
title @s[scores={cd11=-130}] actionbar §b§l11th Form...
title @s[scores={cd11=-100}] actionbar §b§lDead Calm.

#playsound effects
execute as @s[scores={cd11=-199}] run playsound mob.enderdragon.growl @a ~~~ 110 0.25 100
execute as @s[scores={cd11=-101}] run stopsound @s
execute as @s[scores={cd11=-100}] run playsound note.chime @a ~~~ 0.5 0.75 100
execute as @s[scores={cd11=-100}] run playsound bucket.empty_water @a ~~~ 1100000 0.75 10000

# Animation and effects
execute as @s[scores={cd11=-101}] run scoreboard players set @s radpos 120
execute as @s[scores={cd11=-100}] run scriptevent water:form11
execute as @s[scores={cd11=-100}] run scoreboard players set @e[family=!inanimate,type=!axell:dmg,type=!xp_orb,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real,r=12,rm=0.1] stun 60
execute as @s[scores={cd11=-60}] run scriptevent axell:beatdowncancel
execute as @s[scores={cd11=-60}] run scoreboard players set @s ultimate 10
execute as @s[scores={cd11=-60}] run scoreboard players set @s ult 10
execute as @s[scores={cd11=-60}] run scoreboard players set @s cd11 700

#particle effects
execute as @s[scores={cd11=-199..-101}] run particle water:form11a ~~0.1~
execute as @s[scores={cd11=-100..-60}] run particle water:form11d ~~~