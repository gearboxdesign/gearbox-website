import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';

function Error (props) {

	const { errors, className } = props;

	return (
		<div className={ className }>
			<h2>Error</h2>
			<ul>
				{ errors.map(getError) }
			</ul>
		</div>
	);
}

function getError (err, i) {

	return <li key={ i }>{ err }</li>;
}

Error.defaultProps = {
	className: 'c-error'
};

Error.propTypes = {
	className: React.PropTypes.string.isRequired,
	errors: React.PropTypes.array.isRequired
};

export default BemClasses(Error);