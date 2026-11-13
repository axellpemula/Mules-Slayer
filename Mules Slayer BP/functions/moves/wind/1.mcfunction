scoreboard players set @s hold 0
scoreboard players set @s right 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
playanimation @s[scores={cd1=1..,ab1=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..19}] animation.nichirin.idle
tellraw @s[scores={cd1=1..,ab1=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.wind:form1"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..19,ab1=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={cd1=0,energy=20..,ab1=1..}] run scriptevent wind:form1
execute as @s[scores={cd1=0,energy=20..,ab1=1..}] run scriptevent axell:fw5
execute as @s[scores={cd1=0,energy=20..,ab1=1..}] run particle wind:form2a
execute as @s[scores={cd1=0,energy=20..,ab1=1..}] run particle wind:form2b 
execute as @s[scores={cd1=0,energy=20..,ab1=1..}] run playsound item.trident.riptide_1 @a ~~~ 1 1.25 1
playanimation @s[scores={cd1=0,energy=20..,ab1=1..}] animation.wind.form1
scoreboard players set @s[scores={cd1=0,energy=20..,ab1=1..}] cd 20
scoreboard players set @s[scores={cd1=0,energy=20..,ab1=1..}] skillani 5
scoreboard players set @s[scores={cd1=0,energy=20..,ab1=1..}] cd1 -18
scoreboard players remove @s[scores={cd1=-18,energy=20..,ab1=1..}] energy 20
