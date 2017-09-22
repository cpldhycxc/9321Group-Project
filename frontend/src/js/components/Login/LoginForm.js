import React from  "react";
import { connect } from 'react-redux';
import {Button, Modal} from 'react-bootstrap';
import SignupForm from '../Signup'
import {login} from '../../actions/userActions.js';

@connect((store)=>{
	return store.user;
})

export default class LoginForm extends React.Component {
	constructor(props) {
	  super(props);
	   this.state= {
		   username:'',
		   password:'',
		   isSubmitting:false,
		   issignup: false,
	   };
	   this.requestsignup = this.requestsignup.bind(this);
	   this.onChange = this.onChange.bind(this);
	   this.handleSubmit = this.handleSubmit.bind(this);
	}
	requestsignup() {
		this.setState({ issignup: true });
	}

	onChange(e){
		this.setState(
			{[e.target.name]:e.target.value}
		);
	}

	handleSubmit(e){
		e.preventDefault();
		var user ={
			username:this.state.username,
			password:this.state.password
		}
		this.setState({isSubmitting:true});
		this.props.dispatch(login(user));

	}

	render() {
		if(this.state.issignup){
			return(
				<div>
					<SignupForm />
				</div>
			);
		}
		return(
			<div>
				<Modal.Header closeButton>
					<Modal.Title>Login</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={this.handleSubmit} method="post">
						<div className ="form-group">
							<label className="control-label">Username:</label>
						<input onChange={this.onChange} type="text" className="form-control" name ="username" placeholder="Enter Username"/>
						</div>
						<div className ="form-group">
							<label className="control-label">Password:</label>
						<input onChange={this.onChange} type="password" className="form-control" name ="password" placeholder="Enter Password"/>
						</div>
						<div>
							<p>Not a member? <a style={{color:"blue"}} onClick={this.requestsignup} href="#">Sign Up</a> Now!</p>
						</div>
						<div className="form-group">
							<Button type="submit" name="Submit"> Login</Button>
							{this.state.isSubmitting ?<img src='static/images/loading.svg' height="50" width="50"/>:""}
						</div>
					</form>
				</Modal.Body>
			</div>
);
}
}
