inputpermission set @s[scores={cd4=..-2,right=0}] movement disabled
inputpermission set @s[scores={cd4=-1}] movement enabled
execute as @s[scores={cd4=..-1}] run execute as @e[rm=0.1,r=3] at @s run tp ~~0.2~
execute as @s[scores={cd4=-1}] run scoreboard players set @s radpos 0
execute as @s[scores={cd4=..-1}] run playsound item.trident.riptide_3 @a ~~~ 1 1.2 1
execute as @s[scores={cd4=..-1}] run playsound item.trident.riptide_3 @a ~~~ 1 1.75 1
execute as @s[scores={cd4=..-1}] run particle wind:form2b ~~-1~
scoreboard players set @s[scores={cd4=..-1}] parry 5
scoreboard players set @s[scores={cd4=-1}] cd4 120