import React from 'react';
import { connect } from "react-redux";
import WallContainer from './WallContainer';
import NewPostButton from '../../components/NewPostButton';
import NewPost from '../../components/NewPost';
import isEmpty from 'lodash/isEmpty';
import { getRandom } from '../../actions/postActions';

@connect((store) => {
  return  {
		posts: store.user.posts,
		user: store.user.user
	};
})

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       newPostModal: false,
       posts:{}
    };

    this.openModal = () => this.setState({ newPostModal: true });
    this.closeModal = () => this.setState({ newPostModal: false });
  }

  componentWillMount() {
    console.log(this.props.posts);
    if(isEmpty(this.props.posts)){
      console.log("fuckyou");
      getRandom()
      .then((res)=>{
        console.log(res.data);
        this.setState({
          posts:res.data.posts,
        })
      })

    }
  }

  render() {
    if(isEmpty(this.state.posts)){
      return null;
    }
    return (
      <div>
        <WallContainer posts={this.state.posts} />
        <NewPostButton onClick={this.openModal} onRequestClose={this.closeModal} />
        <NewPost
          isOpen={this.state.newPostModal}
          onRequestClose={this.closeModal}
        />
      </div>
    );
  }
}
{/* <WallContainer /> */}
