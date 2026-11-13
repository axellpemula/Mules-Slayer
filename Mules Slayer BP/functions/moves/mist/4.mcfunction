scoreboard players set @s holdS 0
scoreboard players set @s rightS 0
scoreboard players set @s hold 0
scoreboard players set @s right 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
playanimation @s[scores={cd4=1..,ab4=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..19}] animation.nichirin.idle
tellraw @s[scores={cd4=1..,ab4=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.mist:form4"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..19,ab4=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}

execute as @s[scores={cd4=0,energy=20..,ab4=1..}] run scriptevent mist:form4
execute as @s[scores={cd4=0,energy=20..,ab4=1..}] run scriptevent axell:fw15
execute as @s[scores={cd4=0,energy=20..,ab4=1..}] run particle smoke:mist2
execute as @s[scores={cd4=0,energy=20..,ab4=1..}] run playsound item.trident.riptide_2 @a ~~~ 1000 0.85 100
execute as @s[scores={cd4=0,energy=20..,ab4=1..}] run playsound item.trident.riptide_3 @a ~~~ 1000 1.85 100
execute as @s[scores={cd4=0,energy=20..,ab4=1..}] run playsound item.trident.riptide_3 @a ~~~ 1000 1 100

playanimation @s[scores={cd4=0,energy=20..,ab4=1..}] animation.mist.form4

scoreboard players set @s[scores={cd4=0,energy=20..,ab4=1..}] cd 2
scoreboard players set @s[scores={cd4=0,energy=20..,ab4=1..}] radpos 20
scoreboard players set @s[scores={cd4=0,energy=20..,ab4=1..}] skillani 2
scoreboard players set @s[scores={cd4=0,energy=20..,ab4=1..}] sp1 -15
scoreboard players set @s[scores={cd4=0,energy=20..,ab4=1..}] cd4 -10
scoreboard players remove @s[scores={cd4=-10,energy=20..,ab4=1..}] energy 20
