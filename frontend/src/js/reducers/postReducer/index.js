const default_state = {
  posts:[],
};

export default function reducer(state = default_state, action) {
    switch (action.type) {
			case 'GET_POSTS': {
				return {
					...state,
					posts: action.payload
				};
			}
      case 'GET_RANDOMS':{
        return {
          ...state,
          posts: action.payload
        }
      }
    }
    return state;
}
