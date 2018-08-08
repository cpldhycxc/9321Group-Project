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
game_paths = glob.glob("steam_game_review/*")

for path in game_paths:
    with open(path) as f:
        data_dict = json.loads(f.read())

        print(data_dict['query_summary']['total_reviews'])

        c.execute('UPDATE backend_gamelist SET rating_count = ? WHERE game_id = ?', (data_dict['query_summary']['total_reviews'], int(path.split('/')[1])))

print("Inserting Done")
conn.commit()
conn.close()