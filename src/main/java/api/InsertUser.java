package api;

import Model.User;
import DAO.*;

/**
 * API class that help to return a json
 */
public class InsertUser {
    private long requestID;
    private boolean success;
    private User u;

    public InsertUser(long id, boolean suc, User aUser) {
        requestID = id;
        success = suc;
    }

    public long getRequestID() {
         return requestID;
    }


    public boolean getSuccess() {
        return success;
    }
}
