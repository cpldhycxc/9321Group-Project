import React from "react";
import axios from 'axios';
import {Button, Modal} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DatePicker from 'react-bootstrap-date-picker';
import moment from 'moment';
import validateInput from '../../functions/signupvalidation';
import classnames from 'classnames';
import { checkuser } from '../../actions/userActions';


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
          birthday: moment().toISOString(),
          invalid: false,
          errors: {}
        }
      this.onChange = this.onChange.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.checkUserExists = this.checkUserExists.bind(this);
    }

    onChange(e){
      this.setState({ [e.target.name]: e.target.value });
      console.log(this.state);
    }

    handleChange(date) {
      this.setState({
        birthday: date
      });
    }

    checkUserExists(e) {
      const field = e.target.name;
      const val = e.target.value;
      console.log(val);
      if (val !== '') {
        checkuser(val)
        .then(res => {
          console.log(res);
          let errors = this.state.errors;
          let invalid;
          if (res.data.type) {
            errors[field] = 'The user already exists';
            invalid = true;
          } else {
            errors[field] = '';
            invalid = false;
          }
          this.setState({ errors, invalid });
        })
        .catch((err) => {
          console.log("fuc boi");
        })
      }
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
      console.log(this.state);
      if(this.isValid()){
        this.setState({ errors:{}, isloading:true });

      }
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
                        <input onBlur={this.checkUserExists} onChange={this.onChange} type="text" className="form-control" id ="username" name="username" placeholder="Enter Username" />
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
                        <DatePicker id="example-datepicker" value={this.state.birthday} onChange={this.handleChange} />
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
                      <Button disabled={this.state.invalid} className='btn btn-primary btn-md' type="submit" name="Submit"> Signup</Button>
                    </div>
                </form>
                </Modal.Body>
            </div>
        );
    }
}
