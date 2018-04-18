#!/usr/bin/python3

import requests
import json
import time
import socket
import glob


def action(appid):
    try:

        game_url = "http://store.steampowered.com/appreviews/%d?json=1" % appid
        print(game_url)
        temp_reponse = requests.get(game_url)
        json_response = json.loads(temp_reponse.text)

        # success and data
        if json_response['success'] is not 1:
            print("Game %d is not valild or requesting too fast" % appid)
            # time.sleep(1)
            return True

        print("Got data for appid %d" % appid)
        # print(json_response[str(appid)]['data'])

        file_name = "steam_game_review/%d" % appid
        with open(file_name, 'w') as f:
            f.write(json.dumps(json_response))

        time.sleep(0.1)
        return True
    except TypeError as err:
        print(err)
        return False
    except socket.gaierror as er:
        print(er)
        return False

paths = glob.glob('steam_data/*')

id_list = list()

for path in paths:
    id_list.append(int(path.split('/')[1]))

id_list = sorted(id_list)

print("There are %d games !!!"  % len(id_list))

for appid in id_list:
    if appid < 713650:
        continue
    
    while True:
        if action(appid):
            break



