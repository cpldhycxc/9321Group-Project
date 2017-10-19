package api;

import Model.*;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class  FinalGraphQuery{
    private long requestID;
    private ArrayList<ConvertNode> nodes;
    private ArrayList<ConvertEdge> edges;

    public FinalGraphQuery(){
        requestID = 0;
    }

    public FinalGraphQuery(GraphQuery convFrom){
        requestID = convFrom.getRequestID();
        nodes = new ArrayList<>();
        edges = new ArrayList<>();
        int count = 0;

        // old userID to new userID mapping
        Map<Integer, Integer> userMap =  new HashMap<>();

        for(Object obj : convFrom.getNodes()){
            Node n = (Node) obj;
            switch (n.getNodeType()) {
                case "age":
                    String birthday = n.getAdditional();
                    nodes.add(new ConvertNode(count, birthday, 1));

                    for(Object o : convFrom.getEdges()){
                        Edge e = (Edge) o;
                        if(e.getEdgeType().equals("dob") && e.getToS().equals(birthday)){
                            e.setTo(count);
                        }
                    }

                    ++count;
                    break;
                case "gender":
                    String gender = n.getAdditional();
                    nodes.add(new ConvertNode(count, gender, 2));

                    for(Object o : convFrom.getEdges()){
                        Edge e = (Edge) o;
                        if(e.getEdgeType().equals("gender") && e.getToS().equals(gender)){
                            e.setTo(count);
                        }
                    }

                    ++count;
                    break;
                case "user":
                    String name = n.getAdditional();
                    int userID = n.getId();
                    nodes.add(new ConvertNode(count, name, 3));

                    userMap.put(userID, count);

                    ++count;
                    break;
                case "post":
                    int postID = n.getId();
                    nodes.add(new ConvertNode(count, "Post " + count, 4));

                    for(Object o : convFrom.getEdges()){
                        Edge e = (Edge) o;
                        if((e.getEdgeType().equals("liked") || e.getEdgeType().equals("posted")) && e.getTo() == postID){
                            e.setTo(count);
                        }
                    }

                    ++count;
                    break;
            }
        }

        for(Object obj : convFrom.getEdges()) {
            Edge e = (Edge) obj;
            int oldUserID = e.getFrom();
            int newUserID = userMap.get(oldUserID);
            switch (e.getEdgeType()){
                case "dob":
                    edges.add(new ConvertEdge(newUserID, e.getTo(), "dob"));
                    break;
                case "gender":
                    edges.add(new ConvertEdge(newUserID, e.getTo(), "gender"));
                    break;
                case "friend":
                    int newFriendID = userMap.get(e.getTo());
                    edges.add(new ConvertEdge(newUserID, newFriendID, "friend"));
                    break;
                case "posted":
                    edges.add(new ConvertEdge(newUserID, e.getTo(), "posted"));
                    break;
                case "liked":
                    edges.add(new ConvertEdge(newUserID, e.getTo(), "liked"));
                    break;
            }
        }

    }

    public long getRequestID() {
        return requestID;
    }

    public ArrayList<ConvertEdge> getEdges() {
        return edges;
    }

    public ArrayList<ConvertNode> getNodes() {
        return nodes;
    }

    public void setRequestID(long requestID) {
        this.requestID = requestID;
    }

    public void setNodes(ArrayList<ConvertNode> nodes) {
        this.nodes = nodes;
    }

    public void setEdges(ArrayList<ConvertEdge> edges) {
        this.edges = edges;
    }
}
