execute as @s[scores={cd4=..-5}] at @s rotated ~ 0 run particle smoke:flame ^^1^4
execute as @s[scores={cd4=..-10}] at @s rotated ~ 0 run particle smoke:flame ^^1^
execute as @s[scores={cd4=..-5}] at @s rotated ~ 0 run particle flame:hold1 ^^1^2
execute as @s[scores={cd4=..-5}] at @s rotated ~ 0 run particle flame:apiapi ^^1^2
execute as @s[scores={cd4=..-5}] at @s run playsound mob.witch.throw @a ~~~ 1 0.7 1
execute as @s[scores={cd4=..-5}] at @s run playsound mob.witch.throw @a ~~~ 1 0.47 1
execute as @s[scores={cd4=-19..-17}] at @s run playsound mob.blaze.shoot @a ~~~ 1 0.5 1
tag @s[scores={cd4=..-5}] add autoparry
tag @s[scores={cd4=-4}] remove autoparry
execute as @s[scores={cd4=-1}] run scoreboard players set @s cd4 60