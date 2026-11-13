execute as @s[scores={cd=0..20}] run particle flame:flame9ril ^^1.5^
execute as @s[scores={cd=0..20}] run particle flame:flame9 ^^^2
execute as @s[scores={cd=0..20}] run particle flame:flame99 ^^^-3
execute as @s[scores={cd=0..20}] run particle flame:flame9rill ^^^-4
execute as @s[scores={cd=0..20}] run particle flame:form2 ^^1^-5
scoreboard players add @s[type=!player] cd 1
kill @s[scores={cd=60..},type=!player]
tp @s[scores={cd=55..},type=!player] 0 1000 0