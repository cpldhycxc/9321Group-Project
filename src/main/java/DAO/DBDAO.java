package DAO;

import Model.User;
import java.sql.Connection;

public interface DBDAO {
    public Connection connect();
    public boolean userSignUp(User aUser);
    public void userActivation(String userName);
    public void userExistence(User aUser);
}
