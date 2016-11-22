/* global React */

import MovieSearch from './movieSearch';
import MovieList from './movieList';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';

const MyMovies = React.createClass({
	propTypes: {
		search: React.PropTypes.func,
		movies: React.PropTypes.array,
		searchStatus: React.PropTypes.object
	},

	render: function () {
		return (
			<div className="myGuests">
				<h1>Movies</h1>
				<MovieSearch search={this.props.search}/>
				<MovieList movies={this.props.movies} searchStatus={this.props.searchStatus}/>
			</div>
		);
	}
});

function mapStateToProps(state) {
	return {
		movies: state.search.movies,
		searchStatus: state.search.status
	};
}

function mapDispatchToProps(dispatch) {
	return {
		search: (title) => {
			dispatch(actions.search());
			dispatch(actions.asyncSearch(title));
		}
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(MyMovies);
