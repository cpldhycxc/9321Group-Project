import React from 'react';
import { Icon } from 'semantic-ui-react';

export default class LikeButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			liked: this.props.likeByMySelf
		};
		this.clickLike = () => {
			if (this.state.liked) {
				this.setState({ liked: false });
			} else {
				this.setState({ liked: true });
			}
		};
	}

	render() {
		const renderIcon = () => {
			if (this.state.liked) {
				return <Icon name='heart' size='large' color='red' onClick={this.clickLike} />;
			}
			return <Icon name='heart' size='large' onClick={this.clickLike} />;
		};

		return (
			<div className='Comment_ActionBoard'>
				<div className="Like-button">
					{renderIcon()}
				</div>
			</div>
		);
	}
}
