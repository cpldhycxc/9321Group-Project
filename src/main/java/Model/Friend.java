package Model;

public class Friend {
    private int userID;
    private String userName;

    public Friend(int id, String name){
        userID = id;
        userName = name;
    }

    public int getUserID() { return userID; }
    public String getUserName() { return userName; }

    public void setUserName(String userName) { this.userName = userName; }
    public void setUserID(int userID) { this.userID = userID; }
}
