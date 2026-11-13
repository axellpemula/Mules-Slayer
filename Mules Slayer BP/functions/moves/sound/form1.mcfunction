inputpermission set @s[scores={cd1=..-2}] movement disabled
execute as @s[scores={cd1=-5}] run playsound random.explode @a ~~~ 1000 1 1000
execute as @s[scores={cd1=-5}] run playsound random.explode @a ~~~ 1000 1.25 1000
execute as @s[scores={cd1=-5}] run playsound random.explode @a ~~~ 1000 0.75 1000
execute as @s[scores={cd1=-5}] run playsound random.explode @a ~~~ 1000 0.5 1000
execute as @s[scores={cd1=-5}] run particle sound:form1
execute as @s[scores={cd1=-5}] run particle smoke:sound
execute as @s[scores={cd1=-5}] run scriptevent sound:form1
execute as @s[scores={cd1=-5}] run scriptevent sound:form1
scoreboard players set @s autoparry 3
camerashake add @s[scores={cd1=-5}] 1 0.2