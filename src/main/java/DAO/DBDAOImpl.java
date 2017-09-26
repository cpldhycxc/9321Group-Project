package DAO;

import Model.User;

import java.sql.*;

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
            preStatment.setString(6, Integer.toString(aUser.getGender()));
            preStatment.setString(7, aUser.getBirthday().toString());
            preStatment.setString(8, aUser.getPhoto());
            preStatment.setString(9, aUser.getUserType());
            preStatment.executeUpdate();
            logger.info("Adding user");
            return true;
        } catch (SQLException e){
            System.out.println(e.getMessage());
            return false;
        }
    }
    /**
     * change the userType to check if it is activated
     * @param String userName
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
     * @param username as a string
     * @return true if the user exists otherwise false
     */
    public boolean userExistence(String userName){
    	boolean result = false;
    	try(Connection conn = connect()) {
    		Statement  stmt = conn.createStatement();
    		ResultSet rs = stmt.executeQuery("SELECT * FROM Users WHERE userName = '" + userName + "'");
    		if (rs.next()) {
    			//user exists
    			result = true;
    		}else {
    			result = false;
    		}
    		
    	}catch(SQLException e) {
    		System.out.println(e.getMessage());
    		result = false;
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
//                int total_row = rs.getMetaData().getColumnCount();
//                JSONObject obj = new JSONObject();
//                for(int i=0; i < total_row; i++){
//                    String columName = rs.getMetaData().getColumnLabel(i+1).toLowerCase();
//                    Object columValue = rs.getObject(i+1);
//                    if(columValue == null){
//                        columValue = "null";
//                    }
//                    if(obj.has(columName)){
//                        columName += "1";
//                    }
//                    obj.put(columName,columValue);
//                }
                System.out.println("rs: " + rs.getString(1));
                User u = new User(rs.getString(1),
                                  rs.getString(2),
                        rs.getString(3),
                        rs.getString(4),
                        rs.getString(5),
                        Integer.parseInt(rs.getString(6)),
                        rs.getString(7),
                        rs.getString(8),
                        rs.getString(9));
                ret.add(u);
            }
            System.out.println();
            return ret;
        } catch(SQLException e){
            System.out.println(e.getMessage());
            return null;
        }

    }



}
