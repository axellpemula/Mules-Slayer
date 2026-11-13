scoreboard players set @s m1 0
scoreboard players set @s holdS 0
scoreboard players set @s rightS 0
inputpermission set @s movement enabled
playanimation @s[scores={bcd2=1..,bab2=1..}] animation.nichirin.cancel
playanimation @s[scores={energy=..19}] animation.nichirin.idle
tellraw @s[scores={bcd2=1..,bab2=1..}] {"rawtext":[{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..24,bab2=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={bcd2=0,energy=25..,bab2=1..,onground=1}] run playanimation @s animation.akaza.air
execute as @s[scores={bcd2=0,energy=25..,bab2=1..,onground=0}] run playanimation @s animation.akaza.air2
scoreboard players set @s[scores={bcd2=0,energy=25..,bab2=1..}] skillani 20
scoreboard players set @s[scores={bcd2=0,energy=25..,bab2=1..}] m1 0
scoreboard players set @s[scores={bcd2=0,energy=25..,bab2=1..}] cd 20
scoreboard players set @s[scores={bcd2=0,energy=25..,bab2=1..}] bcd2 80
execute as @s[scores={bcd2=80,bab2=1..,onground=0}] run scriptevent axell:bw2
scoreboard players remove @s[scores={bcd2=80,energy=25..,bab2=1..}] energy 25
