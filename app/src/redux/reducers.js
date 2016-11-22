import * as actions from './actions';

//state tree
const initialState = {
	search: {
		movies: [],
		status: {
			isSearching: false,
			message: 'Conduct a search using the interface above!'
		}
	},
	count: 0
};

//reducers (must be pure functions that return a new state object)
//each reducer should take a state and action arg
export function count(state=initialState.count, action) {
	switch(action.type) {
		case actions.INCREMENT:
			return state + 1;

		case actions.DECREMENT:
			return state - 1;

		default:
			return state;
	}
}

export function search(state=initialState.search, action) {
	switch(action.type) {
		case actions.SEARCH:
			return Object.assign({}, state, { status: { isSearching: true, message: 'Searching...' } });

		case actions.API_RESULTS:
			return Object.assign({}, state, { movies: [ ...action.data.Search ], status: { isSearching: false, message: '' } });

		case actions.API_ERROR:
			return Object.assign({}, state, { status: { isSearching: false, message: action.data } });

		case actions.RESET_MOVIES:
			return Object.assign({}, state, { movies: [], status: { isSearching: false, message: 'Conduct a search using the interface above!' } });

		default:
			return state;
	}
}
