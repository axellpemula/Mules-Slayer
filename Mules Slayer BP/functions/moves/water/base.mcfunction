#skibidi




scoreboard players add @s[scores={sp1=29,ult=0,sneak=0,m1=19..,right=0,cd10=..-1}] m1 1
scoreboard players set @s[scores={sp1=29,ult=0,sneak=0,m1=0..15,right=0,cd10=..-1}] m1 20
scoreboard players add @s[scores={sp1=29,ult=0,sneak=0,m1=0..,right=0,cd10=0..,onground=1}] m1 1
scoreboard players add @s[scores={sp1=29,ult=0,sneak=0,m1=0..,right=0,cd8=1..,onground=0}] m1 1



#comboanimatoon
playanimation @s[scores={sp1=29,m1=1}] animation.water.m1a
playanimation @s[scores={sp1=29,m1=2}] animation.water.m1b
playanimation @s[scores={sp1=29,m1=3}] animation.water.m1c
playanimation @s[scores={sp1=29,m1=4}] animation.water.m1d
playanimation @s[scores={sp1=29,m1=5}] animation.water.m1e
camerashake add @s[scores={sp1=29,right=0,cd10=0..}] 0.1 0.1
camerashake add @s[scores={sp1=27,right=0,m1=3}] 0.2 0.2
camerashake add @s[scores={sp1=29,m1=5}] 0.4 0.1

#m1 damage
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=1}] run scriptevent water:m1a
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=2}] run scriptevent water:m1b
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=3}] run scriptevent water:m1c1
execute as @s[scores={sp1=27,ult=0,skillani=0,m1=3}] run scriptevent water:m1c2
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=4}] run scriptevent water:m1d
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=5}] run scriptevent water:m1e

inputpermission set @s[scores={sp1=..-2,right=0}] jump disabled
inputpermission set @s[scores={sp1=15..29,right=0}] jump disabled
inputpermission set @s[scores={sp1=14}] jump enabled
inputpermission set @s[scores={sp1=-1}] jump enabled

inputpermission set @s[scores={sp1=..-2,right=0,m1=0}] movement disabled
inputpermission set @s[scores={sp1=15..29,right=0,m1=0}] movement disabled
inputpermission set @s[scores={sp1=14}] movement enabled
inputpermission set @s[scores={sp1=-1}] movement enabled

tag @s[scores={cd6=60}] remove nofall2
execute as @s[scores={sp1=29,m1=5}] run scriptevent axell:fw2
execute as @s[scores={sp1=29,m1=1..4}] run scriptevent axell:fw1
execute as @s[scores={sp1=27,m1=3}] run scriptevent axell:fw1
execute as @s[scores={sp1=29,m1=1..5}] rotated ~ 0 run particle smoke:wind ^^1^2

#sound
execute as @s[scores={sp1=28,m1=1..8}] run playsound mob.witch.throw @a
execute as @s[scores={sp1=28,m1=4}] run playsound mob.witch.throw @a 
execute as @s[scores={sp1=-23,m1=5}] run playsound mob.witch.throw @a
execute as @s[scores={sp1=29,m1=1..4}] run playsound axell.raiden.m1 @a ^^^1 1.5 2.5 0.6
execute as @s[scores={sp1=27,m1=3}] run playsound axell.raiden.m1 @a ^^^1 1.5 2.5 0.6
execute as @s[scores={sp1=29,m1=5}] run playsound axell.raiden.m1 @a ^^^1 1.5 2.25 0.6

#formfunc
execute as @s[scores={cd4=-8}] run function moves/water/form4
execute as @s[scores={cd7=-6}] run function moves/water/form7
execute as @s[scores={cd2=..-1}] run function moves/water/form2
execute as @s[scores={cd8=..-1}] run function moves/water/form8
execute as @s[scores={cd6=..-1}] run function moves/water/form6
execute as @s[scores={cd3=..-1}] run function moves/water/form3
execute as @s[scores={cd5=..-1}] run function moves/water/form5
execute as @s[scores={cd9=..-1}] run function moves/water/form9
execute as @s[scores={cd10=..-1}] run function moves/water/form10
execute as @s[scores={cd11=..-1}] run function moves/water/form11
execute as @s[scores={cd10=500..}] run function moves/water/form10


#forms
playanimation @s[scores={right=1,hold=1,dsneak=0,ab6=1..}] animation.water.hold1
playanimation @s[scores={rightS=1,holdS=1,dsneak=0,ab6=1..}] animation.flame.hold1
execute at @s[scores={right=1..,hold=6..,dsneak=0,ab6=1..}] run inputpermission set @s movement disabled
execute as @s[scores={right=1..,hold=6..,cd6=0,dsneak=0,ab6=1..,energy=20..,onground=1}] at @s run particle water:hold2 ~~0.1~
execute as @s[scores={right=1..,hold=6..,dsneak=0,ab6=1..,energy=20..,onground=1}] at @s run particle flame:hold ~~~

