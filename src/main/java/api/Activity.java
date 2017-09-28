package api;

public class Activity{
    private int type;
    private String description;
    private String date;

    public Activity(int t, String descrip, String d){
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

    public String getDate() {
        return date;
    }

//    public int compareTo(Activity o){
//        return ;
//    }
}
