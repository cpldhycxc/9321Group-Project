import axios from 'axios';

export function getPosts() {
	return (dispatch, store) => {
		const url = 'http://localhost:8080/getPosts?userID='.concat(store().user.user.userID);
		axios.get(url)
			.then((response) => {
				dispatch({
					type: 'GET_POSTS',
					payload: response.data.posts
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
}

export function likeButton(type, postID) {
	return (dispatch, store) => {
		const url = 'http://localhost:8080/likePost';
		if (type === 'like') {
			axios.post(url, {
				userName: store().user.user.userName,
				postID: postID,
				like: true
			})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
		} else {
			axios.post(url, {
				userName: store().user.user.userName,
				postID: postID,
				like: false
			})
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
			});
		}
	};
}


export function getSelfID() {
	return (dispatch, store) => {
		dispatch({
			type: 'GET_SELFID',
			payload: store().user.user.userID
		});
	};
}
