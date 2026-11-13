scoreboard players set @s m1 0


inputpermission set @s[scores={cd7=1..,ab7=1..}] movement enabled
inputpermission set @s[scores={energy=..14,ab7=1..}] movement enabled
event entity @s axell:jatuh

tellraw @s[scores={cd7=1..,ab7=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.water:form7"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..14}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
effect @s[scores={cd7=0,energy=15..}] resistance 1 255 true

execute as @s[scores={cd7=0,energy=15..}] run inputpermission set @s movement disabled
execute as @s[scores={cd7=0,energy=15..}] run playanimation @s animation.water.form7
execute as @s[scores={cd7=0,energy=15..}] run playsound bucket.empty_water @a ~~~ 1 1.25 1
execute as @s[scores={cd7=0,energy=15..}] run playsound bucket.empty_water @a ~~~ 1 0.75 1
scoreboard players set @s[scores={cd7=0,energy=15..}] cd 40
scoreboard players set @s[scores={cd7=0,energy=15..}] aircombo 0
scoreboard players set @s[scores={cd7=0,energy=15..}] skillani 30
scoreboard players set @s[scores={cd7=0,energy=15..}] parry 15
scoreboard players set @s[scores={cd7=0,energy=15..}] cd7 -10
scoreboard players remove @s[scores={cd7=-10,energy=15..}] energy 15
