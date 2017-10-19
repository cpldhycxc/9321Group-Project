package DAO;

import Model.*;
import api.Activity;

import api.GraphQuery;
import api.UserActivities;
import api.UserProfile;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import com.sun.corba.se.impl.orbutil.graph.Graph;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;
import java.util.stream.StreamSupport;


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
@JsonIgnoreProperties
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
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
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
            return -1;
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

            while(rs.next()){
                user.setUserID(rs.getInt(1));
                user.setUserName(rs.getString(2));
                user.setEmail(rs.getString(3));
                user.setFirstName(rs.getString(4));
                user.setLastName(rs.getString(5));
                user.setGender(rs.getString(6));
                user.setBirthday(rs.getString(7));
                user.setUserType(rs.getInt(8));
                user.setJoinTime(rs.getString(9));
            }

            if(user.getUserType() == User.UNACTIVATED){
                user.setUserName(null);
            }

        } catch (SQLException e){
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
                    "SELECT Posts.postID, Users.userName, Posts.content, Posts.postTime, Users.userID FROM Posts , Users WHERE Posts.userID=Users.userID AND " +
                    "( Posts.userID IN (SELECT friendID from Friends WHERE userID = '" + Integer.toString(userID) + "') OR Posts.userID = '" + Integer.toString(userID) + "')" +
                    "ORDER BY Posts.postTime DESC");
            while(rs.next()){
                postArrayList.add(new Post(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getInt(5)));
            }

            for(Post p : postArrayList){
                p.setLikeBy(new ArrayList<>());
                rs = stmt.executeQuery("SELECT userID, userName, email, firstName, lastName FROM Users WHERE userID IN (SELECT userID FROM Likes WHERE postID = '" + p.getPostId() + "')");
                while(rs.next()){
                    p.getLikeBy().add(new User(rs.getInt(1), rs.getString(2),rs.getString(3),rs.getString(4 ),rs.getString(5)));
                }
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
     * change the userType to check if it is activated
     * @param userID
     */
    public void backUserActivation(int userID){
    	try (Connection conn = connect()) {
    		 String updateType = "UPDATE Users SET userType=? WHERE userID=?";
    		 PreparedStatement pstmt = conn.prepareStatement(updateType);
    		 if(userID == 1) {
    			 pstmt.setInt(1, 2);
    		 }else {
    			 pstmt.setInt(1,0);
    		 } 
//    		 pstmt.setInt(1,1);
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
                System.out.println("none");
            }
            System.out.println("goes here");
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

    public ArrayList<UserProfile> advSearch(String gender, String dob, String userName, String firstName, String lastName ) {
//        ArrayList<String> data = new ArrayList<String>();

        try (Connection conn = connect()) {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("" +
                    "SELECT userID, userName, email, firstName, lastName, gender, birthday, userType, joinTime " +
                    "FROM Users WHERE gender LIKE '%" + gender + "%' " +
                    "AND birthday LIKE '%" + dob +"%'" +
                    "AND userName LIKE '%"+ userName + "%'" +
                    "AND firstName LIKE '%"+ firstName +"%'" +
                    "AND lastName LIKE '%"+ lastName +"%'");
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
            System.out.println("Hello, im bug");
            return null;
        }
    }


	@Override
	public UserProfile userProfile(String selectedName,String userName) {
		UserProfile u = new UserProfile();
		try (Connection conn = connect()){
            Statement stmt = conn.createStatement();
            System.out.println(selectedName);
            ResultSet rs = stmt.executeQuery("" +
                    "SELECT userID, userName, email, firstName, lastName, gender, birthday, userType, joinTime " +
                    "FROM Users WHERE userName = '" + selectedName+ "'");
            int sUserI = rs.getInt(1);
            ArrayList<Friend> friendList = getFriendsByUserID(sUserI);
            ArrayList<Post> postList = getOwnPostsByUserID(sUserI);
            for(Friend f: friendList) {
            	if(f.getUserName().equals(userName)){
            		u.setRelationShip(true);
            		break;
            	}
            }
            while(rs.next()){
            	
            	System.out.println("hhhhh");
                u.setUserID(rs.getInt(1));
                u.setUserName(rs.getString(2));
                u.setEmail(rs.getString(3));
                u.setFirstName(rs.getString(4));
                u.setLastName(rs.getString(5));
                u.setGender(rs.getString(6));
                u.setBirthday(rs.getString(7));
                u.setUserType(rs.getInt(8));
                u.setJoinTime(rs.getString(9));
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
    public UserActivities userActivities(int userID) {
        UserActivities userAct = new UserActivities();
        try (Connection conn = connect()) {
            Statement stmt1 = conn.createStatement();
            Statement stmt2 = conn.createStatement();
            Statement stmt3 = conn.createStatement();


            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            ResultSet joinDate = stmt1.executeQuery("SELECT joinTime FROM users WHERE userID = '" + userID + "'");
            ResultSet posts = stmt2.executeQuery("SELECT content, postTime FROM posts WHERE userID= '" + userID + "' ORDER BY postTime");
            ResultSet addFriends = stmt3.executeQuery("SELECT Users.userName, friends.startDate FROM friends JOIN users on users.userID = friends.friendId WHERE friends.userID = '" + userID + "' ORDER BY startDate");
            //init join date
//            user.setJoinTime(format.parse(rs.(10)));
            System.out.println("join date: " + joinDate.getString(1));
            userAct.setJoinDate(joinDate.getString(1));
            // adding posts record
            while (posts.next()) {
                Activity act = new Activity(1, posts.getString(1), posts.getString(2));
                userAct.addActivity(act);
            }

            while (addFriends.next()) {
                Activity act = new Activity(2, addFriends.getString(1), addFriends.getString(2));
                userAct.addActivity(act);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return userAct;
    }

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
                    "SELECT Posts.postID, Users.userName, Posts.content, Posts.postTime, Users.userID FROM Posts, Users WHERE Posts.userID=Users.userID AND Posts.userID='" + userID +
                    "'ORDER BY Posts.postTime DESC");
//            System.out.println(userID);
            while(rs.next()){
                postArrayList.add(new Post(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getInt(5)));
            }
            for(Post p : postArrayList){
                p.setLikeBy(new ArrayList<>());
                rs = stmt.executeQuery("SELECT userID, userName, email, firstName, lastName FROM Users WHERE userID IN (SELECT userID FROM Likes WHERE postID = '" + p.getPostId() + "')");
                while(rs.next()){
                    p.getLikeBy().add(new User(rs.getInt(1), rs.getString(2),rs.getString(3),rs.getString(4 ),rs.getString(5)));
                }
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
    
    @JsonIgnore
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
            	System.out.println("check"+r);
            	postList.add(getPostByPostID(r));
            }
        } catch (SQLException e){
            e.printStackTrace();
        }
    	return postList;
    }
    @JsonIgnore
    public Post getPostByPostID(int postID) {
    	Post post = new Post();
        try (Connection conn = connect()){
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT PostID,UserID,content,posttime FROM Posts WHERE postID = '" + postID + "'");
            while(rs.next()){
            	post.setPostId(rs.getInt(1));
//            	System.out.println(rs.getInt(1));
            	post.setUserID(rs.getInt(2));
            	post.setUserName(getUserNameByUserID(rs.getInt(2)));
//            	System.out.println(rs.getInt(2));
            	post.setContent(rs.getString(3));
//            	System.out.println(rs.getString(4));
            	post.setPostTime(User.SDF.parse(rs.getString(4)));
            	
            	post.setLikeBy(new ArrayList<>());
            	ResultSet rss = stmt.executeQuery("SELECT userID, userName, email, firstName, lastName FROM Users WHERE userID IN (SELECT userID FROM Likes WHERE postID = '" + post.getPostId() + "')");
                while(rss.next()){
                    post.getLikeBy().add(new User(rs.getInt(1), rs.getString(2),rs.getString(3),rs.getString(4 ),rs.getString(5)));
                }
            }
            
            
            
//            for(Post p : postArrayList){
//                p.setLikeBy(new ArrayList<>());
//                rs = stmt.executeQuery("SELECT userID, userName, email, firstName, lastName FROM Users WHERE userID IN (SELECT userID FROM Likes WHERE postID = '" + p.getPostId() + "')");
//                while(rs.next()){
//                    p.getLikeBy().add(new User(rs.getInt(1), rs.getString(2),rs.getString(3),rs.getString(4 ),rs.getString(5)));
//                }
//            }
            
            
            
        } catch (SQLException | ParseException e){
            e.printStackTrace();
            
        }
        return post;
    }
    @JsonIgnore
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

    public long addPost(int userID, String content){
        try (Connection conn = connect()){
            PreparedStatement preStatment = conn.prepareStatement("INSERT INTO Posts (userID, content) VALUES (?, ?)");
            preStatment.setInt(1, userID);
            preStatment.setString(2, content);
            preStatment.executeUpdate();
            ResultSet generatedKeys = preStatment.getGeneratedKeys();
            return generatedKeys.getLong(1);
        } catch (SQLException e){
            e.printStackTrace();
            return -1;
        }
    }

    public UserProfile editProfile(String userID, String fname, String lname, String dob, String email, String gender){
        UserProfile u = new UserProfile();
        try (Connection conn = connect()){
            Statement stmt1 = conn.createStatement();
            Statement stmt2 = conn.createStatement();
            Statement stmt3 = conn.createStatement();
            Statement stmt4 = conn.createStatement();
            Statement stmt5 = conn.createStatement();
            Statement stmt6 = conn.createStatement();

            if(!fname.equalsIgnoreCase("undefined")){
                stmt1.executeUpdate("UPDATE users SET firstname ='"+ fname+"' WHERE userID = '"+userID+"'");
            }
            if(!lname.equalsIgnoreCase("")){
                stmt2.executeUpdate("UPDATE users SET lastname ='"+ lname+"' WHERE userID = '"+userID+"'");
            }
            if(!dob.equalsIgnoreCase("")){
                stmt3.executeUpdate("UPDATE users SET birthday ='"+ dob+"' WHERE userID = '"+userID+"'");
            }
            if(!email.equalsIgnoreCase("")){
                stmt4.executeUpdate("UPDATE users SET email ='"+ email+"' WHERE userID = '"+userID+"'");
            }
            if(!gender.equalsIgnoreCase("")){
                stmt5.executeUpdate("UPDATE users SET gender ='"+ gender+"' WHERE userID = '"+userID+"'");
            }

            ResultSet rs = stmt6.executeQuery("SELECT * FROM Users`` WHERE userID = '" + userID + "'");
            int sUserI = rs.getInt(1);
            while(rs.next()){
                u.setUserID(rs.getInt(1));
                u.setUserName(rs.getString(2));
                u.setEmail(rs.getString(4));
                u.setFirstName(rs.getString(5));
                u.setLastName(rs.getString(6));
                u.setGender(rs.getString(7));
                u.setBirthday(rs.getString(8));
                u.setUserType(rs.getInt(9));
                u.setJoinTime(rs.getString(10));
            }

        } catch (SQLException e){

            e.printStackTrace();

        }
        return u;
    }

    
	@Override
	public void deleteFriendRelation(int userID, int friendID) {
        try (Connection conn = connect()){
            PreparedStatement preStatment = conn.prepareStatement("DELETE FROM Friends WHERE userID= '"+userID+"'and friendID='"+friendID+"'");
            preStatment.executeUpdate();
        } catch (SQLException e){
            e.printStackTrace();
        }		
	}

	@Override
    public GraphQuery getWholeGraph() {
        try (Connection conn = connect()){
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM TripleStore");
            return graphQuery(rs);
        } catch (SQLException e) {
            e.printStackTrace();
            return new GraphQuery();
        }
    }

    @Override
    public GraphQuery getUserGraph(String userID) {
        try (Connection conn = connect()){
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM TripleStore WHERE subject= '"+userID+"' AND (predicate = 'dob' OR predicate = 'gender')");
            return graphQuery(rs);
        } catch (SQLException e) {
            e.printStackTrace();
            return new GraphQuery();
        }
    }

    public GraphQuery getPostGraph(String keyword){
        try (Connection conn = connect()){
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM TripleStore WHERE (predicate = 'posted' OR predicate = 'liked') AND objectAdd LIKE '%" +keyword+"%'");
            return graphQuery(rs);
        } catch (SQLException e) {
            e.printStackTrace();
            return new GraphQuery();
        }
    }

    public GraphQuery getFriendGraph(String userID){
        ArrayList<Friend> friendList;
        Map<Integer, Boolean> seen = new HashMap<>();
        Queue<Integer> queue = new LinkedList<>();
        queue.add(Integer.parseInt(userID));
        while(!queue.isEmpty()){ // bfs find all friend
            int currID = queue.poll();
            if(!seen.containsKey(currID)){
                seen.put(currID, true);
                friendList =  getFriendsByUserID(currID);
                for(Friend f : friendList){
                    if(!seen.containsKey(f.getUserID())){
                        queue.add(f.getUserID());
                    }
                }
            }
        }

        GraphQuery returnGQ = new GraphQuery();

        Map<Node, Boolean> userSeen = new HashMap<>();
        Map<Edge, Boolean> edgeSeen = new HashMap<>();

        for(int userIndex : seen.keySet()){
            try (Connection conn = connect()){
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery("SELECT * FROM TripleStore WHERE subject= '"+userIndex+"' AND predicate = 'friend'");
                GraphQuery temp = graphQuery(rs);

                for(Object k : temp.getNodes()){
                    Node nodeTemp = (Node) k;
                    if(!userSeen.containsKey(nodeTemp)){
                        userSeen.put(nodeTemp, true);
                    }
                }
                for(Object k : temp.getEdges()){
                    Edge edgeTemp = (Edge) k;
                    if(!edgeSeen.containsKey(edgeTemp)){
                        edgeSeen.put(edgeTemp, true);
                    }
                }
            } catch (SQLException e) {
                e.printStackTrace();
                return new GraphQuery();
            }
        }
        returnGQ.setEdges(new ArrayList<>(edgeSeen.keySet()));
        returnGQ.setNodes(new ArrayList<>(userSeen.keySet()));
        return returnGQ;
    }

    private GraphQuery graphQuery(ResultSet rs){
        GraphQuery gq = new GraphQuery();
        ArrayList<Node> nodes = new ArrayList<>();
        ArrayList<Edge> edges = new ArrayList<>();
        try {

//            ResultSetMetaData rsmd = rs.getMetaData();
//            int columnsNumber = rsmd.getColumnCount();
//            while (rs.next()) {
//                for (int i = 1; i <= columnsNumber; i++) {
//                    if (i > 1) System.out.print(",  ");
//                    String columnValue = rs.getString(i);
//                    System.out.print(columnValue + " " + rsmd.getColumnName(i));
//                }
//                System.out.println();
//            }

//            3 subject,  Juan Pablo subjectAdd,  dob predicate,  1996-01-27 object,  null objectAdd
//            3 subject,  Juan Pablo subjectAdd,  gender predicate,  female object,  null objectAdd
//            4 subject,  Amelia Vega subjectAdd,  friend predicate,  5 object,  Marisa Tomei objectAdd
//            2 subject,  Carmen Electra subjectAdd,  posted predicate,  4 object,  To Kha-Linh,\nare you single? Need to know so I know if I am allowed to make a move on you or not. objectAdd
//            6 subject,  Richard Virenque subjectAdd,  liked predicate,  29 object,  Anyone interested in a Lankan guy doing engineering, im sweet as watalappan. objectAdd

            Map<String, Boolean> birthMap = new HashMap<>();
            //map.put("dog", "type of animal");
            Map<String, Boolean> genderMap = new HashMap<>();
            Map<Integer, Boolean>  userMap = new HashMap<>();
            Map<Integer, Boolean>  postMap = new HashMap<>();
            int userID;
            int friendID;
            int postID;
            String birth;
            String gender;

            while (rs.next()){
                String type = rs.getString(3);
                switch (type) {
                    case "dob":
                        birth = rs.getString(4).split(" ")[0];
                        if (!birthMap.containsKey(birth)) {
                            birthMap.put(birth, true);
                            nodes.add(new Node(0, "age", birth));
                        }
                        userID = rs.getInt(1);
                        if (!userMap.containsKey(userID)) {
                            userMap.put(userID, true);
                            nodes.add(new Node(userID, "user", rs.getString(2)));
                        }

                        edges.add(new Edge(userID, "dob", 0, birth));
                        break;
                    case "gender":
                        gender = rs.getString(4);
                        if (!genderMap.containsKey(gender)) {
                            genderMap.put(gender, true);
                            nodes.add(new Node(0, "gender", gender));
                        }
                        userID = rs.getInt(1);
                        if (!userMap.containsKey(userID)) {
                            userMap.put(userID, true);
                            nodes.add(new Node(userID, "user", rs.getString(2)));
                        }

                        edges.add(new Edge(userID, "gender", 0, gender));
                        break;
                    case "friend":
                        friendID = rs.getInt(4);
                        if (!userMap.containsKey(friendID)) {
                            userMap.put(friendID, true);
                            nodes.add(new Node(friendID, "user", rs.getString(5)));
                        }
                        userID = rs.getInt(1);
                        if (!userMap.containsKey(userID)) {
                            userMap.put(userID, true);
                            nodes.add(new Node(userID, "user", rs.getString(2)));
                        }

                        edges.add(new Edge(userID, "friend", friendID, ""));
                        break;
                    case "posted":
                        postID = rs.getInt(4);
                        if (!postMap.containsKey(postID)) {
                            postMap.put(postID, true);
                            nodes.add(new Node(postID, "post", rs.getString(5)));
                        }
                        userID = rs.getInt(1);
                        if (!userMap.containsKey(userID)) {
                            userMap.put(userID, true);
                            nodes.add(new Node(userID, "user", rs.getString(2)));
                        }

                        edges.add(new Edge(userID, "posted", postID, ""));
                        break;
                    case "liked":
                        postID = rs.getInt(4);
                        if (!postMap.containsKey(postID)) {
                            postMap.put(postID, true);
                            nodes.add(new Node(postID, "post", rs.getString(5)));
                        }
                        userID = rs.getInt(1);
                        if (!userMap.containsKey(userID)) {
                            userMap.put(userID, true);
                            nodes.add(new Node(userID, "user", rs.getString(2)));
                        }

                        edges.add(new Edge(userID, "liked", postID, ""));
                        break;
                }
            }

        } catch (SQLException e){
            e.printStackTrace();
        }
        gq.setEdges(edges);
        gq.setNodes(nodes);
        return gq;
    }
}
