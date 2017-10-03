package Model;

public class UserP {
	private String selectUserName;
	private String userName;
	
	public UserP(String selected, String current){
		selectUserName = selected;
		userName = current;
	}
	
	public UserP() {
		selectUserName = null;
		userName = null;
	}
	
	public String getSelectUserName() {
		return selectUserName;
	}

	public String getUserName() {
		return userName;
	}

	public void setSelectUserName(String selectUserName) {
		this.selectUserName = selectUserName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}


	
}
