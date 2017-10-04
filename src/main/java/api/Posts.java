package api;

import Model.Post;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties
public class Posts {
    private long requestID;
    private ArrayList<Post> posts;

    public Posts(long id, ArrayList<Post> ps){
        requestID = id;
        posts = ps;
    }

    public long getRequestID() { return requestID; }
    public ArrayList<Post> getPosts() { return posts; }

    public void setRequestID(long requestID) { this.requestID = requestID; }
    public void setPosts(ArrayList<Post> posts) { this.posts = posts; }
}
