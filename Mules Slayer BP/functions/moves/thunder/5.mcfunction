scoreboard players set @s m1 0

inputpermission set @s[scores={cd5=1..,ab5=1..}] movement enabled
inputpermission set @s[scores={energy=..14,ab5=1..}] movement enabled
event entity @s axell:jatuh

tellraw @s[scores={cd5=1..}] {"rawtext":[{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..14}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
effect @s[scores={cd5=0,energy=15..}] resistance 1 255 true

execute as @s[scores={cd5=0,energy=15..}] run inputpermission set @s movement disabled
execute as @s[scores={cd5=0,energy=15..}] run playanimation @s animation.thunder.form5

execute as @s[scores={cd5=0,energy=15..,ab5=1..}] run playsound item.trident.thunder @a ~~~ 1 9 1
execute as @s[scores={cd5=0,energy=15..,ab5=1..}] run playsound item.trident.thunder @a ~~~ 1 5 1
execute as @s[scores={cd5=0,energy=15..,ab5=1..}] run playsound ambient.weather.thunder @a ~~~ 1 5 1
execute as @s[scores={cd5=0,energy=15..,ab5=1..}] run playsound axell.raiden.m1 @a ~~~ 1 1.25 1
execute as @s[scores={cd5=0,energy=15..,ab5=1..}] run particle akaza:impact3

execute as @s[scores={cd5=0,energy=15..}] run scoreboard players set @s sp1 -10
execute as @s[scores={cd5=0,energy=15..}] run camerashake add @s 2 0.1

execute as @s[scores={cd5=0,energy=15..}] run execute as @s run particle akaza:impact3 ~~1~
execute as @s[scores={cd5=0,energy=15..}] run execute as @s run particle sound:form1c ~~~
execute as @s[scores={cd5=0,energy=15..}] run execute as @s run particle sound:form1c ~~~
execute as @s[scores={cd5=0,energy=15..}] run execute as @s run particle smoke:flame ~~~
execute as @s[scores={cd5=0,energy=15..}] run execute as @s run particle sound:form1d ~~~

scoreboard players set @s[scores={cd5=0,energy=15..}] cd 40
scoreboard players set @s[scores={cd5=0,energy=15..}] sp1 -15
scoreboard players set @s[scores={cd5=0,energy=15..}] cd5 -10
scoreboard players remove @s[scores={cd5=-10,energy=15..}] energy 15
