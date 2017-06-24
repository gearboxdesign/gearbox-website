import React from 'react';
import Template from 'templates/Template';
import BemClasses from 'components/hoc/BemClasses';

function DefaultTemplate (props) {

	const { children, className } = props;

	return (
		<main className={ className }>
			{ children }
		</main>
	);
}

DefaultTemplate.defaultProps = {
	className: 't-default'
};

DefaultTemplate.propTypes = {
	children: React.PropTypes.node,
	className: React.PropTypes.string.isRequired
};

export default Template(BemClasses(DefaultTemplate));