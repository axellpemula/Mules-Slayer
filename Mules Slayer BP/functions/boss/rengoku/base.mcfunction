execute as @e[tag=rengokubossstart,tag=!stun,tag=!tsed,scores={moveboss=0,moveanim=0}] run function boss/rengoku/rengoku
scoreboard players set @e[type=!player,scores={sp1=..15,spm1=1..}] spm1 0
scoreboard players reset @e[type=axell:rengoku,tag=!rengokubossstart,scores={spm1=0..,sp1=0}] spm1
scoreboard players reset @e[type=axell:rengoku,tag=!rengokubossstart,scores={sp1=0}] sp1
scoreboard objectives add moveboss dummy

scoreboard players remove @e[type=axell:rengoku,scores={right=1..}] right 1
scoreboard players reset @e[type=axell:rengoku,scores={right=1..},tag=!rengokubossstart] right
scoreboard players add @e[tag=rengokubossstart] right 0
scoreboard players remove @e[type=axell:rengoku,scores={moveanim=1..}] moveanim 1
scoreboard players remove @e[type=axell:rengoku,tag=!rengokubossstart,scores={specb=1..}] specb 1
scoreboard players add @e[type=axell:rengoku] moveanim 0

execute as @e[type=axell:rengoku,scores={stun2=1..,onground=1}] at @s run tp ~~~ ~ 0
playanimation @e[type=axell:rengoku,scores={stun2=1..}] animation.rengoku.stunned n 1000
effect @e[type=axell:rengoku,tag=!rengokubossstart] regeneration 3 5 true
scoreboard objectives add specb dummy
scoreboard objectives add moveanim dummy


effect @s[scores={ultimate=1..}] slowness 2 255 true
tag @s[tag=!rengokubossstart] remove autoparry
tag @s[tag=!rengokubossstart] remove ultimate
tag @s[scores={ultimate=!1..}] remove ultimate
scoreboard players remove @s[scores={ultimate=1..}] ultimate 1
scoreboard players remove @s[scores={sp1=1..}] sp1 1
scoreboard players add @s[scores={sp1=..-1}] sp1 1
replaceitem entity @s slot.armor.legs 0 ds:rengoku_haori
replaceitem entity @s slot.armor.chest 0 ds:uniform