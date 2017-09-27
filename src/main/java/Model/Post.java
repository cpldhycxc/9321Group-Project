package Model;

import java.sql.Date;

public class Post {
    private int postId;
    private String content;
    private String image;
    private Date postTime;

    public Post(int postId, String content, String image, Date postTime){
        this.postId = postId;
        this.content = content;
        this.image = image;
        this.postTime = postTime;
    }

    public int getPostId() { return postId; }
    public String getContent() { return content; }
    public String getImage() { return image; }
    public Date getPostTime() { return postTime; }

    public void setPostId(int postId) { this.postId = postId; }
    public void setContent(String content) { this.content = content; }
    public void setImage(String image) { this.image = image; }
    public void setPostTime(Date postTime) { this.postTime = postTime; }
}
