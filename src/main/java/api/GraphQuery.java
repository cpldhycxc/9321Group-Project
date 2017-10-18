package api;

import Model.Edge;
import Model.Friend;
import Model.Node;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class GraphQuery {
    private long requestID;
    private ArrayList<Node> nodes;
    private ArrayList<Edge> edges;

    public GraphQuery(){
        requestID = 0;
    }

    public GraphQuery(long id, ArrayList<Node> nodes, ArrayList<Edge> edges){
        requestID = id;
        this.nodes = nodes;
        this.edges = edges;
    }

    public long getRequestID() { return requestID; }

    public ArrayList getNodes() {
        return nodes;
    }

    public ArrayList getEdges() {
        return edges;
    }

    public void setRequestID(long requestID) {
        this.requestID = requestID;
    }

    public void setEdges(ArrayList edges) {
        this.edges = edges;
    }

    public void setNodes(ArrayList nodes) {
        this.nodes = nodes;
    }
}
