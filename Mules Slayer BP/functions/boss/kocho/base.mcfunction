execute as @e[tag=kochobossstart,tag=!stun,tag=!tsed,scores={moveboss=0,moveanim=0}] run function boss/kocho/kocho
scoreboard players set @e[type=!player,scores={sp1=..15,spm1=1..}] spm1 0
scoreboard players reset @e[type=axell:kocho,tag=!kochobossstart,scores={spm1=0..,sp1=0}] spm1
scoreboard players reset @e[type=axell:kocho,tag=!kochobossstart,scores={sp1=0}] sp1
scoreboard objectives add moveboss dummy

scoreboard players remove @e[type=axell:kocho,scores={right=1..}] right 1
scoreboard players reset @e[type=axell:kocho,scores={right=1..},tag=!kochobossstart] right
scoreboard players add @e[tag=kochobossstart] right 0
scoreboard players remove @e[type=axell:kocho,scores={moveanim=1..}] moveanim 1
scoreboard players remove @e[type=axell:kocho,tag=!kochobossstart,scores={specb=1..}] specb 1
scoreboard players add @e[type=axell:kocho] moveanim 0

execute as @e[type=axell:kocho,scores={stun2=1..,onground=1}] at @s run tp ~~~ ~ 0
playanimation @e[type=axell:kocho,scores={stun2=1..}] animation.kocho.stunned n 1000
effect @e[type=axell:kocho,tag=!kochobossstart] regeneration 3 5 true
scoreboard objectives add specb dummy
scoreboard objectives add moveanim dummy


effect @s[scores={ultimate=1..}] slowness 2 255 true
tag @s[tag=!kochobossstart] remove autoparry
tag @s[tag=!kochobossstart] remove ultimate
tag @s[scores={ultimate=!1..}] remove ultimate
scoreboard players remove @s[scores={ultimate=1..}] ultimate 1
scoreboard players remove @s[scores={sp1=1..}] sp1 1
scoreboard players add @s[scores={sp1=..-1}] sp1 1
replaceitem entity @s slot.armor.legs 0 ds:kocho_haori
replaceitem entity @s slot.armor.chest 0 ds:uniform