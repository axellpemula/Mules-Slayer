execute as @s[scores={bcd5=25}] run scriptevent axell:fw5
execute as @s[scores={bcd5=25}] run scriptevent axell:up2
execute as @s[scores={bcd5=21}] run scriptevent axell:dw3

execute as @s[scores={bcd5=25}] run playsound mob.witch.throw @a ^^^1 1 1 1000
execute as @s[scores={bcd5=20}] at @s run particle akaza:impact3 ~~~
execute as @s[scores={bcd5=18}] at @s positioned ^^^1 run particle minecraft:knockback_roar_particle ~~.5~
execute as @s[scores={bcd5=18}] at @s run particle akaza:impact3 ~~~
execute as @s[scores={bcd5=18}] at @s positioned ^^^1 run particle minecraft:knockback_roar_particle ~~.5~
execute as @s[scores={bcd5=18}] at @s run particle akaza:impact3 ~~~
execute as @s[scores={bcd5=20}] run playsound random.explode @a ^^^1 5 1 1000

execute as @s[scores={bcd5=25}] run scoreboard players set @s radpos 20
execute as @s[scores={bcd5=20}] run scriptevent akaza:bda5
execute as @s[scores={bcd5=20}] at @s run particle akaza:crot ~~1~ 
execute as @s[scores={bcd5=15}] run scoreboard players set @s radpos 0

camerashake add @s[scores={bcd5=18}] 0.5 0.2

inputpermission set @s[scores={bcd5=15..}] movement disabled
inputpermission set @s[scores={bcd5=9}] movement enabled