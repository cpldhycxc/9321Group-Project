import requests
from bs4 import BeautifulSoup
import codecs
import unicodecsv
import sys
import re
import glob
import json

"""
# 7330
python scraper.py [name]

name = (ryan|nik|david|andre|shiyun1|shiyun2)
"""

class scraper():
    def __init__(self, appid):
        self.day_range = '9223372036854776000'
        self.language = 'english'
        self.recommendation_ids = []
        self.max_reviews = 1000000
        self.csv_unicode_writer = None

        self.get_all_reviews_for_appid(appid)

    def get_reviews_for_appid(self,app_id=None,type=None,offset=0):
        if type is None:
            type = 'all'

        url = 'http://store.steampowered.com//appreviews/{0}?start_offset={1}&day_range={2}&filter={3}&language={4}'
        url = url.format(app_id,offset,self.day_range,type,self.language)
        print url
        r = requests.get(url)
        json = r.json()
        if json.get('success') == 1:
            # print json['html'].encode('utf-8')
            soup = BeautifulSoup(json['html'], "lxml")
            review_box = soup.find_all('div',class_="review_box")
            index = -1
            has_new_data = False
            for review in review_box:
                index += 1
                review_text = review.find('div',class_="content").get_text(strip=True).replace('\n','|')
                recommendation_id = json['recommendationids'][index]
                if recommendation_id in self.recommendation_ids:
                    continue
                else:
                    has_new_data = True
                    self.recommendation_ids.append(recommendation_id)
                if len(self.recommendation_ids) > self.max_reviews:
                    return False

                temp = re.search(r'\d{17}', review.find('div',class_="persona_name").find('a')['href'])
                if temp is None:
                    user_id = ""
                else:
                    user_id = temp.group(0)
                persona_name = review.find('div',class_="persona_name").get_text(strip=True).replace("\n",'|')
                posted_date = review.find('div',class_="postedDate").get_text(strip=True)
                recommendation = review.find('div',class_="title ellipsis").get_text(strip=True)
                row = [user_id, recommendation, app_id, json['recommendationids'][index], posted_date, type, persona_name, review_text ]
                if self.csv_unicode_writer is None:
                    self.init_unicodecsv('reviews_' + app_id + '.csv')
                self.csv_unicode_writer.writerow(row)
            print len(self.recommendation_ids)
            return has_new_data
        else:
            raise Exception("error, invalid json response")
            

    def init_unicodecsv(self,filename=None):
        if filename is None:
            filename = 'steam_reviews.csv'
        self.csv_fh = codecs.open('extend_review/' + filename, 'wb')
        self.csv_fh.write(u'\uFEFF'.encode('utf8'))
        self.csv_unicode_writer = unicodecsv.writer(self.csv_fh, encoding='utf-8')
        header = ['user_id', 'recommendation', 'app_id','review_id','date','type','username','review_text']
        self.csv_unicode_writer.writerow(header)

    def get_all_reviews_for_appid(self,app_id=None,type=None):
        self.get_reviews_for_appid(app_id, type, 0)
        self.get_reviews_for_appid(app_id, type, 5)
        offset = 25
        while self.get_reviews_for_appid(app_id, type, offset):
            offset += 25

if __name__ == "__main__":

    steam_review_id = list()
    paths = glob.glob('steam_game_review/*')
    max_review = 0
    total_num = 0

    for review_path in paths:
        data_dict = json.loads(open(review_path).read())
        if data_dict['query_summary']['total_reviews'] > 20:
            total_num += data_dict['query_summary']['total_reviews']
            if max_review < data_dict['query_summary']['total_reviews']:
                max_review = data_dict['query_summary']['total_reviews']
            steam_review_id.append(review_path.split('/')[1])

    steam_review_id.sort(key=int)

    if len(sys.argv) < 2:
        print("Usage: python scraper.py (ryan|nik|david|andre|shiyun1|shiyun2)")
        exit()

    if sys.argv[1] == 'ryan':
        each_person_ids = steam_review_id[0:1200]
    elif sys.argv[1] == 'nik':
        each_person_ids = steam_review_id[1200:2400]
    elif sys.argv[1] == 'david':
        each_person_ids = steam_review_id[2400:3600]
    elif sys.argv[1] == 'andre':
        each_person_ids = steam_review_id[3600:4800]
    elif sys.argv[1] == 'shiyun1':
        each_person_ids = steam_review_id[4800:6000]
    elif sys.argv[1] == 'shiyun2':
        each_person_ids = steam_review_id[6000:7330]
    else:
        print("Usage: python scraper.py (ryan|nik|david|andre|shiyun1|shiyun2)")
        exit()

    print("number of game with more than 20 reviews: " + str(len(steam_review_id)))
    print("max number of reviews: " + str(max_review))
    print("total number of reviews: " + str(total_num))



    print(len(each_person_ids))

    # bug 216390

    for appid in each_person_ids:
        if int(appid) <= 216390:
            continue
        scraper(appid)
    
    # s.get_all_reviews_for_appid('427820', type='all')
