#skibidi




scoreboard players add @s[scores={sp1=29,ult=0,m1=0..,sp1=15..,right=0,hold=0}] m1 1
scoreboard players set @s[scores={right=1..,m1=1..5,m1=!10,sp1=..20}] m1 10
scoreboard players set @s[scores={right=1..,m1=0,m1=!10,sp1=0}] sp1 30
execute as @s[scores={sp1=29..,aircombo=1..}] at @s positioned ^^^2.5 run scoreboard players add @e[r=2.49] stun 5
execute as @s[scores={sp1=25..,aircombo=1..}] at @s positioned ^^^2.5 run execute as @e[r=2.49,rm=0.1] at @s run tp ~~~

#m1 damage
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=1}] run scriptevent sound:m1a1
execute as @s[scores={sp1=28,ult=0,skillani=0,m1=1}] run scriptevent sound:m1a2
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=2}] run scriptevent sound:m1b1
execute as @s[scores={sp1=28,ult=0,skillani=0,m1=2}] run scriptevent sound:m1b2
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=3}] run scriptevent sound:m1c1
execute as @s[scores={sp1=28,ult=0,skillani=0,m1=3}] run scriptevent sound:m1c2
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=5}] run scriptevent sound:m1e1
execute as @s[scores={sp1=-15,ult=0,skillani=0,m1=5}] run scriptevent sound:m1e1
execute as @s[scores={sp1=-14,ult=0,skillani=0,m1=5}] run scriptevent sound:m1e2
execute as @s[scores={sp1=29,ult=0,skillani=0,m1=4}] run scriptevent sound:m1d1
execute as @s[scores={sp1=-1010,ult=0,skillani=0,m1=4}] run scriptevent sound:m1d2
execute as @s[scores={sp1=-1005,ult=0,skillani=0,m1=4}] run scriptevent sound:m1d3


#sound
execute as @s[scores={sp1=29,m1=1..2}] run playsound item.trident.throw @a
execute as @s[scores={sp1=29,m1=1..2}] run playsound item.trident.riptide_2 @a ~~~ 1 3 1
execute as @s[scores={sp1=27..29,m1=1..5}] run playsound firework.blast @a ~~~ 1 1 1
execute as @s[scores={sp1=29,m1=1..3}] run playsound axell.raiden.m1 @a ^^^1 1.5 2.5 0.6
execute as @s[scores={sp1=29,m1=5}] run playsound axell.raiden.m1 @a ^^^1 1.5 2.25 0.6
execute as @s[scores={sp1=-17,m1=5}] run playsound axell.raiden.m1 @a ^^^1 1.5 1.5 0.6
execute as @s[scores={sp1=-1005,m1=4}] run playsound axell.raiden.m1 @a ^^^1 1.5 1.5 0.6
execute as @s[scores={sp1=..-1005,m1=4}] run playsound item.trident.riptide_3 @a ~~~ 1 5 1
execute as @s[scores={sp1=..-1005,m1=4}] run playsound firework.blast @a ~~~ 1 2 1
execute as @s[scores={sp1=..-1010,m1=4}] run playsound firework.twinkle @a ~~~ 1000 0.7 1

#m1rame
execute as @s[scores={sp1=29,m1=1..5}] run particle smoke:flame
execute as @s[scores={sp1=29,m1=1..5}] run particle smoke:wind
execute as @s[scores={sp1=-15,m1=5}] run particle smoke:flame
execute as @s[scores={sp1=-15,m1=5}] run particle smoke:wind

#comboanimatoon
playanimation @s[scores={sp1=29,m1=1}] animation.sound.m1a
playanimation @s[scores={sp1=29,m1=2}] animation.sound.m1b
playanimation @s[scores={sp1=29,m1=3}] animation.sound.m1c
playanimation @s[scores={sp1=29,m1=4}] animation.sound.m1d
playanimation @s[scores={sp1=29,m1=5}] animation.sound.m1e
camerashake add @s[scores={sp1=29,right=0}] 0.1 0.1
camerashake add @s[scores={sp1=-15,m1=5}] 1 0.2
camerashake add @s[scores={sp1=..-1005,m1=4}] 0.1 0.1

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


execute as @s[scores={sp1=29,m1=1..5,aircombo=0}] run scriptevent axell:fw1
execute as @s[scores={sp1=-1005,m1=4,aircombo=0}] run scriptevent axell:fw2
execute as @s[scores={sp1=-15,m1=5,aircombo=0}] run scriptevent axell:fw2

execute as @s[scores={sp1=29,m1=1..5,aircombo=1..}] at @s positioned ^^1^2.25 if entity @e[r=2.24] run scriptevent axell:fw1


scoreboard players set @s[scores={sp1=..-1002,right=0,rightS=0}] parry 3
scoreboard players set @s[scores={sp1=-15,m1=5,right=0,rightS=0}] parry 3

#forms -------------------------------------------------------

execute as @s[scores={cd2=..-7}] at @s run particle smoke:sound2 ~~~
execute as @s[scores={cd2=..-5}] at @s run particle akaza:impact3 ~~~
execute as @s[scores={cd2=..-7}] at @s run playsound random.explode @a ~~~ 100 0.5 10
execute as @s[scores={cd2=-5}] at @s run particle akaza:impact3 ~~1~
execute as @s[scores={cd2=-5}] at @s run scoreboard players set @s radpos 0
execute as @s[scores={cd2=..-6}] at @s run particle smoke:sound2 ^^^-2
execute as @s[scores={cd2=-1}] at @s run scoreboard players set @s cd2 40

execute as @s[scores={cd3=70..}] at @s run particle smoke:sound2 ~~~

execute as @s[scores={cd1=..-1}] run function moves/sound/form1
execute as @s[scores={cd5=..-1}] run function moves/sound/form5
execute as @s[scores={cd4=..-1}] run function moves/sound/form4
execute as @s[scores={cd3=..-1}] run function moves/sound/form3

# --------------------------------------------------------------
#abilities
playanimation @s[scores={right=1,hold=1,dsneak=0,ab4=1..}] animation.sound.hold2
execute at @s[scores={right=1..,hold=1..,dsneak=0,ab4=1..}] run inputpermission set @s movement disabled
execute at @s[scores={right=1..,hold=6..,dsneak=0,ab4=1..,energy=20..}] run particle flame:hold ~~~

playanimation @s[scores={rightS=1,holdS=1,dsneak=0,ab4=1..}] animation.sound.hold2
execute at @s[scores={rightS=1,holdS=1..,dsneak=0,ab4=1..}] run inputpermission set @s movement disabled
execute at @s[scores={rightS=1,holdS=6..,dsneak=0,ab4=1..,energy=20..}] run particle flame:hold ~~~


execute as @s[scores={right=0,hold=6..,dsneak=0}] run function moves/sound/4
execute as @s[scores={right=0,hold=1..5,dsneak=0}] run function moves/sound/5
execute as @s[scores={rightS=0,holdS=6..,dsneak=0}] run function moves/sound/4
execute as @s[scores={rightS=0,holdS=1..5,dsneak=0}] run function moves/sound/1
execute as @s[scores={sp1=29,ult=0,sneak=1,m1=0..,right=0,ab1=1..,dsneak=0,skill_mode=0,skill_mode=0}] run function moves/sound/1

scoreboard players set @s[scores={sp1=29,ult=0,sneak=0,m1=5..}] sp1 -25
scoreboard players set @s[scores={sp1=29,ult=0,sneak=0,m1=4}] sp1 -1015
scoreboard players set @s[scores={sp1=-1000..-30,ult=0}] sp1 23