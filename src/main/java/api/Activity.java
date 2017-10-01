package api;

import java.util.Date;

public class Activity implements Comparable<Activity>{
    private int type;
    private String description;
    private Date date;

    public Activity(int t, String descrip, Date d){
        this.type = t;
        this.description = descrip;
        this.date = d;
    }

    public int getType() {
        return type;
    }

    public String getDescription() {
        return description;
    }

    public Date getDate() {
        return date;
    }

    public int compareTo(Activity o){
         return this.date.compareTo(o.date);
    }
}
