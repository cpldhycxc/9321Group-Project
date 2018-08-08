#!/usr/bin/python3

"""
insert to friend table
"""

import json
import glob
import requests
import sqlite3
import os
import re

# find all exist users
user_existence = dict()
with open('friend_list.txt') as f:
    for user_id in f.readlines():
        user_id = user_id.strip()
        user_existence[user_id] = True

paths = glob.glob("friend_data/*")

conn = sqlite3.connect('mysqlite.db')
c = conn.cursor()
print("Open database successfully")

for path in paths:

    my_id = int(path.split('/')[1])
    
    f = open(path)
    data_dict = json.loads(f.read())
    f.close()

    for friend_dict in data_dict["friendslist"]['friends']:
        if friend_dict['steamid'] in user_existence:
            conn.execute("INSERT INTO backend_follow (follow_id_id, user_id_id) VALUES (?,?)",
                (int(friend_dict['steamid']), my_id))


print("Insertion Done")
conn.commit()
conn.close()