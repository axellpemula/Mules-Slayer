execute as @s[scores={cd3=..-5}] run scriptevent axell:form3w
execute as @s[scores={cd3=..-5}] run particle water:hold2 ~~1~
inputpermission set @s[scores={cd3=-1}] movement enabled

execute as @s[scores={cd3=-1}] run particle minecraft:knockback_roar_particle ~~1~
execute as @s[scores={cd3=-1}] run particle water:wheel3 ~~1~
execute as @s[scores={cd3=-1}] run particle smoke:water ~~1~
execute as @s[scores={cd3=-1}] run playsound bucket.empty_water @a ~~~ 1 0.75 1
execute as @s[scores={cd3=-1}] run playsound bucket.empty_water @a ~~~ 1 1.25 1
execute as @s[scores={cd3=-3}] run playsound axell.raiden.m1 @a ~~~ 1 1.25 1
execute as @s[scores={cd3=-1}] run playsound axell.raiden.m1 @a ~~~ 1 1.5 1

playanimation @s[scores={cd3=-1}] animation.water.m1c