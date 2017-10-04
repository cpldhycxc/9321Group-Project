import React from "react";
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
import Login from '../../components/Login';
import NotificationSystem from 'react-notification-system';
import axios from 'axios';

@connect((store) => {
	return {
		user: store.user.user,
	};
})
class Header extends React.Component {

  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
    const url = 'http://localhost:8080/notification/'.concat(this.props.user.userID);
    axios.get(url)
    .then((response) => {
			response.data.map((e) => (
				this.addNotification(e)
			));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  addNotification = (message) => {
    this.notificationSystem.addNotification({
			message: message,
			level: 'success'
		});
  }

	render() {
		return (
			<header className='header'>
				<div>
					<NotificationSystem ref="notificationSystem" />
				</div>
				<div className='logo'>
					<Link to='/'>
						<img src='static/images/steamRlogo.svg' className='logo-icon' />
						UNSWBook
					</Link>
				</div>
			</header>
		);
	}
}

const notifications = {
	data: [
	'Ryan like your post',
	'Gary like your post',
	'Bao is your friend now']
};

@connect((store) => {
	return {
		user: store.user.user,
		token: store.user.token
	};
})
class SideBar extends React.Component {
	render() {
		const { path, token } = this.props;
		const active = path === (path === '/profile' ? 'profile' : path === '/search' ? 'search' :'wall');
		const base_links = [['wall', true], ['search', false], ['profile', false]];
		const links = base_links.filter((e) => e[1] || token).map((e) => e[0]);
		const sideLinks = links.map((link, i) =>
			<li className={link + '-sidebar sidebar ' + (active === link ? 'active' : '')} key={i}>
			<Link to={`/${link}`}>
			<img src={`static/images/${link}.svg`} className={`sidebar-icon`}/>
				{link.replace('-',' ')}
			</Link>
		</li>)
		return (
			<nav className='side-nav'>
				<ul>
					<li className='user'>
						<Login />
					</li>
					{sideLinks}
				</ul>
			</nav>
		);
	}
}


export default class Nav extends React.Component {
  render() {
    return (
		<div>
			<Header />
			<SideBar path={this.props.path} />
		</div>
    );
  }
}
