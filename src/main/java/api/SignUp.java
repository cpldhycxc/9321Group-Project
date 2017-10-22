package api;

/**
 * API class that help to return a json
 */
public class SignUp {
    private long requestID;
    private boolean success;

    public SignUp(long id, boolean suc) {
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
