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
         <div className='white-container'>
              <h1>
                userprofile
              </h1>
              <h1>
                testing
              </h1>
              <h1>
                testing
              </h1>
              <h1>
                testing
              </h1>
         </div>
         <div className='white-container'>
            <h1>
              posts
            </h1>
            <h1>
              posts
            </h1>
            <h1>
              posts
            </h1>
            <h1>
              posts
            </h1>
          </div>
       </div>
       <div className='col-sm-12 col-md-4' style={{padding: 0}}>
         <div className='white-container friendlist'>
           <h1>friendlist</h1>
        </div>

       </div>
       </div>
    );
  }
}
