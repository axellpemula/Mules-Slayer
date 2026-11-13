scoreboard players set @s[tag=!join,scores={energyMax=0}] energyMax 100
scoreboard players set @s[tag=!join,scores={energy=0}] energy 100
execute as @s[tag=!join] run scriptevent family:start
give @s[tag=!join] axell:stats 1 0 {"keep_on_death":{},"item_lock": {"mode": "lock_in_inventory"}}
tag @s add join

scoreboard objectives add skill_mode dummy
scoreboard objectives add skill_cycle dummy
scoreboard players add @s skill_mode 0
scoreboard players add @s skill_cycle 0

scoreboard objectives add cooldown dummy
scoreboard objectives add cooldown2 dummy
scoreboard players add @s cooldown 0
scoreboard players add @s cooldown2 0

scoreboard objectives add tser dummy

scoreboard objectives add right dummy 
scoreboard objectives add rightS dummy 
scoreboard objectives add rightD dummy 
scoreboard objectives add hold dummy
scoreboard objectives add holdS dummy

scoreboard objectives add jump dummy
scoreboard players add @s jump 0

scoreboard players add @s tser 0
scoreboard objectives add health dummy

scoreboard objectives add ult dummy
scoreboard players add @s ult 0

scoreboard objectives add sneak dummy
scoreboard objectives add dsneak dummy
scoreboard players add @s sneak 0
scoreboard players add @s dsneak 0

scoreboard objectives add sneakTemp dummy
scoreboard objectives add sneakTemp2 dummy
scoreboard objectives add dsneakSet dummy

scoreboard objectives add ts dummy
scoreboard players add @s ts 0
scoreboard objectives add tsed dummy

scoreboard objectives add health dummy
scoreboard objectives add energy dummy
scoreboard objectives add energyMax dummy
scoreboard players add @s energy 0
scoreboard players add @s energyMax 0

#stun
scoreboard objectives add stun dummy
scoreboard objectives add stun2 dummy

scoreboard objectives add sp1 dummy
scoreboard players add @s sp1 0

scoreboard objectives add m1 dummy
scoreboard players add @s m1 0

scoreboard objectives add aspd dummy
scoreboard players add @s hold 0
scoreboard players add @s aspd 0

scoreboard objectives add spUsed dummy
scoreboard objectives add blade dummy
scoreboard players add @s blade 0

scoreboard objectives add handle dummy
scoreboard players add @s handle 0

scoreboard objectives add tsuba dummy
scoreboard players add @s tsuba 0

scoreboard objectives add blades dummy
scoreboard players add @s blades 0

scoreboard objectives add dual dummy
scoreboard players add @s dual 0

scoreboard objectives add ultimateArt dummy
scoreboard players add @s ultimateArt 0

scoreboard objectives add dashcd dummy
scoreboard objectives add dashint dummy
scoreboard players add @s dashcd 0
scoreboard players add @s dashint 0

#cooldowns
scoreboard objectives add bcd1 dummy
scoreboard objectives add bcd2 dummy
scoreboard objectives add bcd3 dummy
scoreboard objectives add bcd4 dummy
scoreboard objectives add bcd5 dummy
scoreboard objectives add bcd6 dummy
scoreboard objectives add bcd7 dummy
scoreboard objectives add bcd8 dummy
scoreboard objectives add bcd9 dummy
scoreboard objectives add bcd10 dummy
scoreboard objectives add bcd11 dummy
scoreboard objectives add bcd12 dummy
scoreboard objectives add bcd13 dummy

scoreboard players add @s bcd 0
scoreboard players add @s bcd1 0
scoreboard players add @s bcd2 0
scoreboard players add @s bcd3 0
scoreboard players add @s bcd4 0
scoreboard players add @s bcd5 0
scoreboard players add @s bcd6 0
scoreboard players add @s bcd7 0
scoreboard players add @s bcd8 0
scoreboard players add @s bcd9 0
scoreboard players add @s bcd10 0
scoreboard players add @s bcd11 0
scoreboard players add @s bcd12 0
scoreboard players add @s bcd13 0

#skillLevel
scoreboard objectives add bm1lvl dummy
scoreboard objectives add bab1 dummy
scoreboard objectives add bab2 dummy
scoreboard objectives add bab3 dummy
scoreboard objectives add bab4 dummy
scoreboard objectives add bab5 dummy
scoreboard objectives add bab6 dummy
scoreboard objectives add bab7 dummy
scoreboard objectives add bab8 dummy
scoreboard objectives add bab9 dummy
scoreboard objectives add bab10 dummy
scoreboard objectives add bab11 dummy
scoreboard objectives add bab12 dummy
scoreboard objectives add bab13 dummy

scoreboard players add @s bm1lvl 0
scoreboard players add @s bab1 0
scoreboard players add @s bab2 0
scoreboard players add @s bab3 0
scoreboard players add @s bab4 0
scoreboard players add @s bab5 0
scoreboard players add @s bab6 0
scoreboard players add @s bab7 0
scoreboard players add @s bab8 0
scoreboard players add @s bab9 0
scoreboard players add @s bab10 0
scoreboard players add @s bab11 0
scoreboard players add @s bab12 0
scoreboard players add @s bab13 0



