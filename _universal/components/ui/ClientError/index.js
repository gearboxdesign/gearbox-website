import React from 'react';
import { HIDDEN_CLASS } from 'constants/cssClasses';
import combineClasses from 'modules/combineClasses';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

// TODO: Apply styling.
class ClientError extends React.PureComponent {

	constructor (props) {

		super(props);

		this.state = {
			visible: true
		};

		this.timeout = null;

		this.dismiss = this.dismiss.bind(this);
		this.animationEndHandler = this.animationEndHandler.bind(this);
	}

	componentDidMount () {

		const { dismissDelay } = this.props;

		this.element.addEventListener('animationend', this.animationEndHandler);

		clearTimeout(this.timeout);
		this.timeout = setTimeout(this.dismiss, dismissDelay);
	}

	componentWillUnmount () {

		const { clearHandler } = this.props;

		clearHandler();
		clearTimeout(this.timeout);

		this.element.removeEventListener('animationend', this.animationEndHandler);
	}

	dismiss () {

		this.setState({
			visible: false
		});
	}

	animationEndHandler () {

		const { clearHandler } = this.props,
			{ visible } = this.state;

		if (!visible) {
			clearHandler();
		}
	}

	render () {

		const { aria,
			bemClass,
			className,
			message,
			heading,
			statusCode
		} = this.props,
			{ visible } = this.state,
			ariaAttrs = getAriaAttrs(aria);

		return (
			<div
				className={ combineClasses(className, !visible && HIDDEN_CLASS).join(' ') }
				onClick={ this.dismiss }
				ref={ (element) => { this.element = element; } }
				role="button"
				tabIndex={ 0 }
				{ ...ariaAttrs }
			>
				<p className={ bemClass.element('message') }>
					<span className={ bemClass.element('message-inner') }>
						<strong>{ statusCode > 0 ? `${ statusCode } ${ heading }` : heading }:</strong> { `${ message }` }
					</span>
				</p>
			</div>
		);
	}
}

ClientError.defaultProps = {
	className: 'c-client-error',
	dismissDelay: 5000,
	statusCode: 0
};

ClientError.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass,
	className: React.PropTypes.string.isRequired,
	clearHandler: React.PropTypes.func.isRequired,
	dismissDelay: React.PropTypes.number.isRequired,
	heading: React.PropTypes.string.isRequired,
	message: React.PropTypes.string,
	statusCode: React.PropTypes.number.isRequired
};

export default BemClasses(ClientError);
