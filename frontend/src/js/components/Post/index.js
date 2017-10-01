import React from 'react';
import { connect } from 'react-redux';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import PostComment from '../PostComment';
import LikeButton from '../LikeButton';
import { Icon } from 'semantic-ui-react';
import axios from 'axios';

export default class Post extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			numOfLikes: this.props.likes.length,
			avatarURL: 'http://localhost:8080/files/users/'.concat(this.props.userID)
		};
	}

	addLike = () => {
		const i = this.state.numOfLikes;
		this.setState({ numOfLikes: i + 1 });
	}

	decLike = () => {
		const i = this.state.numOfLikes;
		this.setState({ numOfLikes: i - 1 });
	}

	render() {
		const text = this.props.text;
		const postTime = this.props.postTime;
		const userName = this.props.userName;
		const postID = this.props.postID;
		const selfID = this.props.selfID;
		let likeByMySelf = false;
		this.props.likes.map((e) => {
			if (e.userID === selfID) {
				likeByMySelf = true;
			}
		});
		return (
			<div className='Post_Root'>
				<Card style={{ width: 800 }}>
					<CardTitle
						avatar={this.state.avatarURL}
						title={userName}
						subtitle={postTime}
					/>
					<CardMedia
						aspectRatio="wide"
						image="https://placeimg.com/800/450/nature"
					/>
					{text.split('\n\n').map((item, i) => {
						return (
						<CardTitle
							title={item}
							key={i}
						/>
						);
					})}
					<div className="Post__footer">
						<div className="Post_like-button">
							<p>{this.state.numOfLikes} likes</p>
						</div>
						<div className="Post__action-box">
							<div className="Post__comment-box">
								<LikeButton likeByMySelf={likeByMySelf} postID={postID} addLike={this.addLike} decLike={this.decLike} />
							</div>
						</div>
					</div>
				</Card>
			</div>
		);
	}
}
