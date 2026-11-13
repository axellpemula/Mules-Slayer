scoreboard players set @s m1 0

inputpermission set @s[scores={cd1=1..,ab5=1..}] movement enabled
inputpermission set @s[scores={energy=..14,ab5=1..}] movement enabled
event entity @s axell:jatuh

tellraw @s[scores={cd1=1..,ab1=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.mist:form1"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..14}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
effect @s[scores={cd1=0,energy=15..}] resistance 1 255 true

execute as @s[scores={cd1=0,energy=15..}] run inputpermission set @s movement disabled
execute as @s[scores={cd1=0,energy=15..}] run playanimation @s animation.mist.form1

execute as @s[scores={cd1=0,energy=15..,ab5=1..}] run playsound axell.raiden.m1 @a ~~~ 1 1.25 1
execute as @s[scores={cd1=0,energy=15..,ab5=1..}] run particle akaza:impact3

execute as @s[scores={cd1=0,energy=15..}] run scriptevent axell:fw5
execute as @s[scores={cd1=0,energy=15..}] run scoreboard players set @s sp1 -10
execute as @s[scores={cd1=0,energy=15..}] run camerashake add @s 2 0.1

execute as @s[scores={cd1=0,energy=15..}] run execute as @s run particle akaza:impact3 ~~1~
execute as @s[scores={cd1=0,energy=15..}] run execute as @s rotated ~ 0 run particle smoke:mist2 ^^^
execute as @s[scores={cd1=0,energy=15..}] run execute as @s rotated ~ 0 run particle smoke:mist2 ^^^3
execute as @s[scores={cd1=0,energy=15..}] run execute as @s rotated ~ 0  run particle smoke:wind ^^^2

scoreboard players set @s[scores={cd1=0,energy=15..}] cd 40
scoreboard players set @s[scores={cd1=0,energy=15..}] sp1 -18
scoreboard players set @s[scores={cd1=0,energy=15..}] cd1 -10
scoreboard players remove @s[scores={cd1=-10,energy=15..}] energy 15
