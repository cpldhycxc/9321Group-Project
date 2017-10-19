package Model;

public class Edge {
    private int from;
    private String edgeType;
    private int to;
    private String toS;

    public Edge(int from, String type, int to, String tos){
        this.from = from;
        this.edgeType = type;
        this.to = to;
        toS = tos;
    }

    public int hashCode() {
        return (from + " " + edgeType + " " + to + " " + toS).hashCode();
    }

    public int getFrom() {
        return from;
    }

    public int getTo() {
        return to;
    }

    public String getEdgeType() {
        return edgeType;
    }

    public String getToS() {
        return toS;
    }

    public void setFrom(int from) {
        this.from = from;
    }

    public void setTo(int to) {
        this.to = to;
    }

    public void setEdgeType(String edgeType) {
        this.edgeType = edgeType;
    }

    public void setToS(String toS) {
        this.toS = toS;
    }
}
