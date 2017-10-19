package DAO;

import Model.Friend;
import Model.Node;
import Model.Post;
import Model.User;
import api.GraphQuery;
import api.UserActivities;
import api.UserProfile;

import com.sun.corba.se.impl.orbutil.graph.Graph;
import org.json.JSONArray;

import java.sql.Array;
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
    public ArrayList<UserProfile> search(String param);
    public ArrayList<UserProfile> advSearch(String gender, String dob,  String userName, String firstName, String lastName);
    public UserActivities userActivities(int userID);

    public boolean userExistence(String userName);
    public UserProfile userProfile(String selectedName,String userName);
    public boolean deletePost(int postID);
    public String getEmailByUserID(int userID);
    public void addFriendRelation(int userID, int friendID);
    public ArrayList<Post> getOwnPostsByUserID(int userID);
    public boolean likePost(int userID, int postID);
    public int getUserIdByPostID(int postID);
    public ArrayList<Post> getPostsRandomly();
    public Post getPostByPostID(int postID);
    public String getUserNameByUserID(int userID);
    public long addPost(int userID, String content);
//    public UserActivities userActivities(int userID);
    public UserProfile editProfile(String userID,String fname, String lname, String dob, String email, String gender);
    public void deleteFriendRelation(int userID, int friendID);
    public void backUserActivation(int userID);

    public GraphQuery getWholeGraph();
    public GraphQuery getUserGraph(String userID);
    public GraphQuery getPostGraph(String postID);
    public GraphQuery getFriendGraph(String userID);
}
