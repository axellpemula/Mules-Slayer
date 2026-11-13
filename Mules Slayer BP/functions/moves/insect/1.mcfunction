scoreboard players set @s holdS 0
scoreboard players set @s rightS 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
playanimation @s[scores={cd1=1..,ab1=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..19}] animation.nichirin.idle
tellraw @s[scores={cd1=1..,ab1=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.insect:form1"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..19,ab1=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}

playanimation @s[scores={cd1=0,energy=20..,ab1=1..}] animation.insect.form1
execute as @s[scores={cd1=0,energy=20..,ab1=1..},type=player] run scriptevent axell:insect1a
execute as @s[scores={cd1=0,energy=20..,ab1=1..},type=!player] run tp ~~4~
execute as @s[scores={cd1=0,energy=20..,ab1=1..}] run event entity @s axell:terbang
execute as @s[scores={cd1=0,energy=20..,ab1=1..}] run playsound item.trident.riptide_2 @a ~~~ 1000 2 100
execute as @s[scores={cd1=0,energy=20..,ab1=1..}] run tag @s add nofall

execute as @s[scores={cd1=0,energy=20..,ab1=1..}] run titleraw @s actionbar {"rawtext":[{"text":"§5"},{"translate":"§y§rtext.breathings:insect"},{"text":"!"}]}

scoreboard players set @s[scores={cd1=0,energy=20..,ab1=1..}] cd 2
scoreboard players set @s[scores={cd1=0,energy=20..,ab1=1..}] skillani 2
scoreboard players set @s[scores={cd1=0,energy=20..,ab1=1..}] radpos 30
scoreboard players set @s[scores={cd1=0,energy=20..,ab1=1..}] ultimate 15
scoreboard players set @s[scores={cd1=0,energy=20..,ab1=1..}] sp1 -20
scoreboard players set @s[scores={cd1=0,energy=20..,ab1=1..}] cd1 -20
scoreboard players remove @s[scores={cd1=-10,energy=20..,ab1=1..}] energy 20
