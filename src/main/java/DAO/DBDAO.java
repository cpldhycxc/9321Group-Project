package DAO;

import Model.User;
import java.sql.Connection;

/**
 * interface for our DAOImpl class
 */
public interface DBDAO {
    public Connection connect();
    public boolean userSignUp(User aUser);
    public void userActivation(String userName);
    public void userExistence(User aUser);
}
