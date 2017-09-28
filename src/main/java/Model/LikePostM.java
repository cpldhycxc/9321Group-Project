package Model;

public class LikePostM {
	private String userName;
	private String postID;
	
	public LikePostM(String username, String postid) {
		this.userName = username;
		this.postID = postid;
	}
	
	public LikePostM() {
		userName= null;
		postID = null;
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
}
