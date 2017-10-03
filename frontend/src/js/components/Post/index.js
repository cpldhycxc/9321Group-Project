import React from 'react';
import { connect } from 'react-redux';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'semantic-ui-react';
import PostComment from '../PostComment';
import LikeButton from '../LikeButton';
import { Icon } from 'semantic-ui-react';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


export default class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			numOfLikes: this.props.likes.length,
			avatarURL: 'http://localhost:8080/files/users/'.concat(this.props.userID),
			postImgURL: 'http://localhost:8080/files/posts/'.concat(this.props.postID),
			hasAva: true,
			hasImg: true,
			modalIsOpen: false
		};

		this.deletePost = this.deletePost.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
		this.checkImg(this.state.postImgURL);
	}

	checkImg = (url) => {
		axios.get(url)
		.then((response) => {
			console.log(response);
			this.setState({
				hasImg: true
			});
		})
		.catch((err) => {
			console.log(err);
			this.setState({
				hasImg: false
			});
		});
	}

	deletePost = () => {
		const url = 'http://localhost:8080/deletePost/'.concat(this.props.postID);
		axios.get(url)
		.then((response) => {
			console.log(response);
			// window.location.reload();
		})
		.catch((err) => {
			console.log(err);
		})
	}

  openModal = () => {
    this.setState({modalIsOpen: true});
  }


  closeModal = () => {
    this.setState({modalIsOpen: false});
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
		const ownerID = this.props.userID;
		let likeByMySelf = false;
		this.props.likes.map((e) => {
			if (e.userID === selfID) {
				likeByMySelf = true;
			}
		});

		const renderDelete = () => {
			if (ownerID === selfID) {
				return (
					<div className="DeleteButton">
						<div className='Comment_ActionBoard'>
							<div className="Like-button">
								<Icon name='delete' size='large' color='grey' onClick={this.openModal} />
							</div>
						</div>
					</div>
				);
			}
		};

		const renderImg = () => {
			if (this.state.hasImg) {
				return (
					<CardMedia
						aspectRatio="wide"
						image={this.state.postImgURL}
					/>
				);
			}
		};


		return (
			<div className='Post_Root'>
				<Card style={{ width: 800 }}>
					<CardTitle
						avatar={this.state.avatarURL}
						title={userName}
						subtitle={postTime}
					/>
					{renderImg()}
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
							<div className="LikeButton">
								<LikeButton likeByMySelf={likeByMySelf} postID={postID} addLike={this.addLike} decLike={this.decLike} />
							</div>
							{renderDelete()}
						</div>
					</div>
				</Card>
				<div>
					<Modal
						isOpen={this.state.modalIsOpen}
						onRequestClose={this.closeModal}
						style={customStyles}
						contentLabel="Example Modal"
					>
						<h2>Confirm to delete this post?</h2>
						<form>
							<div>
								<Button negative onClick={this.deletePost}>Confirm</Button>
    						<Button secondary onClick={this.closeModal}>Cancel</Button>
    					</div>
						</form>
					</Modal>
				</div>
			</div>
		);
	}
}
