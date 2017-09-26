package DAO;

import Model.Friend;
import Model.Post;
import Model.User;
import java.sql.Connection;
import java.util.ArrayList;

/**
 * interface for our DAOImpl class
 */
public interface DBDAO {
    public Connection connect();
    public boolean userSignUp(User aUser);
    public void userActivation(String userName);
    public void userExistence(User aUser);
    public int getUserIdByUserName(String userName);
    public User getUserByUserName(String userName, String password);
    public ArrayList<Post> getPostsByUserID(int userID);
    public ArrayList<Friend> getFriendsByUserID(int userID);
}
