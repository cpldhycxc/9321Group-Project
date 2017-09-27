package api;

import java.util.concurrent.atomic.AtomicLong;

import DAO.*;
import Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin
@RestController
public class HomeController {

    @Autowired
    private DBDAO dbdao = new DBDAOImpl();

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @RequestMapping("/greeting")
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
        return new Greeting(counter.incrementAndGet(),
                            String.format(template, name));
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public SignUp SignUp(@RequestParam(value="useruame") String userName,
                             @RequestParam(value="password") String password,
                             @RequestParam(value="email") String email,
                             @RequestParam(value="firstname") String firstName,
                             @RequestParam(value="lastname") String lastName,
                             @RequestParam(value="birthday") String birthday) {
        
        User aUser = new User(userName, password, email, firstName, lastName, birthday);
        return new SignUp(counter.incrementAndGet(),  dbdao.userSignUp(aUser));
    }
    
    @CrossOrigin
    @RequestMapping(value = "/checkExistence/{loginName}", method = RequestMethod.GET)
    public CheckExistence checkExistence(@PathVariable String loginName) {
    	return new CheckExistence(loginName,dbdao.userExistence(loginName));

    }
    
    @RequestMapping(value = "/activation/{userName}", method = RequestMethod.GET)
    public void userActivation(@PathVariable String userName) {
    	dbdao.userActivation(userName);
    }

}