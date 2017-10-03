package api;

import Model.Friend;

import java.util.ArrayList;

public class Friends {
    private long requestID;
    private ArrayList<Friend> friends;

    public Friends(long id, ArrayList<Friend> ps){
        requestID = id;
        friends = ps;
    }

    public long getRequestID() { return requestID; }
    public ArrayList<Friend> getFriends() { return friends; }

    public void setRequestID(long requestID) { this.requestID = requestID; }
    public void setFriends(ArrayList<Friend> friends) { this.friends = friends; }
}
