import React from 'react';

export default class PostComment extends React.Component {
	render() {
		const comments = this.props.comments;
		return (
			<div className='Comment__footer'>
					{comments.map((comment, i) => (
					<div key={i} className='Comments_Details'>
							<p><strong>{comment.username}</strong>: {comment.content}</p>
							<span className="Comment_Delete">
								<i className="fa fa-times" />
							</span>
					</div>
					))}
			</div>
		);
	}
}
