execute as @s[scores={cd5=..-8}] at @s rotated ~ 0 run particle smoke:mist ^^^2
execute as @s[scores={cd5=..-7}] at @s rotated ~ 0 run particle smoke:mist ^^^
execute as @s[scores={cd5=-5}] at @s rotated ~ 0 run particle smoke:mist2 ^^^1.5
execute as @s[scores={cd5=..-9}] run scriptevent axell:fw1
execute as @s[scores={cd5=-7}] run scriptevent axell:fw3
execute as @s[scores={cd5=-5}] run scriptevent mist:m1e
execute as @s[scores={cd5=..-9}] run playsound axell.raiden.m1 @a ^^^1 1005 3 1006
execute as @s[scores={cd5=-9}] run playsound axell.raiden.m1 @a ^^^1 1005 1.4 1006
tag @s[scores={cd5=..-9}] add autoparry
tag @s[scores={cd5=-8}] remove autoparry
execute as @s[scores={cd5=-8}] run scoreboard players set @s cd5 120