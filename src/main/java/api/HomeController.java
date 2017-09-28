package api;

import java.io.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.Properties;
import java.util.concurrent.atomic.AtomicLong;

import DAO.*;
import Model.FriendRequest;
import Model.LikePostM;
import Model.User;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletResponse;


@CrossOrigin
@RestController
public class HomeController {

    @Autowired
    private DBDAO dbdao = new DBDAOImpl();

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();
    private ArrayList<Notification> notification = new ArrayList<Notification>();


    @CrossOrigin(origins = "*")
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
    @CrossOrigin(origins = "*")
    @PostMapping("/signup")
    public SignUp signup(@RequestBody User user) { // userName, password, email, firstName, lastName, birthday
        if(!dbdao.userSignUp(user)){
            return new SignUp(counter.incrementAndGet(), false);
        }
        String msg = "Dear User,"
                + "\n\n Please click the link to activate your account for UNSW Book" +
                "\n localhost:9000/validation/" + Integer.toString(dbdao.getUserIdByUserName(user.getUserName()));
        sendTLSMail(user.getEmail(), msg);
        return new SignUp(counter.incrementAndGet(), true);
    }

    /**
     * API call for user login
     * @param user
     * @return all user information, requestID, success, posts and friends
     */
    @CrossOrigin(origins = "*")
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

    /**
     * api call to send email to user ask them if they want to add the user
     * @param rf
     * @return json of success
     */
    @CrossOrigin(origins = "*")
    @PostMapping("/friendRequest")
    public FriendRelated friendRequest(@RequestBody FriendRequest rf){
        String toEmail = dbdao.getEmailByUserID(rf.getFriendID());
        String msg = "Dear " + rf.getFriendName() + ","
                + "\n\n User " + rf.getUserName() + " want to add you as friend on UNSW Book, click the link below to accept" +
                "\n  localhost:9000/addfriend/" + Integer.toString(rf.getFriendID());
        sendTLSMail(toEmail, msg);
        return new FriendRelated(counter.incrementAndGet(), true);
    }

    /**
     * confirm to add friend relationship between two user in the db
     * @param rf
     * @return
     */
    @CrossOrigin(origins = "*")
    @PostMapping("addFriend")
    public FriendRelated addFriend(@RequestBody FriendRequest rf){
        dbdao.addFriendRelation(rf.getUserID(), rf.getFriendID());
        dbdao.addFriendRelation(rf.getFriendID(), rf.getUserID());
        return new FriendRelated(counter.incrementAndGet(), true);
    }

    /**
     * get userID posts and all his friends' posts
     * @param userID
     * @return posts
     */
    @CrossOrigin(origins = "*")
    @GetMapping("getPosts")
    public Posts getPosts(@RequestParam(value = "userID") int userID){
        return new Posts(counter.incrementAndGet(), dbdao.getPostsByUserID(userID));
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/checkExistence/{loginName}", method = RequestMethod.GET)
    public CheckExistence checkExistence(@PathVariable String loginName) {
    		return new CheckExistence(loginName,dbdao.userExistence(loginName));
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/activation/{userID}", method = RequestMethod.GET)
    public void userActivation(@PathVariable int userID) {
    	dbdao.userActivation(userID);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/userProfile/{userName}", method = RequestMethod.GET)
    public UserProfile userProfile(@PathVariable String userName) {
    	return dbdao.userProfile(userName);
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/deletePost/{postID}", method = RequestMethod.GET)
    public DeletePost deletePost(@PathVariable int postID) {
    	return new DeletePost(postID, dbdao.deletePost(postID));
    }
    
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/notification/{userID}", method = RequestMethod.GET)
    public ArrayList<String> getNotification(@PathVariable int userID) {
    	ArrayList<String> result = new ArrayList<String>();
    	for(Notification noti:notification) {
    		if(noti.getUserID() == userID){
    			result.add(noti.getNoti());
    		}
    	}
    	return result;
    }
    
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/randomPost")
    public Posts randomPost() {
    	System.out.println("hhhhhhhh");
    		return new Posts(counter.incrementAndGet(),dbdao.getPostsRandomly());
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/likePost")
    public LikePost likePost(@RequestBody LikePostM post) {
    	String userName = post.getUserName();
    	boolean getLike = post.isLike();
    	int userID = dbdao.getUserIdByUserName(userName);
    	int postID = Integer.parseInt(post.getPostID());
    	int posterID = dbdao.getUserIdByPostID(postID);
    	if(getLike) {
    		Notification noti = new Notification(posterID,userName+" likes your post!");
    		notification.add(noti);
    		System.out.println(posterID);
    		System.out.println(userName+" likes your post!");
    	}
    	return new LikePost(userID,postID,dbdao.likePost(userID, postID));
    }

    /**
     * upload new post with image
     * @param file
     * @param userID
     * @param content
     * @return
     */
    @CrossOrigin(origins = "*")
    @RequestMapping(value="/upload/{userID}/{content}", headers = "content-type=multipart/*",  method=RequestMethod.POST)
    public @ResponseBody String handleFileUpload(
            @RequestParam("file") MultipartFile file, @PathVariable int userID, @PathVariable String content){
        String name = Integer.toString(userID); // postID, userID, content
        if (!file.isEmpty()) {
            try {
                byte[] bytes = file.getBytes();
                BufferedOutputStream stream =
                        new BufferedOutputStream(new FileOutputStream(new File(name + "-uploaded")));
                stream.write(bytes);
                stream.close();

                return "You successfully uploaded " + userID + " into " + name + "-uploaded !";
            } catch (Exception e) {
                return "You failed to upload " + name + " => " + e.getMessage();
            }
        } else {
            return "You failed to upload " + name + " because the file was empty.";
        }
    }

    /**
     * update user profile image
     * @param file
     * @param userID
     * @return
     */
    @CrossOrigin(origins = "*")
    @RequestMapping(value="/changeProfile/{userID}", headers = "content-type=multipart/*",  method=RequestMethod.POST)
    public @ResponseBody String userProfileChange(
            @RequestParam("file") MultipartFile file, @PathVariable int userID){
        String name = Integer.toString(userID); // postID, userID, content
        if (!file.isEmpty()) {
            try {
                byte[] bytes = file.getBytes();
                BufferedOutputStream stream =
                        new BufferedOutputStream(new FileOutputStream(new File(name + "-uploaded")));
                stream.write(bytes);
                stream.close();

                return "You successfully uploaded " + userID + " into " + name + "-uploaded !";
            } catch (Exception e) {
                return "You failed to upload " + name + " => " + e.getMessage();
            }
        } else {
            return "You failed to upload " + name + " because the file was empty.";
        }
    }

    /**
     * return a image at the given path
     */
    @CrossOrigin(value = "*")
    @RequestMapping(value = "/files/{fileName}", method = RequestMethod.GET) //users/userID or /posts/postID
    public void getFile( @PathVariable("fileName") String fileName, HttpServletResponse response) {
        try {
            // get your file as InputStream
            InputStream is = new FileInputStream(new File(fileName));
            // copy it to response's OutputStream
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();
        } catch (IOException ex) {
            throw new RuntimeException("IOError writing file to output stream");
        }

    }
    
    /**
     * helder method that send email to user
     */
    private void sendTLSMail(String toEmail, String msg){
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
            message.setText(msg);

            Transport.send(message);

            System.out.println("Completed Sending Email to " + toEmail);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }



}