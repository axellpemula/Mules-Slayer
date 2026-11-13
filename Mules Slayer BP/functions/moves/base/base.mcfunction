#skibidi



scoreboard players set @s hold 0
scoreboard players set @s right 0
scoreboard players set @s holdS 0
scoreboard players set @s rightS 0


scoreboard players add @s[scores={sp1=29,ult=0,m1=0..,sp1=15..,right=0,hold=0}] m1 1
scoreboard players set @s[scores={right=1..,m1=1..5,m1=!10,sp1=..20}] m1 10
scoreboard players set @s[scores={right=1..,m1=0,m1=!10,sp1=0}] sp1 30

#m1 damage
scoreboard players set @s[scores={sp1=29,ult=0,skillani=0,m1=1..4}] radius 22
scoreboard players random @s[scores={sp1=29,ult=0,skillani=0,m1=1..4}] multiplier 15 30
scoreboard players random @s[scores={sp1=29,ult=0,skillani=0,m1=5}] multiplier 50 60
execute as @s[scores={sp1=27,ult=0,skillani=0,m1=1..4}] run scriptevent axell:damage
execute as @s[scores={sp1=-19,ult=0,skillani=0,m1=5}] run scriptevent axell:damage

#sound
execute as @s[scores={sp1=29,m1=1..4}] run playsound axell.raiden.m1 @a ^^^1 1 2 0.6
execute as @s[scores={sp1=29,m1=5}] run playsound axell.raiden.m1 @a ^^^1 1 1.75 0.6
execute as @s[scores={sp1=29,m1=1..8}] run playsound mob.witch.throw @a ^^^1 1 0.75 1
execute as @s[scores={sp1=27,m1=1..5}] rotated ~ 0 run particle smoke:wind ^^^1.5

#comboanimatoon
playanimation @s[scores={sp1=29,m1=1}] animation.basic.m1a
playanimation @s[scores={sp1=29,m1=2}] animation.basic.m1b
playanimation @s[scores={sp1=29,m1=3}] animation.basic.m1c
playanimation @s[scores={sp1=29,m1=4}] animation.basic.m1d
playanimation @s[scores={sp1=29,m1=5}] animation.basic.m1e
camerashake add @s[scores={sp1=29,right=0}] 0.1 0.1
camerashake add @s[scores={sp1=29,aircombo=1..}] 0.4 0.1

#movement
inputpermission set @s[scores={sp1=..-2,right=0}] jump disabled
inputpermission set @s[scores={sp1=15..29,right=0}] jump disabled
inputpermission set @s[scores={sp1=14}] jump enabled
inputpermission set @s[scores={sp1=-1}] jump enabled

inputpermission set @s[scores={sp1=..-2,right=0,m1=0}] movement disabled
inputpermission set @s[scores={sp1=15..29,right=0,m1=0}] movement disabled
inputpermission set @s[scores={sp1=14}] movement enabled
inputpermission set @s[scores={sp1=-1}] movement enabled

execute as @s[scores={sp1=29,m1=1..5}] run scriptevent axell:fw1
execute as @s[scores={sp1=-19,m1=5}] run scriptevent axell:fw3


scoreboard players set @s[scores={sp1=29,ult=0,m1=5..}] sp1 -20
