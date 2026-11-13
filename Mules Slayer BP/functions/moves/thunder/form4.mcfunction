execute as @s[scores={cd4=..-1}] run particle thunder:form4a ~~~
execute as @s[scores={cd4=..-1}] run particle thunder:form4b ~~~
execute as @s[scores={cd4=..-1}] run particle thunder:hold2 ~~~
execute as @s[scores={cd4=..-1}] run particle sound:form1c ~~~
execute as @s[scores={cd4=..-1}] run particle sound:form1d ~~~
execute as @s[scores={cd4=..-1}] run playsound item.trident.thunder @a ~~~ 1 0.75 1
execute as @s[scores={cd4=..-1}] run playsound item.trident.thunder @a ~~~ 1 15 1

camerashake add @s[scores={cd4=..-1}] 0.1 0.1

execute as @s[scores={cd4=-9}] run scriptevent thunder:form4
execute as @s[scores={cd4=-7}] run scriptevent thunder:form4
execute as @s[scores={cd4=-5}] run scriptevent thunder:form4
execute as @s[scores={cd4=-3}] run scriptevent thunder:form4
execute as @s[scores={cd4=-1}] run scriptevent thunder:form4
execute as @s[scores={cd4=-1}] run scoreboard players reset @s radpos

execute as @s[scores={cd4=-1}] at @s run scoreboard players set @s cd4 60