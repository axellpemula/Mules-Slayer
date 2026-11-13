scoreboard players set @s hold 0
scoreboard players set @s right 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
playanimation @s[scores={cd2=1..,ab2=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..19}] animation.nichirin.idle
tellraw @s[scores={cd2=1..,ab2=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.insect:form2"},{"text":" "},{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..19,ab2=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={cd2=0,energy=20..,ab2=1..}] run scriptevent axell:fw15
execute as @s[scores={cd2=0,energy=20..,ab2=1..}] run particle akaza:impact3
execute as @s[scores={cd2=0,energy=20..,ab2=1..}] run particle smoke:insect2
execute as @s[scores={cd2=0,energy=20..,ab2=1..}] run particle minecraft:knockback_roar_particle
execute as @s[scores={cd2=0,energy=20..,ab2=1..}] run playsound mob.bee.death @a ~~~ 1000 1.25 10000
execute as @s[scores={cd2=0,energy=20..,ab2=1..}] run playsound item.trident.riptide_2 @a ~~~ 1000 1.85 100
execute as @s[scores={cd2=0,energy=20..,ab2=1..}] run playsound mob.bee.death @a ~~~ 1000 0.75 10000
playanimation @s[scores={cd2=0,energy=20..,ab2=1..}] animation.insect.form2

scoreboard players set @s[scores={cd2=0,energy=20..,ab2=1..}] radpos 20
execute as @s[scores={cd2=0,energy=20..,ab2=1..}] run scriptevent insect:form2
execute as @s[scores={cd2=0,energy=20..,ab2=1..,blades=2}] run scriptevent insect:poison

scoreboard players set @s[scores={cd2=0,energy=20..,ab2=1..}] cd 20
scoreboard players set @s[scores={cd2=0,energy=20..,ab2=1..}] skillani 5
scoreboard players set @s[scores={cd2=0,energy=20..,ab2=1..}] sp1 -10
scoreboard players set @s[scores={cd2=0,energy=20..,ab2=1..}] cd2 -10
scoreboard players remove @s[scores={cd2=-10,energy=20..,ab2=1..}] energy 20
