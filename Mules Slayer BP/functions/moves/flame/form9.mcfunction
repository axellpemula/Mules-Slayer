execute as @s[scores={cd9=1..,ultimate=208}] at @s positioned ^^^2.5 run damage @e[family=!inanimate,type=!axell:dmg,type=!xp_orb,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real,r=2.49,c=1] 0 override
execute as @s[scores={cd9=1..,ultimate=208}] run scriptevent axell:fw3
execute as @s[scores={cd9=1..,ultimate=113}] run scriptevent axell:bw15
execute as @s[scores={cd9=1..,ultimate=109..111}] run scriptevent axell:fw2
execute as @s[scores={cd9=1..,ultimate=131..154}] run scriptevent axell:fw3
execute as @s[scores={cd9=1..,ultimate=132..154},type=!player] rotated ~ 0 run tp @s ^^^1.25 true
execute as @s[scores={cd9=1..,ultimate=30}] run scriptevent axell:beatdowncancel
execute as @s[scores={cd9=1..,ultimate=120}] run scoreboard players set @s radpos 0
execute as @s[scores={cd9=1..,ultimate=115}] run scriptevent flame:form9b
execute as @s[scores={cd9=1..,ultimate=110}] run scoreboard players set @s radpos -50
execute as @s[scores={cd9=1..,ultimate=120..}] at @s positioned ^^^2.5  run scoreboard players set @e[family=!inanimate,type=!axell:dmg,type=!xp_orb,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real,r=2.49] stun 30

tag @s add autoparry

execute as @s[scores={cd9=1..,ultimate=150..175}] at @s rotated ~ 0 positioned ^^^2.15 run tp @e[family=!inanimate,type=!axell:dmg,type=!xp_orb,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real,r=2.14] ^^^3 facing ^^^-10
execute as @s[scores={cd9=1..,ultimate=145..150}] at @s rotated ~ 0 positioned ^^^2.15 run tp @e[family=!inanimate,type=!axell:dmg,type=!xp_orb,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real,r=2.14] ^^^1 facing ^^^-10
execute as @s[scores={cd9=1..,ultimate=135..144}] at @s rotated ~ 0 positioned ^^^2.5 run tp @e[family=!inanimate,type=!axell:dmg,type=!xp_orb,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real,r=2.49] ^-1^^4 facing ^^^-10
execute as @s[scores={cd9=1..,ultimate=120..134}] at @s rotated ~ 0 positioned ^^^2.5 run tp @e[family=!inanimate,type=!axell:dmg,type=!xp_orb,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real,r=2.49] ^^^ facing ^^^-10

execute as @s[scores={cd9=1..,ultimate=200}] run camera @s set minecraft:free pos ^-1^1^1.5 facing @s
execute as @s[scores={cd9=1..,ultimate=190}] run camera @s set minecraft:free pos ^-0.5^1.5^1.2 facing @s
execute as @s[scores={cd9=1..,ultimate=188}] run camera @s set minecraft:free ease 0.8 in_circ pos ^-0.25^1.55^1 rot ~~180
execute as @s[scores={cd9=1..,ultimate=185}] run camera @s set minecraft:free ease 0.1 in_circ pos ^-0.25^1.4^0.95 rot ~~180
execute as @s[scores={cd9=1..,ultimate=180}] run camera @s set minecraft:free ease 0.3 in_circ pos ^-0.3^1.4^4 rot ~~180
execute as @s[scores={cd9=1..,ultimate=165}] run camera @s set minecraft:free pos ^-0.5^0.5^0.5 rot ~~220
execute as @s[scores={cd9=1..,ultimate=155}] run camera @s set minecraft:free pos ^-0.5^1.25^5 rot ~~190
execute as @s[scores={cd9=1..,ultimate=145}] run camera @s set minecraft:free  pos ^-5^3^20 rot ~~210
execute as @s[scores={cd9=1..,ultimate=129}] run camera @s set minecraft:free pos ^-1^1.5^-0.5 rot ~~-20
execute as @s[scores={cd9=1..,ultimate=108}] run camera @s set minecraft:free pos ^-1.1^1.5^-1 rot ~~-20
execute as @s[scores={cd9=1..,ultimate=70}] run camera @s set minecraft:free pos ^-0.5^1^1 rot ~-20~220
      
#execute as @s[scores={cd9=1..,ultimate=90..130}] run camera @s set minecraft:free  ease 0.1 in_circ  pos ^2^3^12 rot ~~170

playanimation @s[scores={cd9=1..,ultimate=190}] animation.flame.form9b
playanimation @s[scores={cd9=1..,ultimate=120}] animation.flame.form9c
playanimation @s[scores={cd9=1..,ultimate=110}] animation.flame.form9d
playanimation @s[scores={cd9=1..,ultimate=30}] animation.nichirin.start
execute as @s[scores={cd9=1..,ultimate=119}] run camera @a[r=15] fade time 0.1 0.1 1 color 255 96 0
execute as @s[scores={cd9=1..,ultimate=51}] run camera @s fade time 1.08 0.1 1 color 0 0 0
camerashake add @s[scores={cd9=1..,ultimate=119..129}] 0.05 0.1
camerashake add @s[scores={cd9=1..,ultimate=119}] 0.5 1
fog @s[scores={cd9=1..,ultimate=190}] push "minecraft:fog_warped_forest" "ult"

