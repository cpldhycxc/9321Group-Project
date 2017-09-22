export default function reducer(state = {
    user: {
        username: null,
        password: null,
    },
    token: null,
  }, action) {
    console.log(action);
    switch (action.type) {
      case "LOGGED_IN": {
        return {
            ...state,
            user: action.payload,
            token: 'fdfdf'
        }
      }
      case "FETCH_USER_REJECTED": {
        return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user: action.payload,
        }
      }
      case "SET_USER_NAME": {
        return {
          ...state,
          user: {...state.user, name: action.payload},
        }
      }
      case "SET_USER_AGE": {
        return {
          ...state,
          user: {...state.user, age: action.payload},
        }
      }
    }
    console.log(state)
    return state
}
