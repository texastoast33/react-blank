/* global describe, it*/

import expect from 'expect';
import { count, search } from './reducers';
import * as actions from './actions';

const batmanResults = [ 'Batman Begins', 'Dark Knight', 'Dark Knight Rises' ];

const emptyState = {
	search: {
		movies: [],
		status: {
			isSearching: false,
			message: 'Conduct a search using the interface above!'
		}
	},
	count: 0
};

const resultsInState = {
	movies: batmanResults,
	status: {
		isSearching: false,
		message: ''
	}
};

describe('Redux count reducer', () => {
	it('increments count in store by 1', () => {
		const action = { type: actions.INCREMENT };
		expect(count(emptyState.count, action)).toEqual(emptyState.count + 1);
	});

	it('decrements count in store by 1', () => {
		const action = { type: actions.DECREMENT };
		expect(count(emptyState.count, action)).toEqual(emptyState.count - 1);
	});
});

describe('Redux search reducer', () => {

	it('sets status message to \'Searching...\' and isSearching to true', () => {
		const action = { type: actions.SEARCH };
		const expected = {
			movies: [],
			status: {
				isSearching: true,
				message: 'Searching...'
			}
		};
		expect(search(emptyState.search, action)).toEqual(expected);
	});

	it('adds action.data to movies, status.isSearching set to false and message is blank', () => {
		const action = { type: actions.API_RESULTS, data: { Search: batmanResults } };
		expect(search(emptyState.search, action)).toEqual(resultsInState);
	});

	it('sets status.isSearching to false sets message to return error message', () => {
		const action = { type: actions.API_ERROR, data: 'UHOH, somethings not right!' };
		const expected = {
			movies: [],
			status: {
				isSearching: false,
				message: 'UHOH, somethings not right!'
			}
		};
		expect(search(emptyState.search, action)).toEqual(expected);
	});

	it('resets movies and status to initialState', () => {
		const action = { type: actions.RESET_MOVIES };
		expect(search(resultsInState, action)).toEqual(emptyState.search);
	});
});
