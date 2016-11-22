/* global React */

const Movie = React.createClass({
	propTypes: {
		movie: React.PropTypes.object
	},

	render: function () {
		return (
			<div className="movie">
				<p>{this.props.movie.Title} ({this.props.movie.Year})</p>
			</div>
		);
	}
});

export default Movie;
