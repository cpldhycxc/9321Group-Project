#!/usr/bin/python3

import json
import glob
import requests
import sqlite3
import os

"""
insert to spy data
"""
conn = sqlite3.connect('mysqlite.db')
c = conn.cursor()
print("Open database successfully")

# for each game record update db
game_paths = glob.glob("steam_spy_data/*")

for path in game_paths:
    with open(path) as f:

        data = f.read()
        data_dict = json.loads(data)

        appid = data_dict['appid']
        players_forever = data_dict['players_forever']
        ave_rank = str(data_dict['score_rank'])
        if ave_rank == "":
            ave_rank = None
        else:
            ave_rank = int(ave_rank)

        print("Updating recode with id " + str(data_dict['appid']))
        # players_forever - people that have played this game since March 2009.
        print("Number of Player: " + str(data_dict['players_forever']))
        # score_rank - score rank of the game based on user reviews
        print("Average Ranking: " + str(data_dict['score_rank']))

        c.execute('UPDATE backend_gamelist SET average_rating = ?, num_player = ? WHERE game_id = ?', (ave_rank, players_forever, appid))

print("Inserting Done")
conn.commit()
conn.close()