package DAO;

import Model.Friend;
import Model.Post;
import Model.User;
import api.Activity;
import api.UserActivities;
import api.UserProfile;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import java.util.ArrayList;



//| Annotation | Meaning                                             |
//+------------+-----------------------------------------------------+
//| @Component | generic stereotype for any Spring-managed component |
//| @Repository| stereotype for persistence layer                    |
//| @Service   | stereotype for service layer                        |
//| @Controller| stereotype for presentation layer (spring-mvc)      |

/**
 * Implementation of the DAO class which talks to database.
 */
@Component
public class DBDAOImpl implements DBDAO {

    final static Logger logger = LoggerFactory.getLogger(DBDAOImpl.class);

    /**
     * function that try to make a connection with database
     * @return the connection to the database, if can't connect exception is thrown.
     */
    public Connection connect() {
        // SQLite connection string
        String url = "jdbc:sqlite:student.db";
        Connection conn = null;
        try {
            conn = DriverManager.getConnection(url);
            logger.info("Connected to database");
        } catch (SQLException e) {
            logger.info(e.getMessage());
        }
        // a connection to the database
        return conn;
    }

    /**
     * function that connect to sqlite database then, try to sign up for a user
     * @param aUser, Model class which contain user information we want to add to database
     * @return true if user successfully added, false otherwise
     */
    public boolean userSignUp(User aUser) {
        try (Connection conn = connect()) {
            // check if the user already exists
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM Users WHERE userName = '" + aUser.getUserName() + "'");
            if(rs.next()) {
                return false;
            }

            // prepare statement and ready to execute
            PreparedStatement preStatment = conn.prepareStatement("INSERT INTO Users " +
                    "(userName, password, email, firstName, lastName, gender, birthday, photo, userType)" +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            preStatment.setString(1, aUser.getUserName());
            preStatment.setString(2, aUser.getPassword());
            preStatment.setString(3, aUser.getEmail());
            preStatment.setString(4, aUser.getFirstName());
            preStatment.setString(5, aUser.getLastName());
            preStatment.setString(6, aUser.getGender());
            preStatment.setString(7, aUser.getBirthday());
            preStatment.setString(8, aUser.getPhoto());
            preStatment.setString(9, Integer.toString(aUser.getUserType()));
            preStatment.executeUpdate();
            logger.info("Adding user");
            return true;
        } catch (SQLException e){
            System.out.println(e.getMessage());
            return false;
        }
    }


    /**
     * get user id for a user, assume the user already exist
     * @param userName
     * @return
     */
    public int getUserIdByUserName(String userName) {
        int userID = -1;
        try (Connection conn = connect()){
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT userID FROM Users WHERE userName = '" + userName + "'");
            userID = rs.getInt(1);
        } catch (SQLException e){
            e.printStackTrace();
        }
        return userID;
    }

    /**
     * get user info by userName
     * @param userName
     * @return if username doesn't exist userName field of the user is null, otherwise return user info
     */
    public User getUserByUserName(String userName, String password) {
        User user = new User();
        try (Connection conn = connect()){
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("" +
                    "SELECT userID, userName, email, firstName, lastName, gender, birthday, photo, userType, joinTime " +
                    "FROM Users WHERE userName = '" + userName + "' AND password = '" + password + "'");

            // result set start from 1
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            while(rs.next()){
                user.setUserID(rs.getInt(1));
                user.setUserName(rs.getString(2));
                user.setEmail(rs.getString(3));
                user.setFirstName(rs.getString(4));
                user.setLastName(rs.getString(5));
                user.setGender(rs.getString(6));
                user.setBirthday(format.parse(rs.getString(7)));
                user.setPhoto(rs.getString(8));
                user.setUserType(rs.getInt(9));
                user.setJoinTime(format.parse(rs.getString(10)));
            }
        } catch (SQLException | ParseException e){
            e.printStackTrace();
        }
        return user;
    }

    /**
     * give the userID of a user find out all his's post
     * @param userID
     * @return arraylist of post for the user
     */
    public ArrayList<Post> getPostsByUserID(int userID) {
        ArrayList<Post> postArrayList = new ArrayList<>();
        try (Connection conn = connect()){
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("" +
                    "SELECT postID, content, image, postTime FROM Posts WHERE userID = '" + Integer.toString(userID) + "' ORDER BY postTime DESC");
            while(rs.next()){
                postArrayList.add(new Post(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4)));
            }
        } catch (SQLException e){
            e.printStackTrace();
        }
        return postArrayList;
    }


    /**
     * give the userID of a user find out all his friend
     * @param userID
     * @return arraylist of friend of the user
     */
    public ArrayList<Friend> getFriendsByUserID(int userID){
        ArrayList<Friend> friendArrayList = new ArrayList<>();
        try (Connection conn = connect()){
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("" +
                    "SELECT Friends.friendID, Users.userName FROM Friends INNER JOIN Users " +
                    "ON Friends.friendID=Users.userID WHERE Friends.userID = '" + Integer.toString(userID) + "'");
            while(rs.next()){
                friendArrayList.add(new Friend(rs.getInt(1), rs.getString(2)));
            }
        } catch (SQLException e){
            e.printStackTrace();
        }
        return friendArrayList;
    }

    /**
     * change the userType to check if it is activated
     * @param userName
     */
    public void userActivation(String userName){
    	try (Connection conn = connect()) {
    		 String updateType = "UPDATE Users SET userType=? WHERE userName=?";
    		 PreparedStatement pstmt = conn.prepareStatement(updateType);
    		 if(userName.equals("Admin")) {
    			 pstmt.setString(1, "ADMIN");
    		 }else {
    			 pstmt.setString(1,"ACTIVATED");
    		 }    		 
    		 pstmt.setString(2, userName);
    		 pstmt.executeUpdate();
    	}catch(SQLException e){
    		System.out.println(e.getMessage());
    	}
    }
    
