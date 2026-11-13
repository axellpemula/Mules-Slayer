#auto
execute as @s at @s positioned ^^^1.81 if entity @e[r=1.8,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real] run scoreboard players set @s[scores={sp1=0..23,m1=0..100,cd=0,ult=0,ultimate=0}] sp1 30
scoreboard players add @s sp1 0
scoreboard players add @s m1 0
tag @s add mark


replaceitem entity @s slot.weapon.mainhand 0 axell:nichirin
tag @s[scores={m1=5,sp1=2..}] add autoparry
tag @s[scores={m1=0..4}] remove autoparry

scoreboard players set @s energy 1000
scoreboard players set @s sneak 0
scoreboard players set @s family 9
scoreboard players set @s breathings 6
scoreboard players add @s ult 0
scoreboard players add @s ultimateArt 0
scoreboard players add @s ultimate 0
scoreboard players add @s hold 0
scoreboard players set @s totalcon 0
scoreboard players set @s special 0
scoreboard players set @s cd 0
scoreboard players set @s vit 0
scoreboard players set @s str 15
scoreboard players set @s dex 25
scoreboard players set @s def 0
scoreboard players set @s pen 0
scoreboard players set @s dmgbonus 0
scoreboard players set @s critDMG 50
scoreboard players set @s critRate 45
scoreboard players set @s family 0
scoreboard players set @s radpos 0
scoreboard players set @s skillani 0
scoreboard players set @s m1lvl 50
scoreboard players set @s ab1 50
scoreboard players set @s ab2 50
scoreboard players set @s ab3 50
scoreboard players set @s ab4 50
scoreboard players set @s ab5 50
scoreboard players set @s ab6 50
scoreboard players set @s ab7 50
scoreboard players set @s ab8 50
scoreboard players set @s ab9 50
scoreboard players set @s ab10 50
scoreboard players set @s ab11 50
scoreboard players add @s cd1 0
scoreboard players add @s cd2 0
scoreboard players add @s cd3 0
scoreboard players add @s cd4 0
scoreboard players add @s cd5 0
scoreboard players add @s cd6 0
scoreboard players add @s cd7 0
scoreboard players add @s cd8 0
scoreboard players add @s cd9 0
scoreboard players add @s cd10 0

#combo animatoon
execute as @s at @s run function moves/mist/base
scoreboard players set @s[scores={m1=6..}] m1 0
scoreboard players set @s[scores={sp1=0}] m1 0