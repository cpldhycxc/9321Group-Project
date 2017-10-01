import React from 'react';
import { searchByUsername } from '../../actions/userActions';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import UserProfile from '../../components/UserProfile';
import UserPosts from '../../components/UserPosts';
import UserFriendList from '../../components/UserFriendList';
// import { connect } from "react-redux";


@connect((store) => {
	return {
		currentuser: store.user.user,
		token: store.user.token,
		posts: store.user.posts,
		friends: store.user.friends,
	};
})
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props.currentuser){
      return null
    }
    return (
        <div className='row'>
        <div className='col-sm-12 col-md-8' style={{padding: 0}}>
         <div className='white-container userprofile'>
           <UserProfile selecteduser={this.props.currentuser} />
         </div>
         <div className='white-container postlist'>
              <UserPosts
                 postlist={this.props.posts}
                 userName={this.props.currentuser.userName} />
          </div>
       </div>
       <div className='col-sm-12 col-md-4 white-bg-container'>
         <div className='white-container friendlist'>
           <UserFriendList friendlist={this.props.friends} />
        </div>
       </div>
       </div>
    );
  }
}
