import React from 'react';
import { connect } from 'react-redux';
import Post from '../../components/Post';
import { getPosts, getSelfID } from '../../actions/postActions';

@connect((store) => {
  return store.post;
})
class WallContainer extends React.Component {

	componentWillMount() {
		this.props.dispatch(getPosts());
		this.props.dispatch(getSelfID());
	}

	render() {
		return (
			<div>
				{this.props.posts.map((post, i) => (
					<Post 
						selfID={this.props.selfID}
						postID={post.postId}
						userName={post.userName}
						userID={post.userID}
						text={post.content} 
						key={i}
						postTime={post.postTime}
						likes={post.likeBy}
					/>
				))}
			</div>
		);
	}
}

export default connect()(WallContainer);
