scoreboard players random @s[tag=akazabossstart,scores={cd=0,ult=0,bcd1=..935},tag=!ultimate] moveboss 1 7

execute as @s[scores={moveboss=1}] run function moves/akaza/3
execute as @s[scores={moveboss=2}] run function moves/akaza/6
execute as @s[scores={moveboss=3}] run function moves/akaza/8
execute as @s[scores={moveboss=4}] run function moves/akaza/7
execute as @s[scores={moveboss=7}] run tp ~~1~
execute as @s[scores={moveboss=7}] run tp ~~1~
execute as @s[scores={moveboss=7}] run function moves/akaza/5
execute as @s[scores={moveboss=5,onground=1}] run function moves/akaza/9
execute as @s[scores={moveboss=6}] run effect @s regeneration 2 255 true
execute as @s[scores={moveboss=6}] run function moves/akaza/1

#regen
effect @s[scores={moveboss=3}] regeneration 1 5 true


#reset
scoreboard players set @s[tag=akazabossstart] cd 30
scoreboard players set @s[tag=akazabossstart] ult 30
scoreboard players set @s moveboss 0