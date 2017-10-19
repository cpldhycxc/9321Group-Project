package Model;

public class Node {
    private int id;
    private String nodeType;
    private String additional;

    public Node(int i, String t, String n){
        id = i;
        nodeType = t;
        additional = n;
    }

    @Override
    public boolean equals(final Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Node other = (Node) obj;
        return id == other.id && nodeType.equals(other.nodeType) && additional.equals(other.additional);
    }

    public int hashCode() {
        return (id + " " + nodeType + " " + additional).hashCode();
    }

    public int getId() {
        return id;
    }

    public String getAdditional() {
        return additional;
    }

    public String getNodeType() {
        return nodeType;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setAdditional(String additional) {
        this.additional = additional;
    }

    public void setNodeType(String nodeType) {
        this.nodeType = nodeType;
    }

    @Override
    public String toString() {
        return "ID:" + id + " nodeType:" + nodeType + " additional:" + additional;
    }
}
