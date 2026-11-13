scoreboard players set @s rightD 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
playanimation @s animation.water.idle
event entity @s axell:jatuh
playanimation @s animation.water.idle
tellraw @s[scores={cd9=1..,ab9=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.wind:form9"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..49,ab9=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={cd9=0,energy=50..,ab9=1..}] run playanimation @s animation.wind.form9
execute as @s[scores={cd9=0,energy=50..,ab9=1..}] run inputpermission set @s movement disabled
tag @s[scores={cd9=0,energy=50..,ab9=1..}] add ultimate
hud @s[scores={cd9=0,energy=50..,ab9=1..}] hide all

execute as @s[scores={cd9=0,energy=50..,ab9=1..}] run effect @s slow_falling 2 0 true
execute as @s[scores={cd9=0,energy=50..,ab9=1..}] run tp ~~~ ~ 0
event entity @s[scores={cd9=0,energy=50..,ab9=1..}] axell:terbang
inputpermission set @s[scores={cd9=0,energy=50..,ab9=1..}] camera disabled

camera @s[scores={cd9=0,energy=50..,ab9=1..}] set minecraft:free pos ^-0.5^2^-1.5 rot ~~-10

scoreboard players set @s[scores={cd9=0,energy=50..,ab9=1..}] cd 30
scoreboard players set @s[scores={cd9=0,energy=50..,ab9=1..}] radpos 80
scoreboard players set @s[scores={cd9=0,energy=50..,ab9=1..}] ultimate 25
scoreboard players set @s[scores={cd9=0,energy=50..,ab9=1..}] ult 25
scoreboard players set @s[scores={cd9=0,energy=50..,ab9=1..}] skillani 5
scoreboard players set @s[scores={cd9=0,energy=50..,ab9=1..}] cd9 -40
title @s[scores={cd9=0,energy=50..,ab9=1..}] actionbar §2§lWind Breathing!
scoreboard players remove @s[scores={cd9=-40,energy=50..,ab9=1..}] energy 50