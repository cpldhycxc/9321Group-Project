package DAO;

import Model.User;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
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

    public void userSignUp(User aUser) {
        try (Connection conn = connect()) {
            // prepare statement and ready to execute
            PreparedStatement preStatment = conn.prepareStatement("INSERT INTO Users" +
                    "(userName, password, email, firstName, lastName, gender, birthday, photo, userType");

        } catch (SQLException e){
            System.out.println(e.getMessage());
        }
    }

    public void userActivation(String userName){

    }

    public void userExistence(User aUser){

    }

    public  void save(TAppActivityLog tAppActivityLog) {
        String sql = "INSERT INTO app_activity_log (username, user_ip, date_accessed,photos_sent) "
                + "values (?,?,?,?)";

        try (Connection conn = this.connect();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1,tAppActivityLog.getUsername());
            pstmt.setString(2,tAppActivityLog.getUserIp());
            pstmt.setString(3,  tAppActivityLog.getDateAccessed().toString());
            pstmt.setString(4,tAppActivityLog.getPhotosSent());
            pstmt.executeUpdate();
            logger.info("Activity recorded");
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }


}
