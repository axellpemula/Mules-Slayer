scoreboard players set @s m1 0

inputpermission set @s[scores={cd6=1..,ab6=1..}] movement enabled
inputpermission set @s[scores={energy=..14,ab6=1..}] movement enabled
event entity @s axell:jatuh

tellraw @s[scores={cd6=1..,ab6=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.wind:form6"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..14}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
effect @s[scores={cd6=0,energy=15..}] resistance 1 255 true

execute as @s[scores={cd6=0,energy=15..}] run inputpermission set @s movement disabled
execute as @s[scores={cd6=0,energy=15..}] run playanimation @s animation.wind.form6

execute as @s[scores={cd6=0,energy=15..,ab6=1..}] run playsound item.trident.riptide_3 @a ~~~ 1 2 1
execute as @s[scores={cd6=0,energy=15..,ab6=1..}] run playsound item.trident.riptide_3 @a ~~~ 1 1 1
execute as @s[scores={cd6=0,energy=15..,ab6=1..}] run playsound axell.raiden.m1 @a ~~~ 1 1.25 1
execute as @s[scores={cd6=0,energy=15..,ab6=1..}] run playsound axell.raiden.m1 @a ~~~ 1 1 1
execute as @s[scores={cd6=0,energy=15..,ab6=1..}] run particle wind:form2a
execute as @s[scores={cd6=0,energy=15..,ab6=1..}] run particle akaza:impact3
execute as @s[scores={cd6=0,energy=15..,ab6=1..}] run particle wind:form2b ^^^3

execute as @s[scores={cd6=0,energy=15..}] run scriptevent axell:up1
execute as @s[scores={cd6=0,energy=15..}] run scoreboard players set @s sp1 -10
execute as @s[scores={cd6=0,energy=15..}] run camerashake add @s 2 0.1
execute as @s[scores={cd6=0,energy=15..}] run scriptevent wind:form6
execute as @s[scores={cd6=0,energy=15..}] run scriptevent wind:form6
execute as @s[scores={cd6=0,energy=15..}] run scriptevent wind:form6

execute as @s[scores={cd6=0,energy=15..}] run execute as @s positioned ^^^2.5 run execute as @e[r=2.49] at @s run effect @s slow_falling 1 255 true
execute as @s[scores={cd6=0,energy=15..}] run execute as @s run particle akaza:impact3 ~~1~
execute as @s[scores={cd6=0,energy=15..}] run execute as @s run particle minecraft:knockback_roar_particle ~~1~

scoreboard players set @s[scores={cd6=0,energy=15..}] cd 40
scoreboard players set @s[scores={cd6=0,energy=15..}] aircombo 0
scoreboard players set @s[scores={cd6=0,energy=15..}] skillani 30
scoreboard players set @s[scores={cd6=0,energy=15..}] parry 15
scoreboard players set @s[scores={cd6=0,energy=15..}] cd6 100
scoreboard players remove @s[scores={cd6=100,energy=15..}] energy 15
