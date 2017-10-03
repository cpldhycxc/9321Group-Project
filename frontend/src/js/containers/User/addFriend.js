import React from 'react';
import { confirmfriend } from '../../actions/userActions';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
// import { connect } from "react-redux";


@connect((store) => {
	return {
		currentuser: store.user.user,
	};
})
export default class User extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    const friendID=this.props.match.params.userID;
    this.props.dispatch(confirmfriend(this.props.currentuser.userID, friendID));
  }

  render() {
    return (
        <h1>Your new friend has been add to your friend list</h1>
    );
  }
}
