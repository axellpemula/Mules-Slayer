execute as @s[scores={cd3=-5}] run tp ~~~
execute as @s[scores={cd3=-1}] run particle smoke:sound ~~~
execute as @s[scores={cd3=-1}] run particle smoke:sound ~~~
execute as @s[scores={cd3=-1}] run particle smoke:sound ~~~
execute as @s[scores={cd3=-5..-3}] run particle sound:form1d ~~1~

execute as @s[scores={cd3=-7}] run particle sound:dordor1 ~~~
execute as @s[scores={cd3=-7}] run particle sound:dordor2 ~~~
execute as @s[scores={cd3=-7}] run particle sound:dordor3 ~~~

execute as @s[scores={cd3=-5..-3}] run scriptevent sound:form3

execute as @s[scores={cd3=-4..-3}] run playsound random.explode @a ~~~ 1000 1 1000
execute as @s[scores={cd3=-4..-3}] run playsound random.explode @a ~~~ 1000 1.25 1000
execute as @s[scores={cd3=-4..-3}] run playsound random.explode @a ~~~ 1000 0.75 1000
execute as @s[scores={cd3=-4..-3}] run playsound random.explode @a ~~~ 1000 0.5 1000
execute as @s[scores={cd3=-4..-1}] run playsound firework.twinkle @a ~~~ 1000 0.75 1000
execute as @s[scores={cd3=-4..-3}] run playsound firework.blast @a ~~~ 1000 0.5 1000

camerashake add @s[scores={cd3=-4..-3}] 1 0.2

execute as @s[scores={cd3=-9}] run playanimation @s animation.sound.form3
execute as @s[scores={cd3=-1}] run event entity @s axell:jatuh
execute as @s[scores={cd3=-1}] run effect @s speed 2 3 true
execute as @s[scores={cd3=-1}] run scoreboard players set @s radpos 0
execute as @s[scores={cd3=-1}] run scoreboard players set @s cd3 90