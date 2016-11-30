import React from 'react'; // eslint-disable-line no-unused-vars
import Head from 'components/Head';
import Foot from 'components/Foot';

export default function Error (props) {

	const { message, status } = props;

	return (
		<html>
			<Head { ...props } />
			<body>
				<h1>Error</h1>
				<h2>{ status }</h2>
				<p>{ message }</p>
				<Foot { ...props } />
			</body>
		</html>
	);
}

Error.defaultProps = {};

Error.propTypes = {
	message: React.PropTypes.string.isRequired,
	status: React.PropTypes.number.isRequired
};