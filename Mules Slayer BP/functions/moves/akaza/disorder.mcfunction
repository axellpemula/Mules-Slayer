execute as @s[scores={bcd3=..-22}] run playsound random.explode @a ^^^1 1 4 1000
execute as @s[scores={bcd3=..-22}] run playsound mob.witch.throw @a ^^^1 1 1 1000
execute as @s[scores={bcd3=..-22}] run scoreboard players set @s hold 0
tag @s[scores={bcd3=-21}] remove autoparry

scoreboard players set @s[scores={bcd3=-1}] bcd3 100
scoreboard players set @s[scores={bcd3=..-1,m1=1..}] bcd3 100

execute as @s[scores={bcd3=-15,m1=0}] run scriptevent axell:fw3

execute as @s[scores={bcd3=-13,m1=0}] run scriptevent akaza:bda3b

execute as @s[scores={bcd3=-12,m1=0}] at @s run particle akaza:impact3 ^^1^1

execute as @s[scores={bcd3=-15..-13,m1=0}] run playsound random.explode @a ^^^1 1 2 1000
execute as @s[scores={bcd3=-15,m1=0}] run playsound mob.witch.throw @a ^^^1 1 1 1000


inputpermission set @s[scores={bcd3=..-1}] movement disabled
inputpermission set @s[scores={bcd3=95}] movement enabled