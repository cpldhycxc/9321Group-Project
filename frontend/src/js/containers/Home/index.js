import React from 'react';
import { connect } from "react-redux";
import WallContainer from './WallContainer';
import NewPostButton from '../../components/NewPostButton';
import NewPost from '../../components/NewPost';

@connect((store) => {
  return  {
		token: store.user.token
	};
})
export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       newPostModal: false,
    };

    this.openModal = () => this.setState({ newPostModal: true });
    this.closeModal = () => this.setState({ newPostModal: false });
  }

  renderButton = () => {
    if (this.props.token) {
      return (
        <NewPostButton onClick={this.openModal} />
      )
    }
    return null;
  }

  render() {
    return (
      <div>
        <WallContainer />
        {this.renderButton()}
        <NewPost
          isOpen={this.state.newPostModal}
          onRequestClose={this.closeModal}
        />
      </div>
    );
  }
}
