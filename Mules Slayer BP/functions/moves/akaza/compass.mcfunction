execute as @s[scores={bcd1=999}] run camera @s set minecraft:free pos ^-0.2^0.3^0.7 rot ~~180
execute as @s[scores={bcd1=999}] run /playsound mob.zombie.woodbreak @a[r=16] ~~~ 1 2 1
execute as @s[scores={bcd1=999}] run /playsound random.explode @a[r=16] ~~~ 1 2 1
execute as @s[scores={bcd1=994}] run /playsound block.bell.hit @a ~~~ 1 0.5 1
execute as @s[scores={bcd1=994}] run /particle akaza:compass4 ~~~
execute as @s[scores={bcd1=993}] run camera @s set minecraft:free pos ~~6~ rot ~90~180
execute as @s[scores={bcd1=970}] run camera @s set minecraft:free pos ^^1.5^3 rot ~~180
execute as @s[scores={bcd1=969}] run camera @s set minecraft:free ease 5 linear pos ^^1.5^1 rot ~~180
title @s[scores={bcd1=970}] actionbar §b§lCompass Needle
execute as @s[scores={bcd1=935..}] run particle flame:hold ~~~
execute as @s[scores={bcd1=935..}] run particle akaza:compass6 ~~~
execute as @s[scores={bcd1=935..}] run particle water:hold1 ~~~
execute as @s[scores={bcd1=935}] run particle minecraft:knockback_roar_particle ~~~
execute as @s[scores={bcd1=999}] run particle minecraft:knockback_roar_particle ~~~
execute as @s[scores={bcd1=935}] run scriptevent axell:beatdowncancel
execute as @s[scores={bcd1=935}] run scriptevent akaza:bda1