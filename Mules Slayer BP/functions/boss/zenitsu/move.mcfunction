scoreboard players set @s moveboss 0
execute as @s[tag=zenitsubossstart,scores={combostopper=0..5,ult=0,ultimate=0},tag=!ultimate] run function moves/thunder/1

#reset
scoreboard players set @s[scores={cd=0}] cd 30
scoreboard players add @s[tag=zenitsubossstart,scores={combostopper=0..5,ult=0,ultimate=0},tag=!ultimate] combostopper 1