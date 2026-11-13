scoreboard players set @s holdS 0
scoreboard players set @s rightS 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
playanimation @s[scores={cd4=1..,ab4=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..19}] animation.nichirin.idle
tellraw @s[scores={cd4=1..,ab4=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.thunder:form4"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..19,ab4=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}

execute as @s[scores={cd4=0,energy=20..,ab4=1..}] run playsound ambient.weather.thunder @a ~~~ 1 7 1

playanimation @s[scores={cd4=0,energy=20..,ab4=1..}] animation.thunder.form4

scoreboard players set @s[scores={cd4=0,energy=20..,ab4=1..}] cd 2
scoreboard players set @s[scores={cd4=0,energy=20..,ab4=1..}] skillani 2
scoreboard players set @s[scores={cd4=0,energy=20..,ab4=1..}] radpos 25
scoreboard players set @s[scores={cd4=0,energy=20..,ab4=1..}] sp1 -27
scoreboard players set @s[scores={cd4=0,energy=20..,ab4=1..}] cd4 -10
scoreboard players remove @s[scores={cd4=-10,energy=20..,ab4=1..}] energy 20
