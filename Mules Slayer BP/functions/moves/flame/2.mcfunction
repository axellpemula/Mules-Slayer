scoreboard players set @s hold 0
scoreboard players set @s m1 0
playanimation @s[scores={ab2=0}] animation.nichirin.idle
playanimation @s[scores={cd2=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..14}] animation.nichirin.idle
tellraw @s[scores={cd2=1..,ab2=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.flame:form2"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..14,ab2=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={cd2=0,energy=15..,combostopper=0,ab2=1..}] run scriptevent axell:up1
execute as @s[scores={cd2=0,energy=15..,combostopper=1..,ab2=1..}] run scriptevent axell:up05
camerashake add @s[scores={cd2=0,energy=30..,ab2=1..}] 2 0.2
execute as @s[scores={cd2=0,energy=15..,combostopper=0,ab2=1..}] positioned ^^^2.5 run scoreboard players add @e[r=2.49] stun 20
execute as @s[scores={cd2=0,energy=15..,combostopper=0,ab2=1..}] positioned ^^^2.5 run execute as @e[r=2.49] run scriptevent axell:up1
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run playsound mob.blaze.shoot @a ~~~ 1 1.25 1
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run playsound mob.blaze.shoot @a ~~~ 1 0.75 1
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run particle flame:flame9 ~~1~
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run particle smoke:flame ~~1~

execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run scriptevent flame:form2

playanimation @s[scores={cd2=0,energy=15..,ab2=1..}] animation.flame.form2
scoreboard players set @s[scores={cd2=0,energy=15..,ab2=1..}] sp1 25
scoreboard players set @s[scores={cd2=0,energy=15..,ab2=1..}] m1 0
scoreboard players set @s[scores={cd2=0,energy=15..,ab2=1..}] combostopper 0
scoreboard players set @s[scores={cd2=0,energy=15..,ab2=1..}] cd 20
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run particle minecraft:knockback_roar_particle ~~~
scoreboard players set @s[scores={cd2=0,energy=15..,ab2=1..}] skillani 10
scoreboard players set @s[scores={cd2=0,energy=15..,ab2=1..}] cd2 -10

scoreboard players remove @s[scores={cd2=-10,energy=15..,ab2=1..}] energy 15
