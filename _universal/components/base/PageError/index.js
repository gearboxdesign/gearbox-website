import React from 'react';
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';
import Heading from 'components/ui/Heading';
import Logo from 'components/ui/Logo';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function PageError (props) {

	const { bemClass, className, message, statusCode } = props;

	return (
		<div className={ className }>
			<Logo
				classes={ bemClass.element('logo') }
				modifiers={ 'animated' }
			/>
			<div className={ bemClass.element('detail') }>
				<Heading
					classes={ bemClass.element('heading') }
					text={ String(statusCode) }
				/>
				<p className={ bemClass.element('message') }>{ message }</p>
			</div>
		</div>
	);
}

PageError.defaultProps = {
	className: 'c-page-error'
};

PageError.propTypes = {
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	message: React.PropTypes.string.isRequired,
	statusCode: React.PropTypes.number.isRequired
};

export default BemClasses(PageError);
