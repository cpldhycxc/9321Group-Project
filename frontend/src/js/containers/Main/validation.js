import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { dovalidation } from '../../actions/userActions';

export default class validation extends React.Component {

  componentWillMount () {
     const { userid } = this.props.match.params;
     dovalidation(userid)
     .then((res)=>{
       console.log(res);
     });
  }
  render() {
    return (
      <h1>Sign up successfully, You can login now!</h1>
    );
  }
}
