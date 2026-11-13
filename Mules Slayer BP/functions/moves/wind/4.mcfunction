scoreboard players set @s holdS 0
scoreboard players set @s rightS 0
scoreboard players set @s m1 0
playanimation @s[scores={ab4=0}] animation.nichirin.idle
playanimation @s[scores={cd4=1..,ab4=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..34}] animation.nichirin.idle
inputpermission set @s[scores={cd4=1..,ab4=1..}] movement enabled
inputpermission set @s[scores={energy=..34,ab4=1..}] movement enabled
tellraw @s[scores={cd4=1..,ab4=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.wind:form4"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..34,ab4=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
playanimation @s[scores={cd4=0,energy=35..,ab4=1..}] animation.wind.form4

execute as @s[scores={cd4=0,energy=35..,ab4=1..}] run playsound item.trident.riptide_3 @a ~~~ 1 2 1
execute as @s[scores={cd4=0,energy=35..,ab4=1..}] run playsound axell.raiden.m1 @a ~~~ 1 1.5 1
execute as @s[scores={cd4=0,energy=35..,ab4=1..}] run particle wind:form2a
execute as @s[scores={cd4=0,energy=35..,ab4=1..}] run particle akaza:impact3
execute as @s[scores={cd4=0,energy=35..,ab4=1..}] run particle wind:form2b ~~~
execute as @s[scores={cd4=0,energy=35..,ab4=1..}] run particle wind:form4 ~~-0.5~

execute as @s[scores={cd4=0,energy=35..,ab4=1..}] run scriptevent wind:form4a

scoreboard players set @s[scores={cd4=0,energy=35..,ab4=1..}] radpos 35
scoreboard players set @s[scores={cd4=0,energy=35..,ab4=1..}] cd 35
scoreboard players set @s[scores={cd4=0,energy=35..,ab4=1..}] skillani 15
scoreboard players set @s[scores={cd4=0,energy=35..,ab4=1..}] cd4 -18
scoreboard players remove @s[scores={cd4=-18,energy=35..,ab4=1..}] energy 35
