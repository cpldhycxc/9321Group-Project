import React from 'react';
import { searchByUsername } from '../../actions/userActions';
import { connect } from 'react-redux';
import UserProfile from '../../components/User/Userprofile.js';
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
      selecteduser:{}
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
    const { selecteduser }= this.state;
    console.log(selecteduser.postList);
    return (
        <div className='row'>
        <div className='col-sm-12 col-md-8' style={{padding: 0}}>
         <div className='white-container userprofile'>
           <UserProfile selecteduser={this.state.selecteduser}/>
         </div>
         <div className='white-container postlist'>
           <div className='panel panel-default'>
             <div className='panel-body'>
               <div className='row'>
                 <div className='col-sm-12' >
                   <div>
                     dsfsdfsdfdsjfksjdlfkjasdlkfjlksadjflkjsdakfjslkdafjlksadjflkjsadlkfjsdlkjflk
                   </div>
                    <span className="glyphicon glyphicon-heart heart"></span>
                   <div className='label'>
                     dfjsddfdfklfjs
                   </div>

                 </div>

               </div>
             </div>

         </div>
          </div>
       </div>
       <div className='col-sm-12 col-md-4 white-bg-container'>
         <div className='white-container friendlist'>
           <h1>friendlist</h1>
        </div>

       </div>
       </div>
    );
  }
}
