#skibidi



scoreboard players add @s[scores={sp1=29,ult=0,m1=0..,sp1=15..,right=0,onground=1}] m1 1
scoreboard players add @s[scores={sp1=29,ult=0,sneak=0,m1=0..,sp1=15..,right=0,aircombo=1..,onground=0}] m1 1
scoreboard players add @s[scores={sp1=29,ult=0,sneak=0,m1=0..,sp1=15..,right=0,cd3=1..,onground=0}] m1 1
scoreboard players add @s[scores={sp1=29,ult=0,sneak=0,m1=0..,aircombo=1..}] combostopper 1
scoreboard players set @s[scores={combostopper=5..,onground=1}] skillani 5
scoreboard players set @s[scores={right=1..,m1=1..5,m1=!10,sp1=..20}] m1 10
scoreboard players set @s[scores={right=1..,m1=0,m1=!10,sp1=0}] sp1 30
execute as @s[scores={sp1=29..,aircombo=1..}] at @s positioned ^^^2.5 run scoreboard players add @e[r=2.49] stun 5
execute as @s[scores={skillani=1..,ult=0}] at @s positioned ^^^2.5 at @e[r=2.49] run particle flame:flame ~~1~
execute as @s[scores={sp1=25..,aircombo=1..}] at @s positioned ^^^2.5 at @e[r=2.49] run particle flame:flame ~~1~
execute as @s[scores={sp1=25..,aircombo=1..}] at @s positioned ^^^2.5 run execute as @e[r=2.49,rm=0.1] at @s run tp ~~~

#m1 damage
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=1}] run scriptevent flame:m1a
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=2}] run scriptevent flame:m1b
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=3}] run scriptevent flame:m1c
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=4}] run scriptevent flame:m1d
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=5}] run scriptevent flame:m1e

#sound
execute as @s[scores={sp1=29,m1=1..4}] run playsound axell.raiden.m1 @a ^^^1 0.5 1.5 0.6
execute as @s[scores={sp1=29,m1=5}] run playsound axell.raiden.m1 @a ^^^1 0.5 1.25 0.6
execute as @s[scores={sp1=29,m1=1..8}] run playsound mob.witch.throw @a ^^^1 1 0.75 1

#comboanimatoon
playanimation @s[scores={sp1=29,m1=1}] animation.flame.m1a
playanimation @s[scores={sp1=29,m1=2}] animation.flame.m1b
playanimation @s[scores={sp1=29,m1=3}] animation.flame.m1c
playanimation @s[scores={sp1=29,m1=4}] animation.flame.m1d
playanimation @s[scores={sp1=29,m1=5}] animation.flame.m1e
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

execute as @s[scores={sp1=29,m1=1..4}] run scriptevent axell:fw1
execute as @s[scores={sp1=29,m1=5}] run scriptevent axell:fw2
execute as @s[scores={sp1=29,m1=1..5}] rotated ~ 0 run particle smoke:flame ^^1^2



#forms -------------------------------------------------------

#forms1


#form2
execute as @s[scores={cd1=..-1}] run function moves/flame/form1
execute as @s[scores={cd2=..-1}] run function moves/flame/form2
#form7
execute as @s[scores={cd7=50..}] run function moves/flame/form7
#form9
execute as @s[scores={cd9=1..,ultimate=1..}] run scriptevent ult:flame
execute as @s[scores={cd9=1..,ultimate=1..}] run function moves/flame/form9
#form5
execute as @s[scores={cd5=200..}] run function moves/flame/form5
#form4
execute as @s[scores={cd4=..-1}] run function moves/flame/form4
#form3
execute as @s[scores={cd3=..-1}] run function moves/flame/form3

# --------------------------------------------------------------

tag @s[scores={slot=1..5}] add skillbar
tag @s[scores={slot=6..}] remove skillbar

#abilities
playanimation @s[scores={right=1,hold=1,dsneak=0,ab1=1..}] animation.flame.hold1
execute at @s[scores={right=1..,hold=6..,dsneak=0,ab1=1..}] run inputpermission set @s movement disabled
execute at @s[scores={right=1..,hold=6..,cd1=0,dsneak=0,ab1=1..,energy=20..}] run particle flame:hold1 ~~~
execute at @s[scores={right=1..,hold=6..,cd1=0,dsneak=0,ab1=1..,energy=20..}] run particle flame:hold2 ~~~
execute at @s[scores={right=1..,hold=6..,cd1=0,dsneak=0,ab1=1..,energy=20..}] run particle flame:flame5 ~~~
execute at @s[scores={right=1..,hold=6..,dsneak=0,ab1=1..,energy=20..}] run particle flame:hold ~~~

playanimation @s[scores={rightS=1,holdS=1,dsneak=0,ab5=1..}] animation.flame.hold2
execute at @s[scores={rightS=1,holdS=1..,dsneak=0,ab5=1..}] run inputpermission set @s movement disabled
execute at @s[scores={rightS=1,holdS=6..,cd5=0,dsneak=0,ab5=1..,energy=40..}] run particle flame:form11 ~~~
execute at @s[scores={rightS=1,holdS=6..,cd5=0,dsneak=0,ab5=1..,energy=40..}] run particle flame:hold1 ~~~
execute at @s[scores={rightS=1,holdS=6..,cd5=0,dsneak=0,ab5=1..,energy=40..}] run particle flame:hold2 ~~~
execute at @s[scores={rightS=1,holdS=6..,cd5=0,dsneak=0,ab5=1..,energy=40..}] run particle flame:flame5 ~~~
execute at @s[scores={rightS=1,holdS=6..,dsneak=0,ab5=1..,energy=40..}] run particle flame:hold ~~~

execute as @s[scores={right=0,hold=6..,dsneak=0}] run function moves/flame/1
execute as @s[scores={right=0,hold=1..5,dsneak=0}] run function moves/flame/2
execute as @s[scores={rightS=0,holdS=1..5,dsneak=0}] run function moves/flame/4
execute as @s[scores={rightS=0,holdS=6..,dsneak=0}] run function moves/flame/5
execute as @s[scores={sp1=29,ult=0,sneak=0,m1=0..,sp1=15..,right=0,energy=15..,dsneak=0,ab3=1..,skill_mode=0,skill_mode=0,onground=0}] run function moves/flame/3
execute as @s[scores={sp1=29,ult=0,sneak=0,m1=0..,sp1=15..,right=0,aircombo=1..,energy=15..,dsneak=0,ab3=1..,skill_mode=0,skill_mode=0,onground=0},rx=90,rxm=80] run function moves/flame/3

execute as @s[scores={sp1=29,ult=0,sneak=1,m1=0..,right=0,ab3=1..,dsneak=0,skill_mode=0}] at @s run function moves/flame/3

execute as @s[scores={sp1=29,dsneak=1,ab9=1..,cd9=0}] run function moves/flame/9
execute as @s[scores={dsneak=1,ab9=1..}] run scoreboard players set @s ultimateArt 1
execute at @s[scores={dsneak=1,ab9=1..}] run particle flame:ult ~~~

scoreboard players set @s[scores={sp1=29,ult=0,m1=5..}] sp1 -20
