inputpermission set @s[scores={skill_cycle=1..}] movement disabled
#water

execute as @s[scores={breathings=1,skill_cycle=2,cd2=0}] run scriptevent axell:up5
execute as @s[scores={breathings=1,skill_cycle=5,cd5=0}] run scriptevent axell:up3
execute as @s[scores={breathings=1,skill_cycle=8,cd8=0}] run scriptevent axell:up5
execute as @s[scores={breathings=1,skill_cycle=1}] run function moves/water/1
scoreboard players set @s[scores={breathings=1,skill_cycle=2}] right 3
scoreboard players set @s[scores={breathings=1,skill_cycle=4}] right 5
scoreboard players set @s[scores={breathings=1,skill_cycle=3}] rightS 10
scoreboard players set @s[scores={breathings=1,skill_cycle=5}] right 7
scoreboard players set @s[scores={breathings=1,skill_cycle=6}] right 10
execute as @s[scores={breathings=1,skill_cycle=7}] run function moves/water/7
execute as @s[scores={breathings=1,skill_cycle=8}] run function moves/water/8
execute as @s[scores={breathings=1,skill_cycle=9}] run function moves/water/9a
execute as @s[scores={breathings=1,skill_cycle=10}] run function moves/water/10
execute as @s[scores={breathings=1,skill_cycle=11}] run function moves/water/11
execute as @s[scores={breathings=1,skill_cycle=3}] run playanimation @s animation.flame.hold1
execute as @s[scores={breathings=1,skill_cycle=4}] run playanimation @s animation.flame.hold1
execute as @s[scores={breathings=1,skill_cycle=5}] run playanimation @s animation.water.hold1
execute as @s[scores={breathings=1,skill_cycle=6}] run playanimation @s animation.water.hold1

#flame
execute as @s[scores={breathings=2,skill_cycle=1}] run playanimation @s animation.flame.hold1
execute as @s[scores={breathings=2,skill_cycle=5}] run playanimation @s animation.flame.hold2
scoreboard players set @s[scores={breathings=2,skill_cycle=1}] right 10
scoreboard players set @s[scores={breathings=2,skill_cycle=5}] rightS 10
execute as @s[scores={breathings=2,skill_cycle=2}] run function moves/flame/2
execute as @s[scores={breathings=2,skill_cycle=3}] run function moves/flame/3
execute as @s[scores={breathings=2,skill_cycle=4}] run function moves/flame/4
execute as @s[scores={breathings=2,skill_cycle=9}] run function moves/flame/9

#Wind
execute as @s[scores={breathings=3,skill_cycle=1}] run playanimation @s animation.wind.hold1
execute as @s[scores={breathings=3,skill_cycle=8}] run playanimation @s animation.wind.hold1
execute as @s[scores={breathings=3,skill_cycle=4}] run playanimation @s animation.wind.hold2
execute as @s[scores={breathings=3,skill_cycle=5,cd5=0}] run scriptevent axell:up5
scoreboard players set @s[scores={breathings=3,skill_cycle=1}] right 12
scoreboard players set @s[scores={breathings=3,skill_cycle=8}] right 10
scoreboard players set @s[scores={breathings=3,skill_cycle=4}] rightS 10
execute as @s[scores={breathings=3,skill_cycle=2}] run function moves/wind/2
execute as @s[scores={breathings=3,skill_cycle=3}] run function moves/wind/3
execute as @s[scores={breathings=3,skill_cycle=5}] run function moves/wind/5
execute as @s[scores={breathings=3,skill_cycle=6}] run function moves/wind/6
execute as @s[scores={breathings=3,skill_cycle=7}] run function moves/wind/7
execute as @s[scores={breathings=3,skill_cycle=9}] run function moves/wind/9

#sound
execute as @s[scores={breathings=4,skill_cycle=1}] run function moves/sound/1
execute as @s[scores={breathings=4,skill_cycle=5}] run function moves/sound/5
execute as @s[scores={breathings=4,skill_cycle=4}] run scoreboard players set @s right 10
execute as @s[scores={breathings=4,skill_cycle=4}] run playanimation @s animation.sound.hold2

