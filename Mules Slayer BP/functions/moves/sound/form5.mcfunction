execute as @s[scores={cd5=-36..-25}] run scriptevent axell:fw2.5
execute as @s[scores={cd5=-36..-25}] at @s rotated ~ 0 run tp @e[r=2,rm=0.1,tag=!autoparry,type=!akaza:air,type=!xp_orb,type=!axell:dmg,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real] ^^^4
execute as @s[scores={cd5=-25}] run playanimation @s animation.sound.form5b
execute as @s[scores={cd5=..-1}] run playsound firework.twinkle @a ~~~ 10000 1.26 1000

execute as @s[scores={cd5=-2}] run playsound random.explode @a ~~~ 10000 0.5 1000
execute as @s[scores={cd5=-3}] run playsound random.explode @a ~~~ 10000 0.5 1000

execute as @s[scores={cd5=-40}] run playsound random.explode @a ~~~ 10000 0.5 1000
execute as @s[scores={cd5=-42}] run playsound random.explode @a ~~~ 10000 0.5 1000

execute as @s[scores={cd5=-60}] run playsound random.explode @a ~~~ 10000 0.5 1000
execute as @s[scores={cd5=-62}] run playsound random.explode @a ~~~ 10000 0.5 1000

execute as @s[scores={cd5=-20}] run playsound random.explode @a ~~~ 10000 0.5 1000
execute as @s[scores={cd5=-22}] run playsound random.explode @a ~~~ 10000 0.5 1000


scoreboard players set @s autoparry 5

inputpermission set @s[scores={cd5=-69..-3}] movement disabled
inputpermission set @s[scores={cd5=-1}] movement enabled
execute as @s[scores={cd5=..-1,right=1}] run scriptevent axell:beatdowncancel
scoreboard players set @s[scores={cd5=..-1,right=1}] cd5 90
scoreboard players set @s[scores={cd5=-1}] cd5 30