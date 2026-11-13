scoreboard players set @s hold 0
scoreboard players set @s right 0
playanimation @s[scores={bcd6=1..,bab6=1..}] animation.nichirin.cancel
scoreboard players set @s m1 0

playanimation @s[scores={energy=..14}] animation.nichirin.idle
tellraw @s[scores={bcd6=1..,bab6=1..}] {"rawtext":[{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..14,bab6=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={bcd6=0,energy=15..,bab6=1..}] run scriptevent axell:fw2
playanimation @s[scores={bcd6=0,energy=15..,bab6=1..}] animation.akaza.exf
tag @s[scores={bcd6=0,energy=15..,bab6=1..}] add autoparry
scoreboard players set @s[scores={bcd6=0,energy=15..,bab6=1..}] cd 40
scoreboard players set @s[scores={bcd6=0,energy=15..,bab6=1..}] skillani 15
scoreboard players set @s[scores={bcd6=0,energy=15..,bab6=1..}] m1 0
scoreboard players set @s[scores={bcd6=0,energy=15..,bab6=1..}] bcd6 -30
scoreboard players remove @s[scores={bcd6=-30,energy=15..,bab6=1..}] energy 15
