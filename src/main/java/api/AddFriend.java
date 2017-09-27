package api;

public class AddFriend {
    private long requestID;
    private boolean success;

    AddFriend(long id, boolean suc){
        requestID = id;
        success = suc;
    }

    public long getRequestID() { return requestID; }
    public boolean getSuccess() { return success; }

    public void setRequestID(long requestID) { this.requestID = requestID; }
    public void setSuccess(boolean success) { this.success = success; }
}
