import React from 'react';
import Graph from 'react-graph-vis';
import { Button, Select, Input } from 'semantic-ui-react';
import axios from 'axios';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      type: 'username',
      graph:null,
    };
    this.setInput = this.setInput.bind(this);
    this.setType = this.setType.bind(this);
    this.handleonClick = this.handleonClick.bind(this);
  }

  setInput(e) {
    this.setState({ input: e.target.value });
  }

  setType(value) {
    this.setState({ type: value });
  }

  handleonClick(){
    if(this.state.type === 'username'){
      const url = "http://localhost:8080/getUserGraph/" + this.state.input
      axios.get(url)
          .then((res)=>{
            console.log(res.data);
            this.setState({
              graph :{
                nodes:res.data.nodes,
                edges:res.data.edges,
              }
            })
          })
    } else if (this.state.type === 'DOB'){
      console.log('dob');
    } else if(this.state.type === 'gender'){
      console.log('gender');
    } else if(this.state.type === 'posts'){
      const url = "http://localhost:8080/getPostGraph/" + this.state.input
      axios.get(url)
          .then((res)=>{
            this.setState({
              graph :{
                nodes:res.data.nodes,
                edges:res.data.edges,
              }
            })
          })
    } else if(this.state.type === 'friend'){
      const url = "http://localhost:8080/getFriendGraph/" + this.state.input
      axios.get(url)
          .then((res)=>{
            this.setState({
              graph :{
                nodes:res.data.nodes,
                edges:res.data.edges,
              }
            })
          })
    }

  }

  componentWillMount() {
    axios.get("http://localhost:8080/getWholeGraph/")
        .then((res)=>{
          this.setState({
              graph :{
                nodes:res.data.nodes,
                edges:res.data.edges,
              }
          })
        })
  }


  render() {

    const graph = {
      nodes: [
        { id: 1, label: "people 1", group:1 },
        { id: 2, label: "people 2",group:1 },
        { id: 3, label: "people 3",group:1 },
        { id: 4, label: "people 4",group:1 },
        { id: 5, label: "people 5",group:3 },
        { id: 6, label:  "people 6",group:2 },
        { id: 7, label:  "people 7",group:2 },
      ],
      edges: [{ from: 1, to: 2 ,color:{color:'black'} },{ from: 2, to: 1,color:{color:'black'} },
        { from: 1, to: 3,color:{color:'black'} }, { from: 2, to: 4,color:{color:'black'} },
        { from: 2, to: 5,color:{color:'black'} },{from: 6, to: 7 ,color:{color:'black'}}]
    };

    const options = {
      layout: {
        hierarchical: false
      },
      edges: {
        color: "#000000"
      },
      // nodes:{
      //   shape:'icon',
      //   icon: {
      //     face: 'FontAwesome',
      //     code: ' \uf274 ',
      //     size: 50,  //50,
      //     color:'#2B7CE9'
      //   },
      // }
    };

    const SearchOption = [
    {
      key: 'username',
      value: 'username',
      text: 'Username',
    },
    {
      key: 'posts',
      value: 'posts',
      text: 'Posts',
    },
    {
      key: 'friend',
      value: 'friend',
      text: 'Friend',
    }
    ];

    const events = {
      select: function(event) {
        var { nodes, edges } = event;
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
      }
    };
        if(!this.state.graph){
            return null;
        }
        return (
        <div>
          <Input onChange={this.setInput} type='text' placeholder='Search...' action style={{ width: '100%' }}>
            <input />
            <Select onChange={(e, { value }) => this.setType(value)} compact options={SearchOption} defaultValue='username' />
            <Button type='submit' onClick={this.handleonClick}>Generate</Button>
          </Input>
          <Graph graph={this.state.graph} options={options} events={events} style={{ height: '640px' }} />
        </div>
    );
  }
}



