import React from 'react'; // eslint-disable-line no-unused-vars
import propTypes from 'components/lib/propTypes';
import BemClasses from 'components/hoc/BemClasses';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Heading (props) {

	const { bemClass, children, className, level } = props,
		inner = <span className={ bemClass.element('inner') }>{ children }</span>;

	/* eslint-disable indent, no-magic-numbers */
	switch (level) {

		case 2: {
			return <h2 className={ className }>{ inner }</h2>;
		}
		case 3: {
			return <h3 className={ className }>{ inner }</h3>;
		}
		case 4: {
			return <h4 className={ className }>{ inner }</h4>;
		}
		case 5: {
			return <h5 className={ className }>{ inner }</h5>;
		}
		case 6: {
			return <h6 className={ className }>{ inner }</h6>;
		}
		default: {
			return <h1 className={ className }>{ inner }</h1>;
		}
	}

	/* eslint-enable */
}

Heading.defaultProps = {
	className: 'c-heading',
	level: 1
};

Heading.propTypes = {
	bemClass: propTypes.bemClass.isRequired,
	children: React.PropTypes.any.isRequired,
	className: React.PropTypes.string.isRequired,
	level: React.PropTypes.number.isRequired
};

export default BemClasses(Heading);