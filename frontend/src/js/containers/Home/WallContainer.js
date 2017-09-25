import React from 'react';
import { connect } from 'react-redux';
import Post from '../../components/Post';
import { getPosts } from '../../actions/postActions';

@connect((store) => {
  return store.post;
})
class WallContainer extends React.Component {

	componentWillMount() {
		this.props.dispatch(getPosts());
	}

	render() {
		console.log(this.props);
		return (
			<div>
				{this.props.posts.map((post, i) => (
					<Post 
						text={post.text} 
						comments={post.comments} 
						key={i}
						likes={post.liked_by}
					/>
				))}
			</div>
		);
	}
}

export default connect()(WallContainer);
