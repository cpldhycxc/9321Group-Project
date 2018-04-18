#!/usr/bin/python3

import json
import glob
import requests
import sqlite3
import os
import re

# get rid of all non game record
paths = glob.glob("steam_data/*")
for path in paths:
    type_of = ''
    with open(path) as f:
        data = f.read()
        data_dict = json.loads(data)
        type_of = data_dict['type']
        print("Type of " + str(data_dict['steam_appid']) + " is " + data_dict['type'] )

    if type_of != 'game':
        os.remove(path)
        print("removed " + str(data_dict['steam_appid']))
    print()


conn = sqlite3.connect('mysqlite.db')
c = conn.cursor()
print("Open database successfully")

# for each game record update db
game_paths = glob.glob("steam_data/*")

visited = dict()

for path in game_paths:
    with open(path) as f:

        data = f.read()
        data_dict = json.loads(data)
        
        print(data_dict['steam_appid'])

        if str(data_dict['steam_appid']) in visited:
            continue

        visited[str(data_dict['steam_appid'])] = 0  

        game_name = data_dict['name']
        game_id = data_dict['steam_appid']

        if 'required_age' not in data_dict.keys():
            required_age = 0
        else:
            required_age = data_dict['required_age']

        detailed_description = data_dict['detailed_description']

        header_image = data_dict['header_image']

        if 'developers' not in data_dict.keys():
            developers = None
        else:
            developers = ', '.join(data_dict['developers'])
            print(developers)

        if 'publishers' not in data_dict.keys():
            publishers = None
        else:
            publishers = ', '.join(data_dict['publishers'])
            print(publishers)

        if 'price_overview' not in data_dict.keys():
            price_overview = None
            price = None
        else:
            price_overview = data_dict['price_overview']
            price = price_overview['final']/100.0
            print(price)


        if 'categories' not in data_dict.keys():
            categories = None
        else:
            categories = data_dict['categories']
            for cat in categories:
                print(cat['description'])


        if 'genres' not in data_dict.keys():
            genres = None
        else:
            genres = data_dict['genres']
            for gen in genres:
                print(gen['description'])

        platforms = data_dict['platforms']
        linux = platforms['linux']
        mac = platforms['mac']
        windows = platforms['windows']

        if 'supported_languages' not in data_dict.keys():
            supported_languages = None
        else:
            supported_languages = data_dict['supported_languages']
            supported_languages = re.sub(r'<[^>]+>', '', supported_languages)
            supported_languages = re.sub(r'\*\*', ' ', supported_languages)
            supported_languages = re.sub(r'\*', '', supported_languages)
            supported_languages = re.sub(r'\[[^\[\]]+\]', '', supported_languages)
            supported_languages = re.sub(r'\s*languages with full audio support\s*', '', supported_languages)



        print()

        # insert into the game list
        conn.execute("INSERT INTO backend_gamelist (game_id, game_name, image_url, game_description, support_language, required_age, developer, publisher, linux, mac, windows, price) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
            (game_id,
                game_name,
                header_image,
                detailed_description,
                supported_languages,
                required_age,
                developers,
                publishers,
                linux,
                mac,
                windows,
                price))

        # insert into the categories list
        if categories is not None:
            for cat in categories:
                conn.execute("INSERT INTO backend_categories (game_id_id, category) VALUES (?,?)", (game_id, cat['description']))

        # insert into the genres 
        if genres is not None:      
            for gen in genres:
                conn.execute("INSERT INTO backend_genres (game_id_id, genre) VALUES (?,?)", (game_id, gen['description']))

        
        # print("name: " + str(data_dict['name']))
        # print("steam_appid: " + str(data_dict['steam_appid']))
        # print("required_age: " + str(data_dict['required_age']))
        # print("detailed_description: " + str(data_dict['detailed_description']))
        # print("header_image: " + str(data_dict['header_image']))
        # print("developers: " + str(data_dict['developers'])) # list
        # print("publishers: " + str(data_dict['publishers'])) # list
        # print("price: " + str(data_dict['price_overview'])) # dict
        # print("platforms: " + str(data_dict['platforms'])) # windows, linux, mac
        # print("categories: " + str(data_dict['categories'])) # list of dict
        # print("genres: " + str(data_dict['genres'])) # list of dict

print("Inserting Done")
conn.commit()
conn.close()