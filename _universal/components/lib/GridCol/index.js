import React from 'react';
import bem from 'modules/bem';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

export default function GridCol (props) {

	const { breakpoints, children, count, offset, reverse } = props,
		colModifiers = breakpoints.reduce((modifiers, breakpoint) => {
			return modifiers.concat(getModifiers(breakpoint));
		}, getModifiers({
			count,
			offset,
			reverse
		})),
		className = bem('b-grid-row__col').modifiers(colModifiers);

	return (
		<div className={ className }>
			{ children }
		</div>
	);
}

function getModifiers (props = {}) {

	const { breakpoint, count, offset, reverse } = props,
		breakpointPrefix = breakpoint ? `${ breakpoint }-` : '',
		modifiers = [];

	if (count) {
		modifiers.push(`${ breakpointPrefix }${ count }`);
	}

	if (offset) {
		modifiers.push(`${ breakpointPrefix }offset-${ offset }`);
	}

	if (reverse) {
		modifiers.push(`${ breakpointPrefix }reverse`);
	}

	return modifiers;
}

const gridColPropTypes = {
	count: React.PropTypes.number,
	offset: React.PropTypes.number,
	reverse: React.PropTypes.bool
};

GridCol.defaultProps = {
	breakpoints: [],
	count: 0,
	offset: 0,
	reverse: false
};

GridCol.propTypes = Object.assign({
	breakpoints: React.PropTypes.arrayOf(
		React.PropTypes.shape(Object.assign({
			breakpoint: React.PropTypes.string.isRequired
		}, gridColPropTypes))
	),
	children: React.PropTypes.node
}, gridColPropTypes);