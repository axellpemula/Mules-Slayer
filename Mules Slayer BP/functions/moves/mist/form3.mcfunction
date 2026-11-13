execute as @s[scores={cd3=..-5}] at @s rotated ~ 0 run particle smoke:mist ^^^
execute as @s[scores={cd3=..-5}] at @s run playsound mob.witch.throw @a ~~~ 1 0.7 1
execute as @s[scores={cd3=..-5}] at @s run playsound mob.witch.throw @a ~~~ 1 0.47 1
execute as @s[scores={cd3=-19}] at @s rotated ~ 0 run particle smoke:mist2 ^^^
tag @s[scores={cd3=..-5}] add autoparry
tag @s[scores={cd3=-4}] remove autoparry
execute as @s[scores={cd3=-1}] run scoreboard players set @s cd3 60