import React from "react";
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';
import Login from '../../components/Login';
import NotificationSystem from 'react-notification-system';

class Header extends React.Component {


  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
    notifications.data.map((e) => (
			this.addNotification(e)
    ));
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
		const active = path === '/friends' ? 'friends' : (path === '/profile' ? 'profile' : path === '/search' ? 'search' :'wall');
		const base_links = [['wall', true], ['search', true],['friends', false], ['profile', false]];
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
