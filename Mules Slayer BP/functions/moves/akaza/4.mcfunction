scoreboard players set @s m1 0
tellraw @s[scores={bcd4=1..}] {"rawtext":[{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..39}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
playanimation @s[scores={bcd4=0,energy=40..}] animation.akaza.ana
scoreboard players set @s[scores={bcd4=0,energy=40..}] ult 40
scoreboard players set @s[scores={bcd4=0,energy=40..}] skillani 10
scoreboard players set @s[scores={bcd4=0,energy=40..}] bcd 70
scoreboard players set @s[scores={bcd4=0,energy=40..}] m1 0
scoreboard players set @s[scores={bcd4=0,energy=40..}] bcd4 100
scoreboard players remove @s[scores={bcd4=100,energy=40..}] energy 40