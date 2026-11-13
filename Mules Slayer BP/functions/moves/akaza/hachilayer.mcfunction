execute as @s[scores={bcd7=..-1}] run playsound random.explode @a ^^^1 1.5 1 1000
execute as @s[scores={bcd7=..-1}] run playsound mob.witch.throw @a ^^^1 1 1 1000
execute as @s[scores={bcd7=..-1}] run scoreboard players set @s hold 0
execute as @s[scores={bcd7=..-1}] run scriptevent akaza:bda7
execute as @s[scores={bcd7=..-1}] run scriptevent axell:fw1

tag @s[scores={bcd7=-1}] remove autoparry
camerashake add @s[scores={bcd7=..-1}] 0.1 0.01
effect @s[scores={bcd7=..-5}] slowness 1 3 true
effect @s[scores={bcd7=-1}] slowness 0 4 true

scoreboard players set @s[scores={bcd7=-1}] bcd7 310
scoreboard players set @s[scores={bcd7=..-1,m1=1..}] bcd7 310

inputpermission set @s[scores={bcd7=..-1}] movement disabled
inputpermission set @s[scores={bcd7=305}] movement enabled