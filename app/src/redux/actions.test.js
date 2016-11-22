/* global describe, it*/

import expect from 'expect';
import * as actions from './actions';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import request from 'superagent';
import superagentMock from 'superagent-mock';

const mockConfig = [
	{
		pattern: 'http://www.omdbapi.com(.*)',
		fixtures: function (match) {
			if(match[1] === '/?s=404') {
				throw 'Error: 404';
			}

			if(match[1] === '/?s=batman') {
				return [ { Title: 'Batman' } ];
			}
		},
		get: function (match, data) {
			return {
				body: data
			};
		}
	}
];

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);
superagentMock(request, mockConfig);

describe('Redux counter actions', () => {
	it('should return an action of type increment', () => {
		const expected = { type: actions.INCREMENT };
		const actual = actions.increment();
		expect(expected).toEqual(actual);
	});

	it('should return an action of type decrement', () => {
		const expected = { type: actions.DECREMENT };
		const actual = actions.decrement();
		expect(expected).toEqual(actual);
	});
});

describe('Redux async actions', () => {
	it('should return an action of type search', () => {
		const expected = { type: actions.SEARCH };
		const actual = actions.search();
		expect(expected).toEqual(actual);
	});

	it('async API action should return a apiResults action on success', () => {
		const expectedActions = { type: actions.API_RESULTS, data: [ { Title: 'Batman' } ] };
		const store = mockStore({ movies: [] });
		store.dispatch(actions.asyncSearch('batman'));
		expect(store.getActions()[0]).toEqual(expectedActions);
	});

	it('async API action should return a apiError action on error', () => {
		const expectedActions = { type: actions.API_ERROR, data: 'Error: 404' };
		const store = mockStore({ message: 'Searching...' });
		store.dispatch(actions.asyncSearch(404));
		expect(store.getActions()[0]).toEqual(expectedActions);
	});

	it('should return an action of type resetMovies', () => {
		const expected = { type: actions.RESET_MOVIES };
		const actual = actions.resetMovies();
		expect(expected).toEqual(actual);
	});
});
