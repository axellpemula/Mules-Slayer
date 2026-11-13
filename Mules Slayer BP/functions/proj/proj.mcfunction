execute as @e[type=flame:tg] at @s run function proj/flameTG
execute as @e[type=flame:rengoku9] at @s run function proj/flame9
execute as @e[type=akaza:air] at @s run function proj/akazair
execute as @e[type=insect:bee] at @s run function proj/insectbee
execute as @e[type=insect:dragonfly] at @s run function proj/insectdragonfly
execute as @e[type=sun:solar] at @s run function proj/sunsolar

#water sex
execute at @e[type=water:form10a,scores={cd=50..}] run camerashake add @a[r=15] 0.1 0.2
execute at @e[type=water:form10a,scores={cd=50..70}] run particle water:linger2 ^-1^-2.5^8.25
execute at @e[type=water:form10a,scores={cd=50..}] run particle water:wheel3 ^-1^-2.5^8.25
execute at @e[type=water:form10a,scores={cd=50..}] run particle smoke:water ^-1^-4^8.25
execute at @e[type=water:form10a,scores={cd=1..}] positioned ^-1^-4^8.25 run scoreboard players set @e[r=7] stun 5
execute at @e[type=water:form10a,scores={cd=50..}] positioned ^-1^-4^8.25 run damage @e[r=7] 0 override
scoreboard players add @e[type=water:form10a] cd 0
scoreboard players add @e[type=water:form10a] cd 1
kill @e[type=water:form10a,scores={cd=100..}]