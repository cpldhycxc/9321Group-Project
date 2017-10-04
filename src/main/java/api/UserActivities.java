package api;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;

public class UserActivities {
    private String joinDate;
    private ArrayList<Activity> activities;

    public UserActivities(String jd, ArrayList<Activity> acti) {
        this.joinDate = jd;
        this.activities = acti;
    }

    public UserActivities() {
        this.joinDate = null;
        this.activities = new ArrayList<Activity>();
    }

    public String getJoinDate() {
        return joinDate;
    }

    public ArrayList<Activity> getActivities() {
        return activities;
    }

    public void addActivity(Activity act) {
        this.activities.add(act);
    }

    public void setJoinDate(String date) {
        this.joinDate = date;
    }

    public void sortActivities() {
        Collections.sort(this.activities);
    }

    public boolean checkEmpty() {
        return this.activities.isEmpty();
    }
}
