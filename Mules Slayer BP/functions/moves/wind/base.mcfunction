#skibidi




scoreboard players add @s[scores={sp1=29,ult=0,m1=0..,sp1=15..,right=0,onground=1}] m1 1
scoreboard players add @s[scores={sp1=29,ult=0,sneak=0,m1=0..,sp1=15..,right=0,aircombo=1..,onground=0}] m1 1
scoreboard players add @s[scores={sp1=29,ult=0,sneak=0,m1=0..,sp1=15..,right=0,cd3=1..,onground=0}] m1 1
scoreboard players add @s[scores={sp1=29,ult=0,sneak=0,m1=0..,aircombo=1..}] combostopper 1
scoreboard players set @s[scores={combostopper=6..,onground=1}] skillani 5
scoreboard players set @s[scores={right=1..,m1=1..5,m1=!10,sp1=..20}] m1 10
scoreboard players set @s[scores={right=1..,m1=0,m1=!10,sp1=0}] sp1 30
execute as @s[scores={sp1=29..,aircombo=1..}] at @s positioned ^^^2.5 run scoreboard players add @e[r=2.49] stun 5
execute as @s[scores={sp1=25..,aircombo=1..}] at @s positioned ^^^2.5 run execute as @e[r=2.49,rm=0.1] at @s run tp ~~~

#m1 damage
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=1}] run scriptevent wind:m1a
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=2}] run scriptevent wind:m1b
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=3}] run scriptevent wind:m1c1
execute as @s[scores={sp1=26,ult=0,skillani=0,m1=3}] run scriptevent wind:m1c2
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=4}] run scriptevent wind:m1d
execute as @s[scores={sp1=-23,m1=5}] run scriptevent wind:m1e3
execute as @s[scores={sp1=-21,m1=5}] run scriptevent wind:m1e2
execute as @s[scores={sp1=-19..-15,m1=5}] run scriptevent wind:m1e1

#sound
execute as @s[scores={sp1=29,m1=1..2}] run playsound item.trident.throw @a
execute as @s[scores={sp1=29,m1=1..2}] run playsound item.trident.riptide_2 @a ~~~ 1 3 1
execute as @s[scores={sp1=26,m1=3}] run playsound item.trident.riptide_2 @a ~~~ 1 3 1
execute as @s[scores={sp1=26,m1=3}] run playsound item.trident.throw @a 
execute as @s[scores={sp1=29,m1=4}] run playsound item.trident.riptide_3 @a ~~~ 1 2.5 1
execute as @s[scores={sp1=-23,m1=4}] run playsound item.trident.throw @a
execute as @s[scores={sp1=29,m1=1..3}] run playsound axell.raiden.m1 @a ^^^1 1.5 2.5 0.6
execute as @s[scores={sp1=26,m1=3}] run playsound axell.raiden.m1 @a ^^^1 1.5 2.5 0.6
execute as @s[scores={sp1=29,m1=4}] run playsound axell.raiden.m1 @a ^^^1 1.5 2.25 0.6
execute as @s[scores={sp1=-20..-12,m1=5}] run scriptevent m1e:wind
execute as @s[scores={sp1=-25..-15,m1=5}] run playsound item.trident.riptide_3 @a ~~~ 1 3 1

#comboanimatoon
execute as @s[scores={aircombo=1..}] run particle wind:hold1
playanimation @s[scores={sp1=29,m1=1}] animation.wind.m1a
playanimation @s[scores={sp1=29,m1=2}] animation.wind.m1b
playanimation @s[scores={sp1=29,m1=3}] animation.wind.m1c
playanimation @s[scores={sp1=29,m1=4}] animation.wind.m1d
playanimation @s[scores={sp1=29,m1=5}] animation.wind.m1e
camerashake add @s[scores={sp1=29,right=0}] 0.1 0.1
camerashake add @s[scores={sp1=-25..-12,m1=5}] 0.1 0.1

#movement
inputpermission set @s[scores={sp1=..-2,right=0}] jump disabled
inputpermission set @s[scores={sp1=15..29,right=0}] jump disabled
inputpermission set @s[scores={sp1=14}] jump enabled
inputpermission set @s[scores={cd5=230}] jump enabled
inputpermission set @s[scores={sp1=-1}] jump enabled

inputpermission set @s[scores={sp1=..-2,right=0,m1=0}] movement disabled
inputpermission set @s[scores={sp1=..-2,right=0,m1=5}] movement disabled
inputpermission set @s[scores={sp1=15..29,right=0,m1=0}] movement disabled
inputpermission set @s[scores={sp1=14}] movement enabled
inputpermission set @s[scores={sp1=-1}] movement enabled


