scoreboard players set @s rightD 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
event entity @s axell:jatuh
playanimation @s animation.water.idle
tellraw @s[scores={cd11=1..,ab11=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.water:form11"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..49,ab11=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={cd11=0,energy=50..,ab11=1..}] run playanimation @s animation.water.form11
execute as @s[scores={cd11=0,energy=50..,ab11=1..}] run tp ~~~ ~ 0
execute as @s[scores={cd11=0,energy=50..,ab11=1..}] run particle minecraft:knockback_roar_particle ~~~
inputpermission set @s[scores={cd11=0,energy=50..,ab11=1..}] camera disabled
inputpermission set @s[scores={cd11=0,energy=50..,ab11=1..}] movement disabled
hud @s[scores={cd11=0,energy=50..,ab11=1..}] hide all

title @s[scores={cd11=0,energy=50..,ab11=1..}] actionbar §b§lTotal Concentration.

tag @s[scores={cd11=0,energy=50..,ab11=1..}] add ultimate
scoreboard players set @s[scores={cd11=0,energy=50..,ab11=1..}] cd 20
scoreboard players set @s[scores={cd11=0,energy=50..,ab11=1..}] skillani 5
scoreboard players set @s[scores={cd11=0,energy=50..,ab11=1..}] ult 200
scoreboard players set @s[scores={cd11=0,energy=50..,ab11=1..}] ultimate 200
scoreboard players set @s[scores={cd11=0,energy=50..,ab11=1..}] cd11 -200
scoreboard players remove @s[scores={cd11=-200,energy=50..,ab11=1..}] energy 50