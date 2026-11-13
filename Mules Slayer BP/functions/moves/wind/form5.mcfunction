execute as @s[scores={cd5=-8}] run playanimation @s animation.wind.form5
execute as @s[scores={cd5=-8}] run playsound random.explode @a ~~~ 1 0.75 1

execute as @s[scores={cd5=-6}] run playsound item.trident.riptide_3 @a ~~~ 1 1.25 1
execute as @s[scores={cd5=-6}] run playsound axell.raiden.m1 @a ~~~ 1 1.25 1
execute as @s[scores={cd5=-6}] run playsound axell.raiden.m1 @a ~~~ 1 2 1

execute as @s[scores={cd5=..-1}] positioned ~~-2~ run scoreboard players set @e[r=1.9] stun2 5
execute as @s[scores={cd5=..-1}] positioned ~~-2~ run scoreboard players set @e[r=1.9] stun 5

execute as @s[scores={cd5=-9}] run scriptevent wind:form5
execute as @s[scores={cd5=-6}] run scriptevent wind:form5
execute as @s[scores={cd5=-4}] run scriptevent wind:form5

execute as @s[scores={cd5=-8}] run scriptevent axell:up1
event entity @s[scores={cd5=-3}] axell:jatuh
effect @s[scores={cd5=-3}] slow_falling 2 0 true

execute as @s[scores={cd5=-1}] at @s run scoreboard players reset @s radpos


execute as @s[scores={cd5=-1}] at @s run scoreboard players set @s cd5 30
