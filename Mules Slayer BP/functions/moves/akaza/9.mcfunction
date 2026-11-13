scoreboard players set @s holdS 0
scoreboard players set @s rightS 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
playanimation @s[scores={bcd9=1..,bab9=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..24}] animation.nichirin.idle
tellraw @s[scores={bcd9=1..,bab9=1..}] {"rawtext":[{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..24,bab9=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}

execute as @s[scores={bcd9=0,energy=25..,bab9=1..}] run tag @s add kbATT
execute as @s[scores={bcd9=0,energy=25..,bab9=1..}] run particle akaza:fptw
execute as @s[scores={bcd9=0,energy=25..,bab9=1..}] run particle minecraft:knockback_roar_particle
execute as @s[scores={bcd9=0,energy=25..,bab9=1..}] run scriptevent axell:fw15
execute as @s[scores={bcd9=0,energy=25..,bab9=1..}] run playsound mob.witch.throw @a ^^^1 0.5 1 1000

playanimation @s[scores={bcd9=0,energy=25..,bab9=1..}] animation.akaza.fptw
scoreboard players set @s[scores={bcd9=0,energy=25..,bab9=1..}] cd 25
scoreboard players set @s[scores={bcd9=0,energy=25..,bab9=1..}] skillani 5
scoreboard players set @s[scores={bcd9=0,energy=25..,bab9=1..}] bcd9 -5
scoreboard players remove @s[scores={bcd9=-4,energy=25..,bab9=1..}] energy 25
