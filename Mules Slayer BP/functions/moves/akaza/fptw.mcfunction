
execute as @s[scores={bcd9=..-2}] at @s if entity @e[rm=0.1,r=2] run scoreboard players set @s bcd9 -1
execute as @s[scores={bcd9=..-1}] at @s if entity @e[rm=0.1,r=2] run tp @s ~~~
execute as @s[scores={bcd9=..-1}] at @s if entity @e[rm=0.1,r=2] run scriptevent akaza:bda9
execute as @s[scores={bcd9=..-1}] at @s if entity @e[rm=0.1,r=2] run particle akaza:crot ^^^1
execute as @s[scores={bcd9=..-1}] at @s run tp @e[rm=0.1,r=2] ^^^0.5 facing ^^^-10
execute as @s[scores={bcd9=..-1}] at @s run execute as @e[rm=0.1,r=2] run scriptevent axell:kb5

execute as @s[scores={bcd9=-1}] at @s run playsound mob.zombie.woodbreak @a[r=16] ~~~ 1 2 1
execute as @s[scores={bcd9=-1}] at @s run playsound random.explode @a[r=16] ~~~ 1 2 1
execute as @s[scores={bcd9=..-1}] at @s run particle akaza:fptw2
execute as @s[scores={bcd9=..-1}] at @s run particle minecraft:knockback_roar_particle
execute as @s[scores={bcd9=-1}] at @s run scoreboard players set @s bcd9 60