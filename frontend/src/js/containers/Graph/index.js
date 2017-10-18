import React from 'react';
import Graph from 'react-graph-vis';
import { Button, Select, Input } from 'semantic-ui-react';

export default class User extends React.Component {
  render() {
    const graph = {
      nodes: [
        { id: 1, label: "people 1" },
        { id: 2, label: "people 2" },
        { id: 3, label: "people 3" },
        { id: 4, label: "people 4" },
        { id: 5, label: "people 5" },
        { id: 6, label:  "people 6" },
        { id: 7, label:  "people 7" },
      ],
      edges: [{ from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 2, to: 5 },{from: 6, to: 7}]
    };

    const options = {
      layout: {
        hierarchical: false
      },
      edges: {
        color: "#000000"
      }
    };

    const SearchOption = [
    {
      key: 'people',
      value: 'people',
      text: 'People',
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
    }];

    const events = {
      select: function(event) {
        var { nodes, edges } = event;
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
      }
    };
    return (
        <div>
          <Input type='text' placeholder='Search...' action style={{ width: '1000px' }}>
            <input />
            <Select compact options={SearchOption} defaultValue='people' />
            <Button type='submit'>Search</Button>
          </Input>
          <Graph graph={graph} options={options} events={events} style={{ height: '640px' }} />
        </div>
    );
  }
}
