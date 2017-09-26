#!/usr/bin/python3
import sqlite3

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
        photo       TEXT,
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
        image       TEXT,
        postTime    DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userID) REFERENCES Users(userID));''')
conn.execute('CREATE INDEX postUserIDIndex ON Posts(userID)')
conn.execute('CREATE INDEX postTime ON Posts(postTime)')


conn.execute('''DROP TABLE IF EXISTS Friends;''')
conn.execute('''CREATE TABLE Friends
       (userID      INTEGER  NOT NULL,
        friendID    INTEGER  NOT NULL,
        PRIMARY KEY (userID, friendID),
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

print("Table created successfully")
print("")
print("Insert Admin user")
print("If you want to login Please use userName and password below")
print("UserName = Admin")
print("Password = Admin")

conn.execute("INSERT INTO Users (userName, password, email, firstName, lastName, gender, userType) VALUES (?,?,?,?,?,?,?)",
             ("Admin", "Admin", "shiyun.zhangsyz@gmail.com", "JuBian", "Liang", "female", 2))
conn.commit()
print("Insert Completed")

conn.close()