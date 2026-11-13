#skibidi
tag @s[scores={sp1=-45..-25}] add autoparry
tag @s[scores={sp1=-24..-1}] remove autoparry
tag @s[scores={sp1=1..}] remove autoparry
tag @s[scores={sneak=1}] remove autoparry

camerashake add @s[tag=autoparry] 0.1 0.01

#tagging
tag @s[scores={bcd9=89..}] remove kbATT

scoreboard players set @a[scores={bm1lvl=0..2,bcd1=0..}] aspd 0
scoreboard players set @a[scores={bm1lvl=3..5,bcd1=0..}] aspd 1
scoreboard players set @a[scores={bm1lvl=6..7,bcd1=0..}] aspd 2
scoreboard players set @a[scores={bm1lvl=8..10,bcd1=0..}] aspd 3
scoreboard players set @a[scores={bcd1=..-1}] aspd 4

execute as @s[tag=autoparry] at @s positioned ^^^3.1 run execute as @e[r=3,scores={stun=1..}] at @s run tp ~~~




scoreboard players add @s[scores={sp1=29,ult=0,sneak=0,m1=0..,right=0,onground=1}] m1 1
scoreboard players set @s[scores={sp1=29,ult=0,sneak=0,m1=0..,right=0,onground=1}] hold 0
scoreboard players set @s[scores={sp1=29,ult=0,sneak=0,m1=0..,right=0,onground=1}] right 0

#forms---------------------------------

#form1
execute as @s[scores={bcd3=..-1}] run function moves/akaza/disorder
execute as @s[scores={bcd3=90..}] run function moves/akaza/disorder

execute as @s[scores={bcd6=..-1}] run function moves/akaza/exf
execute as @s[scores={bcd6=90..}] run function moves/akaza/exf

execute as @s[scores={bcd7=..-1}] run function moves/akaza/hachilayer
execute as @s[scores={bcd7=300..}] run function moves/akaza/hachilayer

execute as @s[scores={bcd10=..-1}] run function moves/akaza/bsca
execute as @s[scores={bcd10=90..}] run function moves/akaza/bsca

execute as @s[scores={bcd1=930..}] at @s run function moves/akaza/compass

execute as @s[scores={bcd9=..-1}] run function moves/akaza/fptw

#form1
execute as @s[scores={bcd5=8..}] run function moves/akaza/crown
#form3
execute as @s[scores={bcd2=10..}] run function moves/akaza/air
#form4
execute as @s[scores={bcd4=20..}] run function moves/akaza/ana
execute as @s[scores={bcd8=40..}] run function moves/akaza/ttlfw

execute as @s[scores={bcd8=38}] at @s run scriptevent axell:fwkaza8

#---------------------------------------



#m1 damage
execute as @s[scores={sp1=27,m1=1,ult=0,skillani=0}] run scriptevent akaza:m1a
execute as @s[scores={sp1=27,m1=2,ult=0,skillani=0}] run scriptevent akaza:m1b
execute as @s[scores={sp1=-94,skillani=0}] run scriptevent akaza:m1c
execute as @s[scores={sp1=27,m1=4,ult=0,skillani=0}] run scriptevent akaza:m1d
execute as @s[scores={sp1=-19,m1=6,skillani=0}] run scriptevent akaza:m1f

#comboanimatoon
playanimation @s[scores={sp1=29,m1=1}] animation.akaza.m1a
playanimation @s[scores={sp1=29,m1=2}] animation.akaza.m1b
playanimation @s[scores={sp1=29,m1=3}] animation.akaza.m1c
playanimation @s[scores={sp1=29,m1=4}] animation.akaza.m1d
playanimation @s[scores={sp1=29,m1=5}] animation.akaza.m1e
playanimation @s[scores={sp1=29,m1=6}] animation.akaza.m1f
scoreboard players set @s[scores={sp1=-100..-95,m1=3}] ult 5
scoreboard players set @s[scores={sp1=-45..-15}] ult 2
execute as @s[scores={sp1=-92}] at @s positioned ^^^1 run particle minecraft:knockback_roar_particle ~~~
execute as @s[scores={sp1=-95}] at @s run particle akaza:impact3 ~~~
execute as @s[scores={sp1=27,m1=6}] at @s run particle akaza:impact3 ^^1^1
camerashake add @s[scores={sp1=29,right=0}] 0.1 0.1
camerashake add @s[scores={sp1=29,aircombo=1..}] 0.4 0.1


execute as @s[scores={sp1=29,m1=1..8}] run playsound mob.witch.throw @a ^^^1 1 1 1000
execute as @s[scores={sp1=-45..-25}] run playsound mob.witch.throw @a ^^^1 1 1 1000
execute as @s[scores={sp1=29,m1=1..2}] run playsound random.explode @a ^^^1 1 3 1000
execute as @s[scores={sp1=-96}] run playsound random.explode @a ^^^1 5 1 1000
execute as @s[scores={sp1=29,m1=4}] run playsound random.explode @a ^^^1 1 3 1000
execute as @s[scores={sp1=27..29,m1=6}] run playsound random.explode @a ^^^1 0.8 3 1000
execute as @s[scores={sp1=-45..-25}] run playsound random.explode @a ^^^1 1 4 1000

