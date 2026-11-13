scoreboard players set @s hold 0
scoreboard players set @s m1 0
event entity @s axell:jatuh
playanimation @s[scores={ab2=0}] animation.water.idle
playanimation @s[scores={cd2=1..}] animation.water.idle
playanimation @s[scores={energy=..14}] animation.water.idle
tellraw @s[scores={cd2=1..,ab2=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.water:form2"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..14,ab2=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
camerashake add @s[scores={cd2=0,energy=30..,ab2=1..}] 2 0.2
execute as @s[scores={cd2=0,energy=15..,combostopper=0,ab2=1..}] positioned ^^^2.5 run scoreboard players add @e[r=2.49] stun 20
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run playsound bucket.empty_water @a ~~~ 1 1.25 1
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run playsound axell.raiden.m1 @a ~~~ 1 1.75 1
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run playsound bucket.empty_water @a ~~~ 1 0.75 1
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run particle water:wheel3 ~~1~

execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run scriptevent water:form2a
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run scriptevent axell:wheel
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run tag @s add autoparry

playanimation @s[scores={cd2=0,energy=15..,ab2=1..}] animation.water.form2
scoreboard players set @s[scores={cd2=0,energy=15..,ab2=1..}] sp1 25
scoreboard players set @s[scores={cd2=0,energy=15..,ab2=1..}] m1 0
scoreboard players set @s[scores={cd2=0,energy=15..,ab2=1..}] combostopper 0
scoreboard players set @s[scores={cd2=0,energy=15..,ab2=1..}] cd 20
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run particle minecraft:knockback_roar_particle ~~~
scoreboard players set @s[scores={cd2=0,energy=15..,ab2=1..}] skillani 10
scoreboard players set @s[scores={cd2=0,energy=15..,ab2=1..}] cd2 -10

scoreboard players remove @s[scores={cd2=-10,energy=15..,ab2=1..}] energy 15