execute as @s[scores={right=1..,hold=8,dsneak=0,ab5=1..,energy=50..,cd5=0,onground=0}] at @s run event entity @s axell:terbang
execute as @s[scores={right=1..,hold=1,dsneak=0,ab5=1..,energy=50..,cd5=0,onground=0}] at @s run scriptevent axell:form5
execute as @s[scores={right=1..,hold=1..20,cd5=0,dsneak=0,ab5=1..,energy=50..,onground=0}] at @s run particle water:hold2 ~~0.1~
execute as @s[scores={right=1..,hold=1..20,cd5=0,dsneak=0,ab5=1..,energy=50..,onground=0}] at @s run particle water:hold2 ~~1~
execute as @s[scores={right=1..,hold=1..20,cd5=0,dsneak=0,ab5=1..,energy=50..,onground=0}] at @s run particle water:hold2 ~~1.2~
execute as @s[scores={right=1..,hold=5..20,cd5=0,dsneak=0,ab5=1..,energy=50..,onground=0}] at @s run particle water:hold1 ~~1.2~
execute as @s[scores={right=1..,hold=1,dsneak=0,ab5=1..,energy=50..,cd5=0,onground=0}] at @s run effect @s slow_falling 1 255 true
execute as @s[scores={right=1,hold=1,dsneak=0,ab5=1..,energy=50..,cd5=0,onground=0}] at @s run playanimation @s animation.water.hold2
execute as @s[scores={right=1..,hold=20,dsneak=0,onground=0}] at @s run event entity @s axell:jatuh

execute at @s[scores={rightS=1,holdS=1..,dsneak=0,ab9=1..}] run inputpermission set @s movement disabled
execute at @s[scores={rightS=1,holdS=6..,cd9=0,dsneak=0,ab9=1..,energy=30..}] run particle water:hold2 ~~0.1~
execute at @s[scores={rightS=1,holdS=6..,dsneak=0,ab9=1..,energy=30..}] run particle flame:hold ~~~

execute as @s[scores={right=0,hold=1..3,dsneak=0,onground=1}] run function moves/water/1
execute as @s[scores={right=0,hold=4..10,dsneak=0,onground=1}] run function moves/water/4
execute as @s[scores={right=0,hold=1..5,dsneak=0,onground=0}] run function moves/water/2

execute as @s[scores={right=0,hold=11..,dsneak=0,onground=1}] run function moves/water/6
execute as @s[scores={right=0,hold=21..,dsneak=0}] run function moves/water/6
execute as @s[scores={right=0,hold=6..20,dsneak=0,onground=0}] run function moves/water/5

execute as @s[scores={rightS=0,holdS=1..5,dsneak=0}] run function moves/water/9a
execute as @s[scores={rightS=0,holdS=6..,dsneak=0}] run function moves/water/3

#form 9 cancel
execute as @s[scores={cd9=-1}] run function moves/water/9b
execute as @s[scores={sp1=29,ult=0,sneak=0,m1=0..,right=0,cd9=..-1}] run function moves/water/9b
execute as @s[scores={ult=0,sneak=0,m1=0..,right=1,cd9=..-1}] run function moves/water/9b
execute as @s[scores={ult=0,sneak=0,m1=0..,right=0,hold=1..,cd9=..-1}] run function moves/water/9b
execute as @s[scores={sp1=29,ult=0,sneak=0,m1=0..,right=0,cd9=..-1}] run function moves/water/9b
execute as @s[scores={ult=0,sneak=0,m1=0..,rightS=1,cd9=..-1}] run function moves/water/9b
execute as @s[scores={ult=0,sneak=0,m1=0..,rightS=0,holdS=1..,cd9=..-1}] run function moves/water/9b

execute as @s[scores={sp1=29,ult=0,sneak=1,m1=0..,right=0,ab7=1..,cd10=0..,dsneak=0,skill_mode=0,onground=1}] run function moves/water/7
execute as @s[scores={sp1=29,ult=0,sneak=0,m1=0..,sp1=15..,right=0,energy=15..,dsneak=0,ab8=1..,cd8=0,cd10=0..,skill_mode=0,onground=0}] run function moves/water/8

execute as @s[scores={sp1=29,dsneak=1,ab10=1..}] run function moves/water/10
execute as @s[scores={sp1=0,rightD=1,dsneak=1,ab11=1..}] run function moves/water/11
execute at @s[scores={dsneak=1,ab10=1..}] run particle water:hold2 ~~~
execute at @s[scores={dsneak=1,ab11=1..}] run particle water:hold2 ~~~
execute at @s[scores={dsneak=1,ab10=1..,cd10=0}] run scoreboard players set @s ultimateArt 1
execute at @s[scores={dsneak=1,ab11=1..,cd11=0}] run scoreboard players set @s ultimateArt 1



scoreboard players set @s[scores={sp1=29,ult=0,sneak=0,m1=5..18}] sp1 -20