import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import classnames from 'classnames';




export default class Loginfail extends React.Component {
	render() {
		return(
			<div>
				<Modal.Header closeButton>
					<Modal.Title>Login</Modal.Title>
				</Modal.Header>
				<Modal.Body>
           <span className="label label-danger warningstyle">Wrong password or username, go back and try again</span> <br />
            <Button onClick = {this.props.changestate} className='btn btn-primary btn-md backbutton' > Back</Button>
				</Modal.Body>
			</div>
);
}
}
