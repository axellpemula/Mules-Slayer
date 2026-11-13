execute as @s[scores={cd2=-20..-2}] at @s run scoreboard players set @s radpos 0
execute as @s[scores={cd2=-20..-3}] at @s rotated ~ 0 run particle smoke:insect ^^^-0.5
execute as @s[scores={cd2=-20..-3}] at @s rotated ~ 0 run particle smoke:insect2 ^^^-0.5
execute as @s[scores={cd2=-20..-2}] at @s rotated ~ 0 if entity @e[rm=0.1,r=2] run tp @s ~~~
execute as @s[scores={cd2=-20..-3}] at @s rotated ~ 0 if entity @e[rm=0.1,r=2] run scoreboard players set @s cd2 -3
execute as @s[scores={cd2=-3}] at @s rotated ~ 0 if entity @e[rm=0.1,r=3] run particle smoke:insect3
execute as @s[scores={cd2=-3}] at @s rotated ~ 0 if entity @e[rm=0.1,r=3] run particle akaza:impact ^^1^2
execute as @s[scores={cd2=-3}] at @s rotated ~ 0 if entity @e[rm=0.1,r=3] run particle minecraft:knockback_roar_particle ^^^2

execute as @s[scores={cd2=-3}] at @s rotated ~ 0 if entity @e[rm=0.1,r=3] run playsound mob.bee.death @a ~~~ 1000 2 10000
execute as @s[scores={cd2=-3}] at @s rotated ~ 0 if entity @e[rm=0.1,r=3] run playsound mob.bee.death @a ~~~ 1000 3 10000
execute as @s[scores={cd2=-3}] at @s rotated ~ 0 if entity @e[rm=0.1,r=3] run playsound mob.bee.death @a ~~~ 1000 3 10000
execute as @s[scores={cd2=-3}] at @s rotated ~ 0 if entity @e[rm=0.1,r=3] run camerashake add @s 2 0.2
execute as @s[scores={cd2=-3}] at @s rotated ~ 0 if entity @e[rm=0.1,r=3] run summon insect:bee ^^1.75^-1 facing ^^1.75^10

execute as @s[scores={cd2=..-1}] at @s rotated ~ 0 run tp @e[r=2,rm=0.1] ^^^3

execute as @s[scores={cd2=-1}] at @s run scoreboard players set @s cd2 30