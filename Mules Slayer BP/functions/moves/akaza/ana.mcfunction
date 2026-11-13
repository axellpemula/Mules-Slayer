inputpermission set @s[scores={bcd4=60..}] movement disabled
inputpermission set @s[scores={bcd4=59}] movement enabled
execute as @s[scores={bcd4=75..}] at @s run particle akaza:boost
execute as @s[scores={bcd4=95..}] at @s run playsound mob.cat.hiss @a ~~~ 1 0.5 1
execute as @s[scores={bcd4=78}] at @s positioned ^^^1 run particle minecraft:knockback_roar_particle ~~.5~
execute as @s[scores={bcd4=78}] at @s run particle akaza:impact3 ~~~
execute as @s[scores={bcd4=78}] run playsound random.explode @a ^^^1 5 1 1000
execute as @s[scores={bcd4=80}] run playsound mob.witch.throw @a ^^^1 5 1 1000
execute as @s[scores={bcd4=80}] run scriptevent axell:fw5
execute as @s[scores={bcd4=78}] at @s positioned ^^^3.1 run scoreboard players add @e[r=3,family=!inanimate,type=!axell:dmg,type=!xp_orb,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real] stun 45
execute as @s[scores={bcd4=95}] run scoreboard players add @s critRate 100
execute as @s[scores={bcd4=95}] run scoreboard players add @s critDMG 100
execute as @s[scores={bcd4=90}] run scoreboard players set @s radius 30
execute as @s[scores={bcd4=80}] run scoreboard players set @s multiplier 178
execute as @s[scores={bcd4=80}] run scriptevent axell:damage
execute as @s[scores={bcd4=78}] at @s run particle akaza:crot ~~1~ 
execute as @s[scores={bcd4=78}] run scoreboard players remove @s critRate 100
execute as @s[scores={bcd4=78}] run scoreboard players remove @s critDMG 100