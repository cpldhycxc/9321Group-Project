package Model;

public class FriendRequest {
    private int fromUserID;
    private int requestUserID;

    public FriendRequest(int id1, int id2){
        fromUserID = id1;
        requestUserID = id2;
    }

    public int getFromUserID() { return fromUserID; }
    public int getRequestUserID() { return requestUserID; }

    public void setFromUserID(int fromUserID) { this.fromUserID = fromUserID; }
    public void setRequestUserID(int requestUserID) { this.requestUserID = requestUserID; }
}
