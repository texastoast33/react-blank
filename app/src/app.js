/* global React */

// React-Router - used to drive your application
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './redux/store';

// Import your modules here
import Container from './container';
import Counter from './counter/counter';
import MyMovies from './movies/myMovies';

// Router below
const router = (
	<Provider store={store}>
		<Router history={browserHistory} >
			<Route path="/" component={Container}>
				<Route path="redux-counter" component={Counter}/>
				<Route path="redux-async" component={MyMovies}/>
			</Route>
		</Router>
	</Provider>
);

export default router;
