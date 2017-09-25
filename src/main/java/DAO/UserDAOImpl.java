package DAO;

import javax.persistence.*;
import java.util.Date;

// Entity tell hibernate treat this class as entity and need to be saved
@Entity
//@Table(name = "Users")
public class UserDAOImpl implements UserDAO {

    // this the field under this field is primary key
    @Id @GeneratedValue
    //@Column(name = "userID")
    private int userID; // primary key auto inc
    private String userName;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private String gender;
    private Date birthday;
    private String photo;
    private String userType;
    private Date joinTime;

    public int getUserID() {
        return userID;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
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

    public String getUserType() {
        return userType;
    }

    public Date getJoinTime() {
        return joinTime;
    }


}
