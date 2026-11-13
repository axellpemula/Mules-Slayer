execute as @e[tag=tengenbossstart,tag=!stun,tag=!tsed,scores={moveboss=0,moveanim=0}] run function boss/tengen/tengen
scoreboard players set @e[type=!player,scores={sp1=..15,spm1=1..}] spm1 0
scoreboard players reset @e[type=axell:tengen,tag=!tengenbossstart,scores={spm1=0..,sp1=0}] spm1
scoreboard players reset @e[type=axell:tengen,tag=!tengenbossstart,scores={sp1=0}] sp1
scoreboard objectives add moveboss dummy

scoreboard players remove @e[type=axell:tengen,scores={right=1..}] right 1
scoreboard players reset @e[type=axell:tengen,scores={right=1..},tag=!tengenbossstart] right
scoreboard players add @e[tag=tengenbossstart] right 0
scoreboard players remove @e[type=axell:tengen,scores={moveanim=1..}] moveanim 1
scoreboard players remove @e[type=axell:tengen,tag=!tengenbossstart,scores={specb=1..}] specb 1
scoreboard players add @e[type=axell:tengen] moveanim 0

execute as @e[type=axell:tengen,scores={stun2=1..,onground=1}] at @s run tp ~~~ ~ 0
playanimation @e[type=axell:tengen,scores={stun2=1..}] animation.tengen.stunned n 1000
effect @e[type=axell:tengen,tag=!tengenbossstart] regeneration 3 5 true
scoreboard objectives add specb dummy
scoreboard objectives add moveanim dummy
tag @s add mark

scoreboard players set @s[scores={cd4=..-10}] ultimate 2
scoreboard players set @s[scores={cd5=..-5}] ultimate 2
effect @s[scores={ultimate=2..}] slowness 1 20 true
effect @s[scores={ultimate=1}] slowness 0 255 true
tag @s[tag=!tengenbossstart] remove autoparry
tag @s[tag=!tengenbossstart] remove ultimate
tag @s[scores={ultimate=!1..}] remove ultimate
scoreboard players remove @s[scores={ultimate=1..}] ultimate 1
scoreboard players remove @s[scores={sp1=1..}] sp1 1
scoreboard players add @s[scores={sp1=..-1}] sp1 1
replaceitem entity @s slot.armor.chest 0 ds:uniform_tengen