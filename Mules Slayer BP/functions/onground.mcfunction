# Check block below player
scoreboard objectives add onground dummy
execute if block ~~-0.5~ air run scoreboard players set @s onground 0
execute unless block ~~-0.5~ air run scoreboard players set @s onground 1
