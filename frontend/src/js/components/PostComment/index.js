import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

export default class PostComment extends React.Component {
	render() {
		const comments = this.props.comments;
		return (
			<div>
					{comments.map((comment, i) => (
					<div className='Comment__footer' key={i}>
						<div key={i} className='Comments_Details'>
								<p><strong>{comment.username}</strong>: {comment.content}</p>
						</div>
						<div className="Comment_Delete">
							<i class="remove icon"></i>
						</div>
					</div>
					))}
			</div>
		);
	}
}
