import React from "react";
import { Modal } from 'react-bootstrap';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { logout } from '../../actions/userActions';
import { withRouter } from 'react-router';

@connect((store) => {
	return {
		user: store.user.user,
		token: store.user.token
	};
})

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showModal: false,
		};
			this.close = this.close.bind(this);
			this.open = this.open.bind(this);
		}

	close() {
		this.setState({ showModal: false });
	}

	open() {
		this.setState({ showModal: true });
	}

	logout(e){
		e.preventDefault();
		this.props.dispatch(logout());
		this.setState({ showModal: false });
		this.props.history.push('/redirectwindow');
		
	}

	render() {
		const { user, token } = this.props;
		if (token) {
			return (
				<div className='user-icon-container'>
					<img src='static/images/user.svg' className='user-icon'/>
					<div className='user-detail'>
						Hi, { user.userName }<br/>
						<a href='#0' onClick={this.logout.bind(this)} className='login logout'>Click to logout</a>
					</div>
				</div>
			);
		}
		return (
			<div>
				<img src='static/images/user.svg' className='user-icon' />
				<div className='user-detail'>
					Not Login<br/>
					<a href='#' onClick={this.open} className='login logout'>Click to Login</a>
				</div>
				<div>
					<Modal show={this.state.showModal} onHide={this.close}>
						<LoginForm />
					</Modal>
				</div>
			</div>
		);
	}
}


const LoginRouter = withRouter(Login);
export default LoginRouter;
