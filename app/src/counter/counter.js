/* global React */

//container components handle data and how it should be manipulated/displayed
//presentation components have little to no knowledge of state/data/logic, they simply handle the view layer, this is where you would apply styles

//this component will be our container that will handle our data and logic, it will pass the info to child components via props

import * as actions from '../redux/actions';
import { connect } from 'react-redux';

const Counter = React.createClass({
	propTypes: {
		number: React.PropTypes.number,
		add: React.PropTypes.func,
		subtract: React.PropTypes.func
	},

	render() {
		const { number, add, subtract } = this.props;
		return (
			<div>
				<h1>Simple Counter</h1>
				<h2>{number}</h2>
				<button onClick={add}>+</button>
				<button onClick={subtract}>-</button>
			</div>
		);
	}
});

function mapStateToProps(state) {
	return {
		number: state.count
	};
}

function mapDispatchToProps(dispatch) {
	return {
		add: () => {
			dispatch(actions.increment());
		},
		subtract: () => {
			dispatch(actions.decrement());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
