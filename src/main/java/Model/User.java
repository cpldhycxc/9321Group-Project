package Model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Model of a user which represent what the user look like in our database
 */
public class User {


    public static final int ADMIN = 2;
    public static final int ACTIVATED = 1;
    public static final int UNACTIVATED = 0;
    public static final SimpleDateFormat SDF =  new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private int userID;
    private String userName;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private String gender;
    private String birthday; //date format like 2017-09-12T02:00:00.00
    private int userType;
    private String joinTime;

    /**
     * Constructor used for sign up
     */
    public User(String userName, String password, String email, String firstName, String lastName, String birthday) {
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userType = UNACTIVATED;

        //convert date
        this.birthday = birthday;
    }

    public User(int userID, String userName, String email, String firstName, String lastName) {
        this.userID = userID;
        this.userName = userName;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    /**
     * Constructor for user retrieval
     */
    public User(){
        this.userName = null;
        this.password = null;
    }

    public int getUserID() { return userID; }
    public String getUserName() { return userName; }
    public String getPassword() { return password; }
    public String getEmail() { return email; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getGender() { return gender; }
    public String getBirthday() { return birthday; }
    public int getUserType() { return userType; }
    public String getJoinTime() { return joinTime; }

    public void setUserID(int userID) { this.userID = userID; }
    public void setUserName(String userName) { this.userName = userName; }
    public void setPassword(String password) { this.password = password; }
    public void setEmail(String email) { this.email = email; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setGender(String gender) { this.gender = gender; }
    public void setBirthday(String birthday) { this.birthday = birthday; }
    public void setUserType(int userType) { this.userType = userType; }
    public void setJoinTime(String joinTime) { this.joinTime = joinTime; }
}
