import React from 'react';
import { connect } from 'react-redux';
import Post from '../../components/Post';

class WallContainer extends React.Component {
	render() {
		return (
			<div>
				{posts.map((post, i) => (
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

const posts = [
	{
		id: 1,
		text: 'aaaaaaa',
		liked_by: ['henry','gary','ryan'],
		comments: [
			{
				username: 'henry',
				content: 'dddddddd'
			},
			{
				username: 'ryan',
				content: ' i am shabi'
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
		liked_by: ['henry','gary','ryan'],
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
		liked_by: ['henry','gary','ryan'],
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
		liked_by: ['henry','gary','ryan'],
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
