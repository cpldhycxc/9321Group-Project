import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';



@connect((store) => {
  return {
    self: store.user.user,
  };
})
export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
    this.editprofile = this.editprofile.bind(this);
    }


    editprofile() {
      this.setState({ isEdit: !this.state.isEdit });
    }

    renderFollowButton = () => {
      const { isEdit } =this.state;
      if (this.props.self.userType === 2 && this.props.self.userName !== this.props.selecteduser.userName){
        return (
          <div className='admin-block'>
          <Button className='buttons btn btn-primary admin-button'>Activity</Button>
          <Button className='buttons btn btn-primary'>Ban</Button>
        </div>
        );
      }

      if (this.props.self.userType===1 && this.props.self.userName !== this.props.selecteduser.userName) {
        if(this.props.selecteduser.relationShip){
          return (
            <Button className='buttons btn btn-default'>Unfollow</Button>
          );
        }
        return (
          <Button className='buttons btn btn-primary'>Follow</Button>
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
                  <img src='static/images/userprofile.svg' className='profile-img'/>
                  <input type="file" className="form-control uploadimag"/>
                </div>
                <div className=" col-md-9 col-lg-9">
                <table className="table table-user-information">
                  <tbody>
                  <tr>
                    <td>FirstName</td>
                    <td><input className="form-control" type="text" value={selecteduser.firstName}/></td>
                    </tr>
                    <tr>
                      <td>LastName</td>
                      <td><input className="form-control" type="text" value= {selecteduser.lastName}/></td>
                      </tr>
                  <tr>
                    <td>Gender</td>
                    <td><input className="form-control" type="text" value={selecteduser.gender}/></td>
                    </tr>
                    <tr>
                    <td>Birthday</td>
                      <td><input className="form-control" type="text" value={selecteduser.birthday}/></td>
                    </tr>
                    <tr>
                    <td>Email</td>
                      <td><input className="form-control" type="text" value={selecteduser.email}/></td>
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
