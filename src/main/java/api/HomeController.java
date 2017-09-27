package api;

import java.util.ArrayList;
import java.util.Date;
import java.util.Properties;
import java.util.concurrent.atomic.AtomicLong;

import DAO.*;
import Model.User;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


@CrossOrigin
@RestController
public class HomeController {

    @Autowired
    private DBDAO dbdao = new DBDAOImpl();

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    
    @CrossOrigin(origins = "http://localhost:8080")
    @GetMapping("/greeting")
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
        sendTLSMail("shiyun.zhangsyz@gmail.com", "123");
        return new Greeting(counter.incrementAndGet(), String.format(template, name));
    }

    /**
     * API call for sign up a user
     * @param user
     * @return json contain success, requestID
     */
    @CrossOrigin(origins = "http://localhost:9000")
    @PostMapping("/signup")
    public SignUp signup(@RequestBody User user) { // userName, password, email, firstName, lastName, birthday
        if(!dbdao.userSignUp(user)){
            return new SignUp(counter.incrementAndGet(), false);
        }
        sendTLSMail(user.getEmail(), Integer.toString(dbdao.getUserIdByUserName(user.getUserName())));
        return new SignUp(counter.incrementAndGet(), true);
    }

    /**
     * API call for user login
     * @param user
     * @return all user information, requestID, success, posts and friends
     */
    @CrossOrigin(origins = "http://localhost:9000")
    @PostMapping("/login")
    public Login login(@RequestBody User user){
        Login login = new Login();
        user = dbdao.getUserByUserName(user.getUserName(), user.getPassword());
        login.setRequestID(counter.incrementAndGet());
        login.setUser(user);
        if(user.getUserName() == null){
            login.getUser().setBirthday(new Date(1));
            login.getUser().setJoinTime(new Date(1));
            login.setPosts(new ArrayList<>());
            login.setFriends(new ArrayList<>());
            login.setSuccess(false);
            return login;
        }
        login.setPosts(dbdao.getPostsByUserID(user.getUserID()));
        login.setFriends(dbdao.getFriendsByUserID(user.getUserID()));
        login.setSuccess(true);
        return login;
    }
  
    @CrossOrigin(origins = "http://localhost:9000")
    @RequestMapping(value = "/checkExistence/{loginName}", method = RequestMethod.GET)
    public CheckExistence checkExistence(@PathVariable String loginName) {
    		return new CheckExistence(loginName,dbdao.userExistence(loginName));
    }

    @CrossOrigin(origins = "http://localhost:9000")
    @RequestMapping(value = "/activation/{userName}", method = RequestMethod.GET)
    public void userActivation(@PathVariable String userName) {
    	dbdao.userActivation(userName);
    }
    
    @RequestMapping(value = "/userProfile/{userName}", method = RequestMethod.GET)
    public UserProfile userProfile(@PathVariable String userName) {
    	System.out.println("dfddf");
    	return dbdao.userProfile(userName);
    }
    
    @RequestMapping(value = "/deletePost/{postID}", method = RequestMethod.GET)
    public DeletePost deletePost(@PathVariable int postID) {
    	return new DeletePost(postID, dbdao.deletePost(postID));
    }

    /**
     * helder method that send email to user
     */
    private void sendTLSMail(String toEmail, String userId){
        System.out.println("Trying to send email to " + toEmail);

        final String username = "yun553966858@gmail.com";
        final String password = "asdqwienvlasdkf";
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");

        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });

        try {
            // front end URL to activate user localhost:9000/validation/{userID}
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("UNSWBook"));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(toEmail));
            message.setSubject("Registration Confirmation");
            message.setText("Dear User,"
                    + "\n\n Please click the link to activate your account for UNSW Book" +
                    "\n localhost:9000/validation/" + userId);

            Transport.send(message);

            System.out.println("Completed Sending Email to " + toEmail);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }



}