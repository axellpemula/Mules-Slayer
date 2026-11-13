execute as @s[scores={cd1=-20..-5}] at @s rotated ~ 0 run particle smoke:insect ^^^-0.5
execute as @s[scores={cd1=-20..-5}] at @s rotated ~ 0 run particle smoke:insect ^^^-0.5
execute as @s[scores={cd1=-20..-5}] at @s rotated ~ 0 run particle smoke:insect ^^^-0.5
execute as @s[scores={cd1=-9..-5}] at @s rotated ~ 0 run particle smoke:insect2 ^^^
execute as @s[scores={cd1=-13}] at @s rotated ~ 0 run particle insect:caprice ~~~
execute as @s[scores={cd1=-20..-1}] at @s rotated ~ 0 run particle insect:hold ^^2^-1
execute as @s[scores={cd1=-10}] at @s run scriptevent axell:insect1b
execute as @s[scores={cd1=-10}] at @s run playsound axell.raiden.m1 @a ~~~ 1000 1.85 100

execute as @s[scores={cd1=-10}] run titleraw @s actionbar {"rawtext":[{"text":"§d"},{"translate":"§y§rtext.insect:form1"},{"text":"!"}]}


execute as @s[scores={cd1=-5}] at @s run event entity @s axell:jatuh
execute as @s[scores={cd1=-1}] at @s run tag @s remove nofall

execute as @s[scores={cd1=-8..-7}] run scriptevent insect:form1
execute as @s[scores={cd1=-7}] run scriptevent insect:form1
execute as @s[scores={cd1=-8}] rotated ~ 0 run particle m1:insect ^^^10
execute as @s[scores={cd1=-8}] rotated ~ 0 run particle m1:insect ^^^10
execute as @s[scores={cd1=-5}] rotated ~ 0 run particle insect:caprice4 ^^-0.5^1.5
execute as @s[scores={cd1=-10}] rotated ~ 0 run camerashake add @s 2 0.2

execute as @s[scores={cd1=-1}] at @s run scoreboard players set @s radpos 0
execute as @s[scores={cd1=-1}] at @s run scoreboard players set @s cd1 50
