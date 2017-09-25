package DAO;

import Model.User;

import java.sql.Connection;

public interface DBDAO {
    public Connection connect();
    public void userSignUp(User aUser);
    public void userActivation(String userName);
    public void userExistence(User aUser);
}
