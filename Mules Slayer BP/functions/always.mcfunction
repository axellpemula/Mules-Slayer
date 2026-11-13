gamerule sendcommandfeedback false
gamerule commandblockoutput false
gamerule showtags false

# Onground detection
execute as @a at @s run function onground
execute as @e[family=slayer] at @s run function onground
execute as @e[family=kizuki] at @s run function onground

execute as @a[scores={ult=1..,hold=1..,right=0}] run function reset

execute as @e[type=axell:dmg] at @s run tp ~~0.05~
scoreboard players add @a stun 0

execute as @a[tag=haganezukachat] at @s run tp ~~~ facing @e[type=axell:haganezuka,c=1]
execute as @a[tag=haganezukachat] at @s run inputpermission set @s camera disabled

scoreboard players reset @e[scores={stun=0},type=!player] stun
scoreboard players reset @e[scores={stun2=0}] stun2
scoreboard players add @a right 0
playanimation @a[tag=customing] animation.nichirin.customing

execute as @a[scores={jump=1},tag=customing] run scriptevent axell:beatdowncancel
execute as @a[scores={jump=1},tag=customing] at @s  run playsound random.anvil_use
execute as @a[scores={jump=1},tag=customing] at @s run particle akaza:impact3 ~~1~
execute as @a[scores={jump=1},tag=customing] at @s  run particle minecraft:knockback_roar_particle ~~1~
inputpermission set @a[scores={jump=1},tag=customing]  lateral_movement enabled
inputpermission set @a[scores={jump=1},tag=customing]  camera enabled
tag @a[scores={jump=1},tag=customing] remove haganezukachat
tag @a[scores={jump=1},tag=customing] remove customing

execute as @a[scores={sneak=1},tag=customing] run scriptevent axell:beatdowncancel
execute as @a[scores={sneak=1},tag=customing] at @s  run playsound random.anvil_use
execute as @a[scores={sneak=1},tag=customing] at @s run particle akaza:impact3 ~~1~
execute as @a[scores={sneak=1},tag=customing] at @s  run particle minecraft:knockback_roar_particle ~~1~
inputpermission set @a[scores={sneak=1},tag=customing]  lateral_movement enabled
inputpermission set @a[scores={sneak=1},tag=customing]  camera enabled
tag @a[scores={sneak=1},tag=customing] remove haganezukachat
tag @a[scores={sneak=1},tag=customing] remove customing

#m1

scoreboard players remove @a[scores={sp1=1..}] sp1 1
scoreboard players add @a[scores={sp1=..-1}] sp1 1

scoreboard players set @a[scores={sp1=0}] m1 0
scoreboard players add @a ballCD 0


scoreboard players remove @e[scores={stun=1..}] stun 1
scoreboard players remove @e[scores={stun2=1..}] stun2 1
scoreboard players add @e[scores={stun2=..-1}] stun2 1

scoreboard players set @a[tag=customing] ultimate 5
scoreboard players set @a[tag=customing] stun 5

execute as @e[scores={stun2=1..}] at @s run tp ~~~
execute as @e[scores={stun2=..-2}] at @s run tp ~~~
execute as @e[scores={stun2=-1}] at @s run scriptevent axell:kbm1

#ts

scoreboard players remove @e[scores={ts=1..}] ts 1
scoreboard players add @e[scores={tsed=..1}] tsed 1


#cooldown

scoreboard players remove @e[scores={cooldown=1..}] cooldown 1
scoreboard players remove @a[scores={cooldown2=1..}] cooldown2 1

#jump


scoreboard players remove @a[scores={tser=1..}] tser 1


#ult

scoreboard players remove @a[scores={ult=1..,right=0}] ult 1
scoreboard players add @a[scores={ult=..-1}] ult 1
scoreboard players remove @e[family=boss,scores={ult=1..}] ult 1
scoreboard players add @e[family=boss,scores={ult=..-1}] ult 1


effect @a[tag=beatdown] resistance 1 255 true
scoreboard players set @a[scores={sp1=..6,airborne=0}] spm1 0

#sneak

scoreboard players set @a[rx=90,rxm=80] ult 0
scoreboard players set @a[scores={ult=1..}] sneakTemp 0
scoreboard players set @a[rx=90,rxm=80,scores={breathings=!8}] sneakTemp 0

effect @a[scores={ts=1}] blindness 1 1 true
scoreboard players set @e[tag=tsed] stun 5
effect @e[scores={ts=1..}] night_vision 1 2 true
effect @a[tag=tsed,scores={tser=1..}] slow_falling 1 255 true

execute as @e[scores={ts=2..}] at @s run scoreboard players set @s tsed -1
execute as @e[scores={tsed=1..}] at @s run tag @e remove tsed
execute as @e[scores={tsed=..-1}] at @s run tag @e[scores={ts=!1..},r=50] add tsed
tag @e[scores={ts=1..}] remove tsed
effect @e[tag=tsed,type=!player] blindness 1 0 true
camera @a[tag=tsed,scores={tser=0}] fade time 0.1 0 0.1 color 0 0 0
effect @a[tag=tsed,scores={tser=0}] blindness 1 0 true 


inputpermission set @a[scores={stun=2..}] lateral_movement disabled
inputpermission set @a[scores={stun=1}] lateral_movement enabled
inputpermission set @a[scores={stun=2..}] jump disabled
inputpermission set @a[scores={stun=1}] jump enabled

effect @e[scores={stun=2..},type=!player] slowness 1 255 true
effect @e[scores={stun=2..}] weakness 1 255 true
effect @e[scores={stun=2..}] mining_fatigue 1 20 true
effect @e[scores={stun=1}] slowness 0 255 true
effect @e[scores={stun=1}] weakness 0 255 true
effect @e[scores={stun=1}] mining_fatigue 0 10 true
tag @e[scores={stun=1..}] add stun
tag @e[scores={stun=!1..}] remove stun

