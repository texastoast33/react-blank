/* global React */

import MyMovies from './myMovies';
import request from 'superagent';

// create your controller
const Movies = React.createClass({
	getInitialState() {
		return {
			movies: [],
			searchStatus: {
				isSearching: false,
				message: 'Conduct a search using the interface above!'
			}
		};
	},

	searchMovies(title) {
		this.setState({ searchStatus: { isSearching: true } });

		const searchUrl = 'http://www.omdbapi.com/?s=' + title;

		request
			.get(searchUrl)
			.end((err, res) => {
				if (err) {

					this.setState({
						searchStatus: {
							isSearching: false,
							message: err
						}
					});

				} else {

					this.setState({
						searchStatus: {
							isSearching: false,
							message: ''
						},
						movies: res.body.Search
					});

				}
			});
	},

	render() {
		return <MyMovies movies={this.state.movies} searchStatus={this.state.searchStatus} search={this.searchMovies} title="My Movies"/>;
	}

});

export default Movies;
