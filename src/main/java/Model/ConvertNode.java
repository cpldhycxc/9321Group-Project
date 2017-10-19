package Model;

public class ConvertNode {
    private int id;
    private String label;
    private int group;

    public ConvertNode(int i, String l, int g){
        id = i;
        label = l;
        group = g;
    }

    @Override
    public boolean equals(final Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        ConvertNode other = (ConvertNode) obj;
        return id == other.id && label.equals(other.label) && group == other.group;
    }

    public int hashCode() {
        return (id + " " + label + " " + group).hashCode();
    }

    public String getLabel() {
        return label;
    }

    public int getId() {
        return id;
    }

    public int getGroup() {
        return group;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setGroup(int group) {
        this.group = group;
    }
}
