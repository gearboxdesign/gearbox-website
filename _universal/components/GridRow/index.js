import React from 'react'; // eslint-disable-line no-unused-vars
import bem from 'modules/bem';
import Components from 'components/hoc/Components';
import propTypes from 'components/lib/propTypes';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}
/* eslint-enable */

// TODO: Create this component in contentful and verified it can be used independently.
function GridRow (props) {

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

const GridRowWrapped = Components(GridRow);

GridRowWrapped.ALIGN_TOP = 'top';
GridRowWrapped.ALIGN_MIDDLE = 'middle';
GridRowWrapped.ALIGN_BOTTOM = 'bottom';

GridRowWrapped.JUSTIFY_START = 'start';
GridRowWrapped.JUSTIFY_CENTER = 'center';
GridRowWrapped.JUSTIFY_END = 'end';
GridRowWrapped.JUSTIFY_SPREAD_AROUND = 'around';
GridRowWrapped.JUSTIFY_SPREAD_BETWEEN = 'between';

const gridRowPropTypes = {
	align: propTypes.whitelist([
		GridRowWrapped.ALIGN_TOP,
		GridRowWrapped.ALIGN_MIDDLE,
		GridRowWrapped.ALIGN_BOTTOM
	]),
	justify: propTypes.whitelist([
		GridRowWrapped.JUSTIFY_START,
		GridRowWrapped.JUSTIFY_CENTER,
		GridRowWrapped.JUSTIFY_END,
		GridRowWrapped.JUSTIFY_SPREAD_AROUND,
		GridRowWrapped.JUSTIFY_SPREAD_BETWEEN
	]),
	reverse: React.PropTypes.bool
};

GridRow.defaultProps = {
	breakpoints: [],
	align: GridRowWrapped.ALIGN_TOP,
	justify: GridRowWrapped.JUSTIFY_START,
	reverse: false
};

GridRow.propTypes = Object.assign({
	breakpoints: React.PropTypes.arrayOf(
		React.PropTypes.shape(Object.assign({
			breakpoint: React.PropTypes.string.isRequired
		}, gridRowPropTypes))
	),
	children: React.PropTypes.any
}, gridRowPropTypes);

export default GridRowWrapped;