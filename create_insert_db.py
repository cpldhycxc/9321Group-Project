#!/usr/bin/python3
import sqlite3
import glob
import random
import re

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

# user:
#     user_id, primary key
#     username
#     password
#     email
#     first name
#     last name
#     gender  # male, female
#     birthday, UTC TIME
#     photo
#     type    # 0 inactivate, 1 activated, 2 admin
#     timeJoin, UTC TIME

# friends:
#     user_id, foreign key index
#     friend_id
#     (user_id, friend_id) is primary key

# posts:
#     post_id, primary key
#     user_id, foreign key index
#     content
#     imageasd
#     timeStamp

# likeTable:
#     user_id
#     post_id
#     (user_id, post_id) is primary key

conn = sqlite3.connect('student.db')
print("Opened database successfully")

# indexs are created for primary key and unique

conn.execute('''DROP TABLE IF EXISTS Users;''')
conn.execute('''CREATE TABLE Users
       (userID      INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL,
        userName    TEXT     UNIQUE NOT NULL,
        password    TEXT     NOT NULL,
        email       TEXT     UNIQUE NOT NULL,
        firstName   TEXT,
        lastName    TEXT,
        gender      String,  
        birthday    DATETIME,
        userType    INTEGER  NOT NULL,
        joinTime    DATETIME DEFAULT CURRENT_TIMESTAMP);''')
conn.execute('CREATE INDEX firstNameIndex ON Users(firstName)')
conn.execute('CREATE INDEX lastNameIndex ON Users(lastName)')
conn.execute('CREATE INDEX genderIndex ON Users(gender)')
conn.execute('CREATE INDEX birthdayIndex ON Users(birthday)')


conn.execute('''DROP TABLE IF EXISTS Posts;''')
conn.execute('''CREATE TABLE Posts
       (postID      INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL,
        userID      INTEGER  NOT NULL,
        content     TEXT     NOT NULL,
        postTime    DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userID) REFERENCES Users(userID));''')
conn.execute('CREATE INDEX postUserIDIndex ON Posts(userID)')
conn.execute('CREATE INDEX postTime ON Posts(postTime)')
conn.execute('CREATE INDEX contentIndex ON Posts(content)')


conn.execute('''DROP TABLE IF EXISTS Friends;''')
conn.execute('''CREATE TABLE Friends
       (friendship  INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL,
        userID      INTEGER  NOT NULL,
        friendID    INTEGER  NOT NULL,
        startDate   DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userID) REFERENCES Users(userID),
        FOREIGN KEY (friendID) REFERENCES Users(userID));''')
conn.execute('CREATE INDEX firendUserIDIndex ON Friends(userID)')

conn.execute('''DROP TABLE IF EXISTS Likes;''')
conn.execute('''CREATE TABLE Likes
       (userID      INTEGER  NOT NULL,
        postID      INTEGER  NOT NULL,
        PRIMARY KEY (userID, postID),
        FOREIGN KEY (userID) REFERENCES Users(userID),
        FOREIGN KEY (postID) REFERENCES Posts(postID));''')
conn.execute('CREATE INDEX LikeUserIDIndex ON Likes(userID)')

conn.execute('''DROP TABLE IF EXISTS TripleStore''')
conn.execute('''CREATE TABLE TripleStore
       (subject        TEXT  NOT NULL,
        subjectAdd     TEXT  ,
        predicate      TEXT  NOT NULL, 
        object         TEXT  NOT NULL,
        objectAdd      TEXT  );''')
conn.execute('CREATE INDEX subjectIndex ON TripleStore(subject)')
conn.execute('CREATE INDEX predicateIndex ON TripleStore(predicate)')
conn.execute('CREATE INDEX objectIndex ON TripleStore(object)')
conn.execute('CREATE INDEX objectAddIndex ON TripleStore(objectAdd)')



print("Table created successfully")
print("")
print("Insert Admin user")
print("If you want to login Please use userName and password below")
print("UserName = Admin")
print("Password = Admin")

