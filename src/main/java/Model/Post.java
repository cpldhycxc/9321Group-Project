package Model;

import java.util.ArrayList;
import java.util.Date;

import java.text.ParseException;
import java.util.List;

public class Post {
    private int postId;
    private int userID;
    private String userName;
    private String content;
    private Date postTime;
    private ArrayList<User> likeBy;
    private List<String> locations;
    private List<String> organizations;
    private List<String> persons;

    public Post(int postId, String userName, String content, String postTime, int userID){
        this.userID = userID;
        this.postId = postId;
        this.userName = userName;
        this.content = content;
        try {
            this.postTime = (User.SDF.parse(postTime));
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    public Post(){
        this.postId = 0;
        this.userName = null;
        this.content = null;
        this.postTime = null;
    }

    public int getPostId() { return postId; }
    public int getUserID() { return userID; }
    public String getUserName() { return userName; }
    public String getContent() { return content; }
    public String getPostTime() { return User.SDF.format(postTime); }
    public ArrayList<User> getLikeBy() { return likeBy; }

    public List<String> getLocations() {
        return locations;
    }

    public List<String> getOrganizations() {
        return organizations;
    }

    public List<String> getPersons() {
        return persons;
    }

    public void setPostId(int postId) { this.postId = postId; }
    public void setUserID(int userID) { this.userID = userID; }
    public void setUserName(String userName) { this.userName = userName; }
    public void setContent(String content) { this.content = content; }
    public void setPostTime(Date postTime) { this.postTime = postTime; }
    public void setLikeBy(ArrayList<User> likeBy) { this.likeBy = likeBy; }

    public void setLocations(List<String> locations) {
        this.locations = locations;
    }

    public void setOrganizations(List<String> organizations) {
        this.organizations = organizations;
    }

    public void setPersons(List<String> persons) {
        this.persons = persons;
    }
}
