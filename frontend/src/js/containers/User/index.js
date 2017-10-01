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
		token: store.user.token
	};
})
export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selecteduser:null
    }
  }

  componentWillMount () {
     const { username }= this.props.match.params;
     searchByUsername(username)
     .then((res)=>{
       this.setState({ selecteduser: res.data });
     });
  }

  render() {
    if(!this.state.selecteduser){
      return null
    }
    return (
        <div className='row'>
        <div className='col-sm-12 col-md-8' style={{padding: 0}}>
         <div className='white-container userprofile'>
           <UserProfile selecteduser={this.state.selecteduser} />
         </div>
         <div className='white-container postlist'>
              <UserPosts
                 postlist={this.state.selecteduser.postList}
                 userName={this.state.selecteduser.userName} />
          </div>
       </div>
       <div className='col-sm-12 col-md-4 white-bg-container'>
         <div className='white-container friendlist'>
           <UserFriendList friendlist={this.state.selecteduser.friendList} />
        </div>
       </div>
       </div>
    );
  }
}
