import React from 'react';
import { connect } from 'react-redux';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import PostComment from '../PostComment';

export default class Post extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {	
		const text = this.props.text;
		const comments = this.props.comments;
		return (
			<div className='Post_Root'>
				<Card style={{ width: 800 }}>
					<CardTitle
						avatar="https://placeimg.com/80/80/animals"
						title="Avatar style title"
						subtitle="Subtitle here"
					/>
					<CardMedia
						aspectRatio="wide"
						image="https://placeimg.com/800/450/nature"
					/>
					<CardTitle
						title={text}
					/>
					<CardActions>
						<Button label="Action 1" onClick={() => console.log('like')} />
						<Button label="Action 2" />
					</CardActions>
					<PostComment comments={comments} />
				</Card>
			</div>
		);
	}
}
