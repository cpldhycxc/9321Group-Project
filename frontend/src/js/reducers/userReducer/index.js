export default function reducer(state = {
    user: {
        userName: localStorage.getItem('user_info')||null,
    },
    token: localStorage.getItem('id_token') || null,
  }, action) {
  switch (action.type) {
    case "LOGGED_IN": {
      localStorage.setItem('user_info', action.payload.user.userName);
      return {
          ...state,
          user: action.payload.user,
          token: localStorage.getItem('id_token'),
      };
    }
    case "LOGGED_OUT": {
      localStorage.removeItem('user_info');
      return {
          ...state,
          user: null,
          token: null,
      };
    }
  }
  console.log(state)
  return state;
}
