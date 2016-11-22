/* global React */

import { Link } from 'react-router';

const Container = React.createClass({
	propTypes: {
		children: React.PropTypes.node
	},

	render() {
		return (
			<div>
				<h1>App</h1>
				<ul>
					<li><Link to="/redux-counter">Simple Redux Counter</Link></li>
					<li><Link to="/redux-async">Async Redux Search</Link></li>
				</ul>
				{this.props.children}
			</div>
		);
	}
});

export default Container;
