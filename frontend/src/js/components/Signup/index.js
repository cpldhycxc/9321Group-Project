import React from "react";
import {Button, Modal} from 'react-bootstrap';
import { Link } from 'react-router-dom';



export default class SignupForm extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          user:{
              username:'',
              email:'',
              password:'',
              passwordconfirm:''
          }
        }
        console.log(this.state)
    }
    render() {
        return(
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>Signup</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={this.onSubmit} >
                    <div className ="form-group">
                        <label for="username" className="control-label">Username:</label>
                        <input type="text" className="form-control" id ="username" placeholder="Enter Username"/>
                    </div>
                    <div className ="form-group">
                        <label for="username" className="control-label">Email:</label>
                        <input type="text" className="form-control" id ="email" placeholder="Enter email"/>
                    </div>
                    <div className ="form-group">
                        <label for="password" className="control-label">Password: </label>
                        <input type="password" className="form-control" id ="password" placeholder="Enter Password"/>
                    </div>
                    <div className ="form-group">
                        <label for="password" className="control-label">Confirm Password: </label>
                    <input type="password" className="form-control" id ="passwordconfirm" placeholder="Enter Password again"/>
                    </div>
                </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type = "submit"> Signup</Button>
                </Modal.Footer>
            </div>
        );
    }
}
