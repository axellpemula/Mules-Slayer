scoreboard players set @s holdS 0
scoreboard players set @s rightS 0
scoreboard players set @s m1 0
event entity @s axell:jatuh
inputpermission set @s[scores={cd3=1..,ab3=1..}] movement enabled
inputpermission set @s[scores={energy=..39}] movement enabled
playanimation @s[scores={cd3=1..,ab3=1..}] animation.water.idle
playanimation @s[scores={energy=..39}] animation.water.idle
tellraw @s[scores={cd3=1..,ab3=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.water:form3"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..39,ab3=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={cd3=0,energy=40..,ab3=1..}] run scriptevent axell:fw3
execute as @s[scores={cd3=0,energy=40..,ab3=1..}] run playanimation @s animation.water.form3
execute as @s[scores={cd3=0,energy=40..,ab3=1..}] run particle minecraft:knockback_roar_particle ~~1~
execute as @s[scores={cd3=0,energy=40..,ab3=1..}] run particle water:wheel3 ~~1~
execute as @s[scores={cd3=0,energy=40..,ab3=1..}] run particle smoke:water ~~1~
execute as @s[scores={cd3=0,energy=40..,ab3=1..}] run playsound bucket.empty_water @a ~~~ 1 1.25 1
execute as @s[scores={cd3=0,energy=40..,ab3=1..}] run playsound axell.raiden.m1 @a ~~~ 1 1.75 1
execute as @s[scores={cd3=0,energy=40..,ab3=1..}] run playsound bucket.empty_water @a ~~~ 1 0.75 1

scoreboard players set @s[scores={cd3=0,energy=40..,ab3=1..}] cd 100
scoreboard players set @s[scores={cd3=0,energy=40..,ab3=1..}] skillani 50
scoreboard players set @s[scores={cd3=0,energy=40..,ab3=1..}] cd3 -50
scoreboard players remove @s[scores={cd3=300,energy=40..,ab3=1..}] energy 40