#sneak
scoreboard players set @a[scores={sneak=1,sneakTemp=1..14,skill_mode=0}] dsneak 1
scoreboard players set @a[scores={dsneak=1}] sneakTemp 0
execute as @a[scores={sneak=1,dsneak=0},tag=!parry] at @s run scoreboard players operation @s sneakTemp = @s dsneakSet
scoreboard players add @a sneakTemp2 0
scoreboard players add @a sneakTemp 0
scoreboard players set @a dsneakSet 15
scoreboard players remove @a[scores={sneak=0,sneakTemp=1..}] sneakTemp 1
scoreboard players remove @a[scores={sneak=0,sneakTemp2=1..}] sneakTemp2 1
scoreboard players remove @a[scores={sneak=1,standTemp=1..}] standTemp 1


#beatdowncancel
execute as @a[scores={sword_state=0}] at @s run scriptevent axell:beatdowncancel
execute as @a[scores={sword_state=!2,ultimate=1..}] at @s run scriptevent axell:beatdowncancel
execute as @a[scores={sword_state=!2}] at @s run event entity @s axell:jatuh
execute as @a[scores={sword_state=!2}] run tag @s remove customing

#functions

execute as @a[scores={aircombo=2..,onground=1}] run scoreboard players set @s aircombo 2
event entity @a[scores={aircombo=2..}] axell:terbang
event entity @a[scores={aircombo=1}] axell:jatuh
effect @a[scores={aircombo=2}] slow_falling 1 0 true
effect @a[scores={aircombo=1}] slow_falling 0 25 true
inputpermission set @a[scores={aircombo=2..}] movement disabled
inputpermission set @a[scores={aircombo=1}] movement enabled

scoreboard players remove @a[scores={ultimate=1..}] ultimate 1
scoreboard players set @a[scores={m1lvl=..0}] m1lvl 1
scoreboard players set @a[scores={bm1lvl=..0}] bm1lvl 1

scoreboard players remove @a[scores={cd=1..}] cd 1
scoreboard players remove @a[scores={specialCD=1..}] specialCD 1

scoreboard players add @a[scores={cd=..-1}] cd 1
scoreboard players add @a[scores={specialCD=..-1}] specialCD 1


scoreboard players remove @a[scores={skillani=1..}] skillani 1
scoreboard players remove @a[scores={aircombo=1..}] aircombo 1

function proj/proj
function base/parrybase
function moves/base
execute as @a[tag=!join] run function stats/join
event entity @a axell:parry
event entity @a axell:blocking


execute as @e[tag=mark] run execute as @s run scriptevent slayer:mark
execute as @e[tag=kizuki_awake] run execute as @s run scriptevent kizuki:awake

effect @a[scores={family=8}] speed 1 1 true

#sword
execute as @a[hasitem={item=axell:nichirin,location=slot.weapon.mainhand}] run function sword/aspd

event entity @a[scores={dual=0}] axell:katana
event entity @a[scores={dual=1}] axell:dual
event entity @a[scores={dual=2}] axell:dualC

scoreboard players set @a[tag=autoparry] parry 5
scoreboard players set @a[scores={energyMax=0}] energyMax 100

#dash
scoreboard players add @a radpos 0
scoreboard players remove @a[scores={right=1..,skill_mode=1}] right 1
scoreboard players remove @a[scores={rightS=1..,skill_mode=1}] rightS 1
scoreboard players add @a[scores={right=1..,skill_mode=1}] hold 1
scoreboard players add @a[scores={rightS=1..,skill_mode=1}] holdS 1

scoreboard players remove @a[scores={dashcd=1..}] dashcd 1
scoreboard players remove @a[scores={dashint=1..}] dashint 1

effect @a[scores={energy=..0}] slowness 1 4 true

#errors

scoreboard players remove @a[scores={ultimateArt=1..,dsneak=0}] ultimateArt 1

#breathings
execute as @a[scores={sword_state=2}] run effect @s weakness 1 255 true
execute as @a[scores={sword_state=2}] at @s run effect @s[scores={sp1=29,right=0}] slowness 1 1 true
execute as @a[scores={sword_state=2,breathings=0}] at @s run function moves/base/base
execute as @a[scores={sword_state=2,breathings=1}] at @s run function moves/water/base
execute as @a[scores={sword_state=2,breathings=2}] at @s run function moves/flame/base
execute as @a[scores={sword_state=2,breathings=3}] at @s run function moves/wind/base
execute as @a[scores={sword_state=2,breathings=4}] at @s run function moves/sound/base
execute as @a[scores={sword_state=2,breathings=5}] at @s run function moves/thunder/base
execute as @a[scores={sword_state=2,breathings=6}] at @s run function moves/mist/base
execute as @a[scores={sword_state=2,breathings=7}] at @s run function moves/insect/base

#bda
execute as @a[hasitem={item=axell:bda,location=slot.weapon.mainhand},scores={bda=1}] at @s run function moves/akaza/base

#boss
execute as @e[type=axell:akaza] run function boss/akaza/base
execute as @e[type=axell:rengoku] run function boss/rengoku/base
execute as @e[type=axell:giyuu] run function boss/giyuu/base
execute as @e[type=axell:sanemi] run function boss/sanemi/base
execute as @e[type=axell:tokito] run function boss/tokito/base
execute as @e[type=axell:tengen] run function boss/tengen/base
execute as @e[type=axell:kocho] run function boss/kocho/base
execute as @e[type=axell:zenitsu] run function boss/zenitsu/base

scoreboard objectives add sword_state dummy