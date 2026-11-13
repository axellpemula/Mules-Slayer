execute as @s[scores={cd9=-35}] run scriptevent axell:up5
execute as @s[scores={cd9=-39}] run playsound mob.witch.throw @a ~~~ 100 0.5 100
execute as @s[scores={cd9=-39}] run scriptevent axell:fw5
execute as @s[scores={cd9=-30}] run tp ~~~
execute as @s[scores={cd9=-30}] run particle wind:form2a ~~1.5~
execute as @s[scores={cd9=-30}] run particle akaza:impact3 ~~1.5~
execute as @s[scores={cd9=-31..-23}] run particle wind:idaten ^^-2^2
execute as @s[scores={cd9=-31..-23}] run particle wind:idaten ^^-4^2
execute as @s[scores={cd9=-34..-31}] run scriptevent wind:form9
execute as @s[scores={cd9=-34..-31}] at @s run playsound axell.raiden.m1 @a ~~~ 1 1.25 1
execute as @s[scores={cd9=-36..-33}] at @s run playsound axell.raiden.m1 @a ~~~ 1 0.5 1
execute as @s[scores={cd9=-37..-34}] at @s run playsound item.trident.riptide_3 @a ~~~ 1 0.5 1
execute as @s[scores={cd9=-36..-33}] at @s run playsound item.trident.riptide_3 @a ~~~ 1 0.75 1
execute as @s[scores={cd9=..-37}] at @s anchored eyes run /camera @s set minecraft:free ease 0.1 linear pos ^-0.5^1^-1.5 facing @s
execute as @s[scores={cd9=-36..-23}] at @s run /camera @s set minecraft:free ease 0.1 linear pos ^-0.5^7^-1.5 facing @s

execute as @s[scores={cd9=-22}] run scriptevent axell:dw3
execute as @s[scores={cd9=-13}] run scriptevent axell:beatdowncancel
execute as @s[scores={cd9=-13}] run scoreboard players set @s cd9 400