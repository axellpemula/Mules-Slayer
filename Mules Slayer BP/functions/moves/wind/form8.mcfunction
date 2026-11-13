execute as @s[scores={cd8=..-7}] at @s run particle minecraft:knockback_roar_particle ~~~
execute as @s[scores={cd8=..-9}] at @s run scriptevent axell:fw4
execute as @s[scores={cd8=..-7}] at @s run scriptevent wind:form8b
execute as @s[scores={cd8=..-7}] at @s run scoreboard players set @e[r=3,rm=0.1] stun2 5
execute as @s[scores={cd8=..-5}] at @s run playsound item.trident.riptide_3 @a ~~~ 1000 1.25 1000
execute as @s[scores={cd8=..-7}] at @s run particle akaza:impact3
execute as @s[scores={cd8=..-6}] at @s run particle wind:form1b
execute as @s[scores={cd8=-7}] at @s run particle wind:form2b ^^^
execute as @s[scores={cd8=-7}] at @s run particle wind:form2a ^^^
execute as @s[scores={cd8=-7}] at @s run scoreboard players set @s radpos 0
execute as @s[scores={cd8=-1}] at @s run scoreboard players set @s cd8 80