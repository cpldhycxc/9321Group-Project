package DAO;

import Model.User;

import java.sql.Connection;

public interface DBDAO {
    public Connection connect();
    public void insertUser(User aUser);
    public void userExistence(User aUser);
}
