#!/usr/bin/python3

"""
remove game with repeat id
"""
import requests
import json
import time
import socket
import glob
import sys
import os

if len(sys.argv) < 2:
    print("Usage: python3.6 check_name_content_match.py (steam|steamspy)")
    exit(1)
elif sys.argv[1] == "steam":
    name = "steam_data"
elif sys.argv[1] == "steamspy":
    name = "steam_spy_data"
else:
    print("Usage: python3.6 check_name_content_match.py (steam|steamspy)")
    exit(1)

paths = glob.glob(name + '/*')
for path in paths:
    true_appid = path.split('/')[1]
    f = open(path)
    data_dict = json.loads(f.read())
    if str(data_dict['steam_appid']) != true_appid:
        print(path)
        print("true_appid: " + true_appid + " what it contains: " + str(data_dict['steam_appid']))
        print()
        os.remove(path)