#movement
inputpermission set @s[scores={sp1=..-2,right=0}] jump disabled
inputpermission set @s[scores={sp1=15..29,right=0}] jump disabled
inputpermission set @s[scores={sp1=14}] jump enabled
inputpermission set @s[scores={sp1=-1}] jump enabled




inputpermission set @s[scores={sp1=..-2,right=0,m1=5}] movement disabled
inputpermission set @s[scores={sp1=15..29,right=0,m1=5}] movement disabled
inputpermission set @s[scores={sp1=..-2,right=0,m1=0}] movement disabled
inputpermission set @s[scores={sp1=15..29,right=0,m1=0}] movement disabled
inputpermission set @s[scores={sp1=14}] movement enabled
inputpermission set @s[scores={sp1=-1}] movement enabled



execute as @s[scores={sp1=29,m1=1..}] run scriptevent axell:fw2
execute as @s[scores={sp1=29,m1=3},type=player] run scriptevent axell:up1
execute as @s[scores={sp1=-95,m1=3}] run scriptevent axell:dw3

scoreboard players set @s[scores={sneak=0,sp1=-25}] sp1 25
scoreboard players set @s[scores={sp1=29,ult=0,sneak=0,m1=5}] sp1 -45
scoreboard players set @s[scores={sp1=29,ult=0,sneak=0,m1=3}] sp1 -100
scoreboard players set @s[scores={ult=0,sneak=0,sp1=-90..-65}] sp1 25

#skills

playanimation @s[scores={right=1,hold=1,dsneak=0,bab7=1..,bcd3=0..,bcd6=0..}] animation.akaza.hold
execute at @s[scores={right=1..,hold=6..,dsneak=0,bab7=1..}] run inputpermission set @s movement disabled
execute at @s[scores={right=1..,hold=6..,cd1=0,dsneak=0,bab7=1..,energy=20..}] run particle flame:hold ~~~
execute at @s[scores={right=1..,hold=6..,dsneak=0,bab7=1..,energy=20..}] run particle water:hold2 ~~~

playanimation @s[scores={rightS=1,holdS=1,dsneak=0,bab9=1..}] animation.akaza.hold2
execute at @s[scores={rightS=1,holdS=1..,dsneak=0,bab9=1..}] run inputpermission set @s movement disabled
execute at @s[scores={rightS=1,holdS=10..,cd5=0,dsneak=0,bab9=1..,energy=40..}] run particle flame:hold ~~~
execute at @s[scores={rightS=1,holdS=10..,dsneak=0,bab9=1..,energy=40..}] run particle water:hold2 ~~~

execute as @s[scores={rightS=0,holdS=1..5,dsneak=0}] run function moves/akaza/2
execute as @s[scores={sp1=29,ult=0,sneak=1,m1=0..,right=0,bab5=1..,dsneak=0}] run function moves/akaza/5

execute as @s[scores={sp1=0,rightD=1,dsneak=1,bab1=1..}] run function moves/akaza/1
execute as @s[scores={dsneak=1,bab1=1..,bcd1=0}] run scoreboard players set @s ultimateArt 1
execute at @s[scores={dsneak=1,bab1=1..}] run particle water:hold2 ~~~
execute at @s[scores={dsneak=1,bab1=1..}] run particle flame:hold ~~~

execute as @s[scores={sp1=29,ult=0,sneak=0,m1=0..,sp1=15..,right=0,energy=15..,dsneak=0,bab8=1..,onground=0}] run function moves/akaza/8

#ab3 // ab 6
execute as @s[scores={right=0,hold=1..5,dsneak=0,bab3=1..,bab6=0,onground=1}] run function moves/akaza/3
execute as @s[scores={right=0,hold=1..5,dsneak=0,bab3=0,bab6=1..,onground=1}] run function moves/akaza/6
execute as @s[scores={right=0,hold=1..5,dsneak=0,bab3=1..,bab6=1..,bcd3=0,bcd6=0,m1=0,onground=1}] run function moves/akaza/3
execute as @s[scores={right=0,hold=1..5,dsneak=0,bab3=1..,bab6=1..,bcd3=0,bcd6=0,m1=5..,onground=1}] run function moves/akaza/3
execute as @s[scores={right=0,hold=1..5,dsneak=0,bab3=1..,bab6=1..,bcd3=0,bcd6=1..,onground=1}] run function moves/akaza/3
execute as @s[scores={right=0,hold=1..5,dsneak=0,bab3=1..,bab6=1..,bcd6=0,m1=1..4,onground=1}] run function moves/akaza/6
execute as @s[scores={right=0,hold=1..5,dsneak=0,bab3=1..,bab6=1..,bcd6=0,bcd3=1..,onground=1}] run function moves/akaza/6
execute as @s[scores={right=0,hold=1..5,dsneak=0,bab3=1..,bab6=1..,bcd3=1..,bcd6=1..,onground=1}] run function moves/akaza/3
execute as @s[scores={right=0,hold=6..,dsneak=0,onground=1}] run function moves/akaza/7
execute as @s[scores={rightS=0,holdS=6..,dsneak=0}] run function moves/akaza/9
execute as @s[scores={right=0,hold=1..,dsneak=0,sneak=0,onground=0}] run function moves/akaza/10


scoreboard players set @s[type=player,scores={sp1=29,ult=0,sneak=0,m1=6..}] sp1 -20