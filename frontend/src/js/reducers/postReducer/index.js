const default_state = {
  posts: [],
  selfID: 0
};

export default function reducer(state = default_state, action) {
    switch (action.type) {
			case 'GET_POSTS': {
				return {
					...state,
					posts: action.payload
				};
			}
			case 'GET_SELFID': {
				return {
					...state,
					selfID: action.payload
				};
			}
    }
    return state;
}
