import React from 'react';
import { connect } from 'react-redux';
import Post from '../../components/Post';

class WallContainer extends React.Component {
	render() {
		return (
			<div>
				{posts.map((post, i) => (
					<Post text={post.text} key={i}/>
				))}
			</div>
		);
	}
}

const posts = [
	{
		id: 1,
		text: 'aaaaaaa',
		comments: [
			{
				username: 'henry',
				content: 'dddddddd'
			},
			{
				username: 'gary',
				content: 'dddddddd'
			},
			{
				username: 'henry',
				content: 'dddddddd'
			}
		]
	},
	{
		id: 2,
		text: 'bbbb',
		comments: [
			{
				username: 'henry',
				content: 'dddddddd'
			},
			{
				username: 'gary',
				content: 'dddddddd'
			},
			{
				username: 'henry',
				content: 'dddddddd'
			}
		]
	},
	{
		id: 3,
		text: 'kkkk',
		comments: [
			{
				username: 'henry',
				content: 'dddddddd'
			},
			{
				username: 'gary',
				content: 'dddddddd'
			},
			{
				username: 'henry',
				content: 'dddddddd'
			}
		]
	},
	{
		id: 3,
		text: 'fuckfuck',
		comments: [
			{
				username: 'henry',
				content: 'dddddddd'
			},
			{
				username: 'gary',
				content: 'dddddddd'
			},
			{
				username: 'henry',
				content: 'dddddddd'
			}
		]
	}

];


export default connect()(WallContainer);
