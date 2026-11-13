execute as @s[scores={cd7=-39}] at @s run camera @s set minecraft:free pos ^10^3^7 rot ~~80
camerashake add @s[scores={cd7=-39..-17}] 0.1 0.1

execute as @s[scores={cd7=..-20}] at @s positioned ^10^3^7 run playsound item.trident.riptide_3 @a ~~~ 1000 1.25 1000
execute as @s[scores={cd7=..-20}] at @s positioned ^10^3^7 run playsound item.trident.riptide_3 @a ~~~ 1000 0.75 1000

execute as @s[scores={cd7=-39}] at @s run particle wind:7c ^^1^2
execute as @s[scores={cd7=-38}] at @s run particle wind:7c ^^1^4
execute as @s[scores={cd7=-37}] at @s run particle wind:7c ^^1^6
execute as @s[scores={cd7=-36}] at @s run particle wind:7c ^^1^8
execute as @s[scores={cd7=-35}] at @s run particle wind:7c ^^1^10
execute as @s[scores={cd7=-34}] at @s run particle wind:7c ^^1^12
execute as @s[scores={cd7=-33}] at @s run particle wind:7c ^^1^14
execute as @s[scores={cd7=-32}] at @s run particle wind:7c ^^1^16
execute as @s[scores={cd7=-31}] at @s run particle wind:7c ^^1^18
execute as @s[scores={cd7=-30}] at @s run particle wind:7c ^^1^20
execute as @s[scores={cd7=-29}] at @s run particle wind:7c ^^1^22
execute as @s[scores={cd7=-28}] at @s run particle wind:7c ^^1^24
execute as @s[scores={cd7=-27}] at @s run particle wind:7c ^^1^26

execute as @s[scores={cd7=-26}] run scriptevent axell:dw3
execute as @s[scores={cd7=-25}] run scriptevent axell:fw15
execute as @s[scores={cd7=-25}] run scriptevent axell:beatdowncancel
execute as @s[scores={cd7=-25}] run scoreboard players set @s cd7 250