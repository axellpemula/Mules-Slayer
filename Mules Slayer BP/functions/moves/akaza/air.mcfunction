execute as @s[scores={bcd2=78,onground=1}] at @s run scriptevent axell:fw2
execute as @s[scores={bcd2=73,onground=1}] at @s run scriptevent axell:fw2
execute as @s[scores={bcd2=79,onground=0}] at @s run scriptevent axell:up1
execute as @s[scores={bcd2=79,onground=0}] at @s run effect @s slow_falling 1 255 true
execute as @s[scores={bcd2=72}] at @s run particle akaza:impact3 ~~1~
execute as @s[scores={bcd2=77}] at @s run particle akaza:impact3 ~~1~

execute as @s[scores={bcd2=73}] run scriptevent akaza:air
execute as @s[scores={bcd2=78}] run scriptevent akaza:air2

execute as @s[scores={bcd2=73}] run playsound mob.witch.throw @a ^^^1 0.5 1 1000
execute as @s[scores={bcd2=78}] run playsound mob.witch.throw @a ^^^1 0.5 1 1000
execute as @s[scores={bcd2=73}] run playsound mob.witch.throw @a ^^^1 1 1 1000
execute as @s[scores={bcd2=78}] run playsound mob.witch.throw @a ^^^1 1 1 1000

inputpermission set @s[scores={bcd2=62..}] movement disabled
inputpermission set @s[scores={bcd2=61}] movement enabled