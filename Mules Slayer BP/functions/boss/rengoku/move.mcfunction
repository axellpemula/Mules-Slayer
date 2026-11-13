scoreboard players random @s[tag=rengokubossstart,scores={cd=0,ult=0,ultimate=0}] moveboss 1 6

execute as @s[scores={moveboss=1,onground=1}] run function moves/flame/1
execute as @s[scores={moveboss=2}] run function moves/flame/2
execute as @s[scores={moveboss=3}] run function moves/flame/3
execute as @s[scores={moveboss=4}] run function moves/flame/4
execute as @s[scores={moveboss=5}] run function moves/flame/5
execute as @s[scores={moveboss=6}] run function moves/flame/9

#reset
scoreboard players set @s moveboss 0