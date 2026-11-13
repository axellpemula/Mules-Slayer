scoreboard objectives add parry dummy
scoreboard players add @a parry 0
scoreboard players remove @e[scores={parry=1..},tag=!autoparry] parry 1
tag @a[scores={parry=1..}] add parry
event entity @a[tag=parry] parry
tag @a[scores={parry=0}] remove parry