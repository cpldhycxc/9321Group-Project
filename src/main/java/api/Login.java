package api;

import Model.Friend;
import Model.Post;
import Model.User;

import java.util.ArrayList;

public class Login {
    private boolean success;
    private User user;
    private ArrayList<Friend> friends;
    private ArrayList<Post> posts;

    public boolean getSuccess(){ return success; }
    public User getUser() { return user; }
    public ArrayList<Friend> getFriends() { return friends; }
    public ArrayList<Post> getPosts() { return posts; }

    public void setSuccess(boolean success) { this.success = success; }
    public void setUser(User user) { this.user = user; }
    public void setFriends(ArrayList<Friend> friends) { this.friends = friends; }
    public void setPosts(ArrayList<Post> posts) { this.posts = posts; }
}
