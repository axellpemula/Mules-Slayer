scoreboard players set @s holdS 0
scoreboard players set @s rightS 0

inputpermission set @s movement enabled
event entity @s axell:jatuh
playanimation @s animation.water.idle
tellraw @s[scores={cd9=1..,ab9=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.water:form9"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..29,ab9=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={cd9=0,energy=30..,ab9=1..}] run scriptevent water:form9
execute as @s[scores={cd9=0,energy=30..,ab9=1..}] run scriptevent axell:fw3
execute as @s[scores={cd9=0,energy=30..,ab9=1..}] run particle minecraft:knockback_roar_particle ~~~
execute as @s[scores={cd9=0,energy=30..,ab9=1..}] run playsound random.totem @a ~~~ 1 1.25 1
scoreboard players set @s[scores={cd9=0,energy=30..,ab9=1..}] cd 20
scoreboard players set @s[scores={cd9=0,energy=30..,ab9=1..}] skillani 5
scoreboard players remove @s[scores={cd9=0,energy=30..,ab9=1..}] energy 30