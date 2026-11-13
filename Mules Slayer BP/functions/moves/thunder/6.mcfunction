scoreboard players set @s holdS 0
scoreboard players set @s rightS 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
playanimation @s[scores={cd6=1..,ab6=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..19}] animation.nichirin.idle
tellraw @s[scores={cd6=1..,ab6=1..}] {"rawtext":[{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..19,ab6=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={cd6=0,energy=20..,ab6=1..}] run scriptevent thunder:form6
execute as @s[scores={cd6=0,energy=20..,ab6=1..}] run scriptevent axell:fw15

execute as @s[scores={cd6=0,energy=20..,ab6=1..}] run particle akaza:impact3 ~~~
execute as @s[scores={cd6=0,energy=20..,ab6=1..}] run particle smoke:sound2 ~~~
execute as @s[scores={cd6=0,energy=20..,ab6=1..}] run particle sound:form1b ~~~
execute as @s[scores={cd6=0,energy=20..,ab6=1..}] run particle thunder:hold2 ~~~
execute as @s[scores={cd6=0,energy=20..,ab6=1..}] run particle thunder:hold2 ~~~
execute as @s[scores={cd6=0,energy=20..,ab6=1..}] run particle thunder:hold2 ~~~
execute as @s[scores={cd6=0,energy=20..,ab6=1..}] run particle thunder:hold2 ~~~
execute as @s[scores={cd6=0,energy=20..,ab6=1..}] run particle thunder:hold1 ~~~
execute as @s[scores={cd6=0,energy=20..,ab6=1..}] run particle thunder:hold3 ~~~

execute as @s[scores={cd6=0,energy=20..,ab6=1..}] run playsound ambient.weather.thunder @a ~~~ 1 4 1
execute as @s[scores={cd6=0,energy=20..,ab6=1..}] run playsound item.trident.thunder @a ~~~ 1 6 1
execute as @s[scores={cd6=0,energy=20..,ab6=1..}] run playsound item.trident.thunder @a ~~~ 1 0.5 1
playanimation @s[scores={cd6=0,energy=20..,ab6=1..}] animation.thunder.form6

scoreboard players set @s[scores={cd6=0,energy=20..,ab6=1..}] cd 2
scoreboard players set @s[scores={cd6=0,energy=20..,ab6=1..}] skillani 2
scoreboard players set @s[scores={cd6=0,energy=20..,ab6=1..}] sp1 -15
scoreboard players set @s[scores={cd6=0,energy=20..,ab6=1..}] cd6 -10
scoreboard players remove @s[scores={cd6=-10,energy=20..,ab6=1..}] energy 20
