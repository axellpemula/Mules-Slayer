execute as @s[scores={cd2=-8}] run scriptevent water:form2b
execute as @s[scores={cd2=-6}] run scriptevent water:form2c
execute as @s[scores={cd2=-6}] rotated ~ 0 run particle m1:water ^^1^2
execute as @s[scores={cd2=-5}] run tag @s remove autoparry
execute as @s[scores={cd2=-1}] run inputpermission set @s camera enabled
execute as @s[scores={cd2=-1}] run scoreboard players set @s cd2 10