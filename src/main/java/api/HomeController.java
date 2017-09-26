package api;

import java.util.Properties;
import java.util.concurrent.atomic.AtomicLong;

import DAO.*;
import Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@RestController
public class HomeController {

    @Autowired
    private DBDAO dbdao = new DBDAOImpl();

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @RequestMapping("/greeting")
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
        sendTLSMail("shiyun.zhangsyz@gmail.com", "123");
        return new Greeting(counter.incrementAndGet(),
                            String.format(template, name));
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public SignUp SignUp(@RequestParam(value="userName") String userName,
                             @RequestParam(value="password") String password,
                             @RequestParam(value="email") String email,
                             @RequestParam(value="firstName") String firstName,
                             @RequestParam(value="lastName") String lastName,
                             @RequestParam(value="birthday") String birthday) {
        User aUser = new User(userName, password, email, firstName, lastName, birthday);

        if(!dbdao.userSignUp(aUser)){
            return new SignUp(counter.incrementAndGet(), false);
        }

        sendTLSMail(email, Integer.toString(dbdao.getUserIdByUserName(userName)));

        return new SignUp(counter.incrementAndGet(), true);
    }

    /**
     * method that send email to user
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