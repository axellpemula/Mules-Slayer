scoreboard players set @s hold 0
scoreboard players set @s right 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
playanimation @s[scores={bcd10=1..,bab10=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..19}] animation.nichirin.idle
tellraw @s[scores={bcd10=1..,bab10=1..}] {"rawtext":[{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..19,bab10=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
playanimation @s[scores={bcd10=0,energy=20..,bab10=1..}] animation.akaza.bsca
scoreboard players set @s[scores={bcd10=0,energy=20..,bab10=1..}] cd 20
scoreboard players set @s[scores={bcd10=0,energy=20..,bab10=1..}] skillani 5
scoreboard players set @s[scores={bcd10=0,energy=20..,bab10=1..}] bcd10 -9
scoreboard players remove @s[scores={bcd10=-9,energy=20..,bab10=1..}] energy 20
