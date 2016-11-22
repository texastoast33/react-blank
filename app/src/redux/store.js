import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { count, search } from './reducers';
import thunk from 'redux-thunk';

const newStore = () => {
	return createStore(
		combineReducers({ 
			count,
			search 
		}), 
		compose(
			window.devToolsExtension ? window.devToolsExtension() : f => f
		),
		applyMiddleware(thunk)
	);
};

export default newStore();
