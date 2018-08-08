#!/usr/bin/python3

import requests
import json
import time
import socket


def action(appid):
    try:
        game_url = "http://store.steampowered.com/api/appdetails?appids=%d&l=en" % appid
        print(game_url)
        temp_reponse = requests.get(game_url)
        json_response = json.loads(temp_reponse.text)

        # success and data
        if not json_response[str(appid)]['success']:
            print("Game %d is not valild or requesting too fast" % appid)
            # time.sleep(1)
            return True

        print("Got data for appid %d" % appid)
        # print(json_response[str(appid)]['data'])

        file_name = "steam_data/%d" % appid
        with open(file_name, 'w') as f:
            f.write(json.dumps(json_response[str(appid)]['data']))

        time.sleep(1)
        return True
    except TypeError as err:
        print(err)
        return False
    except socket.gaierror as er:
    	print(er)
    	return False
    except:
    	return False


url = "http://api.steampowered.com/ISteamApps/GetAppList/v2"

response_data = requests.get(url)

json_data = json.loads(response_data.text)

# json response only contain applist, applist only contains apps
# print(json_data['applist']['apps'])

id_list = list()

for each_game in json_data['applist']['apps']:
    id_list.append(each_game['appid'])

# print(id_list)

print("There are %d games !!!"  % len(id_list))

for appid in id_list:
    if appid < 722841:
        continue

    while True:
        if action(appid):
            break
            