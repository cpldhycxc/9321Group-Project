#!/usr/bin/python3

import requests
import json
import time
import socket
import glob

"""
store friend list of a existed user locally
"""

def action(appid):
    try:
        game_url = "http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=157B10AF42192FDFB98E3D8A6556AFD7&steamid=%d&relationship=friend" % appid
        print(game_url)
        temp_reponse = requests.get(game_url)
        json_response = json.loads(temp_reponse.text)

        # success and data
        if 'friendslist' not in json_response:
            print("user %d is not valild or requesting too fast" % appid)
            # time.sleep(1)
            return True

        print("Got data for friend_id: %d" % appid)
        # print(json_response[str(appid)]['data'])

        file_name = "friend_data/%d" % appid
        with open(file_name, 'w') as f:
            f.write(json.dumps(json_response))

        #time.sleep()
        return True
    except TypeError as err:
        print(err)
        return False
    except socket.gaierror as er:
        print(er)
        return False

with open('friend_list.txt') as f:
    id_list = f.readlines()

for user_id in sorted(id_list):
    user_id = int(user_id.strip())

    while True:
        if action(user_id):
            break



