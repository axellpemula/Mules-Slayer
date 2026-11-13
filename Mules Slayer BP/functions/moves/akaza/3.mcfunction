scoreboard players set @s m1 0
scoreboard players set @s hold 0
scoreboard players set @s right 0
playanimation @s[scores={bcd3=1..,bab3=1..}] animation.nichirin.cancel

playanimation @s[scores={energy=..19}] animation.nichirin.idle
tellraw @s[scores={bcd3=1..,bab3=1..}] {"rawtext":[{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..19,bab3=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={bcd3=0,energy=20..,bab3=1..}] run scriptevent axell:fw2
playanimation @s[scores={bcd3=0,energy=20..,bab3=1..}] animation.akaza.disorder
tag @s[scores={bcd3=0,energy=20..,bab3=1..}] add autoparry
scoreboard players set @s[scores={bcd3=0,energy=20..,bab3=1..}] cd 40
scoreboard players set @s[scores={bcd3=0,energy=20..,bab3=1..}] skillani 20
scoreboard players set @s[scores={bcd3=0,energy=20..,bab3=1..}] m1 0
scoreboard players set @s[scores={bcd3=0,energy=20..,bab3=1..}] bcd3 -40
scoreboard players remove @s[scores={bcd3=-40,energy=20..,bab3=1..}] energy 20