#updates
scoreboard objectives add cd_base dummy
scoreboard objectives add sp_base dummy
scoreboard objectives add vit_base dummy
scoreboard objectives add str_base dummy
scoreboard objectives add dex_base dummy
scoreboard objectives add int_base dummy
scoreboard objectives add def_base dummy
scoreboard objectives add pen_base dummy
scoreboard objectives add dmgbonus_base dummy
scoreboard objectives add critDMG_base dummy
scoreboard objectives add critRate_base dummy

scoreboard players add @s cd_base 0
scoreboard players add @s sp_base 0
scoreboard players add @s vit_base 0
scoreboard players add @s str_base 0
scoreboard players add @s dex_base 0
scoreboard players add @s int_base 0
scoreboard players add @s def_base 0
scoreboard players add @s pen_base 0
scoreboard players add @s dmgbonus_base 0
scoreboard players add @s critDMG_base 0
scoreboard players add @s critRate_base 0



#stats
scoreboard objectives add rank dummy
scoreboard objectives add ultimate dummy
scoreboard objectives add vit dummy
scoreboard objectives add sp dummy
scoreboard objectives add str dummy
scoreboard objectives add dex dummy
scoreboard objectives add int dummy
scoreboard objectives add def dummy
scoreboard objectives add pen dummy
scoreboard objectives add dmgbonus dummy
scoreboard objectives add family dummy
scoreboard objectives add critRate dummy
scoreboard objectives add critDMG dummy
scoreboard objectives add placeholder dummy
scoreboard objectives add radius dummy
scoreboard objectives add radpos dummy
scoreboard objectives add multiplier dummy
scoreboard objectives add breathings dummy
scoreboard objectives add bda dummy
scoreboard objectives add skillani dummy
scoreboard objectives add aircombo dummy
scoreboard objectives add cd dummy
scoreboard objectives add totalcon dummy
scoreboard objectives add special dummy
scoreboard objectives add combostopper dummy

scoreboard players add @s rank 0
scoreboard players add @s ultimate 0
scoreboard players add @s totalcon 0
scoreboard players add @s special 0
scoreboard players add @s cd 0
scoreboard players add @s sp 0
scoreboard players add @s vit 0
scoreboard players add @s str 0
scoreboard players add @s dex 0
scoreboard players add @s int 0
scoreboard players add @s def 0
scoreboard players add @s pen 0
scoreboard players add @s dmgbonus 0
scoreboard players add @s critDMG 0
scoreboard players add @s critRate 0
scoreboard players add @s family 0
scoreboard players add @s radpos 0
scoreboard players add @s skillani 0
scoreboard players add @s breathings 0
scoreboard players add @s bda 0
scoreboard players add @s aircombo 0

#cooldowns
scoreboard objectives add cd1 dummy
scoreboard objectives add cd2 dummy
scoreboard objectives add cd3 dummy
scoreboard objectives add cd4 dummy
scoreboard objectives add cd5 dummy
scoreboard objectives add cd6 dummy
scoreboard objectives add cd7 dummy
scoreboard objectives add cd8 dummy
scoreboard objectives add cd9 dummy
scoreboard objectives add cd10 dummy
scoreboard objectives add cd11 dummy
scoreboard objectives add cd12 dummy
scoreboard objectives add cd13 dummy

scoreboard players add @s cd 0
scoreboard players add @s cd1 0
scoreboard players add @s cd2 0
scoreboard players add @s cd3 0
scoreboard players add @s cd4 0
scoreboard players add @s cd5 0
scoreboard players add @s cd6 0
scoreboard players add @s cd7 0
scoreboard players add @s cd8 0
scoreboard players add @s cd9 0
scoreboard players add @s cd10 0
scoreboard players add @s cd11 0
scoreboard players add @s cd12 0
scoreboard players add @s cd13 0

#skillLevel
scoreboard objectives add m1lvl dummy
scoreboard objectives add ab1 dummy
scoreboard objectives add ab2 dummy
scoreboard objectives add ab3 dummy
scoreboard objectives add ab4 dummy
scoreboard objectives add ab5 dummy
scoreboard objectives add ab6 dummy
scoreboard objectives add ab7 dummy
scoreboard objectives add ab8 dummy
scoreboard objectives add ab9 dummy
scoreboard objectives add ab10 dummy
scoreboard objectives add ab11 dummy
scoreboard objectives add ab12 dummy
scoreboard objectives add ab13 dummy
scoreboard objectives add specialCD dummy


scoreboard players add @s m1lvl 0
scoreboard players add @s ab1 0
scoreboard players add @s ab2 0
scoreboard players add @s ab3 0
scoreboard players add @s ab4 0
scoreboard players add @s ab5 0
scoreboard players add @s ab6 0
scoreboard players add @s ab7 0
scoreboard players add @s ab8 0
scoreboard players add @s ab9 0
scoreboard players add @s ab10 0
scoreboard players add @s ab11 0
scoreboard players add @s ab12 0
scoreboard players add @s ab13 0
scoreboard players add @s specialCD 0

