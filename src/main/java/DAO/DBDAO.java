package DAO;

import Model.User;
import org.json.JSONArray;

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
    public ArrayList<User> Search(String param);
}
