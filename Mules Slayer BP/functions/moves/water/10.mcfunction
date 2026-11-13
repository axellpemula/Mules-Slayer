event entity @s axell:jatuh
scoreboard players set @s m1 0
playanimation @s animation.water.idle
tellraw @s[scores={cd10=1..,ab10=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.water:form10"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..79,ab10=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={cd10=0,energy=80..,ab10=1..}] run particle minecraft:knockback_roar_particle ~~~
execute as @s[scores={cd10=0,energy=80..,ab10=1..}] run playanimation @s animation.water.form10a
execute as @s[scores={cd10=0,energy=80..,ab10=1..}] run inputpermission set @s movement disabled
tag @s[scores={cd10=0,energy=80..,ab10=1..}] add ultimate
hud @s[scores={cd10=0,energy=80..,ab10=1..}] hide all
scoreboard players set @s[scores={cd10=0,energy=80..,ab10=1..}] cd 120
scoreboard players set @s[scores={cd10=0,energy=80..,ab10=1..}] ult 120
scoreboard players set @s[scores={cd10=0,energy=80..,ab10=1..}] skillani 5
scoreboard players set @s[scores={cd10=0,energy=80..,ab10=1..}] ultimate 120
scoreboard players set @s[scores={cd10=0,energy=80..,ab10=1..}] cd10 -40
scoreboard players remove @s[scores={cd10=-40,energy=80..,ab10=1..}] energy 80
title @s[scores={cd10=0,energy=80..,ab10=1..}] actionbar §b§lTotal Concentration..