import React from 'react';
// import { connect } from "react-redux";
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import Nav from './Nav';
import Search from '../../containers/Search';
import Home from '../../containers/Home';
import Profile from '../../containers/Profile';
import ActivityReport from '../../containers/ActivityReport';
import User from '../../containers/User';
import Validation from './validation.js';
import UserRedirect from '../../containers/User/userredirect.js';
import AddFriend from '../../containers/User/addFriend.js';
import AdvancedSearch from '../../containers/AdvSearch';
import RedirectWindows from './redirectwindow.js';
import Graph from '../../containers/Graph';



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
                <Route path='/validation/:userid' component={Validation} />
                <Route path='/redirectwindow' component={RedirectWindows} />
                <Route path='/userredirect/:username' component={UserRedirect} />
                <Route path='/addfriend/:userID' component={AddFriend}/ >
                <Route path='/activityreport/:userID' component={ActivityReport} />
                <Route paht='/advsearch' component={AdvancedSearch} />
                <Route paht='/graph' component={Graph} />
            </Switch>
        </div>
      </div>
    );
  }
}
