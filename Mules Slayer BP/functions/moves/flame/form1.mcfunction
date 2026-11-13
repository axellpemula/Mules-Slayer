execute as @s[scores={cd1=..-2}] at @s run particle minecraft:knockback_roar_particle ~~~
execute as @s[scores={cd1=-1}] at @s run particle flame:linger ~~~
execute as @s[scores={cd1=-8}] at @s run playsound mob.blaze.shoot @a ~~~ 1 2 1
execute as @s[scores={cd1=-7}] at @s run playsound mob.blaze.shoot @a ~~~ 1 3 1
execute as @s[scores={cd1=..-2}] at @s run scoreboard players set @s radpos 0
execute as @s[scores={cd1=..-2}] at @s run particle flame:form1 ^^0.1^-0.5
execute as @s[scores={cd1=..-2}] at @s run particle smoke:flame ^^0.1^-0.5
execute as @s[scores={cd1=..-3}] at @s if entity @e[rm=0.1,r=2] run scoreboard players set @s cd1 -2
execute as @s[scores={cd1=..2}] at @s if entity @e[rm=0.1,r=2] run tp @s ~~~
execute as @s[scores={cd1=..-2}] at @s rotated ~ 0 run tp @e[r=2,rm=0.1] ^^^4

execute as @s[scores={cd1=-1}] at @s run scoreboard players set @s cd1 30