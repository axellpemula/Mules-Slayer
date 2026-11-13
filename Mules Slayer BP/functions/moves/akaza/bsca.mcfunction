execute as @s[scores={bcd10=..-1}] run playsound random.explode @a ^^^1 1.5 1 1000
execute as @s[scores={bcd10=..-1}] run playsound mob.witch.throw @a ^^^1 1 1 1000
execute as @s[scores={bcd10=..-2}] run scoreboard players set @s radpos 40
execute as @s[scores={bcd10=-1}] run scoreboard players reset @s radpos
execute as @s[scores={bcd10=..-1}] run scriptevent akaza:bda10
execute as @s[scores={bcd10=..-1}] run scriptevent axell:fw1

tag @s[scores={bcd10=-1}] remove autoparry
camerashake add @s[scores={bcd10=..-1}] 0.1 0.01
effect @s[scores={bcd10=..-5}] slowness 1 3 true
effect @s[scores={bcd10=-1}] slowness 0 4 true

scoreboard players set @s[scores={bcd10=-1}] bcd10 110
scoreboard players set @s[scores={bcd10=..-1,m1=1..}] bcd10 110

event entity @s[scores={bcd10=..-1}] axell:terbang
event entity @s[scores={bcd10=105}] axell:jatuh