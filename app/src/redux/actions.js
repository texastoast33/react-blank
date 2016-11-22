
import request from 'superagent';

//actions
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const SEARCH = 'SEARCH';
export const API_RESULTS = 'API_RESULTS';
export const API_ERROR = 'API_ERROR';
export const RESET_MOVIES = 'RESET_MOVIES';

//action creators
export function increment() {
	return { type: INCREMENT };
}

export function decrement() {
	return { type: DECREMENT };
}

//async actions with redux, it is recomended to define sycronous actions that will execute
//code you desire at different times during the state of your application,
//during the course of async response or error these syncrounous actions can be fired off

export function search() {
	return { type: SEARCH };
}

//a thunk action, does not return action type, returns async func(handling API call)
export function asyncSearch(title) {
	return function (dispatch) {
		return request
			.get('http://www.omdbapi.com/')
			.query({ s: title })
			.end(function (err, res) {
				if(err) {
					dispatch(apiError(err));
				} else {
					dispatch(apiResults(res));
				}
			});
	};
}

export function apiResults(results) {
	return { type: API_RESULTS, data: results.body };
}

export function apiError(err) {
	return { type: API_ERROR, data: err };
}

export function resetMovies() {
	return { type: RESET_MOVIES };
}
