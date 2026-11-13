execute as @s[scores={bcd6=..-10}] run playsound random.explode @a ^^^1 1 4 1000
execute as @s[scores={bcd6=..-10}] run playsound mob.witch.throw @a ^^^1 1 1 1000
execute as @s[scores={bcd6=..-10}] run scoreboard players set @s hold 0
tag @s[scores={bcd6=-10}] remove autoparry
camerashake add @s[scores={bcd6=..-10}] 0.1 0.01
effect @s[scores={bcd6=..-15}] slowness 1 3 true
effect @s[scores={bcd6=-10}] slowness 0 4 true

scoreboard players set @s[scores={bcd6=-10}] bcd6 110
scoreboard players set @s[scores={bcd6=..-1,m1=1..}] bcd6 110

inputpermission set @s[scores={bcd6=..-1}] movement disabled
inputpermission set @s[scores={bcd6=105}] movement enabled