import React from 'react'; // eslint-disable-line no-unused-vars
import Remarkable from 'remarkable';
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

const md = new Remarkable();

function Editorial (props) {

	const { bemClass, className, content } = props;

	return (
		<div className={ className }>
			<div
				className={ bemClass.element('inner') }
				dangerouslySetInnerHTML={ {
					__html: md.render(content)
				} }
			/>
		</div>
	);
}

Editorial.defaultProps = {
	className: 'c-editorial'
};

Editorial.propTypes = {
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	content: React.PropTypes.string.isRequired
};

export default BemClasses(Editorial);