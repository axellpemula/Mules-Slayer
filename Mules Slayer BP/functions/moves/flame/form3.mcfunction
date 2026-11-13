execute as @s[scores={cd3=-7..-4}] at @s run particle flame:form2 ~~0.5~
execute as @s[scores={cd3=-7..-4}] at @s run particle smoke:flame ~~0.5~
execute as @s[scores={cd3=-6,onground=0}] positioned ^^^2.5 run execute as @e[r=2.6] run scriptevent axell:dw3
execute as @s[scores={cd3=-8}] run playanimation @s animation.flame.form3
execute as @s[scores={cd3=-8}] run playsound mob.blaze.shoot @a ~~~ 1 7 1
execute as @s[scores={cd3=-8}] run playsound mob.blaze.shoot @a ~~~ 1 5 1
execute as @s[scores={cd3=-5}] run playsound mob.blaze.shoot @a ~~~ 1 1 1
execute as @s[scores={cd3=-4}] run playsound mob.blaze.shoot @a ~~~ 1 5 1

execute as @s[scores={cd3=-3}] run scriptevent flame:form3
execute as @s[scores={cd3=-2}] run scriptevent flame:form3
execute as @s[scores={cd3=-1}] run scriptevent flame:form3

execute as @s[scores={cd3=-8}] at @s positioned ^^^2.5 at @e[r=2.4] run playsound random.explosion @a ~~~ 1 0.75 1
execute as @s[scores={cd3=-3}] at @s positioned ^^^2.5 at @e[r=2.4] run particle minecraft:knockback_roar_particle ~~0.1~
execute as @s[scores={cd3=-3}] at @s positioned ^^^2.5 at @e[r=2.4] run particle flame:smoke ~~~
execute as @s[scores={cd3=-1}] at @s run particle flame:linger ~~~


execute as @s[scores={cd3=-1}] at @s run scoreboard players set @s cd3 18