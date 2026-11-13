event entity @s axell:jatuh
playanimation @s animation.water.idle
scoreboard players set @s m1 0
tellraw @s[scores={cd7=1..,ab7=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.wind:form7"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..29,ab7=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={cd7=0,energy=30..,ab7=1..}] run playanimation @s animation.wind.form7
execute as @s[scores={cd7=0,energy=30..,ab7=1..}] run inputpermission set @s movement disabled
tag @s[scores={cd7=0,energy=30..,ab7=1..}] add ultimate
hud @s[scores={cd7=0,energy=30..,ab7=1..}] hide all

execute as @s[scores={cd7=0,energy=30..,ab7=1..}] run scriptevent wind:form7
fog @s[scores={cd7=0,energy=30..,ab7=1..}]  push "minecraft:fog_warped_forest" "ult"
execute as @s[scores={cd7=0,energy=30..,ab7=1..}] run tp ~~2~ ~ 0
execute as @s[scores={cd7=0,energy=30..,ab7=1..}] run effect @s slow_falling 2 0 true
event entity @s[scores={cd7=0,energy=30..,ab7=1..}] axell:terbang
inputpermission set @s[scores={cd7=0,energy=30..,ab7=1..}] camera disabled

scoreboard players set @s[scores={cd7=0,energy=30..,ab7=1..}] cd 30
scoreboard players set @s[scores={cd7=0,energy=30..,ab7=1..}] ultimate 25
scoreboard players set @s[scores={cd7=0,energy=30..,ab7=1..}] ult 25
scoreboard players set @s[scores={cd7=0,energy=30..,ab7=1..}] skillani 5
scoreboard players set @s[scores={cd7=0,energy=30..,ab7=1..}] cd7 -40
title @s[scores={cd7=0,energy=30..,ab7=1..}] actionbar §2§lWind Breathing!
scoreboard players remove @s[scores={cd7=-40,energy=30..,ab7=1..}] energy 30