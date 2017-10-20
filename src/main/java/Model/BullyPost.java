package Model;

public class BullyPost {
	private int postID;
	private int userID;
	
	public BullyPost(int postI, int userI){
		this.postID = postI;
		this.userID = userI;
	}

	public int getPostID() { return postID; }
 
	public int getUserID() { return userID; }

	public void setPostID(int postID) { this.postID = postID; }

	public void setUserID(int userID) { this.userID = userID; }
	
}
