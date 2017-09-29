package api;

import Model.User;
import Model.Post;
import DAO.*;


public class DeletePost {
	private int postId;
	private boolean result;
	
	public DeletePost(int postid, boolean re) {
		this.postId = postid;
		this.result = re;
	}

	public int getPostId() {
		return postId;
	}

	public boolean isResult() {
		return result;
	}
}