execute as @s[scores={sp1=29,m1=1..4,aircombo=0}] run scriptevent axell:fw1
execute as @s[scores={sp1=29,m1=5,aircombo=0}] run scriptevent axell:fw2
execute as @s[scores={sp1=29,m1=1..5}] rotated ~ 0 run particle smoke:wind ^^1^2
execute as @s[scores={sp1=-20,m1=5}] rotated ~ 0 run particle smoke:wind ^^1^2

execute as @s[scores={sp1=29,m1=1..5,aircombo=1..}] at @s positioned ^^1^2.25 if entity @e[r=2.24] run scriptevent axell:fw1



#forms -------------------------------------------------------

#form1
execute as @s[scores={cd1=..-1}] run function moves/wind/form1
#form2
execute as @s[scores={cd2=..-1}] run function moves/wind/form2
#form3
execute as @s[scores={cd3=..-1}] run function moves/wind/form3
#form4
execute as @s[scores={cd4=..-1}] run function moves/wind/form4
#form8
execute as @s[scores={cd8=..-1}] run function moves/wind/form8
#form7
execute as @s[scores={cd7=..-1}] run function moves/wind/form7
#form9
execute as @s[scores={cd9=..-1}] run function moves/wind/form9
#form5
execute as @s[scores={cd5=..-1}] run function moves/wind/form5

# --------------------------------------------------------------
#abilities
playanimation @s[scores={right=1,hold=1,dsneak=0,ab1=1..}] animation.wind.hold1
execute at @s[scores={right=1..,hold=4..,dsneak=0,ab1=1..}] run inputpermission set @s movement disabled
execute at @s[scores={right=1..,hold=4..,cd8=0,dsneak=0,ab8=1..,energy=35..}] run particle wind:hold2 ~~~
execute at @s[scores={right=1..,hold=11..,cd1=0,dsneak=0,ab8=0,ab1=1..,energy=20..}] run particle wind:hold2 ~~~
execute at @s[scores={right=1..,hold=11..,cd1=0,dsneak=0,ab1=1..,energy=20..}] run particle wind:hold1 ~~~
execute at @s[scores={right=1..,hold=4..,dsneak=0,ab1=1..,energy=20..}] run particle flame:hold ~~~

playanimation @s[scores={rightS=1,holdS=1,dsneak=0,ab5=1..}] animation.wind.hold2
execute at @s[scores={rightS=1,holdS=1..,dsneak=0,ab5=1..}] run inputpermission set @s movement disabled
execute at @s[scores={rightS=1,holdS=6..,cd5=0,dsneak=0,ab5=1..,energy=35..}] run particle wind:hold1 ~~~
execute at @s[scores={rightS=1,holdS=6..,dsneak=0,ab5=1..,energy=35..}] run particle flame:hold ~~~

execute as @s[scores={right=0,hold=11..,dsneak=0}] run function moves/wind/1
execute as @s[scores={right=0,hold=1..3,dsneak=0}] run function moves/wind/2
execute as @s[scores={right=0,hold=4..10,dsneak=0}] run function moves/wind/8
execute as @s[scores={rightS=0,holdS=1..6,dsneak=0}] run function moves/wind/3
execute as @s[scores={rightS=0,holdS=6..,dsneak=0}] run function moves/wind/4
execute as @s[scores={sp1=29,ult=0,sneak=0,m1=0..,sp1=15..,right=0,energy=15..,dsneak=0,ab5=1..,skill_mode=0,onground=0}] run function moves/wind/5
execute as @s[scores={sp1=29,ult=0,sneak=0,m1=0..,sp1=15..,right=0,aircombo=1..,energy=15..,dsneak=0,ab5=1..,skill_mode=0,onground=0},rx=90,rxm=80] run function moves/wind/5


execute as @s[scores={sp1=29,ult=0,sneak=1,m1=0..,right=0,ab6=1..,dsneak=0,skill_mode=0,onground=1}] run function moves/wind/6

execute as @s[scores={dsneak=1,ab7=1..,cd7=0}] run scoreboard players set @s ultimateArt 1
execute as @s[scores={dsneak=1,ab9=1..,cd9=0}] run scoreboard players set @s ultimateArt 1
execute as @s[scores={sp1=0,rightD=1,dsneak=1,ab9=1..}] run function moves/wind/9
execute as @s[scores={sp1=29,dsneak=1,ab7=1..,onground=1}] run function moves/wind/7

execute as @s[scores={dsneak=1,ab7=1..}] run particle wind:hold2 ~~~

scoreboard players set @s[scores={sp1=29,ult=0,sneak=0,m1=5..}] sp1 -25
