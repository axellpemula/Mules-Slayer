execute as @s[scores={cd2=-19}] run playsound axell.raiden.m1 @a ^^^1 1005 2.25 1006
execute as @s[scores={cd2=-18}] run playsound axell.raiden.m1 @a ^^^1 1005 2.05 1006
execute as @s[scores={cd2=-15}] run playsound axell.raiden.m1 @a ^^^1 1005 1.95 1006
execute as @s[scores={cd2=-13}] run playsound axell.raiden.m1 @a ^^^1 1005 1.85 1006
execute as @s[scores={cd2=-11}] run playsound axell.raiden.m1 @a ^^^1 1005 1.75 1006
execute as @s[scores={cd2=-9}] run playsound axell.raiden.m1 @a ^^^1 1005 1.65 1006
execute as @s[scores={cd2=-6}] run playsound axell.raiden.m1 @a ^^^1 1005 1.5 1006
execute as @s[scores={cd2=-3}] run playsound axell.raiden.m1 @a ^^^1 1005 1.45 1006

execute as @s[scores={cd2=-17}] run scriptevent mist:form2
execute as @s[scores={cd2=-15}] run scriptevent mist:form2
execute as @s[scores={cd2=-13}] run scriptevent mist:form2
execute as @s[scores={cd2=-11}] run scriptevent mist:form2
execute as @s[scores={cd2=-9}] run scriptevent mist:form2
execute as @s[scores={cd2=-6}] run scriptevent mist:form2
execute as @s[scores={cd2=-3}] run scriptevent mist:form2


execute as @s[scores={cd2=..-3}] at @s rotated ~ 0 run particle smoke:mist ^^^1
execute as @s[scores={cd2=..-3}] at @s rotated ~ 0 run particle smoke:mist ^^^
execute as @s[scores={cd2=..-3}] run scriptevent axell:mist2
execute as @s[scores={cd2=-1}] run scoreboard players set @s cd2 50