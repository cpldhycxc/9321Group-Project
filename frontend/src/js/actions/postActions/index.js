export function getPosts() {
	return {
		type: 'GET_POSTS',
		payload: posts
	};
}

const posts = [
	{
		postId: 1,
		text: 'aaaaaaa',
		liked_by: ['henry', 'gary', 'ryan'],
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
		postId: 2,
		text: 'bbbb',
		liked_by: ['gary', 'ryan'],
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
		postId: 3,
		text: 'kkkk',
		liked_by: ['gary', 'ryan'],
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
		postId: 3,
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