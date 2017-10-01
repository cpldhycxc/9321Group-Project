import React from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router';

class UserFriendList extends React.Component {
    constructor(props) {
      super(props);

    }

    handleClick(username){
      this.props.history.push(`/user/${username}`);
    }

    render(){
      const { friendlist } = this.props;
      const result = friendlist.map((friend,i)=>(
          <tr key={i}>
          <td><img src='static/images/userprofile.svg' className='friend-img' /></td>
          <td><a onClick={()=> this.handleClick(friend.userName)} className='friend-a'>{friend.userName}</a></td>
          </tr>
      ))
      return (
        <div>
        <h2 className='friendlist-title'>Friend List</h2>
        <div className='col-md-12 col-lg-12'>
         <div className='friendlist-body'>
        <table className='table table-user-information'>
          <tbody>
            {result}
          </tbody>
          </table>
        </div>
      </div>
    </div>
      )
    }
}

const UserFriendListRoute = withRouter(UserFriendList);
export default UserFriendListRoute;
