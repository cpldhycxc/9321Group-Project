#!/usr/bin/python3

"""
THe script get the information about users
"""

import queue
import requests
import json

user_queue = queue.Queue()
user_queue.put('76561197960435530')
temp_queue = queue.Queue()
user_id = dict()
user_id['76561197960435530'] = True

for times in range(0,2):
    print("This is the " + str(times + 1) + " round")

    while not user_queue.empty():
        friend_id = user_queue.get()
        url = "http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=157B10AF42192FDFB98E3D8A6556AFD7&steamid=%s&relationship=friend" % friend_id

        try:
            firend_dict = json.loads(requests.get(url).text)['friendslist']['friends']
        except:
            print("No friends")
            print(json.loads(requests.get(url).text))
            continue

        for each_friend_info in firend_dict:
            print("friend id adding is: " +  str(each_friend_info['steamid']))
            temp_queue.put(str(each_friend_info['steamid']))
            user_id[str(each_friend_info['steamid'])] = True

    user_queue = temp_queue
    temp_queue = queue.Queue()

    print()
    print()

with open('friend_list.txt', 'w') as f:
    for id in sorted(user_id.keys()):
        f.write(id + '\n')




