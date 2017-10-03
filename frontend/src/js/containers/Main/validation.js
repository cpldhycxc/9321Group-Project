import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';

export default class validation extends React.Component {

  componentWillMount () {
     const { userid } = this.props.match.params;
  }
  render() {
    return (
      <h1>Sign up successfully, You can login now!</h1>
    );
  }
}
