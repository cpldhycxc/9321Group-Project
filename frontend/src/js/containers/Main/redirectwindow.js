import React from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
// import { connect } from "react-redux";

export default class userredirect extends React.Component {
  render() {
    const { username }= this.props.match.params;
    console.log(username);
    return (
      <div>
       <Redirect to='/wall' />
     </div>
   )
  }
}
