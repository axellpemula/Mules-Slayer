scoreboard players random @s[tag=tokitobossstart,scores={cd=0,ult=0,ultimate=0}] moveboss 1 5

execute as @s[scores={moveboss=1}] run function moves/mist/1
execute as @s[scores={moveboss=2}] run function moves/mist/2
execute as @s[scores={moveboss=3}] run function moves/mist/3
execute as @s[scores={moveboss=4}] run function moves/mist/4
execute as @s[scores={moveboss=5}] run function moves/mist/5

#reset
scoreboard players set @s moveboss 0