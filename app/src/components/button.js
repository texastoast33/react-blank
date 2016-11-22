/* global React */

const Button = React.createClass({
	propTypes: {
		text: React.PropTypes.string.isRequired,
		onClick: React.PropTypes.func
	},

	render: function () {
		const { text, onClick } = this.props;

		return (
			<div className="button" onClick={onClick}>
				{text}
			</div>
		);
	}
});

export default Button;
