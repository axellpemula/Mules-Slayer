# --- init once (no-op after first run) ---
scoreboard objectives add hpidx dummy
scoreboard objectives add hpval dummy

# --- roll 1..20 uniformly for 50..1000 (+50) ---
scoreboard players random @s hpidx 1 20

# --- set exact max HP via events + store value ---
execute if score @s hpidx matches 1 run event entity @s set_hp_50
execute if score @s hpidx matches 1 run scoreboard players set @s hpval 50
execute if score @s hpidx matches 2 run event entity @s set_hp_100
execute if score @s hpidx matches 2 run scoreboard players set @s hpval 100
execute if score @s hpidx matches 3 run event entity @s set_hp_150
execute if score @s hpidx matches 3 run scoreboard players set @s hpval 150
execute if score @s hpidx matches 4 run event entity @s set_hp_200
execute if score @s hpidx matches 4 run scoreboard players set @s hpval 200
execute if score @s hpidx matches 5 run event entity @s set_hp_250
execute if score @s hpidx matches 5 run scoreboard players set @s hpval 250
execute if score @s hpidx matches 6 run event entity @s set_hp_300
execute if score @s hpidx matches 6 run scoreboard players set @s hpval 300
execute if score @s hpidx matches 7 run event entity @s set_hp_350
execute if score @s hpidx matches 7 run scoreboard players set @s hpval 350
execute if score @s hpidx matches 8 run event entity @s set_hp_400
execute if score @s hpidx matches 8 run scoreboard players set @s hpval 400
execute if score @s hpidx matches 9 run event entity @s set_hp_450
execute if score @s hpidx matches 9 run scoreboard players set @s hpval 450
execute if score @s hpidx matches 10 run event entity @s set_hp_500
execute if score @s hpidx matches 10 run scoreboard players set @s hpval 500
execute if score @s hpidx matches 11 run event entity @s set_hp_550
execute if score @s hpidx matches 11 run scoreboard players set @s hpval 550
execute if score @s hpidx matches 12 run event entity @s set_hp_600
execute if score @s hpidx matches 12 run scoreboard players set @s hpval 600
execute if score @s hpidx matches 13 run event entity @s set_hp_650
execute if score @s hpidx matches 13 run scoreboard players set @s hpval 650
execute if score @s hpidx matches 14 run event entity @s set_hp_700
execute if score @s hpidx matches 14 run scoreboard players set @s hpval 700
execute if score @s hpidx matches 15 run event entity @s set_hp_750
execute if score @s hpidx matches 15 run scoreboard players set @s hpval 750
execute if score @s hpidx matches 16 run event entity @s set_hp_800
execute if score @s hpidx matches 16 run scoreboard players set @s hpval 800
execute if score @s hpidx matches 17 run event entity @s set_hp_850
execute if score @s hpidx matches 17 run scoreboard players set @s hpval 850
execute if score @s hpidx matches 18 run event entity @s set_hp_900
execute if score @s hpidx matches 18 run scoreboard players set @s hpval 900
execute if score @s hpidx matches 19 run event entity @s set_hp_950
execute if score @s hpidx matches 19 run scoreboard players set @s hpval 950
execute if score @s hpidx matches 20 run event entity @s set_hp_1000
execute if score @s hpidx matches 20 run scoreboard players set @s hpval 1000

# --- clear/apply balanced effects based on hpval ---
effect @s clear strength
effect @s clear speed

# Weak: <= 250 -> modest boosts
execute if score @s hpval matches ..250 run effect @s strength 999999 2 true
execute if score @s hpval matches ..250 run effect @s speed    999999 1 true

# Normal: 300..600 -> medium boosts

# no speed for bosses

# --- randomize SPEED & STRENGTH on spawn ---

# init scoreboards (no-op after first run)
scoreboard objectives add spdroll dummy
scoreboard objectives add dmgroll dummy
scoreboard objectives add spdhi   dummy
scoreboard objectives add dmghi   dummy

# Always clear any prior effects so this random set is the authority
effect @s clear

