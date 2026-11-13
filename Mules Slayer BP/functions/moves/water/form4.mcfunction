execute as @s run scriptevent axell:fw2
camerashake add @s 2 0.1
execute as @s positioned ^^^2.5 run scoreboard players add @e[r=2.49] stun 10
execute as @s run playsound bucket.empty_water @a ~~~ 1000 1.25 1000
execute as @s run playsound axell.raiden.m1 @a ~~~ 1000 1.25 1000
execute as @s run playsound bucket.empty_water @a ~~~ 1000 0.75 1000
execute as @s run particle akaza:impact3 ~~1~
scriptevent water:form4b
scoreboard players set @s cd4 70