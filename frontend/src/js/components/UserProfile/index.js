import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';



@connect((store) => {
  return {
    self: store.user.user,
  };
})
export default class UserProfile extends React.Component {
    renderFollowButton = () => {
      if (this.props.self.userName !== this.props.selecteduser.userName) {
        return (
          <Button className='buttons btn btn-primary'>follow</Button>
        );
      } else {
        return (
          <Button className='buttons btn btn-primary'>Edit</Button>
        );
      }
    }

    render() {
      const { selecteduser } = this.props;
      return (
        <div className='panel panel-info panelbody'>
          <div className="panel-heading">
            <div className="panel-title username">
              <h3 >UserName: {selecteduser.userName}</h3>
            </div>
            {this.renderFollowButton()}
          </div>
        <div className="panel-body">
          <div className="row">
            <div className='col-md-3 col-lg-3'>
              <img src='static/images/userprofile.svg' className='profile-img'/>
            </div>
          <div className=" col-md-9 col-lg-9">
        <table className="table table-user-information">
          <tbody>
          <tr>
            <td>Name</td>
            <td>{selecteduser.firstName} {selecteduser.lastName}</td>
            </tr>
          <tr>
            <td>Gender</td>
            <td>{selecteduser.gender}</td>
            </tr>
            <tr>
            <td>Date of Birth</td>
              <td>{selecteduser.birthday}</td>
            </tr>
            <tr>
            <td>Email</td>
              <td>{selecteduser.email}</td>
            </tr>
            <tr>
            <td>Join Date</td>
              <td>{selecteduser.joinTime}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
   </div>
  </div>
      )
    }
}
