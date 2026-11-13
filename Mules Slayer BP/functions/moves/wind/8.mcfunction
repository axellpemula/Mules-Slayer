scoreboard players set @s hold 0
scoreboard players set @s m1 0
playanimation @s[scores={ab8=0}] animation.nichirin.idle
playanimation @s[scores={cd8=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..34}] animation.nichirin.idle
tellraw @s[scores={cd8=1..,ab8=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.wind:form8"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..34,ab8=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
camerashake add @s[scores={cd8=0,energy=30..,ab8=1..}] 2 0.2

execute as @s[scores={cd8=0,energy=35..,ab8=1..}] positioned ^^^2.5 run scoreboard players add @e[r=2.49] stun 10

execute as @s[scores={cd8=0,energy=35..,ab8=1..}] run playsound item.trident.riptide_3 @a ~~~ 1 1.25 1
execute as @s[scores={cd8=0,energy=35..,ab8=1..}] run playsound item.trident.riptide_3 @a ~~~ 1 0.75 1
execute as @s[scores={cd8=0,energy=35..,ab8=1..}] run playsound item.trident.riptide_3 @a ~~~ 1 1 1
execute as @s[scores={cd8=0,energy=35..,ab8=1..}] run playsound axell.raiden.m1 @a ~~~ 1 1.25 1
execute as @s[scores={cd8=0,energy=35..,ab8=1..}] run particle wind:form2a
execute as @s[scores={cd8=0,energy=35..,ab8=1..}] run particle akaza:impact3
execute as @s[scores={cd8=0,energy=35..,ab8=1..}] run particle wind:form2b ^^^
execute as @s[scores={cd8=0,energy=35..,ab8=1..}] run particle wind:form8 ^^^
execute as @s[scores={cd8=0,energy=35..,ab8=1..}] run particle wind:form8 ^^^

scoreboard players set @s[scores={cd8=0,energy=35..,ab8=1..}] radpos 20
execute as @s[scores={cd8=0,energy=35..,ab8=1..}] run scriptevent wind:form8
execute as @s[scores={cd8=0,energy=35..,ab8=1..}] run scriptevent axell:wind8

playanimation @s[scores={cd8=0,energy=35..,ab8=1..}] animation.wind.form8
scoreboard players set @s[scores={cd8=0,energy=35..,ab8=1..}] sp1 -12
scoreboard players set @s[scores={cd8=0,energy=35..,ab8=1..}] m1 0
scoreboard players set @s[scores={cd8=0,energy=35..,ab8=1..}] combostopper 0
scoreboard players set @s[scores={cd8=0,energy=35..,ab8=1..}] cd 20
execute as @s[scores={cd8=0,energy=35..,ab8=1..}] run particle minecraft:knockback_roar_particle ~~~
scoreboard players set @s[scores={cd8=0,energy=35..,ab8=1..}] skillani 10

scoreboard players set @s[scores={cd8=0,energy=35..,ab8=1..}] cd8 -10
scoreboard players remove @s[scores={cd8=-10,energy=35..,ab8=1..}] energy 35
