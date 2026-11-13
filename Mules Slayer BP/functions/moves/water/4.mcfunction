scoreboard players set @s hold 0
scoreboard players set @s m1 0
event entity @s axell:jatuh
playanimation @s[scores={ab4=0}] animation.water.idle
playanimation @s[scores={cd4=1..}] animation.water.idle
playanimation @s[scores={energy=..24}] animation.water.idle
tellraw @s[scores={cd4=1..,ab4=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.water:form4"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..24,ab4=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={cd4=0,energy=25..,combostopper=0,ab4=1..}] run scriptevent axell:fw2
camerashake add @s[scores={cd4=0,energy=30..,ab4=1..}] 2 0.2
execute as @s[scores={cd4=0,energy=25..,combostopper=0,ab4=1..}] positioned ^^^2.5 run scoreboard players add @e[r=2.49] stun 10
execute as @s[scores={cd4=0,energy=25..,ab4=1..}] run playsound bucket.empty_water @a ~~~ 1000 1.25 1000
execute as @s[scores={cd4=0,energy=25..,ab4=1..}] run playsound axell.raiden.m1 @a ~~~ 1000 1.25 1000
execute as @s[scores={cd4=0,energy=25..,ab4=1..}] run playsound bucket.empty_water @a ~~~ 1000 0.75 1000
execute as @s[scores={cd4=0,energy=25..,ab4=1..}] run particle akaza:impact3 ~~1~

execute as @s[scores={cd4=0,energy=25..,ab4=1..}] run scriptevent water:form4a

playanimation @s[scores={cd4=0,energy=25..,ab4=1..}] animation.water.form4
scoreboard players set @s[scores={cd4=0,energy=25..,ab4=1..}] sp1 25
scoreboard players set @s[scores={cd4=0,energy=25..,ab4=1..}] m1 0
scoreboard players set @s[scores={cd4=0,energy=25..,ab4=1..}] combostopper 0
scoreboard players set @s[scores={cd4=0,energy=25..,ab4=1..}] cd 30
execute as @s[scores={cd4=0,energy=25..,ab4=1..}] run particle minecraft:knockback_roar_particle ~~~
scoreboard players set @s[scores={cd4=0,energy=25..,ab4=1..}] skillani 10
scoreboard players set @s[scores={cd4=0,energy=25..,ab4=1..}] cd4 -10

scoreboard players remove @s[scores={cd4=-10,energy=25..,ab4=1..}] energy 25
