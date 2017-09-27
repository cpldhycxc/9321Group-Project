import React from 'react';
import { connect } from 'react-redux';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import PostComment from '../PostComment';
import LikeButton from '../LikeButton';
import { Icon } from 'semantic-ui-react';

export default class Post extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {	
		const text = this.props.text;
		const numOfLikes = this.props.likes.length;
		let likeByMySelf = false;
		this.props.likes.map((e) => {
			if (e === 'henry') {
				likeByMySelf = true;
			}
		});
		return (
			<div className='Post_Root'>
				<Card style={{ width: 800 }}>
					<CardTitle
						avatar="https://placeimg.com/80/80/animals"
						title="Avatar style title"
					/>
					<CardMedia
						aspectRatio="wide"
						image="https://placeimg.com/800/450/nature"
					/>
					<CardTitle
						title={text}
					/>
					<div className="Post__footer">
						<div className="Post_like-button">
							<p>{numOfLikes} likes</p>
						</div>
						<div className="Post__action-box">
							<div className="Post__comment-box">
								<LikeButton likeByMySelf={likeByMySelf} />
							</div>
						</div>
					</div>
				</Card>
			</div>
		);
	}
}
