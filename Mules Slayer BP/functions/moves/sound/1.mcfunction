scoreboard players set @s holdS 0
scoreboard players set @s rightS 0
scoreboard players set @s m1 0
event entity @s axell:jatuh
playanimation @s[scores={ab1=0}] animation.water.idle
playanimation @s[scores={cd1=1..}] animation.water.idle
playanimation @s[scores={energy=..14}] animation.water.idle
tellraw @s[scores={cd1=1..,ab1=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.sound:form1"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..14,ab1=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}


playanimation @s[scores={cd1=0,energy=15..,ab1=1..}] animation.sound.form1
scoreboard players set @s[scores={cd1=0,energy=15..,ab1=1..}] sp1 -25
scoreboard players set @s[scores={cd1=0,energy=15..,ab1=1..}] m1 0
scoreboard players set @s[scores={cd1=0,energy=15..,ab1=1..}] cd 20
scoreboard players set @s[scores={cd1=0,energy=15..,ab1=1..}] skillani 10
scoreboard players set @s[scores={cd1=0,energy=15..,ab1=1..}] cd1 -15

scoreboard players remove @s[scores={cd1=-15,energy=15..,ab1=1..}] energy 15