conn.execute("INSERT INTO Users (userName, password, email, firstName, lastName, gender, userType, birthday) VALUES (?,?,?,?,?,?,?,?)",
             ("Admin", "Admin", "553966858@qq.com", "JuBian", "Liang", "female", 2, "1996-01-01"))
conn.commit()
print("Insert Completed")

#################################### Insert

print()
print("Start Insert user data from dataSet")
# user Table
# path to all user
paths = glob.glob("sampleDataSet/*/user.txt")
conn = sqlite3.connect('student.db')

gender = ["male", "female"]


for path in paths:
    with open(path, 'r') as f:
        lines = f.read().split('\n')
        user = {'zid': None,
            'name': None,
            'password': '',
            'home_latitude': None,
            'home_longitude': None,
            'email': None,
            'home_suburb': None,
            'birthday': None,
            'program': None,
            'profile_text': None}
        for line in lines:
            if re.match(r'\s*full_name', line):
                user['name'] = re.sub(r'\s*full_name=',r'',line)
            elif re.match(r'zid=',line):
                user['zid']= re.sub(r'\s*zid=',r'',line)
            elif re.match(r'password=',line):
                user['password']= re.sub(r'\s*password=',r'',line)
            elif re.match(r'home_latitude=',line):
                user['home_latitude']= re.sub(r'\s*home_latitude=',r'',line)
            elif re.match(r'email=',line):
                user['email']= re.sub(r'\s*email=',r'',line)
            elif re.match(r'program=',line):
                user['program']= re.sub(r'\s*program=',r'',line)
            elif re.match(r'home_suburb',line):
                user['home_suburb']= re.sub(r'\s*home_suburb=',r'',line)
            elif re.match(r'\s*home_longitude=',line):
                user['home_longitude']= re.sub(r'\s*home_longitude=',r'',line)
            elif re.match(r'\s*birthday=',line):
                user['birthday']= re.sub(r'\s*birthday=',r'',line)

        conn.execute("INSERT INTO users (userName, password, email, firstName, lastName, gender, birthday, userType) VALUES (?,?,?,?,?,?,?,?)",
              (user['zid'],
               user['password'],
               user['email'],
               user['name'].split(' ')[0],
               user['name'].split(' ')[1],
               gender[random.randint(0,1)],
               user['birthday'],
               1))

c = conn.cursor()
c.execute("SELECT userName, userID FROM Users")
print("Finish adding user data")

print()
print("Start adding posts Info")
# Post Table
userNameMapUserId = {}
# pust all user id to list
for each_user in c.fetchall():
    userNameMapUserId[each_user[0]] = each_user[1]

paths = glob.glob("sampleDataSet/*/posts/*/post.txt")

for path in paths:
    m=re.search(r'(z\d{7})',path)
    zid=m.group(1)
    f = open(path, 'r')
    buff = f.read()
    buff = buff.split('\n')
    post=dict()
    post = {'zid': zid,
            'fromid': None,
            'message': None,
            'posttime': None,
            'longitude': None,
            'latitude': None,
            'commentID': None,
            'replyID': None}
    for line in buff:
        if re.match(r'^\s*message=\s*',line):
            post['message'] = re.sub(r'^\s*message=\s*', "", line)
        elif re.match(r'^\s*from=',line):
            post['fromid'] =re.sub(r'^\s*from=\s*', "", line)
        elif re.match(r'^\s*latitude=\s*', line):
            post['latitude']= re.sub(r'^\s*latitude=\s*', "", line)
        elif re.match(r'^\s*longitude=\s*',line):
            post['longitude'] =re.sub(r'^\s*longitude=\s*', "", line)
        elif re.match(r'^\s*time=\s*', line):
            post['posttime'] = re.sub(r'^\s*time=\s*', "", line)
            post['posttime'] = post['posttime'].split('+')[0]
            post['posttime'] = re.sub(r'T', " ", post['posttime'])
    #insert post

    conn.execute("INSERT INTO posts (userID, content, postTime) VALUES (?,?,?)",
                  (userNameMapUserId[post['zid']],
                   post['message'],
                   post['posttime']))
print("Finish adding posts info")


