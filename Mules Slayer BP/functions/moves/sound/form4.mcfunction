execute as @s[scores={cd4=..-1}] run playsound firework.twinkle @a ~~~ 10000 2.26 1000

execute as @s[scores={cd4=-2}] run playsound random.explode @a ~~~ 10000 0.5 1000
execute as @s[scores={cd4=-3}] run playsound random.explode @a ~~~ 10000 0.5 1000

execute as @s[scores={cd4=-10}] run playsound random.explode @a ~~~ 10000 0.5 1000
execute as @s[scores={cd4=-12}] run playsound random.explode @a ~~~ 10000 0.5 1000

execute as @s[scores={cd4=-20}] run playsound random.explode @a ~~~ 10000 0.5 1000
execute as @s[scores={cd4=-22}] run playsound random.explode @a ~~~ 10000 0.5 1000

execute as @s[scores={cd4=-30}] run playsound random.explode @a ~~~ 10000 0.5 1000
execute as @s[scores={cd4=-32}] run playsound random.explode @a ~~~ 10000 0.5 1000

scoreboard players set @s sp1 -10

tag @s[scores={cd4=..-2}] add autoparry
tag @s[scores={cd4=-1}] remove autoparry
inputpermission set @s[scores={cd4=..-3}] movement disabled
inputpermission set @s[scores={cd4=-1}] movement enabled
execute as @s[scores={cd4=..-1,right=1}] run scriptevent axell:beatdowncancel
scoreboard players set @s[scores={cd4=..-1,right=1}] cd4 80
scoreboard players set @s[scores={cd4=-1}] cd4 40