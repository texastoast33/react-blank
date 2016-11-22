/* global React */

import store from '../redux/store';
import { resetMovies } from '../redux/actions';

const MovieSearch = React.createClass({
	propTypes: {
		search: React.PropTypes.func
	},
	
	search: function (e) {
		e.preventDefault();
		const title = this.refs.title;
		this.props.search(title.value);
	},

	reset: function (e) {
		e.preventDefault();
		
		// get DOM nodes, the React way
		const title = this.refs.title;

		// clear the form, the React way
		title.value = '';
		store.dispatch(resetMovies());
	},

	render: function () {
		return (
			<form className="movieSearch" onSubmit={this.search}>
				<label>Title</label>
				<input ref="title" type="text"/>
				<button className="search">Search</button>
				<button className="reset" onClick={this.reset}>Reset</button>
			</form>
		);
	}
});

export default MovieSearch;
