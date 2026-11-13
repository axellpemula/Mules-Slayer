scoreboard players set @s holdS 0
scoreboard players set @s rightS 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
playanimation @s[scores={cd3=1..,ab3=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..19}] animation.nichirin.idle
tellraw @s[scores={cd3=1..,ab3=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.thunder:form3"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..19,ab3=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}

execute as @s[scores={cd3=0,energy=20..,ab3=1..}] run playsound ambient.weather.thunder @a ~~~ 1 7 1
execute as @s[scores={cd3=0,energy=20..,ab3=1..}] run particle sound:form1b
execute as @s[scores={cd3=0,energy=20..,ab3=1..}] run particle sound:form1c
execute as @s[scores={cd3=0,energy=20..,ab3=1..}] run particle sound:form1d
execute as @s[scores={cd3=0,energy=20..,ab3=1..}] run scriptevent axell:fw2
playanimation @s[scores={cd3=0,energy=20..,ab3=1..}] animation.thunder.form3

scoreboard players set @s[scores={cd3=0,energy=20..,ab3=1..}] cd 2
scoreboard players set @s[scores={cd3=0,energy=20..,ab3=1..}] skillani 2
scoreboard players set @s[scores={cd3=0,energy=20..,ab3=1..}] radpos 30
scoreboard players set @s[scores={cd3=0,energy=20..,ab3=1..}] sp1 -27
scoreboard players set @s[scores={cd3=0,energy=20..,ab3=1..}] cd3 -20
scoreboard players remove @s[scores={cd3=-10,energy=20..,ab3=1..}] energy 20
