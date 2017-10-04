import React from 'react';
import { connect } from 'react-redux';
import Post from '../../components/Post';
import { getPosts } from '../../actions/postActions';




class WallContainer extends React.Component {

	render() {
      console.log(this.props.posts);
			return (
				<div>
					{this.props.posts.map((post, i) => (
						<Post
							selfID={post.userID}
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
