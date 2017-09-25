import React from 'react';
// import { connect } from "react-redux";
import WallContainer from './WallContainer';
import NewPostButton from '../../components/NewPostButton';
import NewPost from '../../components/NewPost';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       newPostModal: false,
    };

    this.openModal = () => this.setState({ newPostModal: true });
    this.closeModal = () => this.setState({ newPostModal: false });
  }


  render() {
    return (
      <div className>
        <WallContainer />
        <NewPostButton onClick={this.openModal} />
        <NewPost 
          isOpen={this.state.newPostModal}
          onRequestClose={this.closeModal}
        />
      </div>
    );
  }
}
