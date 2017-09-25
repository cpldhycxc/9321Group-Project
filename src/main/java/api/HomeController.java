package api;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @RequestMapping("/greeting")
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
        return new Greeting(counter.incrementAndGet(),
                            String.format(template, name));
    }

    @RequestMapping("/insertUser")
    public InsertUser insertUser(@RequestParam(value="userName", required=true) String userName,
                                 @RequestParam(value="password", required=true) String password,
                                 @RequestParam(value="email", required=true) String email,
                                 @RequestParam(value="firstName", required=true) String firstName,
                                 @RequestParam(value="lastName", required=true) String lastName,
                                 @RequestParam(value="gender", required=true) int gender) {
    return new InsertUser(counter.incrementAndGet(), userName, password, email, firstName, lastName, gender);
    }


}