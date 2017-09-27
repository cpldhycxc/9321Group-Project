package Model;

import java.util.Date;
import java.text.ParseException;

public class Post {
    private int postId;
    private String userName;
    private String content;
    private String image;
    private Date postTime;

    public Post(int postId, String userName, String content, String image, String postTime){
        this.postId = postId;
        this.userName = userName;
        this.content = content;
        this.image = image;
        try {
            this.postTime = (User.SDF.parse(postTime));
        } catch (ParseException e) {
            e.printStackTrace();
        }

    }

    public int getPostId() { return postId; }
    public String getUserName() { return userName; }
    public String getContent() { return content; }
    public String getImage() { return image; }
    public String getPostTime() { return User.SDF.format(postTime); }

    public void setPostId(int postId) { this.postId = postId; }
    public void setUserName(String userName) { this.userName = userName; }
    public void setContent(String content) { this.content = content; }
    public void setImage(String image) { this.image = image; }
    public void setPostTime(Date postTime) { this.postTime = postTime; }
}
