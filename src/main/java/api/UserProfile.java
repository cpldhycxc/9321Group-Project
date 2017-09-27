package api;

import Model.User;
import DAO.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class UserProfile {
	 	public static final int ADMIN = 2;
	    public static final int ACTIVATED = 1;
	    public static final int UNACTIVATED = 0;
	    public static final SimpleDateFormat SDF =  new SimpleDateFormat("yyyy-MM-dd");
	    private int userID;
	    private String userName;
	    private String email;
	    private String firstName;
	    private String lastName;
	    private String gender;
	    private Date birthday; //date format like 2017-09-12T02:00:00.00
	    private String photo;
	    private int userType;
	    private Date joinTime;
	    
	    public UserProfile(int userId,String username, String em, String firstname, String lastname,String gend, String birthday,String pht,int usertype,String joinTime) {
	    	userID = userId;
	    	userName = username;
	    	email = em;
	    	firstName = firstname;
	    	lastName = lastname;
	    	gender = gend;
//	    	birthday = birthDay;
	    	photo = pht;
	    	userType = usertype;
//	    	joinTime = jointime;
	    	
	    	String format = "yyyy-MM-dd";
	        SimpleDateFormat sdf =  new SimpleDateFormat(format);
	        birthday = birthday.split("T")[0];
	        try {
	            this.birthday = sdf.parse(birthday);
	        } catch (ParseException e) {
	            e.printStackTrace();
	        }

	        joinTime = joinTime.split("T")[0];
	        try {
	            this.birthday = sdf.parse(joinTime);
	        } catch (ParseException e) {
	            e.printStackTrace();
	        }
	    }
	    
	    public UserProfile() {
		    this.userID = 0;
		    this.userName = null;
		    this.email = null;
		    this.firstName = null;
		    this.lastName = null;
		    this.gender = null;
		    this.birthday = null; //date format like 2017-09-12T02:00:00.00
		    this.photo = null;
		    this.userType = UNACTIVATED;
		    this.joinTime = null;
	    }

		public int getUserID() {
			return userID;
		}

		public String getUserName() {
			return userName;
		}

		public String getEmail() {
			return email;
		}

		public String getFirstName() {
			return firstName;
		}

		public String getLastName() {
			return lastName;
		}

		public String getGender() {
			return gender;
		}

		public Date getBirthday() {
			return birthday;
		}

		public String getPhoto() {
			return photo;
		}

		public int getUserType() {
			return userType;
		}

		public Date getJoinTime() {
			return joinTime;
		}

		public void setUserID(int userID) {
			this.userID = userID;
		}

		public void setUserName(String userName) {
			this.userName = userName;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}

		public void setLastName(String lastName) {
			this.lastName = lastName;
		}

		public void setGender(String gender) {
			this.gender = gender;
		}

		public void setBirthday(Date birthday) {
			this.birthday = birthday;
		}

		public void setPhoto(String photo) {
			this.photo = photo;
		}

		public void setUserType(int userType) {
			this.userType = userType;
		}

		public void setJoinTime(Date joinTime) {
			this.joinTime = joinTime;
		}


	    
}


