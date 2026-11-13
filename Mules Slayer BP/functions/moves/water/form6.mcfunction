execute as @s[scores={cd6=-8}] run scriptevent water:form6b
execute as @s[scores={cd6=-6}] run scriptevent water:form6c
execute as @s[scores={cd6=-9}] run particle water:whirl1 ~~0.5~
execute as @s[scores={cd6=-8}] run particle water:whirl2 ~~0.5~
execute as @s[scores={cd6=-8}] run particle water:wheel3 ~~0.5~
execute as @s[scores={cd6=-5}] run particle water:wheel3 ~~0.5~
execute as @s[scores={cd6=..-7}] run particle smoke:water ~~0.5~
execute as @s[scores={cd6=-7}] run particle water:whirl2 ~~0.5~
execute as @s[scores={cd6=-9}] run playsound axell.raiden.m1 @a ~~~ 1 2 1
execute as @s[scores={cd6=-8}] run playsound axell.raiden.m1 @a ~~~ 1 2.5 1
execute as @s[scores={cd6=-6}] run particle water:whirl3 ~~0.5~
execute as @s[scores={cd6=..-4}] at @s run scriptevent water:form6d
execute as @s[scores={cd6=-1}] run scoreboard players set @s cd6 80