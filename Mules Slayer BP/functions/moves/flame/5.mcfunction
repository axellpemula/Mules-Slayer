scoreboard players set @s holdS 0
scoreboard players set @s rightS 0
scoreboard players set @s m1 0
inputpermission set @s[scores={cd5=1..}] movement enabled
playanimation @s[scores={cd5=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..39}] animation.nichirin.idle
inputpermission set @s[scores={energy=..39,ab5=1..}] movement enabled
tellraw @s[scores={cd5=1..,ab5=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.flame:form5"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..39,ab5=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
playanimation @s[scores={cd5=0,energy=40..,ab5=1..}] animation.flame.form5
execute as @s[scores={cd5=0,energy=40..,ab5=1..}] at @s run particle flame:form5
execute as @s[scores={cd5=0,energy=40..,ab5=1..}] at @s run particle flame:charge5
execute as @s[scores={cd5=0,energy=50..,ab5=1..}] run playsound mob.blaze.shoot @a ~~~ 1 0.25 1
scoreboard players set @s[scores={cd5=0,energy=40..,ab5=1..}] cd 20
scoreboard players set @s[scores={cd5=0,energy=40..,ab5=1..}] ult 30
scoreboard players set @s[scores={cd5=0,energy=40..,ab5=1..}] skillani 15

execute as @s[scores={cd5=0,energy=40..,ab5=1..}] run playsound mob.enderdragon.growl @a ~~~ 1 1.85 1
execute as @s[scores={cd5=0,energy=40..,ab5=1..}] run playsound mob.blaze.shoot @a ~~~ 1 0.75 1
execute as @s[scores={cd5=0,energy=40..,ab5=1..}] run playsound mob.blaze.shoot @a ~~~ 1 1.25 1
execute as @s[scores={cd5=0,energy=40..,ab5=1..}] at @s run particle flame:form2 ~~~
execute as @s[scores={cd5=0,energy=40..,ab5=1..}] at @s run particle flame:form1 ~~~
execute as @s[scores={cd5=0,energy=40..,ab5=1..}] at @s run particle flame:linger ~~~
execute as @s[scores={cd5=0,energy=40..,ab5=1..}] at @s run scriptevent flame:tiger
execute as @s[scores={cd5=0,energy=40..,ab5=1..}] run scriptevent flame:form5

scoreboard players set @s[scores={cd5=0,energy=40..,ab5=1..}] sp1 -15
scoreboard players set @s[scores={cd5=0,energy=40..,ab5=1..}] cd5 240
scoreboard players remove @s[scores={cd5=240,energy=40..,ab5=1..}] energy 40
