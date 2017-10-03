import React from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
// import { connect } from "react-redux";

export default class userredirect extends React.Component {
  render() {
    return (
      <div>
       <Redirect to='/wall' />
     </div>
   )
  }
}
