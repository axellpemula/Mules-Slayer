execute as @s[scores={cd8=-7..-4}] at @s run particle minecraft:knockback_roar_particle ~~-2~
execute as @s[scores={cd8=-6,onground=0}] positioned ^^^2.5 run execute as @e[r=2.6] run scriptevent axell:dw3
execute as @s[scores={cd8=-8}] run playanimation @s animation.water.form8
execute as @s[scores={cd8=-8}] run playsound bucket.empty_water @a ~~~ 1 0.75 1
execute as @s[scores={cd8=-8}] run playsound bucket.empty_water @a ~~~ 1 1.25 1

execute as @s[scores={cd8=-3}] run scriptevent water:form8
execute as @s[scores={cd8=-3}] run particle water:cloud ~~-2~
execute as @s[scores={cd8=-1}] positioned ^1^^ run scriptevent water:form8b
execute as @s[scores={cd8=-1}] run scriptevent water:form8c

execute as @s[scores={cd8=-8}] at @s positioned ^^^2.5 at @e[r=2.4] run playsound random.explosion @a ~~~ 1 0.75 1
execute as @s[scores={cd8=-3}] at @s positioned ^^^2.5 at @e[r=2.4] run particle minecraft:knockback_roar_particle ~~0.1~
execute as @s[scores={cd8=-1}] at @s positioned ^^^2.5 at @e[r=2.4] run particle water:smoke ~~~
execute as @s[scores={cd8=-1}] run inputpermission set @s movement enabled
execute as @s[scores={cd8=-1}] run scoreboard players set @s cd8 80