    /**
     * function to check if the user exists in the databse
     * @param userName as a string
     * @return true if the user exists otherwise false
     */
    public boolean userExistence(String userName){
    	boolean result = false;
    	try(Connection conn = connect()) {
    		 Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM Users WHERE userName = '" +userName+ "'");
             if(rs.next()) {
                 result = true;
             }
//
//    		Statement  stmt = conn.createStatement();
//    		ResultSet rs = stmt.executeQuery("SELECT * FROM Users WHERE userName = '" + userName + "'");
//    		if (rs.next()) {
//    			//user exists
//    			result = true;
//    		}else {
//    			result = false;
//    		}
    		
    	}catch(SQLException e) {
    		System.out.println(e.getMessage());
    	}
    	return result;
    }

    public ArrayList<UserProfile> search(String param){
        try(Connection conn = connect()){
            Statement stmt = conn.createStatement();
//            ResultSet rs = stmt.executeQuery("SELECT * FROM Users WHERE userName LIKE '% "+ param +" %' ");
            ResultSet rs = stmt.executeQuery("" +
                    "SELECT userID, userName, email, firstName, lastName, gender, birthday, userType, joinTime " +
                    "FROM Users WHERE userName LIKE '%" + param + "%'");
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            ArrayList<UserProfile> ret = new ArrayList<UserProfile>();
            System.out.println(param);
            if(rs == null){
                System.out.println("no result found");
            }
            while(rs.next()){
                UserProfile u = new UserProfile();
                System.out.println("rs: " + rs.getString(1));
                u.setUserID(rs.getInt(1));
                u.setUserName(rs.getString(2));
                u.setEmail(rs.getString(3));
                u.setFirstName(rs.getString(4));
                u.setLastName(rs.getString(5));
                u.setGender(rs.getString(6));
                u.setBirthday(rs.getString(7));
                u.setUserType(rs.getInt(8));
                u.setJoinTime(rs.getString(9));
                ret.add(u);
            }
            System.out.println();
            return ret;
        } catch(SQLException e){
            System.out.println(e.getMessage());
            return null;
        }

    }

    public ArrayList<UserProfile> advSearch(String gender, String dob) {
//        ArrayList<String> data = new ArrayList<String>();

        try (Connection conn = connect()) {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("" +
                    "SELECT userID, userName, email, firstName, lastName, gender, birthday, userType, joinTime " +
                    "FROM Users WHERE gender = '" + gender + "' " +
                    "AND birthday = '" + dob +"'");
            ArrayList<UserProfile> ret = new ArrayList<UserProfile>();
            if (rs == null) {
                System.out.println("none");
            }
            while (rs.next()) {
                System.out.println("rs: " + rs.getString(1));
                UserProfile u = new UserProfile();
                System.out.println("rs: " + rs.getString(1));
                u.setUserID(rs.getInt(1));
                u.setUserName(rs.getString(2));
                u.setEmail(rs.getString(3));
                u.setFirstName(rs.getString(4));
                u.setLastName(rs.getString(5));
                u.setGender(rs.getString(6));
                u.setBirthday(rs.getString(7));
                u.setUserType(rs.getInt(8));
                u.setJoinTime(rs.getString(9));
                ret.add(u);

            }
            System.out.println();
            return ret;
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

	@Override
	public UserProfile userProfile(String userName) {
		UserProfile u = new UserProfile();
		try (Connection conn = connect()){
			
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("" +
                    "SELECT userID, userName, email, firstName, lastName, gender, birthday, photo, userType, joinTime " +
                    "FROM Users WHERE userName = '" + userName+ "'");
//            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            while(rs.next()){
            	System.out.println("hhhhh");
                u.setUserID(rs.getInt(1));
                u.setUserName(rs.getString(2));
                u.setEmail(rs.getString(3));
                u.setFirstName(rs.getString(4));
                u.setLastName(rs.getString(5));
                u.setGender(rs.getString(6));
                u.setBirthday(rs.getString(7));
                u.setPhoto(rs.getString(8));
                u.setUserType(rs.getInt(9));
                u.setJoinTime(rs.getString(10));
            }
        } catch (SQLException e){
            e.printStackTrace();
        }
		return u;
	}

	@Override
    public UserActivities userActivities(int userID){
        UserActivities userAct = new UserActivities();
        try(Connection conn = connect()){
            Statement stmt1 = conn.createStatement();
            Statement stmt2 = conn.createStatement();
            Statement stmt3 = conn.createStatement();


            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            ResultSet joinDate = stmt1.executeQuery("SELECT joinTime FROM users WHERE userID = '"+ userID +"'");
            ResultSet posts = stmt2.executeQuery("SELECT content, postTime FROM posts WHERE userID= '"+ userID +"' ORDER BY postTime");
            ResultSet addFriends = stmt3.executeQuery("SELECT friendID, startDate FROM Friends WHERE userID = '"+ userID +"' ORDER BY startDate");
            //init join date
//            user.setJoinTime(format.parse(rs.(10)));
            System.out.println("join date: " +joinDate.getString(1));
            userAct.setJoinDate(format.parse(joinDate.getString(1)));
            // adding posts record
            while(posts.next()){
                Activity act = new Activity(1, posts.getString(1), format.parse(posts.getString(2)) );
                userAct.addActivity(act);
            }

            while(addFriends.next()){
                Activity act = new Activity(2, addFriends.getString(1), format.parse(addFriends.getString(2)) );
                userAct.addActivity(act);
            }
            if(!userAct.checkEmpty()){
                userAct.sortActivities();
            }
        }catch (SQLException | ParseException e){
            e.printStackTrace();
        }

        return userAct;
    }

}