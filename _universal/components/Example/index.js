import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import GridCol from 'components/GridCol';
import GridRow from 'components/GridRow';

if (process.env.CLIENT) {
	require('./styles.scss');
}

function Example (props) {

	const { aria, bemClass, className, example, routeParams, routeQuery, setExampleHandler } = props,
		ariaAttrs = getAriaAttrs(aria);

	// console.log(routeParams, routeQuery);

	return (
		<GridRow align={ GridRow.ALIGN_BOTTOM } 
			breakpoints={ [{
				breakpoint: 'medium',
				align: GridRow.ALIGN_MIDDLE,
				justify: GridRow.JUSTIFY_CENTER,
				reverse: false
			},
			{
				breakpoint: 'large',
				align: GridRow.ALIGN_TOP,
				justify: GridRow.JUSTIFY_START,
				reverse: true
			}] }
			justify={ GridRow.JUSTIFY_END }
			reverse={ true }
		>
			<GridCol
				breakpoints={ [{
					breakpoint: 'medium',
					count: 8,
					offset: 4
				},
				{
					breakpoint: 'large',
					count: 6,
					offset: 6
				}] }
				count={ 10 }
				offset={ 2 }
				reverse={ true }
			>
				<div  
					className={ className }
				>
					<h2 className={ bemClass.element('title') }>
						Example
					</h2>
					<button onClick={ (evt) => {
							setExampleHandler(example + 1);
						} }>
						Example Action
					</button>
					<p>{ example }</p>
				</div>
			</GridCol>
		</GridRow>
	);
}

Example.defaultProps = {
	className: 'c-example'
};

Example.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	example: React.PropTypes.number.isRequired,
	routeParams: React.PropTypes.object.isRequired,
	routeQuery: React.PropTypes.object.isRequired,
	setExampleHandler: React.PropTypes.func.isRequired
};

export default BemClasses(Example);