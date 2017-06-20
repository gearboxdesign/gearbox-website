import React from 'react';
import BemClasses from 'components/hoc/BemClasses';
import ErrorComponent from 'components/ui/Error';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

// TODO: Apply styling.
class ClientError extends React.PureComponent {

	constructor (props) {

		super(props);

		this.state = {
			visible: false
		};

		this.dismiss = this.setState.bind(this, { visible: false });
	}

	componentWillReceiveProps (nextProps) {

		const { errors: nextErrors } = nextProps,
			{ errors } = this.props;

		if (nextErrors !== errors) {

			this.setState({ visible: true });
		}
	}

	componentDidUpdate () {

		const { visibleDuration } = this.props;

		setTimeout(this.dismiss, visibleDuration);
	}

	render () {

		const { aria, bemClass, className, errors, heading, statusCode } = this.props,
			{ visible } = this.state,
			ariaAttrs = getAriaAttrs(aria);

		console.log('clientError', visible);

		return (
			<div
				className={ className }
				{ ...ariaAttrs }
			>
				{ heading }
				{ statusCode }
				{ errors }
			</div>
		);
	}
}

ClientError.defaultProps = {
	className: 'c-client-error',
	visibleDuration: 5000
};

ClientError.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	errors: React.PropTypes.arrayOf(React.PropTypes.string),
	heading: React.PropTypes.string.isRequired,
	statusCode: React.PropTypes.number,
	visibleDuration: React.PropTypes.number.isRequired
};

export default BemClasses(ClientError);
