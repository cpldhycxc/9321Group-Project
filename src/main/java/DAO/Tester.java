package DAO;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class Tester {

    public static void main(String[] args) {
        // Create a session factory
        // Create a session from the session factory
        // use the session to save model objects

        UserDAO firstUser  = new UserDAOImpl();


        //read the configure file and understand how the db is made
        SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();

        // opening a new session from the session factory
        Session session = sessionFactory.openSession();

        session.beginTransaction();
        session.save(firstUser);
        // save the transaction to db
        session.getTransaction().commit();
    }
}
