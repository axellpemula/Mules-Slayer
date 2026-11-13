scoreboard players set @s hold 0
scoreboard players set @s right 0
scoreboard players set @s holdS 0
scoreboard players set @s rightS 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
playanimation @s[scores={cd4=1..,ab4=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..39}] animation.nichirin.idle
tellraw @s[scores={cd4=1..,ab4=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.sound:form4"},{"text":" "},{"translate":"text.axell:cooldown"}]}
playanimation @s[scores={cd4=0,energy=40..,ab4=1..}] animation.sound.form4

execute as @s[scores={cd4=0,energy=40..,ab4=1..}] run playsound firework.twinkle @a ~~~ 10000 1.2 1000

scoreboard players set @s[scores={cd4=0,energy=40..,ab4=1..}] cd 60
scoreboard players set @s[scores={cd4=0,energy=40..,ab4=1..}] skillani 35
scoreboard players set @s[scores={cd4=0,energy=40..,ab4=1..}] cd4 -35
scoreboard players remove @s[scores={cd4=-70,energy=40..,ab4=1..}] energy 40
