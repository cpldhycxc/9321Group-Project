import React from "react";
import {Button, Modal} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DatePicker from 'react-bootstrap-date-picker';
import moment from 'moment';
import validateInput from '../../functions/validation';
import classnames from 'classnames';



export default class SignupForm extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          username: '',
          email: '',
          password: '',
          firstname: '',
          lastname: '',
          passwordconfirm: '',
          startDate: moment().toISOString(),
          isvalid: false,
          errors: {}
        }
      this.onChange = this.onChange.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(e){
      this.setState({ [e.target.name]: e.target.value });
      console.log(this.state);
    }

    handleChange(date) {
      this.setState({
        startDate: date
      });
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
      if(this.isValid()){
        this.setState({ errors:{}, isloading:true });

      }
      console.log(this.state.errors);
    }

    render() {
        const { errors } = this.state;
        return(
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>Signup</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={this.handleSubmit} >
                    <div className={classnames('form-group', {'has-error': errors.username})} >
                        <label className="control-label">Username:</label>
                        <input onChange={this.onChange} type="text" className="form-control" id ="username" name="username" placeholder="Enter Username" />
                        {errors.username && <span className="help-block">{errors.username}</span>}
                    </div>
                    <div className ={classnames('form-group', {'has-error': errors.email})}>
                        <label className="control-label">Email:</label>
                        <input onChange={this.onChange} type="text" className="form-control" id ="email" name="email" placeholder="Enter email"/>
                        {errors.email && <span className="help-block">{errors.email}</span>}
                    </div>
                    <div className ={classnames('form-group', {'has-error': errors.firstname})}>
                        <label className="control-label">First Name: </label>
                    <input onChange={this.onChange} type="text" className="form-control" id ="firstname" name="firstname" placeholder="Enter your first name"/>
                    {errors.firstname && <span className="help-block">{errors.lastname}</span>}
                    </div>
                    <div className ={classnames('form-group', {'has-error': errors.lastname})}>
                        <label className="control-label">Last Name: </label>
                      <input onChange={this.onChange} type="text" className="form-control" id ="lastname" name="lastname" placeholder="Enter your last name"/>
                      {errors.lastname && <span className="help-block">{errors.lastname}</span>}
                    </div>
                    <div className ='form-group'>
                        <label className="control-label">Data of Birth: </label>
                        <DatePicker id="example-datepicker" value={this.state.startDate} onChange={this.handleChange} />
                    </div>
                    <div className ={classnames('form-group', {'has-error': errors.password})}>
                        <label className="control-label">Password: </label>
                        <input onChange={this.onChange} type="password" className="form-control" id ="password" name="password" placeholder="Enter Password"/>
                        {errors.password && <span className="help-block">{errors.password}</span>}
                    </div>
                    <div className ={classnames('form-group', {'has-error': errors.passwordconfirm})}>
                        <label className="control-label">Confirm Password: </label>
                    <input onChange={this.onChange} type="password" className="form-control" id ="passwordconfirm" name="passwordconfirm" placeholder="Enter Password again"/>
                    {errors.passwordconfirm && <span className="help-block">{errors.passwordconfirm}</span>}
                    </div>
                    <div className="form-group">
                      <Button type="submit" name="Submit"> Signup</Button>
                    </div>
                </form>
                </Modal.Body>
            </div>
        );
    }
}
