scoreboard players set @s hold 0
scoreboard players set @s m1 2
scoreboard players set @s m1 0
event entity @s axell:jatuh
playanimation @s[scores={ab1=0}] animation.water.idle
playanimation @s[scores={cd1=1..}] animation.water.idle
playanimation @s[scores={energy=..14}] animation.water.idle
tellraw @s[scores={cd1=1..,ab1=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.water:form1"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..14,ab1=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={cd1=0,energy=15..,combostopper=0,ab1=1..}] run scriptevent axell:fw3
camerashake add @s[scores={cd1=0,energy=30..,ab1=1..}] 2 0.2
execute as @s[scores={cd1=0,energy=15..,combostopper=0,ab1=1..}] positioned ^^^2.5 run scoreboard players add @e[r=2.49] stun 20
execute as @s[scores={cd1=0,energy=15..,ab1=1..}] run playsound bucket.empty_water @a ~~~ 1000 1.25 1000
execute as @s[scores={cd1=0,energy=15..,ab1=1..}] run playsound axell.raiden.m1 @a ~~~ 1000 1.25 1000
execute as @s[scores={cd1=0,energy=15..,ab1=1..}] run playsound bucket.empty_water @a ~~~ 1000 0.75 1000
execute as @s[scores={cd1=0,energy=15..,ab1=1..}] run particle akaza:impact3 ~~1~

execute as @s[scores={cd1=0,energy=15..,ab1=1..}] run scriptevent water:form1
execute as @s[scores={cd1=0,energy=15..,ab1=1..}] rotated ~ 0 run particle smoke:wind ^^1^2

playanimation @s[scores={cd1=0,energy=15..,ab1=1..}] animation.water.form1
scoreboard players set @s[scores={cd1=0,energy=15..,ab1=1..}] sp1 25
scoreboard players set @s[scores={cd1=0,energy=15..,ab1=1..}] m1 0
scoreboard players set @s[scores={cd1=0,energy=15..,ab1=1..}] combostopper 0
scoreboard players set @s[scores={cd1=0,energy=15..,ab1=1..}] cd 20
execute as @s[scores={cd1=0,energy=15..,ab1=1..}] run particle minecraft:knockback_roar_particle ~~~
scoreboard players set @s[scores={cd1=0,energy=15..,ab1=1..}] skillani 10
scoreboard players set @s[scores={cd1=0,energy=15..,ab1=1..}] cd1 40

scoreboard players remove @s[scores={cd1=40,energy=15..,ab1=1..}] energy 15
