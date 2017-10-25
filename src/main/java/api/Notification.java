package api;

public class Notification {
	private int userID;
	private String noti;
	
	public Notification(int userid, String not) {
		this.userID = userid;
		this.noti = not;
	}

	public int getUserID() {
		return userID;
	}

	public String getNoti() {
		return noti;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	public void setNoti(String noti) {
		this.noti = noti;
	}
}
