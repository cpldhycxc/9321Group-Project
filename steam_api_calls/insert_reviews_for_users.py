#!/usr/bin/python3

import requests
import json
import sqlite3
import glob
import time
import os
import re
import datetime

# get all the userId and userNames in a dict from db
conn = sqlite3.connect("mysqlite.db")
c = conn.cursor()
print("open database successfully")

c.execute("SELECT user_id, user_name FROM backend_user")

temp = c.fetchall()

name_dict = dict()

for tup in temp:
    name_dict[tup[0]] = tup[1]
    name_dict[tup[1]] = tup[0]

# get list of id we can get from steam_data and list of id we can get from steam_game_review
extend_review_ids = list()
steam_game_review_ids = list()
paths = glob.glob('steam_game_review/*')

for review_path in paths:
    steam_game_review_ids.append(int(review_path.split('/')[1]))
    data_dict = json.loads(open(review_path).read())
    if data_dict['query_summary']['total_reviews'] > 20:
        extend_review_ids.append(int(review_path.split('/')[1]))


steam_game_review_ids = list(set(steam_game_review_ids) - set(extend_review_ids))
steam_game_review_ids.sort()
extend_review_ids.sort()

print(len(steam_game_review_ids))
print(len(extend_review_ids))

print("Insert normal game start")

for normal_id in steam_game_review_ids:
    break
    normal_dict = json.loads(open("steam_game_review/" + str(normal_id)).read())
    for each_review_dict in normal_dict['reviews']:
        if int(each_review_dict['author']['steamid']) in name_dict:
            # print(each_review_dict)
            time_stamp = each_review_dict['timestamp_updated']
            time_stamp = time.strftime('%Y-%m-%d', time.localtime(time_stamp))
            rate = each_review_dict['voted_up'] 
            comment = each_review_dict['review']
            game_id = normal_id
            user_id = int(each_review_dict['author']['steamid'])

            print("time: " + str(time_stamp))
            print("rate: " + str(rate))
            print("comment: " + comment)
            print("game_id: " + str(game_id))
            print("user_id: " + str(user_id))
            
            conn.execute("INSERT INTO backend_rating (rate, comment, rated_time, game_id_id, user_id_id) VALUES (?,?,?,?,?)",(rate, comment, time_stamp, game_id, user_id))

print("Insert normal game reviews finished")
print()

# rename all the files
for path in glob.glob('extend_review/*'):
    if re.match(r'extend_review/reviews_\d+\.csv', path):
        game_id = re.search(r'\d+', path).group(0)
        os.rename(path, 'extend_review/' + str(game_id))

print("Insert extend review")
# insert
paths = glob.glob('extend_review/*')
for extend_id in extend_review_ids:
    path = 'extend_review/' + str(extend_id)
    if path not in paths:
        continue
    with open(path) as f:
        lines = f.readlines()[1:]
        for line in lines:
            review_dict = dict()
            # get user_id
            m = re.match(r'(\d{17},)', line)
            if m:
                line = re.sub(r'^' + m.group(0), '', line)
                review_dict['user_id'] = re.sub(',', '', m.group(0))
            else:
                line = re.sub(r'^\,', '', line)
                review_dict['user_id'] = ""

            # get recommendation
            m = re.search(r'^.*?,', line)
            review_dict['recommendation'] = m.group(0)
            line = re.sub(r'^' + review_dict['recommendation'], '', line)
            review_dict['recommendation'] = re.sub(',', '', review_dict['recommendation'])
            if review_dict['recommendation'] == "Recommended":
                review_dict['recommendation'] = True
            else:
                review_dict['recommendation'] = False

            # get game id
            m = re.search(r'^.*?,', line)
            review_dict['game_id'] = m.group(0)
            line = re.sub(r'^' + review_dict['game_id'], '', line)
            review_dict['game_id'] = re.sub(',', '', review_dict['game_id'])

            # get rid of review id
            line = re.sub(r'^\d+,', '', line)

            # get date
            m = re.search(r'^\"Posted: .*?\",', line)
            if m:
                review_dict['time'] = m.group(0)
                line = re.sub(r'^' + review_dict['time'], '', line)
                review_dict['time'] = re.sub(r'\"', '', review_dict['time'])
                review_dict['time'] = re.sub(r'\,', '', review_dict['time'])
                review_dict['time'] = re.sub(r'Posted: ', '', review_dict['time'])
                try:
                    review_dict['time'] = datetime.datetime.strptime(review_dict['time'], '%d %B %Y').strftime('%Y-%m-%d')
                except ValueError:
                    review_dict['time'] = datetime.datetime.strptime(review_dict['time'], '%B %d %Y').strftime('%Y-%m-%d')
            else:
                m = re.search(r'^Posted: .*?,', line)
                review_dict['time'] = m.group(0)
                line = re.sub(r'^' + review_dict['time'], '', line)
                review_dict['time'] = re.sub(r'\,', '', review_dict['time'])
                review_dict['time'] = re.sub(r'Posted: ', '', review_dict['time'])
                review_dict['time'] = review_dict['time'] + " 2017"
                try:
                    review_dict['time'] = datetime.datetime.strptime(review_dict['time'], '%d %B %Y').strftime('%Y-%m-%d')
                except ValueError:
                    review_dict['time'] = datetime.datetime.strptime(review_dict['time'], '%B %d %Y').strftime('%Y-%m-%d')
            
            # get rid of review type
            line = re.sub(r'^\w+,', '', line)

            # get user_name
            m = re.search(r'^".*?",', line)
            if m:
                review_dict['user_name'] = m.group(0)
                line = re.sub(r'^' + re.escape(review_dict['user_name']), '', line)
            else:
                m = re.search(r'.*?,', line)
                review_dict['user_name'] = m.group(0)
                line = re.sub(r'^' + re.escape(review_dict['user_name']), '', line)
            review_dict['user_name'] = re.sub(',$', '', review_dict['user_name'])
            review_dict['user_name'] = re.sub('(?<!\")\"{1}(?!\")', '', review_dict['user_name'])
            review_dict['user_name'] = re.sub('(?<!\")\"{2}(?!\")', '\"', review_dict['user_name'])
            review_dict['user_name'] = re.sub('(?<!\")\"{3}(?!\")', '\"\"', review_dict['user_name'])
            
            # get comment 
            review_dict['comment'] = line
            review_dict['comment'] = re.sub('(?<!\")\"{1}(?!\")', '', review_dict['comment'])
            review_dict['comment'] = re.sub('(?<!\")\"{2}(?!\")', '\"', review_dict['comment'])
            review_dict['comment'] = re.sub('(?<!\")\"{3}(?!\")', '\"\"', review_dict['comment'])

            #print(review_dict)

            if review_dict['user_id'] == "":
                if review_dict['user_name'] in name_dict.keys():
                    conn.execute("INSERT INTO backend_rating (rate, comment, rated_time, game_id_id, user_id_id) VALUES (?,?,?,?,?)",
                        (review_dict['recommendation'], review_dict['comment'], review_dict['time'], review_dict['game_id'], name_dict[review_dict['user_name']]))
            elif int(review_dict['user_id']) in name_dict.keys():
                conn.execute("INSERT INTO backend_rating (rate, comment, rated_time, game_id_id, user_id_id) VALUES (?,?,?,?,?)",
                        (review_dict['recommendation'], review_dict['comment'], review_dict['time'], review_dict['game_id'], int(review_dict['user_id'])))

           
print("Finish Insert extend review")

conn.commit()

conn.close()

