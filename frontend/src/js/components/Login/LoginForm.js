import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import SignupForm from '../Signup'
import { login } from '../../actions/userActions';
import validateInput from '../../functions/loginvalidation';
import classnames from 'classnames';
import Loginfail from './Loginfail';
import { withRouter } from 'react-router';

@connect((store) => {
	return {
		user: store.user.user,
		token: store.user.token,
	};
})

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			issignup: false,
			errors:{},
			failed:false,
		};
		this.requestsignup = this.requestsignup.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.changeform = this.changeform.bind(this);
		this.changestate = this.changestate.bind(this);
	}

	onChange(e){
		this.setState({ [e.target.name]: e.target.value });
	}

	requestsignup(){
		this.setState({ issignup: true });
	}

	changestate(){
		this.setState({ failed: !this.state.failed });
	}

	isValid() {
		const { errors, isValid } = validateInput(this.state);

		if(!isValid) {
			this.setState({ errors });
		}

		return isValid;
	}

	handleSubmit(e){
		e.preventDefault();
		const user = {
			userName: this.state.username,
			password: this.state.password
		}
		if(this.isValid()){
			this.setState({ errors:{}});
			this.props.dispatch(login(user,this.changestate,this.props.history.push));
			// ('/redirectwindow');)
		}

	}

	changeform(){
		this.setState({ issignup: false });
	}
	render() {
		const { user, token } = this.props;
		console.log(this.state.failed);
		const { errors } = this.state;
		if(this.state.issignup){
			return(
				<div>
					<SignupForm changeform={this.changeform}/>
				</div>
			);
		}

		if(this.state.failed){
			return (
				<Loginfail changestate={this.changestate}/>
			)

		}

		return(
			<div>
				<Modal.Header closeButton>
					<Modal.Title>Login</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={this.handleSubmit} method="post">
						<div className={classnames('form-group', {'has-error': errors.username})}>
							<label className="control-label">Username:</label>
						<input
						onChange={this.onChange}
						type="text"
						className="form-control"
						name="username"
						placeholder="Enter Username"
						/>
						{errors.username && <span className="help-block">{errors.username}</span>}
						</div>
						<div className={classnames('form-group', {'has-error': errors.password})} >
							<label className="control-label">Password:</label>
							<input
							onChange={this.onChange}
							type="password"
							className="form-control"
							name="password"
							placeholder="Enter Password"
							/>
							{errors.password && <span className="help-block">{errors.password}</span>}
						</div>
						<div>
							<p>Not a member?
								<a style={{ color: 'blue' }} onClick={this.requestsignup}>Sign Up</a> Now!</p>
						</div>
						<div className="form-group">
							<Button type="submit" name="Submit" className='btn btn-primary btn-md'> Login</Button>
						</div>
					</form>
				</Modal.Body>
			</div>
);
}
}

const LoginFormRouter = withRouter(LoginForm);
export default LoginFormRouter;

			// isSubmitting: false,
// {this.state.isSubmitting ?
// 	<img src='static/images/loading.svg' height="50" width="50"/>:""}
