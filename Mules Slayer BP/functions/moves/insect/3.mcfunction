scoreboard players set @s hold 0
scoreboard players set @s right 0
scoreboard players set @s m1 0
inputpermission set @s movement enabled
playanimation @s[scores={cd3=1..,ab3=1..}] animation.nichirin.idle
playanimation @s[scores={energy=..19}] animation.nichirin.idle

tellraw @s[scores={cd3=1..}] {"rawtext":[{"text":"§c"},{"translate":"§y§rtext.insect:form3"},{"text":" "},{"translate":"text.axell:cooldown"}]}

tellraw @s[scores={energy=..19,ab3=1..}] {"rawtext":[{"translate":"text.axell:noenergy"}]}

execute as @s[scores={cd3=0,energy=20..,ab3=1..}] rotated ~ 0 positioned ^^^3.5 unless entity @e[tag=!autoparry,type=!akaza:air,type=!xp_orb,type=!axell:dmg,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real,r=3.4] run particle smoke:insect5
execute as @s[scores={cd3=0,energy=20..,ab3=1..}] rotated ~ 0 positioned ^^^3.5 unless entity @e[tag=!autoparry,type=!akaza:air,type=!xp_orb,type=!axell:dmg,family=!damage,family=!atk,type=!item,type=!armor_stand,type=!thrown_trident,type=!arrow,type=!area_effect_cloud,type=!minecart,type=!chest_minecart,type=!command_block_minecart,type=!dragon_fireball,type=!egg,type=!snowball,type=!ender_crystal,type=!ender_pearl,type=!evocation_fang,type=!falling_block,type=!fireball,type=!fireworks_rocket,type=!fishing_hook,type=!leash_knot,type=!lightning_bolt,type=!lingering_potion,type=!llama_spit,family=!real,r=3.4]  run playsound axell.raiden.m1 @a ~~~ 1 0.5 1


execute as @s[scores={cd3=0,energy=20..,ab3=1..}] run titleraw @s actionbar {"rawtext":[{"text":"§5"},{"translate":"§y§rtext.breathings:insect"},{"text":"!"}]}

scoreboard players set @s[scores={cd3=0,energy=20..,ab3=1..}] cd 2
scoreboard players set @s[scores={cd3=0,energy=20..,ab3=1..}] skillani 2
scoreboard players set @s[scores={cd3=0,energy=20..,ab3=1..}] dsneak -1
scoreboard players set @s[scores={cd3=0,energy=20..,ab3=1..}] sp1 -100
scoreboard players set @s[scores={cd3=0,energy=20..,ab3=1..}] ultimate 35
scoreboard players set @s[scores={cd3=0,energy=20..,ab3=1..}] cd3 -35
scoreboard players remove @s[scores={cd3=-35,energy=20..,ab3=1..}] energy 20
