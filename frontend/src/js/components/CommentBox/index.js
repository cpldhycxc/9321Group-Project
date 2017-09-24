import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

export default class CommentBox extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='Comment_ActionBoard'>
				<div className="Like-button">
					<Icon name='heart' size='large' />
				</div>
				<div className="CommentBox__root">
				<i className="fa fa-heart GalleryItem__heart-animation-icon" />
				</div>
			</div>
		);
	}
}
