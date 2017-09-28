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
import java.util.Random;

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
                    "(userName, password, email, firstName, lastName, gender, birthday, userType)" +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            preStatment.setString(1, aUser.getUserName());
            preStatment.setString(2, aUser.getPassword());
            preStatment.setString(3, aUser.getEmail());
            preStatment.setString(4, aUser.getFirstName());
            preStatment.setString(5, aUser.getLastName());
            preStatment.setString(6, aUser.getGender());
            preStatment.setString(7, aUser.getBirthday());
            preStatment.setString(8, Integer.toString(aUser.getUserType()));
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
                    "SELECT userID, userName, email, firstName, lastName, gender, birthday, userType, joinTime " +
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
                user.setUserType(rs.getInt(8));
                user.setJoinTime(format.parse(rs.getString(9)));
            }
        } catch (SQLException | ParseException e){
            e.printStackTrace();
        }
        return user;
    }

    /**
     * give the userID of a user find out all his's post and his friend post`
     * @param userID
     * @return arraylist of post for the user
     */
    public ArrayList<Post> getPostsByUserID(int userID) {
        ArrayList<Post> postArrayList = new ArrayList<>();
        try (Connection conn = connect()){
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("" +
                    "SELECT Posts.postID, Users.userName, Posts.content, Posts.image, Posts.postTime FROM Posts , Users WHERE Posts.userID=Users.userID AND " +
                    "( Posts.userID IN (SELECT friendID from Friends WHERE userID = '" + Integer.toString(userID) + "') OR Posts.userID = '" + Integer.toString(userID) + "')" +
                    "ORDER BY Posts.postTime DESC");
            while(rs.next()){
                postArrayList.add(new Post(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5)));
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
     * get email by userID
     * @param userID
     * @return email for the userID
     */
    public String getEmailByUserID(int userID){
        String email = null;
        try (Connection conn = connect()){
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery( "SELECT email FROM Users WHERE userID = '" + Integer.toString(userID) + "'");
            while(rs.next()){
                email = rs.getString(1);
            }
        } catch (SQLException e){
            e.printStackTrace();
        }
        return email;
    }

    /**
     * add friend realtion to the table
     * @param userID
     * @param friendID
     */
    public void addFriendRelation(int userID, int friendID){
        try (Connection conn = connect()){
            PreparedStatement preStatment = conn.prepareStatement("INSERT INTO Friends (userID, friendID) VALUES (?, ?)");
            preStatment.setInt(1, userID);
            preStatment.setInt(2, friendID);
            preStatment.executeUpdate();
        } catch (SQLException e){
            e.printStackTrace();
        }
    }

    /**
     * change the userType to check if it is activated
     * @param userID
     */
    public void userActivation(int userID){
    	try (Connection conn = connect()) {
    		 String updateType = "UPDATE Users SET userType=? WHERE userID=?";
    		 PreparedStatement pstmt = conn.prepareStatement(updateType);
    		 if(userID == 1) {
    			 pstmt.setInt(1, 2);
    		 }else {
    			 pstmt.setInt(1,1);
    		 } 
    		 pstmt.setInt(1,1);
    		 pstmt.setInt(2, userID);
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

    public ArrayList<User> Search(String param){
        try(Connection conn = connect()){
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM Users WHERE userName LIKE '% "+ param +" %' ");
            ArrayList<User> ret = new ArrayList<User>();
            if(rs == null){
                System.out.println("none");
            }
            System.out.println("goes here");
            while(rs.next()){
                System.out.println("rs: " + rs.getString(1));

                User u = new User(rs.getString(1),
                                  rs.getString(2),
                        rs.getString(3),
                        rs.getString(4),
                        rs.getString(5),
                        rs.getString(7));
                ret.add(u);
            }
            System.out.println();
            return ret;
        } catch(SQLException e){
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
            int userI = rs.getInt(1);
            ArrayList<Friend> friendList = getFriendsByUserID(userI);
            ArrayList<Post> postList = getOwnPostsByUserID(userI);
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
                u.setFriendList(friendList);
                u.setPostList(postList);
            }     
        } catch (SQLException e){
            e.printStackTrace();
        }
		return u;
	}

//	  @Override
//    public UserActivities userActivities(int userID){
//        UserActivities userAct = new UserActivities();
//        try(Connection conn = connect()){
//            Statement stmt = conn.createStatement();
//            ResultSet joinDate = stmt.executeQuery("SELECT joinTime from users WHERE userID = '"+ userID +"'");
//            ResultSet activities = stmt.executeQuery("SELECT content, postTime from posts WHERE userID= '"+ userID +"' ORDER BY postTime");
//            joinDate.next();
//            userAct.setJoinDate(joinDate.getString(1));
//            while(activities.next()){
//                Activity act = new Activity(3, activities.getString(1), activities.getString(2));
//                userAct.addActivity(act);
//            }
//          
//        }catch (SQLException e){
//            e.printStackTrace();
//        }
//
//        return userAct;
//    }


	/**
	 * function to delete the post by post id
	 */
	@Override
	public boolean deletePost(int postID) {
		boolean result = false;
		try(Connection conn = connect()){			
			PreparedStatement ps = conn.prepareStatement("DELETE FROM Posts WHERE postID= '"+postID+"'");
			System.out.println(postID);
			ps.executeUpdate();
			System.out.println("Record is deleted!");
			result = true;
		}catch (SQLException e){
            e.printStackTrace();
        }
		return result;
	}
	
	/**
     * give the userID of a user find out all his's own post 
     * @param userID
     * @return arraylist of post for the user
     */
    public ArrayList<Post> getOwnPostsByUserID(int userID) {
        ArrayList<Post> postArrayList = new ArrayList<>();
        try (Connection conn = connect()){
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("" +
                    "SELECT Posts.postID, Users.userName, Posts.content, Posts.image, Posts.postTime FROM Posts, Users WHERE Posts.userID=Users.userID AND Posts.userID='" + Integer.toString(userID) + "'" +
                    "ORDER BY Posts.postTime DESC");
            System.out.println(userID);
            while(rs.next()){
                postArrayList.add(new Post(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5)));
            }
        } catch (SQLException e){
            e.printStackTrace();
        }
        return postArrayList;
    }
    /**
     * function to like/unlike post
     * @param userID postID
     * @return boolean true for successful like and unlike 
     */
	@Override
	public boolean likePost(int userID, int postID) {
		boolean result = false;		
		System.out.println(userID);
		System.out.println(postID);
		try(Connection conn = connect()){
			PreparedStatement psA = conn.prepareStatement("INSERT INTO Likes (userID, postID) VALUES (?, ?)");
			PreparedStatement psD = conn.prepareStatement("DELETE FROM Likes WHERE postID= '"+postID+"'and userID='"+userID+"'");
			try{
				psA.setInt(1,userID);
				psA.setInt(2,postID);
				psA.executeUpdate();
				System.out.println("Like successfully");
				result = true;
			}catch(SQLException e){
				
				psD.executeUpdate();
				System.out.println("Unlike successfully");
				result = true;
			}
		}catch (SQLException e){
            e.printStackTrace();
        }		
		return result;
	}
	
	//return the posterID
    public int getUserIdByPostID(int postID) {
        int userID = -1;
        try (Connection conn = connect()){
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT userID FROM Posts WHERE postID = '" + postID + "'");
            userID = rs.getInt(1);
        } catch (SQLException e){
            e.printStackTrace();
        }
        return userID;
    }
    
    public ArrayList<Post> getPostsRandomly() {
    	System.out.println("hhhhhhhh");
    	ArrayList<Post> postList = new ArrayList<Post>();
    	int count = 0;
    	try (Connection conn = connect()){
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT COUNT(*) FROM Posts");
            rs.next();
            count = rs.getInt(1);
            System.out.println(count);
            int r = 0;
            Random rand = new Random();
            int max = count - 1;
            for(int i = 0;i < 10;i++) {
            	r=rand.nextInt((max - 0) + 1) + 0;
            	System.out.println(r);
            	postList.add(getPostByPostID(r));
            }
        } catch (SQLException e){
            e.printStackTrace();
        }
    	return postList;
    }
    
    public Post getPostByPostID(int postID) {
    	Post post = new Post();
        try (Connection conn = connect()){
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT PostID,UserID,content,posttime FROM Posts WHERE postID = '" + postID + "'");
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            while(rs.next()){
            	post.setPostId(rs.getInt(1));
            	System.out.println(rs.getInt(1));
            	post.setUserName(getUserNameByUserID(rs.getInt(2)));
            	System.out.println(rs.getInt(2));
            	post.setContent(rs.getString(3));
            	post.setPostTime(format.parse(rs.getString(4)));
            }
        } catch (SQLException | ParseException e){
            e.printStackTrace();
        }
        return post;
    }
    
    public String getUserNameByUserID(int userID) {
        String name = null;
        try (Connection conn = connect()){
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT userName FROM Users WHERE userID = '" + userID + "'");
            name = rs.getString(1);
        } catch (SQLException e){
            e.printStackTrace();
        }
        return name;
    }
	

}