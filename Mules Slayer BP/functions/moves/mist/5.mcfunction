scoreboard players set @s hold 0
scoreboard players set @s right 0
scoreboard players set @s holdS 0
scoreboard players set @s rightS 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
playanimation @s animation.nichirin.idle
playanimation @s[scores={cd5=1..,ab5=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..19}] animation.nichirin.idle
tellraw @s[scores={cd5=1..,ab5=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.mist:form5"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..19,ab5=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={cd5=0,energy=20..,ab5=1..}] run scriptevent axell:fw2
execute as @s[scores={cd5=0,energy=20..,ab5=1..}] run scriptevent mist:form5
execute as @s[scores={cd5=0,energy=20..,ab5=1..}] run particle smoke:mist


playanimation @s[scores={cd5=0,energy=20..,ab5=1..}] animation.mist.form5

scoreboard players set @s[scores={cd5=0,energy=20..,ab5=1..}] cd 2
scoreboard players set @s[scores={cd5=0,energy=20..,ab5=1..}] skillani 2
scoreboard players set @s[scores={cd5=0,energy=20..,ab5=1..}] sp1 -27
scoreboard players set @s[scores={cd5=0,energy=20..,ab5=1..}] cd5 -25
scoreboard players remove @s[scores={cd5=-25,energy=30..,ab5=1..}] energy 30
