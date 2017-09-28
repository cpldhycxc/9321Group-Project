package DAO;

import Model.Friend;
import Model.Post;
import Model.User;
import api.UserActivities;
import api.UserProfile;

import org.json.JSONArray;

import java.sql.Connection;
import java.util.ArrayList;

/**
 * interface for our DAOImpl class
 */
public interface DBDAO {
    public Connection connect();
    public boolean userSignUp(User aUser);
    public void userActivation(int userID);
    public int getUserIdByUserName(String userName);
    public User getUserByUserName(String userName, String password);
    public ArrayList<Post> getPostsByUserID(int userID);
    public ArrayList<Friend> getFriendsByUserID(int userID);
    public ArrayList<User> Search(String param);
    public boolean userExistence(String userName);
    public UserProfile userProfile(String userName);
    public boolean deletePost(int postID);
    public String getEmailByUserID(int userID);
    public void addFriendRelation(int userID, int friendID);
    public UserActivities userActivities(int userID);
}
