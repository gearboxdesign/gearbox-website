import React from 'react';
import bem from 'modules/bem';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

export default function GridRow (props) {

	const { align, breakpoints, children, justify, reverse } = props,
		rowModifiers = breakpoints.reduce((modifiers, breakpoint) => {
			return modifiers.concat(getModifiers(breakpoint));
		}, getModifiers({
			align,
			justify,
			reverse
		})),
		className = bem('b-grid-row').modifiers(rowModifiers);

	return (
		<div className={ className }>
			{ children }
		</div>
	);
}

function getModifiers (props = {}) {

	const { align, breakpoint, justify, reverse } = props,
		breakpointPrefix = breakpoint ? `${ breakpoint }-` : '',
		modifiers = [];

	if (align) {
		modifiers.push(`${ breakpointPrefix }${ align }`);
	}

	if (justify) {
		modifiers.push(`${ breakpointPrefix }${ justify }`);
	}

	if (reverse) {
		modifiers.push(`${ breakpointPrefix }reverse`);
	}

	return modifiers;
}

GridRow.ALIGN_TOP = 'top';
GridRow.ALIGN_MIDDLE = 'middle';
GridRow.ALIGN_BOTTOM = 'bottom';
GridRow.ALIGN_STRETCH = 'stretch';

GridRow.JUSTIFY_START = 'start';
GridRow.JUSTIFY_CENTER = 'center';
GridRow.JUSTIFY_END = 'end';
GridRow.JUSTIFY_SPREAD_AROUND = 'around';
GridRow.JUSTIFY_SPREAD_BETWEEN = 'between';

const gridRowPropTypes = {
	align: React.PropTypes.oneOf([
		GridRow.ALIGN_TOP,
		GridRow.ALIGN_MIDDLE,
		GridRow.ALIGN_BOTTOM,
		GridRow.ALIGN_STRETCH
	]),
	justify: React.PropTypes.oneOf([
		GridRow.JUSTIFY_START,
		GridRow.JUSTIFY_CENTER,
		GridRow.JUSTIFY_END,
		GridRow.JUSTIFY_SPREAD_AROUND,
		GridRow.JUSTIFY_SPREAD_BETWEEN
	]),
	reverse: React.PropTypes.bool
};

GridRow.defaultProps = {
	breakpoints: [],
	align: GridRow.ALIGN_TOP,
	justify: GridRow.JUSTIFY_START,
	reverse: false
};

GridRow.propTypes = Object.assign({
	breakpoints: React.PropTypes.arrayOf(
		React.PropTypes.shape(Object.assign({
			breakpoint: React.PropTypes.string.isRequired
		}, gridRowPropTypes))
	),
	children: React.PropTypes.node
}, gridRowPropTypes);