print()
print("Start Random Generate friend relationship and like relationship")
# Friends table
friend_list = []

for firid in userNameMapUserId:
    for secId in userNameMapUserId:
        friend_list.append([userNameMapUserId[firid], userNameMapUserId[secId]]) 

index_list = random.sample(range(0, len(friend_list)), 10)

for index in index_list:
    if friend_list[index][0] == friend_list[index][1]:
        continue

    conn.execute("INSERT INTO Friends (userID, friendID) VALUES (?,?)",
                  (friend_list[index][0],
                   friend_list[index][1]))
    conn.execute("INSERT INTO Friends (userID, friendID) VALUES (?,?)",
                  (friend_list[index][1],
                   friend_list[index][0]))

# Likes table
c = conn.cursor()
c.execute("SELECT postID FROM Posts")
postIds = []
for eachPost in c.fetchall():
    postIds.append(eachPost[0])

user_id_like_postId_list = []

for userId in userNameMapUserId:
    for postId in postIds:
        user_id_like_postId_list.append([userNameMapUserId[userId], postId])

index_list = random.sample(range(0, len(friend_list)), 10)

for index in index_list:
        conn.execute("INSERT INTO Likes (userID, postID) VALUES (?,?)",
                  (user_id_like_postId_list[index][0],
                   user_id_like_postId_list[index][1]))
print("Finish adding relationship")
print("")

conn.commit()

conn.close()

##########################################
con = sqlite3.connect("student.db")
con.row_factory = dict_factory
cur = con.cursor()
cur.execute("SELECT * FROM Users")
# print(cur.fetchall())
users_dict = dict()
for each_user_dict in cur.fetchall():
    users_dict[each_user_dict['userID']] = each_user_dict

print("start adding triplestore table")
print("adding user dob and gender")

for ids in users_dict.keys():
    print(users_dict[ids]['birthday'])
    con.execute("INSERT INTO TripleStore (subject, subjectAdd, predicate, object) VALUES (?,?,?,?)",
          (users_dict[ids]['userID'], users_dict[ids]['firstName'] + " " + users_dict[ids]['lastName'], "dob", users_dict[ids]['birthday']))
    con.execute("INSERT INTO TripleStore (subject, subjectAdd, predicate, object) VALUES (?,?,?,?)",
      (users_dict[ids]['userID'], users_dict[ids]['firstName'] + " " + users_dict[ids]['lastName'], "gender", users_dict[ids]['gender']))

print("finish user dob and gender")
print("")

print("adding user friendship")
cur.execute("SELECT * FROM Friends")
for fs in cur.fetchall():
    con.execute("INSERT INTO TripleStore (subject, subjectAdd, predicate, object, objectAdd) VALUES (?,?,?,?,?)",
        (fs['userID'], users_dict[fs['userID']]['firstName'] + " " + users_dict[fs['userID']]['lastName'], "friend", fs['friendID'], users_dict[fs['friendID']]['firstName'] + " " + users_dict[fs['friendID']]['lastName']))
print("finish user friendship")
print()

print("adding user post")
post_dict = dict()
cur.execute("SELECT * FROM Posts")
for post in cur.fetchall():
    # print(post)
    con.execute("INSERT INTO TripleStore (subject, subjectAdd, predicate, object, objectAdd) VALUES (?,?,?,?,?)",
        (post['userID'],  users_dict[post['userID']]['firstName'] + " " + users_dict[post['userID']]['lastName'], "posted", post['postID'], post['content'])) 
    post_dict[post['postID']] = post
print("finish user post")
print()

print("adding user like")
cur.execute("SELECT * FROM Likes")
for like in cur.fetchall():
    con.execute("INSERT INTO TripleStore (subject, subjectAdd, predicate, object, objectAdd) VALUES (?,?,?,?,?)",
        (like['userID'], users_dict[like['userID']]['firstName'] + " " + users_dict[like['userID']]['lastName'], "liked", like['postID'], post_dict[like['postID']]['content']))

print("finish user like")

print("finish adding triplestore table")

con.commit()

con.close()