import InlineEdit from 'react-edit-inline';
import React from 'react';
import { connect } from 'react-redux';
import FileInput from 'react-file-input';
import { Button, Icon, Image } from 'semantic-ui-react';


@connect((store) => {
	return {
		user: store.user.user,
		token: store.user.token
	};
})

class profile extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
	pictures: [],
	pictureChange: '',
	username: '',
	fname: '',
	lname: '',
	gender: '',
	dob: '',
	email: '',
  };
 this.fChanged = this.fChanged.bind(this);
 this.lChanged = this.lChanged.bind(this);
 this.gChanged = this.gChanged.bind(this);
 this.dChanged = this.dChanged.bind(this);
 this.eChanged = this.eChanged.bind(this);
 this.handleInput = this.handleInput.bind(this);
 this.handleEdit = this.handleEdit.bind(this);
 }

 handleInput(event) {
	this.setState({
		pictures: event.target.files[0],
		pictureChange: true,
	});
 }

handleEdit(event){
	const allvalue = 'fname: '+ this.state.fname.message + ' lname:' + this.state.lname.message
	+ ' gender: ' + this.state.gender.message + ' dob: ' + this.state.dob.message + ' email: '
	+ this.state.email.message;
	console.log(allvalue);
}

 fChanged(data) {
     this.setState({ fname: data });
 }
 lChanged(data) {
     this.setState({ lname: data });
 }
 gChanged(data) {
	this.setState({ gender: data });
 }
 dChanged(data) {
	this.setState({ dob: data });
 }
 eChanged(data) {
	this.setState({ email: data });
 }

 customValidateText(text) {
     return (text.length > 0 && text.length < 128);
 }

 onSubmit = text => event => {
   event.preventDefault();
   var formData = new FormData();
   console.log(formData);
   const url = 'http://localhost:8080/changeProfile/' + text;
   formData.append('file', this.state.pictures);
   fetch(url, {
	method: 'POST',
	body: formData
   }).then((response) => {
	console.log(response);
   }).catch((err) => {
	console.log(err);
   });
   console.log('submit');
 }

 render() {
    const { user, token } = this.props;
	console.log(user);
	console.log(this.state);
	const id = user.userID;
	const url = 'http://localhost:8080/files/users/' + id;
     if (token) {
         return (
				<div className='panel panel-info panelbody'>
					<div className="panel-heading">
						<div className="panel-title username">
							<h3 >UserName: {user.userName}</h3>
						</div>
					</div>
					<div className="panel-body">
						<div className="row">
							<div className='col-md-3 col-lg-3'>
								<img alt="nonthing" src={url} className='profile-img' />
							</div>
							<div className=" col-md-9 col-lg-9">
								<table className="table table-user-information">
								<tbody>
									<tr>
										<td>First Name</td>
										<td>
										<InlineEdit
											validate={this.customValidateText}
											activeClassName="editing"
											text={user.firstName}
											paramName="message"
											change={this.fChanged}
										/>
										</td>
									</tr>
									<tr>
						<td>Last Name</td>
						<td>
						<InlineEdit
							validate={this.customValidateText}
							activeClassName="editing"
							text={user.lastName}
							paramName="message"
							change={this.lChanged}
						/>
						</td>
					</tr>
					<tr>
						<td>Gender</td>
						<td>
							<InlineEdit
								validate={this.customValidateText}
								activeClassName="editing"
								text={user.gender}
								paramName="message"
								change={this.gChanged}
							/>
						</td>
					</tr>
					<tr>
						<td>Date of Birth</td>
						<td>
							<InlineEdit
								validate={this.customValidateText}
								activeClassName="editing"
								text={user.birthday}
								paramName="message"
								change={this.dChanged}
							/>
						</td>
					</tr>
					<tr>
						<td>Email</td>
						<td>
							<InlineEdit
								validate={this.customValidateText}
								activeClassName="editing"
								text={user.email}
								paramName="message"
								change={this.eChanged}
							/>
						</td>
					</tr>
					<tr>
						<td>Join Date</td>
						<td>
						{user.joinTime}
						</td>
					</tr>

				</tbody>
			</table>
        </div>
	</div>
</div>
		<h3>update photo</h3>
		<form>
			<FileInput
				name="myImage"
				accept=".png,.jpg,.jpeg"
				placeholder="My image"
				className="inputClass"
				onChange={this.handleInput}
			/>
		</form>
		<button type="submit" onClick={this.onSubmit(id)} > Update Picture </button>

		<br />
		<button type="submit" onClick={this.handleEdit}> Submit Edit </button>

		</div>
         );
     }
     return (
         <div>
         <h3>Please Log in!</h3>
         </div>
     );
 }

}
export default profile;
