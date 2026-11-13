scoreboard players set @s m1 0
scoreboard players set @s aircombo 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
tellraw @s[scores={cd5=1..,ab5=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.wind:form5"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..14}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
effect @s[scores={cd5=0,energy=15..}] resistance 1 255 true
camerashake add @s[scores={cd5=0,energy=15..}] 2 0.2

execute as @s[scores={cd5=0,energy=15..}] run playsound item.trident.riptide_3 @a ~~~ 1 1.25 1
execute as @s[scores={cd5=0,energy=15..}] run playsound item.trident.riptide_3 @a ~~~ 1 0.75 1
execute as @s[scores={cd5=0,energy=15..}] run playsound axell.raiden.m1 @a ~~~ 1 1.25 1
execute as @s[scores={cd5=0,energy=15..}] run playsound axell.raiden.m1 @a ~~~ 1 1 1
execute as @s[scores={cd5=0,energy=15..}] run playsound axell.raiden.m1 @a ~~~ 1 0.75 1

event entity @s[scores={cd5=0,energy=15..}] axell:terbang
execute as @s[scores={cd5=0,energy=15..}] run tp ~~~ ~~90
execute as @s[scores={cd5=0,energy=15..}] run particle wind:form2a
execute as @s[scores={cd5=0,energy=15..}] run particle wind:form5 ~~1~
execute as @s[scores={cd5=0,energy=15..}] run particle wind:form5b ~~~
scoreboard players set @s[scores={cd5=0,energy=15..}] cd 40
scoreboard players set @s[scores={cd5=0,energy=15..}] radpos 25
scoreboard players set @s[scores={cd5=0,energy=15..}] aircombo 0
scoreboard players set @s[scores={cd5=0,energy=15..}] skillani 20
scoreboard players set @s[scores={cd5=0,energy=15..}] cd5 -10
scoreboard players remove @s[scores={cd5=-10,energy=15..}] energy 15
