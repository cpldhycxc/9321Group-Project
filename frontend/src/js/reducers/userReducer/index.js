export default function reducer(state = {
    user: JSON.parse(localStorage.getItem('user_info'))||{},
    posts: JSON.parse(localStorage.getItem('posts'))||{},
    friends: JSON.parse(localStorage.getItem('friends'))||{},
    token: localStorage.getItem('id_token') || null,
  }, action) {
  switch (action.type) {
    case "LOGGED_IN": {
      localStorage.setItem('user_info', JSON.stringify(action.payload.user));
      localStorage.setItem('posts', JSON.stringify(action.payload.posts));
      localStorage.setItem('friends', JSON.stringify(action.payload.friends));
      return {
          ...state,
          posts: action.payload.posts,
          friends: action.payload.friends,
          user: action.payload.user,
          token: localStorage.getItem('id_token'),
          isfetched:true,
      };
    }
    case "LOGGED_OUT": {
      localStorage.removeItem('user_info');
      localStorage.removeItem('posts');
      localStorage.removeItem('friends');
      return {
          ...state,
          user: null,
          token: null,
      };
    }
    case "UPDATE_FRIENDS": {
      return {
          ...state,
          friends: action.payload,
      };
    }
    case "UPDATE_PROFILE": {
        localStorage.removeItem('user_info');
        localStorage.setItem('user_info', JSON.stringify(action.payload.user));
        return {
            ...state,
            
        };
    }
  }
  return state;
}
