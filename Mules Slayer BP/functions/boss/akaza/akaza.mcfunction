#auto
execute as @s[scores={bcd1=..935}] at @s positioned ^^^1.81 if entity @e[r=1.8,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real] run scoreboard players set @s[scores={sp1=0..23,m1=0..100,cd=0,ult=0,bcd1=0..}] sp1 30
execute as @s[scores={bcd1=..935}] at @s positioned ^^^1.81 if entity @e[r=1.8,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real] run scoreboard players set @s[scores={sp1=0..30,m1=0..100,cd=0,ult=0,bcd1=..-1}] sp1 30
scoreboard players add @s sp1 0
scoreboard players add @s m1 0
tag @s add kizuki_awake
execute as @s[scores={bcd1=935..}] at @s run tp ~~~
execute as @s[scores={bcd1=935..}] at @s run tag @s add ultimate
execute as @s[scores={bcd1=..935}] at @s run tag @s remove ultimate

replaceitem entity @s slot.weapon.mainhand 0 axell:bda
tag @s[scores={m1=5,sp1=2..}] add autoparry
tag @s[scores={m1=0..4}] remove autoparry

effect @s regeneration infinite 0 true

scoreboard players set @s energy 1000
scoreboard players set @s sneak 0
scoreboard players set @s bda 1
scoreboard players add @s ult 0
scoreboard players add @s ultimateArt 0
scoreboard players add @s ultimate 0
scoreboard players add @s hold 0
scoreboard players set @s totalcon 0
scoreboard players set @s special 0
scoreboard players set @s cd 0
scoreboard players set @s vit 0
scoreboard players set @s[scores={bcd1=0..}] str 23
scoreboard players set @s[scores={bcd1=..-1}] str 45
scoreboard players set @s[scores={bcd1=0..}] dex 20
scoreboard players set @s[scores={bcd1=..-1}] dex 42
scoreboard players set @s def 0
scoreboard players set @s pen 0
scoreboard players set @s dmgbonus 0
scoreboard players set @s critDMG 60
scoreboard players set @s critRate 45
scoreboard players set @s family 0
scoreboard players set @s radpos 0
scoreboard players set @s skillani 0
scoreboard players set @s bm1lvl 30
scoreboard players set @s bab1 1
scoreboard players set @s bab2 30
scoreboard players set @s bab3 30
scoreboard players set @s bab4 30
scoreboard players set @s bab5 30
scoreboard players set @s bab6 30
scoreboard players set @s bab7 30
scoreboard players set @s bab8 30
scoreboard players set @s bab9 30
scoreboard players set @s bab10 30
scoreboard players set @s bab11 30
scoreboard players add @s bcd1 0
scoreboard players add @s bcd2 0
scoreboard players add @s bcd3 0
scoreboard players add @s bcd4 0
scoreboard players add @s bcd5 0
scoreboard players add @s bcd6 0
scoreboard players add @s bcd7 0
scoreboard players add @s bcd8 0
scoreboard players add @s bcd9 0
scoreboard players add @s bcd10 0

#combo animatoon
execute as @s at @s run function moves/akaza/base
scoreboard players set @s[scores={m1=7..}] m1 0
scoreboard players set @s[scores={sp1=0}] m1 0