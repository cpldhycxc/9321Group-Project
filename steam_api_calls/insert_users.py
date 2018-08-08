#!/usr/bin/python3

"""
insert to user table and player library table
"""

import json
import glob
import requests
import sqlite3
import os
import re

paths = glob.glob("user_data/*")

game_id_dict = dict()
game_paths = glob.glob('steam_data/*')
for each_game in game_paths:
    game_id_dict[int(each_game.split('/')[1])] = True

conn = sqlite3.connect('mysqlite.db')
c = conn.cursor()
print("Open database successfully")

for path in paths:
    
    f = open(path)
    data_dict = json.loads(f.read())
    f.close()

    print(data_dict['stats'])
    print()
    print(data_dict['games'])

    user_id = int(path.split('/')[1])
    data_dict['stats']['players']
    user_name = data_dict['stats']['players'][0]['personaname']
    user_email = re.sub(r'\s', '', data_dict['stats']['players'][0]['personaname']) + "@jmail.com"
    password = "123456"
    privacy = False
    if 'game_count' not in data_dict['games']:
        num_games = 0
    else:
        num_games = data_dict['games']['game_count']

    conn.execute("INSERT INTO backend_user (user_id, user_name, email, pass_word, privacy, num_games) VALUES (?,?,?,?,?,?)",
            (user_id, user_name, user_email, password, privacy, num_games))

    if 'games' not in data_dict['games']:
        continue
    for game_dict in data_dict['games']['games']:
        # user_id
        wish = False
        played = True
        played_hrs = game_dict["playtime_forever"]
        game_id = game_dict['appid']

        if game_id not in game_id_dict.keys():
            continue

        conn.execute("INSERT INTO backend_playerlibrary (wish_list, played, played_hrs, game_id_id, user_id_id) VALUES (?,?,?,?,?)",
            (wish, played, played_hrs, game_id, user_id))


print("Insertion Done")
conn.commit()
conn.close()