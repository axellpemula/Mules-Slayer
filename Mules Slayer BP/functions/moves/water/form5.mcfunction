execute as @s[scores={cd5=-43}] at @s run particle water:linger2 ~~~
execute as @s[scores={cd5=-43}] at @s run particle water:rain ~~1~
execute as @s[scores={cd5=-49}] at @s run scriptevent water:form5a
execute as @s[scores={cd5=..-47}] at @s run scriptevent water:form5c
execute as @s[scores={cd5=-1}] at @s run scriptevent water:form5b
execute as @s[scores={cd5=-43}] at @s run particle smoke:mist ~~6.5~
execute as @s[scores={cd5=-42}] at @s run particle water:cloud ~~7.5~
execute as @s[scores={cd5=-43}] run scoreboard players set @s radpos 0
execute as @s[scores={cd5=-1}] run scoreboard players set @s cd5 150