execute as @s[scores={cd9=1..,ultimate=173..177}] run particle flame:linger ~~~
execute as @s[scores={cd9=1..,ultimate=133..155}] at @s run particle flame:form1 ^^0.1^-0.5
execute as @s[scores={cd9=1..,ultimate=133..145}] at @s run particle flame:form1 ^^0.1^1
execute as @s[scores={cd9=1..,ultimate=133..145}] at @s run particle flame:form1 ^^0.1^-1.5
execute as @s[scores={cd9=1..,ultimate=133..145}] at @s run particle flame:form1 ^^0.1^-3
execute as @s[scores={cd9=1..,ultimate=143..155}] at @s run particle flame:form4 ~~~
execute at @s[scores={cd9=1..,ultimate=155..185}] run particle flame:form11 ~~~
execute at @s[scores={cd9=1..,ultimate=155..185}] run particle flame:hold1 ~~~
execute at @s[scores={cd9=1..,ultimate=155..185}] run particle flame:hold2 ~~~
execute at @s[scores={cd9=1..,ultimate=155..185}] run particle flame:flame5 ~~~

execute at @s[scores={cd9=1..,ultimate=120..133}] run particle flame:hold1 ~~~
execute at @s[scores={cd9=1..,ultimate=120..133}] run particle flame:hold2 ~~~
execute at @s[scores={cd9=1..,ultimate=120..133}] run particle flame:flame5 ~~~

execute at @s[scores={cd9=1..,ultimate=130}] run particle flame:flame9 ~~~
execute at @s[scores={cd9=1..,ultimate=130}] run particle flame:flame99 ~~~
execute at @s[scores={cd9=1..,ultimate=130}] run particle flame:flame9ril ~~~
execute at @s[scores={cd9=1..,ultimate=50..120}] run particle smoke:flame ~~~

execute as @s[scores={cd9=1..,ultimate=130}] at @s rotated ~ 0 run summon flame:tornado9 ^^^5.75
execute as @s[scores={cd9=1..,ultimate=120..133}] at @e[type=flame:tornado9,c=1] run particle akaza:impact3 ~~0.75~
execute as @s[scores={cd9=1..,ultimate=50..125}] at @e[type=flame:tornado9,c=1] run particle flame:ult2 ~~~
execute as @s[scores={cd9=1..,ultimate=50..133}] at @e[type=flame:tornado9,c=1] run particle smoke:flame ~~0.75~
execute as @s[scores={cd9=1..,ultimate=10..123}] at @e[type=flame:tornado9,c=1] run particle flame:fog ~~~
execute as @s[scores={cd9=1..,ultimate=10..123}] at @e[type=flame:tornado9,c=1] run particle flame:flame5 ~~1~
execute as @s[scores={cd9=1..,ultimate=10..123}] at @e[type=flame:tornado9,c=1] run particle flame:hold2 ~~1~

inputpermission set @s[scores={cd9=1..,ultimate=2..}] movement disabled
inputpermission set @s[scores={cd9=1..,ultimate=2..}] camera disabled

execute as @s[scores={cd9=1..,ultimate=153..156}] run playsound random.explode @a ~~~ 100 0.5 100
execute as @s[scores={cd9=1..,ultimate=188}] run playsound random.explode @a ~~~ 1 0.25 1
execute as @s[scores={cd9=1..,ultimate=150}] run playsound mob.enderdragon.growl @a ^-5^3^20 100 0.75 100
execute as @s[scores={cd9=1..,ultimate=173..185}] run playsound mob.blaze.shoot @a ~~~ 1 0.25 1
execute as @s[scores={cd9=1..,ultimate=130..133}] run playsound mob.blaze.shoot @a ~~~ 1 0.25 1
execute as @s[scores={cd9=1..,ultimate=120}] run playsound mob.blaze.shoot @a ~~~ 100 0.75 100
execute as @s[scores={cd9=1..,ultimate=132}] run playsound random.explode @a ~~~ 100 0.25 100
execute as @s[scores={cd9=1..,ultimate=135}] run playsound mob.enderdragon.growl @a ~~~ 0.5 0.25 0.5
execute as @s[scores={cd9=1..,ultimate=125..133}] run playsound random.explode @a ~~~ 100 0.5 100
execute as @s[scores={cd9=1..,ultimate=67}] run playsound axell.raiden.m1 @a ~~~ 100 5 100
execute as @s[scores={cd9=1..,ultimate=70}] run playsound mob.witch.throw @a ~~~ 100 0.55 100
execute as @s[scores={cd9=1..,ultimate=80}] run playsound mob.witch.throw @a ~~~ 100 0.25 100