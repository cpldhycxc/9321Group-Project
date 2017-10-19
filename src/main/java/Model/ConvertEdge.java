package Model;

public class ConvertEdge {
    private int from;
    private int to;
    private String label;

    public ConvertEdge(int from, int to, String label){
        this.from = from;
        this.to = to;
        this.label = label;
    }

    public int hashCode() {
        return (from + " " + to + " " + label).hashCode();
    }

    public int getTo() {
        return to;
    }

    public int getFrom() {
        return from;
    }

    public String getLabel() {
        return label;
    }

    public void setTo(int to) {
        this.to = to;
    }

    public void setFrom(int from) {
        this.from = from;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
