package Model;

public class FriendRequest {
    private int userID;
    private String userName;
    private int friendID;
    private String friendName;

    public int getUserID() { return userID; }
    public int getFriendID() { return friendID; }
    public String getUserName() { return userName; }
    public String getFriendName() { return friendName; }

    public void setUserID(int userID) { this.userID = userID; }
    public void setFriendID(int friendID) { this.friendID = friendID; }
    public void setUserName(String userName) { this.userName = userName; }
    public void setFriendName(String friendName) { this.friendName = friendName; }
}
