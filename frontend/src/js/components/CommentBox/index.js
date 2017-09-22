import React from 'react';


export default class CommentBox extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="CommentBox__root">
				<input
					className="CommentBox__input"
					type="text"
					placeholder="Add a comment..."
				/>
			</div>
		);
	}
}
