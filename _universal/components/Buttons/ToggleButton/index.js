import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';

if (process.env.CLIENT) {
	require('./styles.scss');
}

// TODO: Aria states.
function ToggleButton (props) {

	const { className, clickHandler, label } = props;

	return (
		<button className={ className }
			onClick={ clickHandler }
		>
			{ label }
		</button>
	);
}

ToggleButton.defaultProps = {
	className: 'c-button'
};

ToggleButton.propTypes = {
	className: React.PropTypes.string.isRequired,
	clickHandler: React.PropTypes.func.isRequired,
	label: React.PropTypes.string.isRequired
};

export default BemClasses(ToggleButton);