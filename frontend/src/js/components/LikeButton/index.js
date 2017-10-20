import React from 'react';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { likeButton } from '../../actions/postActions';

@connect((store) => {
  return store;
})
export default class LikeButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			liked: this.props.likeByMySelf,
		};
		const postID = this.props.postID;
		this.clickLike = () => {
			if (this.state.liked) {
				this.props.dispatch(likeButton('unlike', postID));
				this.props.decLike();
				this.setState({ liked: false });
			} else {
				this.props.dispatch(likeButton('like', postID));
				this.props.addLike();
				this.setState({ liked: true });
			}
		};
	}


	render() {
		const renderIcon = () => {
			if (this.state.liked) {
				return <Icon name='heart' size='large' color='red' onClick={this.clickLike} />;
			}
			return <Icon name='heart' size='large' color='grey' onClick={this.clickLike} />;
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
