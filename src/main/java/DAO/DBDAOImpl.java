package DAO;

import Model.User;

import java.sql.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;



//| Annotation | Meaning                                             |
//+------------+-----------------------------------------------------+
//| @Component | generic stereotype for any Spring-managed component |
//| @Repository| stereotype for persistence layer                    |
//| @Service   | stereotype for service layer                        |
//| @Controller| stereotype for presentation layer (spring-mvc)      |

@Component
public class DBDAOImpl implements DBDAO {

    final static Logger logger = LoggerFactory.getLogger(DBDAOImpl.class);

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

    public void userActivation(String userName){

    }

    public void userExistence(User aUser){

    }


}
