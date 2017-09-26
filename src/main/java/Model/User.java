package Model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Model of a user which represent what the user look like in our database
 */
public class User {
    private int userID;
    private String userName;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private int gender;
    private Date birthday; //date format like 2017-09-12T02:00:00.00
    private String photo;
    private String userType;
    private Date joinTime;

    public User(String userName, String password, String email, String firstName, String lastName, int gender, String birthday, String photo, String userType) {
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.photo = photo;
        this.userType = userType;

        //convert date
        String format = "yyyy-MM-dd";
        SimpleDateFormat sdf =  new SimpleDateFormat(format);
        birthday = birthday.split("T")[0];
        try {
            this.birthday = sdf.parse(birthday);
        } catch (ParseException e) {
            e.printStackTrace();
        }

    }

    public int getUserID() { return userID; }
    public String getUserName() { return userName; }
    public String getPassword() { return password; }
    public String getEmail() { return email; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public int getGender() { return gender; }
    public Date getBirthday() { return birthday; }
    public String getPhoto() { return photo; }
    public String getUserType() { return userType; }
    public Date getJoinTime() { return joinTime; }

    public void setUserID(int userID) { this.userID = userID; }
    public void setUserName(String userName) { this.userName = userName; }
    public void setPassword(String password) { this.password = password; }
    public void setEmail(String email) { this.email = email; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setGender(int gender) { this.gender = gender; }
    public void setBirthday(Date birthday) { this.birthday = birthday; }
    public void setPhoto(String photo) { this.photo = photo; }
    public void setUserType(String userType) { this.userType = userType; }
    public void setJoinTime(Date joinTime) { this.joinTime = joinTime; }
}
