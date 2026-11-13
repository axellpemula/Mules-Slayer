scoreboard players set @s hold 0
scoreboard players set @s right 0
scoreboard players set @s m1 0
event entity @s axell:jatuh
inputpermission set @s[scores={cd5=!0,ab5=1..}] movement enabled
inputpermission set @s[scores={energy=..49}] movement enabled
playanimation @s[scores={cd5=!0,ab5=1..}] animation.water.idle
playanimation @s[scores={energy=..49}] animation.water.idle
tellraw @s[scores={cd5=1..,ab5=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.water:form5"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..49,ab5=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={cd5=0,energy=50..,ab5=1..}] run scriptevent axell:fwrom5
execute as @s[scores={cd5=0,energy=50..,ab5=1..}] run particle minecraft:knockback_roar_particle ~~1~
execute as @s[scores={cd5=0,energy=50..,ab5=1..}] run particle water:wheel3 ~~1~
execute as @s[scores={cd5=0,energy=50..,ab5=1..}] run particle smoke:water ~~1~
execute as @s[scores={cd5=0,energy=50..,ab5=1..}] run playsound bucket.empty_water @a ~~~ 1 1.25 1
execute as @s[scores={cd5=0,energy=50..,ab5=1..}] run playsound axell.raiden.m1 @a ~~~ 1 1.75 1
execute as @s[scores={cd5=0,energy=50..,ab5=1..}] run playsound bucket.empty_water @a ~~~ 1 0.75 1
playanimation @s[scores={cd5=0,energy=50..,ab5=1..}] animation.water.form5


scoreboard players set @s[scores={cd5=0,energy=50..,ab5=1..}] radpos 20
scoreboard players set @s[scores={cd5=0,energy=50..,ab5=1..}] cd 70
scoreboard players set @s[scores={cd5=0,energy=50..,ab5=1..}] skillani 30
scoreboard players set @s[scores={cd5=0,energy=50..,ab5=1..}] sp1 -10
scoreboard players set @s[scores={cd5=0,energy=50..,ab5=1..}] cd5 -50
scoreboard players remove @s[scores={cd5=-50,energy=50..,ab5=1..}] energy 50
