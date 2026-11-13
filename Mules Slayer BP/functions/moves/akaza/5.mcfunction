scoreboard players set @s m1 0
tellraw @s[scores={bcd5=1..}] {"rawtext":[{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..14}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
playanimation @s[scores={bcd5=0,energy=15..}] animation.akaza.crown
scoreboard players set @s[scores={bcd5=0,energy=15..}] skillani 30
scoreboard players set @s[scores={bcd5=0,energy=15..}] m1 0
scoreboard players set @s[scores={bcd5=0,energy=15..}] sp1 -20
scoreboard players set @s[scores={bcd5=0,energy=15..}] cd 40
scoreboard players set @s[scores={bcd5=0,energy=15..}] bcd5 30
scoreboard players remove @s[scores={bcd5=30,energy=15..}] energy 15
