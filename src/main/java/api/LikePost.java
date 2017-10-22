package api;

public class LikePost {
	private int userID;
	private int postID;
	private boolean result;
	
	public LikePost(int userid, int postid, boolean re) {
		this.userID = userid;
		this.postID = postid;
		this.result = re;
	}

	public int getUserID() {
		return userID;
	}

	public int getPostID() {
		return postID;
	}

	public boolean isResult() {
		return result;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	public void setPostID(int postID) {
		this.postID = postID;
	}

	public void setResult(boolean result) {
		this.result = result;
	}
}
