/* global describe, it, React */

import expect from 'expect';
import { shallow } from 'enzyme';
import MovieList from './movieList';
import Movie from './movie';

function defaultProps(props={}) {
	return Object.assign({}, {
		searchStatus: {
			isSearching: false,
			message: ''
		},
		movies: []
	}, props);
}

describe('MovieList', () => {
	it('should render a Movie for each element in `props.movies`', () => {
		const movies = [
			{
				Title: 'First Movie',
				Year: 1999
			}, {
				Title: 'The Sequel',
				Year: 2001
			}
		];
		const movieList = shallow(<MovieList {...defaultProps({ movies })}/>);
		expect(movieList.find(Movie).length).toBe(movies.length);
	});
});
