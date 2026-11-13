scoreboard players set @s hold 0
scoreboard players set @s right 0
scoreboard players set @s m1 0
event entity @s axell:jatuh
inputpermission set @s[scores={cd6=1..,ab6=1..}] movement enabled
inputpermission set @s[scores={energy=..29}] movement enabled
playanimation @s[scores={cd6=1..,ab6=1..}] animation.water.idle
playanimation @s[scores={energy=..29}] animation.water.idle
tellraw @s[scores={cd6=1..,ab6=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.water:form6"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..29,ab6=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={cd6=0,energy=30..,ab6=1..}] run scriptevent axell:up3
execute as @s[scores={cd6=0,energy=30..,ab6=1..}] run scriptevent water:form6a
execute as @s[scores={cd6=0,energy=30..,ab6=1..}] run particle water:whirl1 ~~0.5~
execute as @s[scores={cd6=0,energy=30..,ab6=1..}] run playsound bucket.empty_water @a ~~~ 1 1.25 1
execute as @s[scores={cd6=0,energy=30..,ab6=1..}] run playsound axell.raiden.m1 @a ~~~ 1 1.75 1
execute as @s[scores={cd6=0,energy=30..,ab6=1..}] run playsound bucket.empty_water @a ~~~ 1 0.75 1
playanimation @s[scores={cd6=0,energy=30..,ab6=1..}] animation.water.form6
tag @s[scores={cd6=0,energy=30..,ab6=1..}] add nofall2
scoreboard players set @s[scores={cd6=0,energy=30..,ab6=1..}] cd 30
scoreboard players set @s[scores={cd6=0,energy=30..,ab6=1..}] skillani 5
scoreboard players set @s[scores={cd6=0,energy=30..,ab6=1..}] sp1 -10
scoreboard players set @s[scores={cd6=0,energy=30..,ab6=1..}] cd6 -10
scoreboard players remove @s[scores={cd6=-10,energy=30..,ab6=1..}] energy 30
