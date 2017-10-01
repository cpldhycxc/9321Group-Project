import React from 'react';
// import { connect } from "react-redux";
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Nav from './Nav';
import Search from '../../containers/Search';
import Profile from '../../containers/Profile';
import Home from '../../containers/Home';
import ActivityReport from '../../containers/ActivityReport';
import User from '../../containers/User';
import UserRedirect from '../../containers/User/userredirect.js';


export default class Main extends React.Component {
  render() {
    return (
      <div>
        <Nav path={this.props.location.pathname} />
        <div className='content'>
            <Switch>
                <Route exact path='/' render={() => <Redirect to='/wall' />} />
                <Route path='/wall' component={Home} />
                <Route path='/search' component={Search} />
                <Route path='/profile' component={Profile} />
                <Route path='/user/:username' component={User} />
                <Route path='/userredirect/:username' component={UserRedirect}/>
                <Route path='/ActivityReport/:username' component={ActivityReport} />
            </Switch>
        </div>
      </div>
    );
  }
}
