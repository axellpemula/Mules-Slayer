scoreboard players set @s m1 0
scoreboard players set @s aircombo 0
tellraw @s[scores={cd3=1..,ab3=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.flame:form3"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..14}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
effect @s[scores={cd3=0,energy=15..}] resistance 1 255 true
execute as @s[scores={cd3=0,energy=15..,onground=1}] positioned ^^^2.5 run execute as @e[r=2.6] run scriptevent axell:up2
execute as @s[scores={cd3=0,energy=15..,onground=0}] positioned ^^^2.5 run execute as @e[r=2.6] run scriptevent axell:up05
camerashake add @s[scores={cd3=0,energy=15..}] 2 0.2
execute as @s[scores={cd3=0,energy=15..}] run playsound mob.blaze.shoot @a ~~~ 1 1.25 1
execute as @s[scores={cd3=0,energy=15..}] run playsound mob.blaze.shoot @a ~~~ 1 0.75 1
scoreboard players set @s[scores={cd3=0,energy=15..}] cd 40
scoreboard players set @s[scores={cd3=0,energy=15..}] aircombo 0
scoreboard players set @s[scores={cd3=0,energy=15..}] skillani 20
scoreboard players set @s[scores={cd3=0,energy=15..}] sp1 -18
scoreboard players set @s[scores={cd3=0,energy=15..}] cd3 -10
scoreboard players remove @s[scores={cd3=-10,energy=15..}] energy 15
