import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { dodevalidation, dovalidation, addFriend, deleteFriend, updatePorfile } from '../../actions/userActions';


@connect((store) => {
  return {
    self: store.user.user,
  };
})
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      pending: false,
      isFriend: this.props.selecteduser.relationShip,
      isBan: !this.props.selecteduser.userType,
    };
    this.editprofile = this.editprofile.bind(this);
    this.banuser = this.banuser.bind(this);
    this.unbanuser = this.unbanuser.bind(this);
    this.folllowuser = this.folllowuser.bind(this);
    this.Unfollowuser = this.Unfollowuser.bind(this);
    this.ActivityReport = this.ActivityReport.bind(this);
    }


    editprofile() {
      this.setState({ isEdit: !this.state.isEdit });
      // call api
      //http://127.0.0.1:8080/updateProfile/11?fname=null&lname=s&dob=null&email=null&gender=null
      updatePorfile(this.props.selecteduser.userName, this.props.selecteduser.firstName, this.props.selecteduser.lastName
      , this.props.selecteduser.birthday, this.props.selecteduser.email, this.props.selecteduser.gender)
      .then((res) => {
          console.log(res);
      })

    }

    unbanuser(){
      dovalidation(this.props.selecteduser.userID).
      then((res)=>{
        this.setState({ isBan: false });
      });
    }

    banuser() {
      dodevalidation(this.props.selecteduser.userID)
      .then((res)=>{
        this.setState({ isBan: true });
      });
    }

    folllowuser(){
      console.log( this.props.self);
      console.log( this.props.selecteduser);
      const userID = this.props.self.userID;
      const username = this.props.self.userName;
      const friendName = this.props.selecteduser.userName;
      const friendID= this.props.selecteduser.userID;
      console.log(username)
      this.setState({ pending: true, isFriend:true});
      addFriend(userID, username, friendID, friendName)
      .then((res)=>{
        console.log(res);
      })
    }

    Unfollowuser(){
      console.log("fuck");
      const friendID = this.props.selecteduser.userID;
      this.setState({ pending: false, isFriend:false});
      this.props.dispatch(deleteFriend(this.props.self.userID, friendID));
    }

    ActivityReport(){
      console.log("caonima");
      const userID=this.props.selecteduser.userID;
      this.props.history.push(`/activityreport/${userID}`);
    }

    renderFollowButton = () => {
      const { isEdit } =this.state;
      if (this.props.self.userType === 2 && this.props.self.userName !== this.props.selecteduser.userName){
        if(this.state.isBan){
          return (
            <div className='admin-block'>
            <Button className='buttons btn btn-primary admin-button'>Activity</Button>
            <Button onClick={this.unbanuser} className='buttons btn btn-default'>UnBan</Button>
          </div>
          );
        }
        return (
          <div className='admin-block'>
          <Button onClick={this.ActivityReport} className='buttons btn btn-primary admin-button'>Activity</Button>
          <Button onClick={this.banuser} className='buttons btn btn-primary'>Ban</Button>
        </div>
        );
      }

      if (this.props.self.userType===1 && this.props.self.userName !== this.props.selecteduser.userName) {
        if(!this.state.isFriend){
          return (
            <Button onClick={this.folllowuser} className='buttons btn btn-primary'>Follow</Button>

          );
        }
        if(this.state.pending){
          return (
            <Button className='buttons btn btn-default'>Pending</Button>
          )
        }
        return (
          <Button onClick={this.Unfollowuser} className='buttons btn btn-default'>Unfollow</Button>
        );
      }
      if (this.props.self.userType===1 && this.props.self.userName === this.props.selecteduser.userName) {
        if(isEdit) {
          return (<Button onClick={this.editprofile} className='buttons btn btn-primary'>Save</Button>);
        }
        return (
          <Button onClick={this.editprofile} className='buttons btn btn-primary'>Edit</Button>
        );
      }

    }

    render() {
      const { selecteduser } = this.props;
      const { isEdit } = this.state;
      console.log(selecteduser);
      if(isEdit){
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
                <form>
                <div className='col-md-3 col-lg-3'>
                  <img src='static/images/userprofile.svg' className='profile-img' />
                  <input type="file" className="form-control uploadimag" />
                </div>
                <div className=" col-md-9 col-lg-9">
                <table className="table table-user-information">
                  <tbody>
                  <tr>
                    <td>FirstName</td>
                    <td><input className="form-control" type="text" value={selecteduser.firstName} /></td>
                    </tr>
                    <tr>
                      <td>LastName</td>
                      <td><input className="form-control" type="text" value={selecteduser.lastName} /></td>
                      </tr>
                  <tr>
                    <td>Gender</td>
                    <td><input className="form-control" type="text" value={selecteduser.gender} /></td>
                    </tr>
                    <tr>
                    <td>Birthday</td>
                      <td><input className="form-control" type="text" value={selecteduser.birthday} /></td>
                    </tr>
                    <tr>
                    <td>Email</td>
                      <td><input className="form-control" type="text" value={selecteduser.email} /></td>
                    </tr>
                    <tr>
                    <td>Join Date</td>
                      <td>{selecteduser.joinTime}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </form>
              </div>
            </div>
          </div>
        );
      }
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

const UserProfileRoute = withRouter(UserProfile);
export default UserProfileRoute;
