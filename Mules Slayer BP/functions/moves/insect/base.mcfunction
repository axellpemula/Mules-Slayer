#skibidi


scoreboard players set @s[scores={dsneak=1..}] dsneak 0


scoreboard players add @s[scores={sp1=29,ult=0,m1=0..,sp1=15..,right=0,hold=0}] m1 1
scoreboard players set @s[scores={right=1..,m1=1..5,m1=!10,sp1=..20}] m1 10
scoreboard players set @s[scores={right=1..,m1=0,m1=!10,sp1=0}] sp1 30
execute as @s[scores={sp1=29..,aircombo=1..}] at @s positioned ^^^2.5 run scoreboard players add @e[r=2.49] stun 5
execute as @s[scores={sp1=25..,aircombo=1..}] at @s positioned ^^^2.5 run execute as @e[r=2.49,rm=0.1] at @s run tp ~~~

#m1 damage
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=1}] run scriptevent insect:m1a
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=2}] run scriptevent insect:m1b
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=3}] run scriptevent insect:m1c
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=4}] run scriptevent insect:m1d1
execute as @s[scores={sp1=27,ult=0,skillani=0,m1=4}] run scriptevent insect:m1d2
execute as @s[scores={sp1=25,ult=0,skillani=0,m1=4}] run scriptevent insect:m1d3
execute as @s[scores={sp1=-19,ult=0,skillani=0,m1=5}] run scriptevent insect:m1e

#sound
execute as @s[scores={sp1=29,m1=1..4}] run playsound axell.raiden.m1 @a ^^^1 1 3 100
execute as @s[scores={sp1=27,m1=4}] run playsound axell.raiden.m1 @a ^^^1 1 4 0.6
execute as @s[scores={sp1=25,m1=4}] run playsound axell.raiden.m1 @a ^^^1 1 3 0.6
execute as @s[scores={sp1=29,m1=5}] run playsound axell.raiden.m1 @a ^^^1 1 2 0.6
execute as @s[scores={sp1=29,m1=1}] run playsound mob.bee.death @a ^^^1 1 1 100
execute as @s[scores={sp1=29,m1=2}] run playsound mob.bee.death @a ^^^1 2 1 100
execute as @s[scores={sp1=29,m1=3}] run playsound mob.bee.death @a ^^^1 0.7 1 100
execute as @s[scores={sp1=29,m1=5}] run playsound mob.bee.death @a ^^^1 0.5 1 100

execute as @s[scores={sp1=29,m1=1..5}] rotated ~ 0 run particle smoke:insect ^^^2
execute as @s[scores={sp1=29,m1=1..5}] rotated ~ 0 run particle m1:insect ^^1^2
execute as @s[scores={sp1=-15,m1=5}] rotated ~ 0 run particle m1:insect ^^1^2
execute as @s[scores={sp1=..-15,m1=5}] rotated ~ 0 run particle smoke:insect ^^^2

#comboanimatoon
playanimation @s[scores={sp1=29,m1=1}] animation.insect.m1a
playanimation @s[scores={sp1=29,m1=2}] animation.insect.m1b
playanimation @s[scores={sp1=29,m1=3}] animation.insect.m1c
playanimation @s[scores={sp1=29,m1=4}] animation.insect.m1d
playanimation @s[scores={sp1=29,m1=5}] animation.insect.m1e
camerashake add @s[scores={sp1=29,right=0}] 0.1 0.1
camerashake add @s[scores={sp1=29,aircombo=1..}] 0.4 0.1

#movement
inputpermission set @s[scores={sp1=..-2,right=0}] jump disabled
inputpermission set @s[scores={sp1=15..29,right=0}] jump disabled
inputpermission set @s[scores={sp1=14}] jump enabled
inputpermission set @s[scores={cd5=230}] jump enabled
inputpermission set @s[scores={sp1=-1}] jump enabled

inputpermission set @s[scores={sp1=..-2,right=0,m1=0}] movement disabled
inputpermission set @s[scores={sp1=15..29,right=0,m1=0}] movement disabled
inputpermission set @s[scores={sp1=14}] movement enabled
inputpermission set @s[scores={cd5=230}] movement enabled
inputpermission set @s[scores={sp1=-1}] movement enabled

execute as @s[scores={sp1=29,m1=1..3}] run scriptevent axell:fw1
execute as @s[scores={sp1=20..,m1=4}] run scriptevent axell:fw1
execute as @s[scores={sp1=-18,m1=5}] run scriptevent axell:fw5



#forms -------------------------------------------------------

execute as @s[scores={cd1=..-1}] run function moves/insect/form1
execute as @s[scores={cd2=..-1}] run function moves/insect/form2 
execute as @s[scores={cd4=..-1}] run function moves/insect/form4 
execute as @s[scores={cd3=..-1}] run function moves/insect/form3 
execute as @s[scores={cd5=..-1}] run function moves/insect/form5 
execute as @s[scores={cd6=..-1}] run function moves/insect/form6

# --------------------------------------------------------------

#abilities
playanimation @s[scores={right=1,hold=1,dsneak=0,ab2=1..}] animation.insect.hold1
execute at @s[scores={right=1..,hold=1..,dsneak=0,ab2=1..}] run inputpermission set @s movement disabled
execute at @s[scores={right=1..,hold=1..,cd1=0,dsneak=0,ab2=1..,energy=20..}] run particle insect:hold ~~~
execute at @s[scores={right=1..,hold=1..,cd1=0,dsneak=0,ab2=1..,energy=20..}] run particle insect:m1b ~~-4.5~
execute at @s[scores={right=1..,hold=1..,cd1=0,dsneak=0,ab2=1..,energy=20..}] run particle smoke:insect ~~~
execute at @s[scores={right=1..,hold=1..,dsneak=0,ab2=1..,energy=20..}] run particle flame:hold ~~~

playanimation @s[scores={rightS=1,holdS=1,dsneak=0,ab5=1..}] animation.insect.hold1
execute at @s[scores={rightS=1,holdS=1..,dsneak=0,ab5=1..}] run inputpermission set @s movement disabled
execute at @s[scores={rightS=1,holdS=6..,cd1=0,dsneak=0,ab1=1..,energy=20..}] run particle smoke:insect ~~~
execute at @s[scores={rightS=1,holdS=10..,dsneak=0,ab5=1..,energy=40..}] run particle flame:hold ~~~

execute as @s[scores={right=0,hold=6..,dsneak=0}] run function moves/insect/2
execute as @s[scores={right=0,hold=1..5,dsneak=0}] run function moves/insect/3
execute as @s[scores={rightS=0,holdS=6..,dsneak=0}] run function moves/insect/4
execute as @s[scores={rightS=0,holdS=1..5,dsneak=0}] run function moves/insect/1
execute as @s[scores={sp1=29,ult=0,sneak=1,m1=0..,right=0,ab1=1..,dsneak=0,skill_mode=0}] at @s run function moves/insect/1

scoreboard players set @s[scores={sp1=29,ult=0,m1=5..}] sp1 -20
