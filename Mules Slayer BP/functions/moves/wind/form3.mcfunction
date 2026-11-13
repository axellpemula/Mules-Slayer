execute as @s[scores={cd3=-6}] run scriptevent wind:form3b
execute as @s[scores={cd3=-3}] run scoreboard players set @s radpos 0
execute as @s[scores={cd3=-8}] run playsound item.trident.riptide_3 @a ~~~ 1 2 1
execute as @s[scores={cd3=-9}] run playsound item.trident.riptide_3 @a ~~~ 1 2 1
execute as @s[scores={cd3=-9}] run particle wind:form2b ~~-1~

execute as @s[scores={cd3=-1}] at @s run scoreboard players set @s cd3 60