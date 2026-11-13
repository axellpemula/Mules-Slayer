execute as @s[scores={bcd8=46,onground=0}] positioned ^^^2.5 run execute as @e[r=2.6] run scriptevent axell:dw3
execute as @s[scores={bcd8=48}] run playanimation @s animation.akaza.ttlf
execute as @s[scores={bcd8=48}] run playsound random.explode @a ~~~ 1 0.75 1
execute as @s[scores={bcd8=48}] run playsound mob.zombie.woodbreak @a ~~~ 1 0.75 1

execute as @s[scores={bcd8=43}] run scriptevent akaza:bda8

execute as @s[scores={bcd8=48}] at @s positioned ^^^2.5 at @e[r=2.4] run playsound random.explosion @a ~~~ 1 0.75 1
execute as @s[scores={bcd8=43}] at @s positioned ^^^2.5 at @e[r=2.4] run particle minecraft:knockback_roar_particle ~~0.1~
execute as @s[scores={bcd8=43}] at @s positioned ^^^2.5 at @e[r=2.4] run particle flame:smoke ~~~
execute as @s[scores={bcd8=40}] at @s run particle akaza:impact3 ~~~
execute as @s[scores={bcd8=40}] at @s run particle minecraft:knockback_roar_particle ~~~
execute as @s[scores={bcd8=40}] at @s run particle akaza:ttlfw ~~~
execute as @s[scores={bcd8=40}] at @s run particle akaza:compass5 ~~~
execute as @s[scores={bcd8=40}] at @s run particle akaza:impact2 ~~~
execute as @s[scores={bcd8=41}] at @s run particle akaza:crot ~~~