import InlineEdit from 'react-edit-inline';
import React from 'react';
import { connect } from 'react-redux';
import FileInput from 'react-file-input';


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
	username: '',
	fname: '',
	lname: '',
	gender: '',
	dob: '',
	email: '',
  };
 this.dataChanged = this.dataChanged.bind(this);
 this.handleInput = this.handleInput.bind(this);
 }

 handleInput(event) {
	this.setState({
		pictures: event.target.files[0],
	});
 }

 dataChanged(data) {
     console.log(data);
     this.setState({ ...data });
 }

 customValidateText(text) {
     return (text.length > 0 && text.length < 128);
 }

 onSubmit = (e) => {
   e.preventDefault();
   var formData = new FormData();
   console.log(formData);
   formData.append('file', this.state.pictures);
   fetch('http://localhost:8080/changeProfile/11', {
	method: 'POST',
	body: formData
   }).then((response) => {
	console.log(response);
   }).catch((err) => {
	console.log(err);
   });
   console.log('submit');
 }
 getPicture() {
	 fetch('http://localhost:8080/users/11'),{
		 method: 'GET',
		 
	 }
 }

 render() {
    const { user, token } = this.props;
	console.log(user);
     if (token) {
         return (
             <div>
                <h2>Profile Page</h2>
                <h3>First Name</h3>
				<InlineEdit
                    validate={this.customValidateText}
                    activeClassName="editing"
                    text={user.firstName}
                    paramName="message"
                    change={this.dataChanged}
                />
				<h3>Last Name</h3>
				<InlineEdit
					validate={this.customValidateText}
					activeClassName="editing"
					text={user.lastName}
					paramName="message"
					change={this.dataChanged}
				/>
                <br />
                <h3>User name</h3>
                {user.userName}
                <br />
                <h3>Gender</h3>
                <InlineEdit
                    validate={this.customValidateText}
                    activeClassName="editing"
                    text={user.gender}
                    paramName="message"
                    change={this.dataChanged}
                />
                <h3>Photo</h3>
                <img alt="NothingToshow" src={this.getPicture}></img>
				<form>
					<FileInput
					name="myImage"
					accept=".png,.jpg,.jpeg"
					placeholder="My image"
					className="inputClass"
					onChange={this.handleInput}
					/>
				</form>
				<button type="submit" onClick={this.onSubmit}> Update Picture </button>
                <h3>email</h3>
                <InlineEdit
                    validate={this.customValidateText}
                    activeClassName="editing"
                    text={user.email}
                    paramName="message"
                    change={this.dataChanged}
                />
                <br />
                <h3>DOB</h3>
                <InlineEdit
                    validate={this.customValidateText}
                    activeClassName="editing"
                    text={user.birthday}
                    paramName="message"
                    change={this.dataChanged}
                />
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
