scoreboard players set @s m1 0
scoreboard players set @s aircombo 0
scoreboard players set @s m1 0
tellraw @s[scores={bcd8=1..}] {"rawtext":[{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..14}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
effect @s[scores={bcd8=0,energy=15..}] resistance 1 255 true
execute as @s[scores={bcd8=0,energy=15..},type=player] positioned ^^^2.5 run execute as @e[r=2.6] run scriptevent axell:up5
camerashake add @s[scores={bcd8=0,energy=15..}] 2 0.2
execute as @s[scores={bcd8=0,energy=15..}] run playsound mob.witch.throw @a ~~~ 1 1.25 1
scoreboard players set @s[scores={bcd8=0,energy=15..}] cd 40
scoreboard players set @s[scores={bcd8=0,energy=15..}] aircombo 0
scoreboard players set @s[scores={bcd8=0,energy=15..}] skillani 20
scoreboard players set @s[scores={bcd8=0,energy=15..}] bcd8 50
scoreboard players remove @s[scores={bcd8=50,energy=15..}] energy 15
