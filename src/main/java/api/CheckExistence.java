package api;

public class CheckExistence {
	private String userName;
	private boolean result;
	
	public CheckExistence(String userN, boolean re) {
		userName = userN;
		result= re;
	}

	public boolean isResult() {
		return result;
	}
	public String getUserName() {
		return userName;
	}
}
