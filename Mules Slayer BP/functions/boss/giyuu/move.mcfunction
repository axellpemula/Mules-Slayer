scoreboard players random @s[tag=giyuubossstart,scores={cd=0,ult=0,ultimate=0},tag=!ultimate] moveboss 1 10

execute as @s[scores={moveboss=1}] run function moves/water/1
execute as @s[scores={moveboss=2}] run tp ~~1~
execute as @s[scores={moveboss=2}] run tp ~~1~
execute as @s[scores={moveboss=2}] run function moves/water/2
execute as @s[scores={moveboss=3}] run tp ~~1~
execute as @s[scores={moveboss=3}] run tp ~~1~
execute as @s[scores={moveboss=3}] run tp ~~1~
execute as @s[scores={moveboss=3}] run function moves/water/5
execute as @s[scores={moveboss=4}] run function moves/water/4
execute as @s[scores={moveboss=5}] run function moves/water/10
execute as @s[scores={moveboss=6}] run function moves/water/6
execute as @s[scores={moveboss=7}] run function moves/water/7
execute as @s[scores={moveboss=8}] run tp ~~1~
execute as @s[scores={moveboss=8}] run tp ~~1~
execute as @s[scores={moveboss=8}] run function moves/water/8
execute as @s[scores={moveboss=9}] run function moves/water/9
execute as @s[scores={moveboss=10}] run function moves/water/3

#reset
scoreboard players set @s[scores={cd=0}] cd 30
scoreboard players set @s moveboss 0