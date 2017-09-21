import React from "react";
import {Button, Media, Tab, Nav} from 'react-bootstrap';


export default class EditProfile extends React.Component {
	render(){
		return(
			<div>
			<form>
  				<div className="form-group">
 					 <label for ="email"> Email: </label>
 					 <input type="email"  className="form-control" value="email" id="email"/>
 				 </div>
 				 <div className="form-group">
 					 <label for="password"> New Password: </label>
  					 <input type="password" className="form-control" id ="password"/>
  				 </div>
  				<div className="form-group">
 					 <label for="confirm password"> New Password: </label>
 					 <input type="password" className="form-control" id ="confirm password"/>
 				</div>
  				<input type="submit" value="Save Change"/>
  				<input type="submit" value="Close"/>
			</form>
			</div>
		)
	}
}
