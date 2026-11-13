execute as @s[scores={cd6=-5}] rotated ~ 0 run particle sound:form1b ^^^1
execute as @s[scores={cd6=-5}] rotated ~ 0 run particle sound:form1c ^^^1
execute as @s[scores={cd6=-5}] rotated ~ 0 run particle sound:form1d ^^^1
execute as @s[scores={cd6=..-1}] rotated ~ 0 run particle thunder:hold2 ^^^1
execute as @s[scores={cd6=..-1}] rotated ~ 0 run particle thunder:hold2 ^^^1
execute as @s[scores={cd6=..-5}] rotated ~ 0 run particle smoke:sound2 ^^^
execute as @s[scores={cd6=..-5}] rotated ~ 0 run particle akaza:impact3 ^^^
execute as @s[scores={cd6=-7..-4}] rotated ~ 0 run particle thunder:form4a ^^^2
execute as @s[scores={cd6=-6}] rotated ~ 0 run particle sound:form1b ^^^1.5
execute as @s[scores={cd6=-5..-4}] rotated ~ 0 run particle sound:form1c ^^^1.5
execute as @s[scores={cd6=-3}] rotated ~ 0 run particle thunder:form6a ^^^1

execute as @s[scores={cd6=..-2}] at @s if entity @e[rm=0.1,r=2] rotated ~ 0 run particle thunder:form6a ^^^1
execute as @s[scores={cd6=..-2}] at @s if entity @e[rm=0.1,r=2] rotated ~ 0 run particle smoke:sound2 ^^^1
execute as @s[scores={cd6=..-2}] at @s if entity @e[rm=0.1,r=2] rotated ~ 0 run particle sound:form1b ^^^1
execute as @s[scores={cd6=..-2}] at @s if entity @e[rm=0.1,r=2] rotated ~ 0 run particle sound:form1c ^^^1
execute as @s[scores={cd6=..-2}] at @s if entity @e[rm=0.1,r=2] rotated ~ 0 run particle sound:form1c ^^^1
execute as @s[scores={cd6=..-2}] at @s if entity @e[rm=0.1,r=2] rotated ~ 0 run execute as @e[rm=0.1,r=2] run particle thunder:form4a
execute as @s[scores={cd6=..-2}] at @s if entity @e[rm=0.1,r=2] rotated ~ 0 run execute as @e[rm=0.1,r=2] run particle thunder:form4a
execute as @s[scores={cd6=..-2}] at @s if entity @e[rm=0.1,r=2] rotated ~ 0 run execute as @e[rm=0.1,r=2] run scoreboard players add @s stun 25
execute as @s[scores={cd6=..-2}] at @s if entity @e[rm=0.1,r=2] run scoreboard players set @s cd6 -1
execute as @s[scores={cd6=..-1}] at @s if entity @e[rm=0.1,r=2] run tp @s ~~~
execute as @s[scores={cd6=..-1}] at @s run tp @e[rm=0.1,r=2] ^^^0.5 facing ^^^-10

execute as @s[scores={cd6=-1}] at @s run scoreboard players set @s cd6 80