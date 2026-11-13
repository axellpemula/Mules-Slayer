scoreboard players set @s hold 0
scoreboard players set @s right 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
playanimation @s[scores={cd1=1..,ab1=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..19}] animation.nichirin.idle
tellraw @s[scores={cd1=1..,ab1=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.thunder:form1"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..19,ab1=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={cd1=0,energy=20..,ab1=1..}] run scriptevent thunder:form1
execute as @s[scores={cd1=0,energy=20..,ab1=1..}] rotated ~ 0 run summon thunder:form1a ~~1~ facing ^^1^10
execute as @s[scores={cd1=0,energy=20..,ab1=1..}] run particle sound:form1
execute as @s[scores={cd1=0,energy=20..,ab1=1..}] run particle thunder:form6a
execute as @s[scores={cd1=0,energy=20..,ab1=1..}] run playsound ambient.weather.thunder @a ~~~ 1 5 1
execute as @s[scores={cd1=0,energy=20..,ab1=1..}] run playsound ambient.weather.thunder @a ~~~ 1 2 1
execute as @s[scores={cd1=0,energy=20..,ab1=1..}] run playsound item.trident.thunder @a ~~~ 1 10 1
playanimation @s[scores={cd1=0,energy=20..,ab1=1..}] animation.thunder.form1

scoreboard players set @s[scores={cd1=0,energy=20..,ab1=1..}] cd 2
scoreboard players set @s[scores={cd1=0,energy=20..,ab1=1..}] radpos 100
execute as @s[scores={cd1=0,energy=20..,ab1=1..}] run scriptevent axell:thunder1
scoreboard players set @s[scores={cd1=0,energy=20..,ab1=1..}] sp1 -15
scoreboard players set @s[scores={cd1=0,energy=20..,ab1=1..}] cd1 -6
scoreboard players remove @s[scores={cd1=-6,energy=20..,ab1=1..}] energy 20
