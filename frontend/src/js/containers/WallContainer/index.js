import React from 'react';
import { connect } from 'react-redux';
import Post from '../../components/Post';

class WallContainer extends React.Component {
	render() {
		return (
			<div>
				{posts.map((post, i) => (
					<Post text={post.text} />
				))}
			</div>
		);
	}
}

const posts = [
	{
		id: 1,
		text: 'aaaaaaa'
	},
	{
		id: 2,
		text: 'bbbb'
	},
	{
		id: 3,
		text: 'kkkk'
	},
	{
		id: 3,
		text: 'fuckfuck'
	}

];


export default connect()(WallContainer);
