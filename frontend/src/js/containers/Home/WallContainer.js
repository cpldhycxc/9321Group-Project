import React from 'react';
import { connect } from 'react-redux';
import Post from '../../components/Post';
import { getPosts } from '../../actions/postActions';

@connect((store) => {
  return  {
		post: store.post,
		user: store.user.user
	};
})
class WallContainer extends React.Component {
	constructor(props) {
		super(props);
		this.props.dispatch(getPosts());
	}

	componentWillMount() {
		this.props.dispatch(getPosts());
	}

	render() {
		if (this.props.post.posts.length === 0 || this.props.user === null) {
			return null;
		} else {
			console.log(this.props.post)
			return (
				<div>
					{this.props.post.posts.map((post, i) => (
						<div>
						<Post
							selfID={this.props.user.userID}
							postID={post.postId}
							userName={post.userName}
							userID={post.userID}
							text={post.content}
							key={i}
							postTime={post.postTime}
							locations={post.locations}
							org={post.organizations}
							persons={post.persons}
							likes={post.likeBy}
						/>

						</div>	
					))}
				</div>
			);
		}
	}
}

export default connect()(WallContainer);
