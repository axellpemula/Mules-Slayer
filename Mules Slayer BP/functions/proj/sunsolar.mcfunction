scoreboard players add @s cd 1
scoreboard players add @s str 0
scoreboard players add @s dex 0
scoreboard players add @s pen 0
scoreboard players add @s critDMG 0
scoreboard players add @s critRate 0
scoreboard players add @s multiplier 0
scoreboard players add @s dmgbonus 0
scoreboard players set @s radpos -10
execute as @s[scores={cd=..9}] run scriptevent sun:form6a
execute as @s[scores={cd=13}] run camerashake add @a[r=8] 2 0.1
execute as @s[scores={cd=13}] run scriptevent sun:form6b
execute as @s[scores={cd=12}] at @s run playsound random.explode @a ~~~ 1 3 1
event entity @s[scores={cd=65..}] despawn_event