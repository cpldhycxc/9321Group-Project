import InlineEdit from 'react-edit-inline';
import React from 'react';
import { connect } from 'react-redux';


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

  };
 this.dataChanged = this.dataChanged.bind(this);
 }

 dataChanged(data) {
     console.log(data);
     this.setState({ ...data });
 }

 customValidateText(text) {
     return (text.length > 0 && text.length < 128);
 }

 render() {
     const { user, token } = this.props;
     console.log(user);
     if (token) {
         return (
             <div>
                <h2>Profile Page</h2>
                <h3>Full Name</h3>
                { user.firstName } {user.lastName}
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
                <img alt="NothingToshow" src={this.state.image}></img>
                <br />
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
                <br />
                <h3>Join Time</h3>
                {user.joinTime}
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
