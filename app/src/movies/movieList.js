/* global React */

import Movie from './movie';

// list component
const MovieList = React.createClass({
	propTypes: {
		movies: React.PropTypes.array,
		searchStatus: React.PropTypes.object
	},

	render: function () {
		// create a Movie component for each movie in the list
		if (this.props.searchStatus.isSearching) {
			return <div>Searching...</div>;
		}

		if (this.props.searchStatus.message) {
			return <div>{this.props.searchStatus.message}</div>;
		}

		const movies = this.props.movies.map((movie, i) => {
			return <Movie movie={movie} key={i}/>;
		});

		return (
			<div>
				{movies}
			</div>
		);
	}
});

export default MovieList;
