scoreboard players set @s holdS 0
scoreboard players set @s rightS 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
playanimation @s[scores={cd4=1..,ab4=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..19}] animation.nichirin.idle
tellraw @s[scores={cd4=1..,ab4=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.flame:form4"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..19,ab4=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}


playanimation @s[scores={cd4=0,energy=20..,ab4=1..}] animation.mist.form3
execute as @s[scores={cd4=0,energy=20..,ab4=1..}] rotated ~ 0 run summon flame:form4 ^^1.25^1 facing ^^1^10
execute as @s[scores={cd4=0,energy=20..,ab4=1..}] run playsound item.trident.riptide_3 @a ~~~ 1000 0.5 100
execute as @s[scores={cd4=0,energy=20..,ab4=1..}] run playsound item.trident.riptide_3 @a ~~~ 1000 0.85 100
execute as @s[scores={cd4=0,energy=20..,ab4=1..}] run playsound item.trident.riptide_2 @a ~~~ 1000 0.85 100

scoreboard players set @s[scores={cd4=0,energy=20..,ab4=1..}] cd 2
scoreboard players set @s[scores={cd4=0,energy=20..,ab4=1..}] skillani 2
scoreboard players set @s[scores={cd4=0,energy=20..,ab4=1..}] sp1 -21
scoreboard players set @s[scores={cd4=0,energy=20..,ab4=1..}] cd4 -20
scoreboard players remove @s[scores={cd4=-20,energy=20..,ab4=1..}] energy 20
