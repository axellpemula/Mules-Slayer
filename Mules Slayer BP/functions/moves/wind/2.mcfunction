scoreboard players set @s hold 0
playanimation @s[scores={ab2=0}] animation.nichirin.idle
playanimation @s[scores={cd2=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..14}] animation.nichirin.idle
tellraw @s[scores={cd2=1..,ab2=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.wind:form2"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..14,ab2=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
camerashake add @s[scores={cd2=0,energy=30..,ab2=1..}] 2 0.2

execute as @s[scores={cd2=0,energy=15..,ab2=1..}] positioned ^^^2.5 run scoreboard players add @e[r=2.49] stun 10
execute as @s[scores={cd2=0,energy=15..,ab2=1..,onground=0}] positioned ^^^2.5 run scoreboard players set @e[r=2.49] stun2 15

execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run playsound item.trident.riptide_3 @a ~~~ 1 1.25 1
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run playsound item.trident.riptide_3 @a ~~~ 1 0.75 1
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run playsound item.trident.riptide_3 @a ~~~ 1 1 1
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run playsound axell.raiden.m1 @a ~~~ 1 1.25 1
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run playsound axell.raiden.m1 @a ~~~ 1 1 1
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run playsound axell.raiden.m1 @a ~~~ 1 0.75 1
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run playsound axell.raiden.m1 @a ~~~ 1 1.5 1
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run particle wind:form2a
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run particle akaza:impact3
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run particle wind:form2b ^^^3

execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run scriptevent wind:form2
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run scriptevent wind:form2
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run scriptevent wind:form2
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run scriptevent wind:form2

playanimation @s[scores={cd2=0,energy=15..,ab2=1..}] animation.wind.form2
scoreboard players set @s[scores={cd2=0,energy=15..,ab2=1..}] sp1 -10
scoreboard players set @s[scores={cd2=0,energy=15..,ab2=1..}] combostopper 0
scoreboard players set @s[scores={cd2=0,energy=15..,ab2=1..}] cd 20
execute as @s[scores={cd2=0,energy=15..,ab2=1..}] run particle minecraft:knockback_roar_particle ~~~
scoreboard players set @s[scores={cd2=0,energy=15..,ab2=1..}] skillani 10

scoreboard players set @s[scores={cd2=0,energy=15..,ab2=1..}] cd2 -2
scoreboard players remove @s[scores={cd2=-2,energy=15..,ab2=1..}] energy 15
