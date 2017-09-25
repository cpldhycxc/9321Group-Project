package api;

import Model.User;
import DAO.*;

public class InsertUser {
    private long requestID;
    private boolean success;
    private User u;

    public InsertUser(long id, String userName, String password, String email, String firstName, String lastName, int gender) {
        requestID = id;
        u = new User();
        u.setUserName(userName);
        u.setPassword(password);
        u.setEmail(email);
        u.setFirstName(firstName);
        u.setLastName(lastName);
        u.setGender(gender);
        success = true;

    }

    public long getRequestID() {
         return requestID;
    }

    public User getU() {
        return u;
    }

    public boolean getSuccess() {
        return success;
    }
}
