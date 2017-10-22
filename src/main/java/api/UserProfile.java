package api;

import Model.Post;
import Model.Friend;


import java.text.SimpleDateFormat;
import java.util.ArrayList;

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
//	    private Date birthday; //date format like 2017-09-12T02:00:00.00
	    private String birthday;
	    private int userType;
//	    private Date joinTime;
	    private String joinTime;
	    
	    private ArrayList<Post> postList;
	    private ArrayList<Friend> friendList;
	    
	    private boolean relationShip;
	    
	    public UserProfile(int userId,String username, String em, String firstname, String lastname,String gend, String birthDay,int usertype,String jointime,ArrayList<Post> posts,ArrayList<Friend> friends, boolean rela) {
	    	userID = userId;
	    	userName = username;
	    	email = em;
	    	firstName = firstname;
	    	lastName = lastname;
	    	gender = gend;
	    	birthday = birthDay;
	    	userType = usertype;
	    	joinTime = jointime;
	    	postList = posts;
	    	friendList = friends;
	    	relationShip = rela;
	    	
//	    	String format = "yyyy-MM-dd";
//	        SimpleDateFormat sdf =  new SimpleDateFormat(format);
//	        birthday = birthday.split("T")[0];
//	        try {
//	            this.birthday = sdf.parse(birthday);
//	        } catch (ParseException e) {
//	            e.printStackTrace();
//	        }
//
//	        joinTime = joinTime.split("T")[0];
//	        try {
//	            this.birthday = sdf.parse(joinTime);
//	        } catch (ParseException e) {
//	            e.printStackTrace();
//	        }
	    }
	    
	    public boolean isRelationShip() {
			return relationShip;
		}

		public void setRelationShip(boolean relationShip) {
			this.relationShip = relationShip;
		}

		public UserProfile() {
		    this.userID = 0;
		    this.userName = null;
		    this.email = null;
		    this.firstName = null;
		    this.lastName = null;
		    this.gender = null;
		    this.birthday = null; //date format like 2017-09-12T02:00:00.00
		    this.userType = UNACTIVATED;
		    this.joinTime = null;
		    this.friendList = new ArrayList<Friend>();
		    this.postList = new ArrayList<Post>();
		    this.relationShip = false;
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

		public String getBirthday() {
			return birthday;
		}


		public int getUserType() {
			return userType;
		}

		public String getJoinTime() {
			return joinTime;
		}
		
		public ArrayList<Post> getPostList() {
			return postList;
		}
		
		public ArrayList<Friend> getFriendList() {
			return friendList;
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

		public void setBirthday(String birthday) {
			this.birthday = birthday;
		}


		public void setUserType(int userType) {
			this.userType = userType;
		}

		public void setJoinTime(String joinTime) {
			this.joinTime = joinTime;
		}
		
		public void setPostList(ArrayList<Post> postL) {
			this.postList = postL;
		}
		
		public void setFriendList(ArrayList<Friend> friendL) {
			this.friendList = friendL;
		}


	    
}


