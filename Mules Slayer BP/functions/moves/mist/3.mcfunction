scoreboard players set @s holdS 0
scoreboard players set @s rightS 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
playanimation @s[scores={cd3=1..,ab3=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..19}] animation.nichirin.idle
tellraw @s[scores={cd3=1..,ab3=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.mist:form3"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..19,ab3=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}


playanimation @s[scores={cd3=0,energy=20..,ab3=1..}] animation.mist.form3
execute as @s[scores={cd3=0,energy=20..,ab3=1..}] rotated ~ 0 run summon mist:form3 ^^1.25^1 facing ^^1^10
execute as @s[scores={cd3=0,energy=20..,ab3=1..}] run playsound item.trident.riptide_3 @a ~~~ 1000 0.5 100
execute as @s[scores={cd3=0,energy=20..,ab3=1..}] run playsound item.trident.riptide_3 @a ~~~ 1000 0.85 100
execute as @s[scores={cd3=0,energy=20..,ab3=1..}] run playsound item.trident.riptide_2 @a ~~~ 1000 0.85 100

scoreboard players set @s[scores={cd3=0,energy=20..,ab3=1..}] cd 2
scoreboard players set @s[scores={cd3=0,energy=20..,ab3=1..}] skillani 2
scoreboard players set @s[scores={cd3=0,energy=20..,ab3=1..}] sp1 -15
scoreboard players set @s[scores={cd3=0,energy=20..,ab3=1..}] cd3 -20
scoreboard players remove @s[scores={cd3=-20,energy=20..,ab3=1..}] energy 20
