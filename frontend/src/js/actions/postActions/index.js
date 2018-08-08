import axios from 'axios';

export function getPosts() {
	return (dispatch, store) => {
		let url;
		if (store().user.user.userID === undefined) {
			url = 'http://localhost:8080/randomPost/';
		} else {
			url = 'http://localhost:8080/getPosts?userID='.concat(store().user.user.userID);
		}
		axios.get(url)
			.then((response) => {
				console.log(response.data)
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

export function getRandom() {
	return function(dispatch) {
		 axios.get('http://localhost:8080/randomPost/')
		 .then((res) => {
		 	console.log(res.data)
			 dispatch({
				 type:'GET_RANDOMS',
				 payload: res.data.posts
			 })
		 })
		 .catch((err)=>{
			 console.log(err);
		 })
	}
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
