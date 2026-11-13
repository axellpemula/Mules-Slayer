scoreboard players set @s hold 0
scoreboard players set @s right 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
playanimation @s[scores={cd1=1..,ab1=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..19}] animation.nichirin.idle
tellraw @s[scores={cd1=1..,ab1=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.flame:form1"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..19,ab1=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={cd1=0,energy=20..,ab1=1..}] run scriptevent flame:form1
execute as @s[scores={cd1=0,energy=20..,ab1=1..}] run scriptevent axell:fw15
execute as @s[scores={cd1=0,energy=20..,ab1=1..}] run particle flame:linger
execute as @s[scores={cd1=0,energy=20..,ab1=1..}] run playsound mob.blaze.shoot @a ~~~ 1 1.25 1
execute as @s[scores={cd1=0,energy=20..,ab1=1..}] run playsound mob.blaze.shoot @a ~~~ 1 0.75 1
playanimation @s[scores={cd1=0,energy=20..,ab1=1..}] animation.flame.form1
scoreboard players set @s[scores={cd1=0,energy=20..,ab1=1..}] cd 20
scoreboard players set @s[scores={cd1=0,energy=20..,ab1=1..}] radpos 20
scoreboard players set @s[scores={cd1=0,energy=20..,ab1=1..}] skillani 5
scoreboard players set @s[scores={cd1=0,energy=20..,ab1=1..}] cd1 -10
scoreboard players remove @s[scores={cd1=-10,energy=20..,ab1=1..}] energy 20
