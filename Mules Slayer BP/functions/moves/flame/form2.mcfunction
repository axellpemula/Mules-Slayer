execute as @s[scores={cd2=..-5}] at @s run particle flame:form2 ~~1.1~
execute as @s[scores={cd2=..-1}] at @s run particle flame:flame ~~2~
execute as @s[scores={cd2=-7}] at @s run scriptevent flame:form2
execute as @s[scores={cd2=-4}] at @s run scriptevent flame:form2
execute as @s[scores={cd2=-7}] at @s run playsound mob.blaze.shoot @a ~~~ 1 2 1
execute as @s[scores={cd2=-4}] at @s run playsound mob.blaze.shoot @a ~~~ 1 5 1

camerashake add @s[scores={cd2=-7}] 1 0.2
camerashake add @s[scores={cd2=-7}] 0.5 0.2


execute as @s[scores={cd2=-1}] at @s run scoreboard players set @s cd2 40