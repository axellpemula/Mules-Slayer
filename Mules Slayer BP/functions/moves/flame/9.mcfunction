tellraw @s[scores={cd9=1..,ab9=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.flame:form9"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..79,ab9=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}

scoreboard players set @s m1 0
execute as @s[scores={cd9=0,energy=80..}] at @s run tp ~~~ ~ 0
execute at @s[scores={cd9=0,energy=80..}] run particle akaza:impact3 ~~~
execute at @s[scores={cd9=0,energy=80..}] run particle akaza:impact3 ~~~
execute at @s[scores={cd9=0,energy=80..}] run particle minecraft:knockback_roar_particle ~~~
hud @s[scores={cd9=0,energy=80..}] hide all
scoreboard players set @s[scores={cd9=0,energy=80..}] skillani 210
scoreboard players set @s[scores={cd9=0,energy=80..}] ultimate 191
tag @s[scores={cd9=0,energy=80..}] add ultimate
title @s[scores={cd9=0,energy=80..}] actionbar §6§lSet your heart ablaze..
scoreboard players set @s[scores={cd9=0,energy=80..}] cd9 550