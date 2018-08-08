#!/usr/bin/python3

"""
get user Information from the friends_list.txt and store them locally in user_data
"""

import requests
import json
import time


def req(user_id):
    file_path = "user_data/" + user_id 

    player_stats_url = "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=157B10AF42192FDFB98E3D8A6556AFD7&steamids=%s" % user_id
    player_games_url = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=157B10AF42192FDFB98E3D8A6556AFD7&steamid=%s&format=json" % user_id

    stats_dict = json.loads(requests.get(player_stats_url).text)
    games_dict = json.loads(requests.get(player_games_url).text)

    new_dict = dict()
    new_dict['stats'] = stats_dict['response']
    new_dict['games'] = games_dict['response']


    with open(file_path, 'w') as f:
        f.write(json.dumps(new_dict))

    print("Store user: " + user_id)

    time.sleep(2)


with open('friend_list.txt') as f:
    id_list = f.readlines()

for user_id in sorted(id_list):
    user_id = user_id.strip()

    req(user_id)



