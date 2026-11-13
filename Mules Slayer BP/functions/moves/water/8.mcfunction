scoreboard players set @s m1 0
scoreboard players set @s aircombo 0
event entity @s axell:jatuh
tellraw @s[scores={cd8=1..,ab8=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.water:form8"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..14}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
effect @s[scores={cd8=0,energy=15..}] resistance 1 255 true
execute as @s[scores={cd8=0,energy=15..}] positioned ^^^2.5 run execute as @e[r=2.6] run scriptevent axell:up2
camerashake add @s[scores={cd8=0,energy=15..}] 2 0.2
execute as @s[scores={cd8=0,energy=15..}] run playsound bucket.empty_water @a ~~~ 1 1.25 1
execute as @s[scores={cd8=0,energy=15..}] run playsound axell.raiden.m1 @a ~~~ 1 2 1
execute as @s[scores={cd8=0,energy=15..}] run playsound bucket.empty_water @a ~~~ 1 0.75 1
scoreboard players set @s[scores={cd8=0,energy=15..}] cd 40
scoreboard players set @s[scores={cd8=0,energy=15..}] aircombo 0
scoreboard players set @s[scores={cd8=0,energy=15..}] skillani 20
scoreboard players set @s[scores={cd8=0,energy=15..}] cd8 -10
scoreboard players remove @s[scores={cd8=-10,energy=15..}] energy 15
