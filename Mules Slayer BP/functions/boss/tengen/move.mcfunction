scoreboard players random @s[tag=tengenbossstart,scores={cd=0,ult=0,ultimate=0}] moveboss 1 3

execute as @s[scores={moveboss=1}] run function moves/sound/1
execute as @s[scores={moveboss=2}] run function moves/sound/4
execute as @s[scores={moveboss=3}] run function moves/sound/5

#reset
scoreboard players set @s moveboss 0