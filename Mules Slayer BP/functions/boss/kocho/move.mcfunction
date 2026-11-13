scoreboard players random @s[tag=kochobossstart,scores={cd=0,ult=0,ultimate=0}] moveboss 1 4

execute as @s[scores={moveboss=1,onground=1}] run function moves/insect/1
execute as @s[scores={moveboss=2}] run function moves/insect/2
execute as @s[scores={moveboss=3}] run function moves/insect/3
execute as @s[scores={moveboss=4}] run function moves/insect/4

#reset
scoreboard players set @s moveboss 0