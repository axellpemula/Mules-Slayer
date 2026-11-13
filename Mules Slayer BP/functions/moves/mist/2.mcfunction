scoreboard players set @s hold 0
scoreboard players set @s right 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
playanimation @s[scores={cd2=1..,ab2=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..19}] animation.nichirin.idle

tellraw @s[scores={cd2=1..,ab2=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.mist:form2"},{"text":" "},{"translate":"text.axell:cooldown"}]}

tellraw @s[scores={energy=..19,ab2=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={cd2=0,energy=20..,ab2=1..}] run scriptevent axell:fw2
execute as @s[scores={cd2=0,energy=20..,ab2=1..}] run scriptevent mist:form2
execute as @s[scores={cd2=0,energy=20..,ab2=1..}] run particle smoke:mist


playanimation @s[scores={cd2=0,energy=20..,ab2=1..}] animation.mist.form2

scoreboard players set @s[scores={cd2=0,energy=20..,ab2=1..}] cd 2
scoreboard players set @s[scores={cd2=0,energy=20..,ab2=1..}] skillani 2
scoreboard players set @s[scores={cd2=0,energy=20..,ab2=1..}] sp1 -27
scoreboard players set @s[scores={cd2=0,energy=20..,ab2=1..}] cd2 -20
scoreboard players remove @s[scores={cd2=-20,energy=20..,ab2=1..}] energy 20
