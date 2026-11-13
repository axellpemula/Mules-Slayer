scoreboard players set @s holdS 0
scoreboard players set @s rightS 0
scoreboard players set @s m1 0
playanimation @s[scores={ab3=0}] animation.nichirin.idle
playanimation @s[scores={cd3=1..,ab3=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..19}] animation.nichirin.idle
inputpermission set @s[scores={cd3=1..,ab3=1..}] movement enabled
inputpermission set @s[scores={energy=..19,ab3=1..}] movement enabled
tellraw @s[scores={cd3=1..,ab3=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.wind:form3"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..19,ab3=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
playanimation @s[scores={cd3=0,energy=20..,ab3=1..}] animation.wind.form3

execute as @s[scores={cd3=0,energy=20..,ab3=1..}] run playsound item.trident.riptide_3 @a ~~~ 1 2 1
execute as @s[scores={cd3=0,energy=20..,ab3=1..}] run playsound item.trident.riptide_3 @a ~~~ 1 0.75 1
execute as @s[scores={cd3=0,energy=20..,ab3=1..}] run playsound item.trident.riptide_3 @a ~~~ 1 1.5 1
execute as @s[scores={cd3=0,energy=20..,ab3=1..}] run playsound axell.raiden.m1 @a ~~~ 1 1.5 1
execute as @s[scores={cd3=0,energy=20..,ab3=1..}] run particle wind:form2a
execute as @s[scores={cd3=0,energy=20..,ab3=1..}] run particle akaza:impact3
execute as @s[scores={cd3=0,energy=20..,ab3=1..}] run particle wind:form2b ^^-1^
execute as @s[scores={cd3=0,energy=20..,ab3=1..}] run particle wind:form3 ^^-0.5^

execute as @s[scores={cd3=0,energy=20..,ab3=1..}] run scriptevent wind:form3a

scoreboard players set @s[scores={cd3=0,energy=20..,ab3=1..}] radpos 20
scoreboard players set @s[scores={cd3=0,energy=20..,ab3=1..}] sp1 -17
scoreboard players set @s[scores={cd3=0,energy=20..,ab3=1..}] cd 20
scoreboard players set @s[scores={cd3=0,energy=20..,ab3=1..}] skillani 15
scoreboard players set @s[scores={cd3=0,energy=20..,ab3=1..}] cd3 -10
scoreboard players remove @s[scores={cd3=-10,energy=20..,ab3=1..}] energy 20
