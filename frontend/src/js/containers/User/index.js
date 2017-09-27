import React from 'react';
// import { connect } from "react-redux";


export default class UserProfile extends React.Component {
  componentWillMount () {
     console.log(this.props.match.params);
  }


  render() {
    return (
        <div className='row'>
        <div className='col-sm-12 col-md-8' style={{padding: 0}}>
         <div className='white-container userprofile'>
              <h1>
                userprofile
              </h1>
         </div>
         <div className='white-container postlist'>
            <h1>
              posts
            </h1>
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
