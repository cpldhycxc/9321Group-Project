package Model;

public class LikePostM {
	private String userName;
	private String postID;
	private boolean like;
	
	public LikePostM(String username, String postid, boolean li) {
		this.userName = username;
		this.postID = postid;
		like = li;
	}
	
//
	public LikePostM() {
		userName= null;
		postID = null;
		like = false;
	}

	public String getUserName() {
		return userName;
	}

	public String getPostID() {
		return postID;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public void setPostID(String postID) {
		this.postID = postID;
	}
	public boolean isLike() {
		return like;
	}

	public void setLike(boolean like) {
		this.like = like;
	}
}
