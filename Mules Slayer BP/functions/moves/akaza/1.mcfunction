scoreboard players set @s m1 0
scoreboard players set @s rightD 0
inputpermission set @s movement enabled
event entity @s axell:jatuh
playanimation @s animation.water.idle
tellraw @s[scores={bcd1=1..,bab1=1..}] {"rawtext":[{"translate":"text.axell:cooldown"}]}
tellraw @s[scores={energy=..49,bab1=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}
execute as @s[scores={bcd1=0,energy=50..,bab1=1..}] run playanimation @s animation.akaza.compass
execute as @s[scores={bcd1=0,energy=50..,bab1=1..}] run tp ~~~ ~ 0
execute as @s[scores={bcd1=0,energy=50..,bab1=1..}] run particle minecraft:knockback_roar_particle ~~~
execute as @s[scores={bcd1=0,energy=50..,bab1=1..}] run particle akaza:impact3 ~~~
inputpermission set @s[scores={bcd1=0,energy=50..,bab1=1..}] camera disabled
inputpermission set @s[scores={bcd1=0,energy=50..,bab1=1..}] movement disabled
effect @s[scores={bcd1=0,energy=50..,bab1=1..},type=!player] slowness 3 255 true
hud @s[scores={bcd1=0,energy=50..,bab1=1..}] hide all
fog @s[scores={bcd1=0,energy=50..,bab1=1..}]  push "minecraft:fog_warped_forest" "ult"

title @s[scores={bcd1=0,energy=50..,bab1=1..}] actionbar §b§lDestructive death

tag @s[scores={bcd1=0,energy=50..,bab1=1..}] add ultimate
scoreboard players set @s[scores={bcd1=0,energy=50..,bab1=1..}] cd 20
scoreboard players set @s[scores={bcd1=0,energy=50..,bab1=1..}] skillani 5
scoreboard players set @s[scores={bcd1=0,energy=50..,bab1=1..}] ult -200
scoreboard players set @s[scores={bcd1=0,energy=50..,bab1=1..}] ultimate -200
scoreboard players set @s[scores={bcd1=0,energy=50..,bab1=1..}] bcd1 1000
scoreboard players remove @s[scores={bcd1=1000,energy=50..,bab1=1..}] energy 50