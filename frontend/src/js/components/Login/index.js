import React from "react";
import { Modal } from 'react-bootstrap';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';

@connect((store) => {
	return {
		user:store.user.user
	};
})

export default class Login extends React.Component {
		constructor(props) {
			super(props);

			this.state = {
				showModal: false,
			};
	         this.close = this.close.bind(this);
	         this.open = this.open.bind(this);
  		}

		close() {
			console.log(this.state)
			this.setState({ showModal: false });
		}

		open() {
			console.log(this.state)
			this.setState({ showModal: true });
		}

		render() {
			return (
				<div>
					<img src='static/images/user.svg' className='user-icon' />
					<div className='user-detail'>
						<a href='#' onClick={this.open} className='login logout'>Please Login</a>
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