# =========================
# =========================
# SPECIAL: hp > 900 -> RANDOMIZED STRONG DAMAGE (Strength V–VIII)
#   - Still gets a good speed roll (II/III/IV)
# =========================
scoreboard objectives add dmg900 dummy
execute if score @s hpval matches 901.. run scoreboard players random @s dmg900 5 8
execute if score @s hpval matches 901.. if score @s dmg900 matches 5 run effect @s strength 999999 4 true
execute if score @s hpval matches 901.. if score @s dmg900 matches 6 run effect @s strength 999999 5 true
execute if score @s hpval matches 901.. if score @s dmg900 matches 7 run effect @s strength 999999 6 true
execute if score @s hpval matches 901.. if score @s dmg900 matches 8 run effect @s strength 999999 7 true
execute if score @s hpval matches 901.. run effect @s regeneration 999999 5 true
execute if score @s hpval matches 901.. run scoreboard players reset @s dmg900
scoreboard objectives add spdhi900 dummy
execute if score @s hpval matches 901.. run scoreboard players random @s spdhi900 1 6
execute if score @s hpval matches 901.. if score @s spdhi900 matches 1..2 run effect @s speed 999999 1 true
execute if score @s hpval matches 901.. if score @s spdhi900 matches 3..4 run effect @s speed 999999 2 true
execute if score @s hpval matches 901.. if score @s spdhi900 matches 5..6 run effect @s speed 999999 3 true
execute if score @s hpval matches 901.. run scoreboard players reset @s spdhi900
# hp 401..900 -> GUARANTEED GOOD STATS, but still random:
#   Speed: II/III/IV only
#   Strength: II/III/IV only
# =========================
execute if score @s hpval matches 401..900 run scoreboard players random @s spdhi 1 6
execute if score @s hpval matches 401..900 run scoreboard players random @s dmghi 1 6

# Speed (hp 401..900): 1..2 -> Speed II, 3..4 -> Speed III, 5..6 -> Speed IV
execute if score @s hpval matches 401..900 if score @s spdhi matches 1..2 run effect @s speed 999999 1 true
execute if score @s hpval matches 401..900 if score @s spdhi matches 3..4 run effect @s speed 999999 2 true
execute if score @s hpval matches 401..900 if score @s spdhi matches 5..6 run effect @s speed 999999 3 true

# Strength (hp 401..900): 1..2 -> Strength II, 3..4 -> Strength III, 5..6 -> Strength IV
execute if score @s hpval matches 401..900 if score @s dmghi matches 1..2 run effect @s strength 999999 1 true
execute if score @s hpval matches 401..900 if score @s dmghi matches 3..4 run effect @s strength 999999 2 true
execute if score @s hpval matches 401..900 if score @s dmghi matches 5..6 run effect @s strength 999999 3 true

execute if score @s hpval matches 401..900 run scoreboard players reset @s spdhi
execute if score @s hpval matches 401..900 run scoreboard players reset @s dmghi

# =========================
# hp <= 400 -> Full weighted randomization (can be debuffed/none/positive)
# =========================
execute unless score @s hpval matches 401.. run scoreboard players random @s spdroll 1 20
# SPEED (hp <= 400)
execute unless score @s hpval matches 401.. if score @s spdroll matches 1      run effect @s slowness 999999 2 true
execute unless score @s hpval matches 401.. if score @s spdroll matches 2..3   run effect @s slowness 999999 1 true
execute unless score @s hpval matches 401.. if score @s spdroll matches 4..6   run effect @s slowness 999999 0 true
# (7..12 -> no effect)
execute unless score @s hpval matches 401.. if score @s spdroll matches 13..15 run effect @s speed    999999 0 true
execute unless score @s hpval matches 401.. if score @s spdroll matches 16..17 run effect @s speed    999999 1 true
execute unless score @s hpval matches 401.. if score @s spdroll matches 18..19 run effect @s speed    999999 2 true
execute unless score @s hpval matches 401.. if score @s spdroll matches 20     run effect @s speed    999999 3 true
execute unless score @s hpval matches 401.. run scoreboard players reset @s spdroll

execute unless score @s hpval matches 401.. run scoreboard players random @s dmgroll 1 20
# STRENGTH (hp <= 400)
execute unless score @s hpval matches 401.. if score @s dmgroll matches 1      run effect @s weakness 999999 1 true
execute unless score @s hpval matches 401.. if score @s dmgroll matches 2..4   run effect @s weakness 999999 0 true
# (5..10 -> none)
execute unless score @s hpval matches 401.. if score @s dmgroll matches 11..14 run effect @s strength 999999 0 true
execute unless score @s hpval matches 401.. if score @s dmgroll matches 15..17 run effect @s strength 999999 1 true
execute unless score @s hpval matches 401.. if score @s dmgroll matches 18..19 run effect @s strength 999999 2 true
execute unless score @s hpval matches 401.. if score @s dmgroll matches 20     run effect @s strength 999999 3 true
execute unless score @s hpval matches 401.. run scoreboard players reset @s dmgroll

# --- fill to new max ---
effect @s instant_health 1 255 true

# --- mark done ---
tag @s add rolled_exact
scoreboard players reset @s hpidx