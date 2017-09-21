import React from "react";
import {Button, Media, Tab, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {EditProfile} from "./EditProfile"

export default class Profile extends React.Component {
	constructor(props){
		super(props);
		this.state ={
			user :{
				username:'',
            	email:'',
            	password:''
        },
         	isedit:false,
		};
		this.requestedit = this.requestedit.bind(this);
	}
	requestedit(){
		this.setState({ isedit: true });
	}


	render () {
		if (this.state.isedit){
			return (
				<div className = "content">
				<EditProfile />
				</div>
				);
		}
		return(
			<div className = "content">
				<form>
					<div className ="media-left">
						<img src = "http://www.ravalyogimatrimony.com/Content/images/default-profile-pic.png" alt = "profile picture"/>
					</div>
					<div className = "media-body">
					<p> Username :</p>
    				<p> Email : </p>
    				<input type = "submit" value = "Edit Profile" name = "edit" onClick={this.requestedit}/>
					</div>
				</form>
				<ul className="nav nav-tabs">
  					<li className ="active"><a data-toggle ="tab" href="#playlist">Play List</a></li>
  					<li><a data-toggle ="tab" href="#wishlist">Wishlist</a></li>
				</ul>
				<div className ="tab-content">
					<div id ="playlist" className = "tab-pane fade in active">
						<li><a href="#">1</a></li>
    					<li><a href="#">2</a></li>
    					<li><a href="#">3</a></li>
    					<li><a href="#">4</a></li>
					</div>
				<div id ="wishlist" className = "tab-pane fade">
						<li><a href="#">1</a></li>
    					<li><a href="#">2</a></li>
    					<li><a href="#">3</a></li>
    					<li><a href="#">4</a></li>
				</div>
			</div>
		</div>
			);
	}
}
