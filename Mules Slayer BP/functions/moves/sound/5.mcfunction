scoreboard players set @s hold 0
scoreboard players set @s right 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
playanimation @s[scores={cd5=1..,ab5=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..49}] animation.nichirin.idle
tellraw @s[scores={cd5=1..,ab5=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.sound:form5"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..49,ab5=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
playanimation @s[scores={cd5=0,energy=50..,ab5=1..}] animation.sound.form5a
inputpermission set @s[scores={cd5=0,energy=50..,ab5=1..}] movement disabled
scoreboard players set @s[scores={cd5=0,energy=50..,ab5=1..}] cd 20
scoreboard players set @s[scores={cd5=0,energy=50..,ab5=1..}] sp1 -35
scoreboard players set @s[scores={cd5=0,energy=50..,ab5=1..}] skillani 40
scoreboard players set @s[scores={cd5=0,energy=50..,ab5=1..}] cd5 -40
scoreboard players remove @s[scores={cd5=-40,energy=50..,ab5=1..}] energy 50