#thunder
execute as @s[scores={breathings=5,skill_cycle=1}] run playanimation @s animation.thunder.hold1
execute as @s[scores={breathings=5,skill_cycle=3}] run playanimation @s animation.thunder.hold2
execute as @s[scores={breathings=5,skill_cycle=6}] run playanimation @s animation.thunder.hold2
execute as @s[scores={breathings=5,skill_cycle=1}] run scoreboard players set @s right 10
execute as @s[scores={breathings=5,skill_cycle=3}] run scoreboard players set @s rightS 10
execute as @s[scores={breathings=5,skill_cycle=6}] run scoreboard players set @s rightS 15
execute as @s[scores={breathings=5,skill_cycle=2}] run function moves/thunder/2
execute as @s[scores={breathings=5,skill_cycle=4}] run function moves/thunder/4
execute as @s[scores={breathings=5,skill_cycle=5}] run function moves/thunder/5

#mist
execute as @s[scores={breathings=6,skill_cycle=5}] run playanimation @s animation.mist.hold1
execute as @s[scores={breathings=6,skill_cycle=4}] run playanimation @s animation.mist.hold2
execute as @s[scores={breathings=6,skill_cycle=4..5}] run particle smoke:mist2
execute as @s[scores={breathings=6,skill_cycle=4..5}] run particle smoke:mist
execute as @s[scores={breathings=6,skill_cycle=1}] run function moves/mist/1
execute as @s[scores={breathings=6,skill_cycle=2}] run function moves/mist/2
execute as @s[scores={breathings=6,skill_cycle=3}] run function moves/mist/3
execute as @s[scores={breathings=6,skill_cycle=4}] run scoreboard players set @s rightS 10
execute as @s[scores={breathings=6,skill_cycle=5}] run scoreboard players set @s right 10

#insect
execute as @s[scores={breathings=7,skill_cycle=2}] run particle smoke:insect2
execute as @s[scores={breathings=7,skill_cycle=4}] run particle smoke:insect2
execute as @s[scores={breathings=7,skill_cycle=2}] run playanimation @s animation.insect.hold1
execute as @s[scores={breathings=7,skill_cycle=4}] run playanimation @s animation.insect.hold1
execute as @s[scores={breathings=7,skill_cycle=2}] run scoreboard players set @s right 10
execute as @s[scores={breathings=7,skill_cycle=4}] run scoreboard players set @s rightS 10
execute as @s[scores={breathings=7,skill_cycle=1}] run function moves/insect/1
execute as @s[scores={breathings=7,skill_cycle=3}] run function moves/insect/3


#sun
execute as @s[scores={breathings=8,skill_cycle=2}] run scriptevent axell:up5
execute as @s[scores={breathings=8,skill_cycle=4}] run scriptevent axell:up1
execute as @s[scores={breathings=8,skill_cycle=1}] run playanimation @s animation.sun.hold1
execute as @s[scores={breathings=8,skill_cycle=10}] run playanimation @s animation.sun.hold1
execute as @s[scores={breathings=8,skill_cycle=12}] run playanimation @s animation.sun.hold1
execute as @s[scores={breathings=8,skill_cycle=7}] run playanimation @s animation.sun.hold1
execute as @s[scores={breathings=8,skill_cycle=1}] run scoreboard players set @s right 5
execute as @s[scores={breathings=8,skill_cycle=2}] run function moves/sun/2
execute as @s[scores={breathings=8,skill_cycle=3}] run scoreboard players set @s right 3
execute as @s[scores={breathings=8,skill_cycle=3}] run scoreboard players set @s right 3
execute as @s[scores={breathings=8,skill_cycle=4}] run scoreboard players set @s right 3
execute as @s[scores={breathings=8,skill_cycle=5}] run function moves/sun/5
execute as @s[scores={breathings=8,skill_cycle=6}] run scoreboard players set @s rightS 3
execute as @s[scores={breathings=8,skill_cycle=7}] run scoreboard players set @s rightS 12
execute as @s[scores={breathings=8,skill_cycle=8}] run function moves/sun/8
execute as @s[scores={breathings=8,skill_cycle=9}] run function moves/sun/9
execute as @s[scores={breathings=8,skill_cycle=10}] run scoreboard players set @s right 12
execute as @s[scores={breathings=8,skill_cycle=11}] run function moves/sun/11
execute as @s[scores={breathings=8,skill_cycle=12}] run scoreboard players set @s rightS 5