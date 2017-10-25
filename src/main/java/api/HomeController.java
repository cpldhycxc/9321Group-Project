package api;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.atomic.AtomicLong;

import DAO.*;
import Model.*;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletResponse;

import unsw.curation.api.tokenization.ExtractionKeywordImpl;


@CrossOrigin
@RestController
public class HomeController {

    @Autowired
    private DBDAO dbdao = new DBDAOImpl();

    // extract keyword
    private ExtractionKeywordImpl eki = new ExtractionKeywordImpl();

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();
    private ArrayList<Notification> notification = new ArrayList<Notification>();
    private List<String> wordL = new ArrayList<String>();
    private ArrayList<BullyPost> bullyPost = new ArrayList<BullyPost>();
    private String keywords;



    @CrossOrigin(origins = "*")
    @GetMapping("/greeting")
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
        sendTLSMail("shiyun.zhangsyz@gmail.com", "123");
        return new Greeting(counter.incrementAndGet(), String.format(template, name));
    }

    //curl -H "Content-Type: application/json" -X POST -d '{"userName":"shiyun","password":"haha","email":"shiyun.zhangsyz@gmail.com","firstName":"shiyun","lastName":"zhang","birthday":"1996-08-06"}' http://localhost:8080/signup
    /**
     * API call for sign up a user
     * @param user
     * @return json contain success, requestID
     */
    @CrossOrigin(origins = "*")
    @PostMapping("/signup")
    public SignUp signup(@RequestBody User user) { // userName, password, email, firstName, lastName, birthday
        System.out.println(user.getBirthday());
        if(!dbdao.userSignUp(user)){
            return new SignUp(counter.incrementAndGet(), false);
        }
        String msg = "Dear User,"
                + "\n\n Please click the link to activate your account for UNSW Book" +
                "\n localhost:9000/#/validation/" + Integer.toString(dbdao.getUserIdByUserName(user.getUserName()));
        sendTLSMail(user.getEmail(), msg);
        return new SignUp(counter.incrementAndGet(), true);
    }


    // curl -H "Content-Type: application/json" -X POST -d '{"userName":"z3462191","password":"maxwell"}' http://localhost:8080/login
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
            login.setPosts(new ArrayList<>());
            login.setFriends(new ArrayList<>());
            login.setSuccess(false);
            return login;
        }
        login.setPosts(dbdao.getOwnPostsByUserID(user.getUserID()));
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
                "\n  localhost:9000/#/addfriend/" + Integer.toString(rf.getUserID());
        sendTLSMail(toEmail, msg);
        return new FriendRelated(counter.incrementAndGet(), true);
    }

    //curl -H "Content-Type: application/json" -X POST -d '{"userID":"1","friendID":"6"}' http://localhost:8080/addFriend
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
        Notification noti = new Notification(rf.getUserID(),rf.getFriendName()+" is your friend now!");
		notification.add(noti);        
        return new FriendRelated(counter.incrementAndGet(), true);
    }
    
    /**
     * confirm to add friend relationship between two user in the db
     * @param rf
     * @return
     */
    @CrossOrigin(origins = "*")
    @PostMapping("deleteFriend")
    public FriendRelated deleteFriend(@RequestBody FriendRequest rf){
        dbdao.deleteFriendRelation(rf.getUserID(), rf.getFriendID());
        dbdao.deleteFriendRelation(rf.getFriendID(), rf.getUserID());
        return new FriendRelated(counter.incrementAndGet(), true);
    }

    /**
     * get userID posts and all his friends' posts and likes by
     * @param userID
     * @return posts
     */
    @CrossOrigin(origins = "*")
    @GetMapping("getPosts")
    public Posts getPosts(@RequestParam(value = "userID") int userID){
        return new Posts(counter.incrementAndGet(), dbdao.getPostsByUserID(userID));
    }

    @CrossOrigin(origins = "*")
    @GetMapping("getSelfPosts")
    public Posts getSelfPosts(@RequestParam(value = "userID") int userID) {
        return new Posts(counter.incrementAndGet(), dbdao.getOwnPostsByUserID(userID));
    }

    @CrossOrigin(origins = "*")
    @GetMapping("getFriends")
    public Friends getFriends(@RequestParam(value = "userID") int userID){
        return new Friends(counter.incrementAndGet(), dbdao.getFriendsByUserID(userID));
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
    @RequestMapping(value = "/backActivation/{userID}", method = RequestMethod.GET)
    public void backUserActivation(@PathVariable int userID) {
    	dbdao.backUserActivation(userID);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/userProfile")
    public UserProfile userProfile(@RequestBody UserP user) {
    	System.out.println(user.getSelectUserName());
    	System.out.println(user.getUserName());
    	return dbdao.userProfile(user.getSelectUserName(),user.getUserName());
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
    	System.out.println("Check for the notification!!");
    	for(Notification no:notification) {
    		System.out.println(no.getUserID()+"   "+no.getNoti());
    	}
    	Iterator<Notification> itr = notification.iterator();
    	while(itr.hasNext()){
    		Notification noti = itr.next();
    		if(noti.getUserID() == userID){
    			result.add(noti.getNoti());
    			itr.remove();
    		}
    	}
    	
    	System.out.println("Lets check the request ID");
    	for(String st:result){
    		System.out.println("expect :"+userID+ "  "+st);
    	}

    	System.out.println("After pop out all the noti");
    	for(Notification no:notification) {
    		System.out.println(no.getUserID()+"   "+no.getNoti());
    	}
    	
    	return result;
    }
    
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/randomPost")
    public Posts randomPost() {
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
    @RequestMapping(value="/addPost/{userID}/{content}", headers = "content-type=multipart/*",  method=RequestMethod.POST)
    public @ResponseBody SignUp handleFileUpload(
            @RequestParam("file") MultipartFile file, @PathVariable int userID, @PathVariable String content){
<<<<<<< HEAD
    		System.out.println("fuckfuckfuck");
=======
>>>>>>> f09c163c3372c86da5effc8e518f4837659c1fd5
        if (!file.isEmpty()) {
            try {
                int postID;
                if(content.equals("null")){
                    postID = (int)dbdao.addPost(userID, null);
                } else {
                    postID = (int)dbdao.addPost(userID, content);
                    System.out.println(content);
                    checkBully(userID,content,postID);
                }
                
                String filePath = "posts/" + Integer.toString(postID);
                System.out.println(filePath);
                byte[] bytes = file.getBytes();
                BufferedOutputStream stream =
                        new BufferedOutputStream(new FileOutputStream(new File(filePath)));
                stream.write(bytes);
                stream.close();

                return new SignUp(counter.incrementAndGet(), true);
            } catch (Exception e) {
                e.printStackTrace();
                return new SignUp(counter.incrementAndGet(), false);
            }
        } else {
            return new SignUp(counter.incrementAndGet(), false);
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
    public @ResponseBody SignUp userProfileChange(
            @RequestParam("file") MultipartFile file, @PathVariable int userID){
        String filePath = "users/" + Integer.toString(userID); // postID, userID, content
        if (!file.isEmpty()) {
            try {
                byte[] bytes = file.getBytes();
                BufferedOutputStream stream =
                        new BufferedOutputStream(new FileOutputStream(new File(filePath)));
                stream.write(bytes);
                stream.close();

                return new SignUp(counter.incrementAndGet(), true);
            } catch (Exception e) {
                e.printStackTrace();
                return new SignUp(counter.incrementAndGet(), false);
            }
        } else {
            return new SignUp(counter.incrementAndGet(), false);
        }
    }

    /**
     * return a image at the given path
     */
    @CrossOrigin(value = "*")
    @RequestMapping(value = "/files/{folder}/{imageID}", method = RequestMethod.GET) //users/userID or /posts/postID
    public void getFile(@PathVariable("folder") String folder, @PathVariable("imageID") int id, HttpServletResponse response) {
        try {
            // get your file as InputStream
            InputStream is = new FileInputStream(new File(folder + "/" + id));
            // copy it to response's OutputStream
            IOUtils.copy(is, response.getOutputStream());
            response.flushBuffer();
        } catch (IOException ex) {

        }
    }
    
    /**
     * helder method that send email to user
     */
    private void sendTLSMail(String toEmail, String msg){
        sendTLSMail(toEmail, msg, "Registration Confirmation");
    }


    /**
     * helder method that send email to user
     */
    private void sendTLSMail(String toEmail, String msg, String title){
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
                    @Override
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
            message.setSubject(title);
            message.setText(msg);

            Transport.send(message);

            System.out.println("Completed Sending Email to " + toEmail);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }


    @CrossOrigin(value = "*")
    @RequestMapping(value = "/activityReport/{userID}", method = RequestMethod.GET)
    public UserActivities userActivity(@PathVariable int userID){
        return dbdao.userActivities(userID,bullyPost);
    }

    @CrossOrigin(value = "*")
    @RequestMapping(value = "/searchResult", params = {"userName"}, method = RequestMethod.GET)
    public ArrayList<UserProfile> search(@RequestParam("userName") String param ){
        return dbdao.search(param);
    }


    //    String userName, String firstName, String lastName
    @RequestMapping(value = "/advSearchResult", params = {"gender", "dob", "userName", "firstName", "lastName"}, method = RequestMethod.GET)
    public ArrayList<UserProfile> advSearch( @RequestParam("gender") String gender ,
                                             @RequestParam("dob") String dob,
                                             @RequestParam("userName") String userName,
                                             @RequestParam("firstName") String firstName,
                                             @RequestParam("lastName") String lastName){
        return dbdao.advSearch(gender, dob, userName, firstName, lastName);
    }

    @CrossOrigin(value = "*")
    @RequestMapping(value = "/updateProfile/{userID}", params = {"fname","lname", "dob", "email", "gender"}, method = RequestMethod.GET)
    public UserProfile updateProfile(@PathVariable String userID,
                                 @RequestParam("fname") String fname,
                                 @RequestParam("lname") String lname,
                                 @RequestParam("dob") String dob,
                                 @RequestParam("email") String email,
                                 @RequestParam("gender") String gender){
        UserProfile flag = dbdao.editProfile(userID, fname, lname, dob, email, gender );
        return flag;
    }
    
	public void api(String Con) throws Exception {
		ExtractionKeywordImpl keyword = new ExtractionKeywordImpl();
		this.keywords = keyword.ExtractSentenceKeyword(Con, new File("src/main/resources/words.txt"));
	}
	
// word extract api test
//    @CrossOrigin(origins = "*")
//    @RequestMapping(value = "/testAPI", method = RequestMethod.GET)
//    public void testAPI() {
//		int userID = 11;
//		String content = "HI, CHECK THE ~\n 232	content  Abuse, Abusive  heihei,welfare   h whine";
//		int postID = 100;
//		checkBully(userID,content,postID);    		
//    }
	
	
//if the post content contain any bully word, email will sent to admin which contains: userID, postID and bully word 	
	public void checkBully(int userID, String content,int postID){
		System.out.println("fdfdfd");
		ArrayList<String> items = new ArrayList<String>(Arrays.asList(content.replaceAll("[^a-zA-Z'\\s]"," ").split("\\s+")));
		try{
			api(content);
		}catch(Exception e){
			e.printStackTrace();
		}
		ArrayList<String> checkList = new ArrayList<String>(Arrays.asList(keywords.split(",")));
		items.removeAll(checkList);
//		for(String i: items){
//			System.out.println(i);
//		}
		if(!items.isEmpty()){
		    System.out.println("sending bullying");
			BullyPost p = new BullyPost(postID,userID);
			bullyPost.add(p);
			String msg = "Please check the content posted by user.\nUser ID: "+userID
					+"\nPost ID: "+postID+"\nContent: "+content+"\nWords contained: "+items;
			sendTLSMail("liangxubing@gmail.com", msg, "Bullying Keyword Notification");
		}else{
			System.out.println("no bully-word contained");
		}

	}


    // localhost:8080/getWholeGraph
    @CrossOrigin(value = "*")
    @RequestMapping(value = "/getWholeGraph", method = RequestMethod.GET)
    public FinalGraphQuery wholeGraph(){
        GraphQuery result = dbdao.getWholeGraph();
        result.setRequestID(counter.incrementAndGet());
//        for(Object o : result.getNodes()) {
//            Node n = (Node) o;
//            System.out.println(n.toString());
//        }
//        System.out.println("");
//        for(Object o : result.getEdges()) {
//            Edge e = (Edge) o;
//            System.out.println(e.toString());
//        }
        return new FinalGraphQuery(result);
    }

    //localhost:8080/getUserGraph/1
    @CrossOrigin(value = "*")
    @RequestMapping(value = "/getUserGraph/{userName}", method = RequestMethod.GET)
    public FinalGraphQuery userGraph(@PathVariable String userName){
        String userID = Integer.toString(dbdao.getUserIdByUserName(userName));
        if(userID.equals("-1")){
            return new FinalGraphQuery();
        }
        GraphQuery result = dbdao.getUserGraph(userID);
        result.setRequestID(counter.incrementAndGet());
        return new FinalGraphQuery(result);
    }

    //localhost:8080/getPostGraph/10
    @CrossOrigin(value = "*")
    @RequestMapping(value = "/getPostGraph/{keyword}", method = RequestMethod.GET)
    public FinalGraphQuery postGraph(@PathVariable String keyword){
        GraphQuery result = dbdao.getPostGraph(keyword);
        result.setRequestID(counter.incrementAndGet());
        return new FinalGraphQuery(result);
    }

    //localhost:8080/getFriendGraph/2
    @CrossOrigin(value = "*")
    @RequestMapping(value = "/getFriendGraph/{userName}", method = RequestMethod.GET)
    public FinalGraphQuery firendGraph(@PathVariable String userName){
        String userID = Integer.toString(dbdao.getUserIdByUserName(userName));
        if(userID.equals("-1")){
            return new FinalGraphQuery();
        }
        GraphQuery result = dbdao.getFriendGraph(userID);
        result.setRequestID(counter.incrementAndGet());
        return new FinalGraphQuery(result);
    }

}