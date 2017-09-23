export default function reducer(state = {
    user: {
        username: localStorage.getItem('user_info')||null,
        password: null,
    },
    token: localStorage.getItem('id_token') || null,
  }, action) {
    switch (action.type) {
      case "LOGGED_IN": {
        localStorage.setItem('user_info', action.payload.username);
        return {
            ...state,
            user: action.payload,
            token: localStorage.getItem('id_token'),
        }
      }
    }
    return state
}
