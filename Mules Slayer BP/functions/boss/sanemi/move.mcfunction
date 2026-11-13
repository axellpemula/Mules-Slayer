scoreboard players random @s[tag=sanemibossstart,scores={cd=0,ult=0,ultimate=0}] moveboss 1 9

execute as @s[scores={moveboss=1}] run function moves/wind/1
execute as @s[scores={moveboss=2}] run function moves/wind/2
execute as @s[scores={moveboss=3}] run function moves/wind/3
execute as @s[scores={moveboss=4}] run function moves/wind/4
execute as @s[scores={moveboss=5}] run tp ~~1~
execute as @s[scores={moveboss=5}] run tp ~~1~
execute as @s[scores={moveboss=5}] run function moves/wind/5
execute as @s[scores={moveboss=6}] run function moves/wind/6
execute as @s[scores={moveboss=7}] run function moves/wind/2
execute as @s[scores={moveboss=8}] run function moves/wind/8
execute as @s[scores={moveboss=9}] run tp ~~1~
execute as @s[scores={moveboss=9}] run tp ~~1~
execute as @s[scores={moveboss=9}] run tp ~~1~
execute as @s[scores={moveboss=9}] run tp ~~1~
execute as @s[scores={moveboss=9}] run tp ~~1~
execute as @s[scores={moveboss=9}] run function moves/wind/9

#reset
scoreboard players set @s moveboss 0