execute as @s[scores={cd4=..-5}] rotated ~ 0 run particle smoke:mist ^^^-1
execute as @s[scores={cd4=..-1}] rotated ~ 0 run particle smoke:mist ^^^
execute as @s[scores={cd4=..-5}] rotated ~ 0 run particle smoke:mist2 ^^^-2
execute as @s[scores={cd4=-6}] rotated ~ 0 run particle smoke:mist2 ^^^2
execute as @s[scores={cd4=-5}] rotated ~ 0 run particle smoke:mist2 ^^^1
execute as @s[scores={cd4=-5}] rotated ~ 0 run particle smoke:mist ^^^1
execute as @s[scores={cd4=-8}] run scoreboard players reset @s radpos
execute as @s[scores={cd4=-1}] run scoreboard players set @s cd4 40