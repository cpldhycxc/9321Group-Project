package DAO;

import Model.Friend;
import Model.Post;
import Model.User;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;



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
            preStatment.setString(7, aUser.getBirthday().toString());
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
            userID = rs.getInt(0);
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
                    "SELECT postID, content, image, postTime FROM Posts WHERE userID = '" + Integer.toString(userID) + "'");
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

    public void userActivation(String userName){

    }

    public void userExistence(User aUser){

    }


}
