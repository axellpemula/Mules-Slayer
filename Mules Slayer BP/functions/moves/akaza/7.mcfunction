scoreboard players set @s hold 0
scoreboard players set @s right 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
playanimation @s[scores={bcd7=1..,bab7=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..39}] animation.nichirin.idle
tellraw @s[scores={bcd7=1..,bab7=1..}] {"rawtext":[{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..39,bab7=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
playanimation @s[scores={bcd7=0,energy=40..,bab7=1..}] animation.akaza.8
scoreboard players set @s[scores={bcd7=0,energy=40..,bab7=1..}] cd 40
scoreboard players set @s[scores={bcd7=0,energy=40..,bab7=1..}] skillani 5
scoreboard players set @s[scores={bcd7=0,energy=40..,bab7=1..}] bcd7 -9
scoreboard players remove @s[scores={bcd7=-9,energy=40..,bab7=1..}] energy 40
