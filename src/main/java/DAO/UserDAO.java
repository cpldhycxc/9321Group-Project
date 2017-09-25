package DAO;

import Model.User;

import java.io.Serializable;

public interface UserDAO extends Serializable {
    public void insertUser(User aUser);
}
