#!/usr/bin/python3

"""
This script get all information from steam spy and store in the folder steam_spy_data
"""

import requests
import json
import time
import glob

def action(appid):
    try:
        url = "http://steamspy.com/api.php?request=appdetails&appid=" + appid
        print(url)
        response_data = requests.get(url)
        json_data = json.loads(response_data.text)
        # print("Got data for appid " + appid)
        print(json_data)
        print()
        file_name = "steam_spy_data/%s" % appid
        with open(file_name, 'w') as f:
            f.write(json.dumps(json_data))

        time.sleep(0.25)

        return True
    except TypeError as err:
        print(err)
        return False
    except:
        return True


steam_data_paths = glob.glob('steam_data/*')
steam_data_ids = list()
for steam_data_path in steam_data_paths:
    steam_data_ids.append(steam_data_path.split('/')[1])

steam_spy_data_paths = glob.glob('steam_spy_data/*')
steam_spy_data_ids = list()
for steam_spy_data_path in steam_spy_data_paths:
    steam_spy_data_ids.append(steam_spy_data_path.split('/')[1])

missing_ids = list(set(steam_data_ids) - set(steam_spy_data_ids))


for id in missing_ids:   
    print(id)
    while True:
        if action(id):
            break


