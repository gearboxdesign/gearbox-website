import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import Editorial from 'components/Editorial';
import GridCol from 'components/GridCol';
import GridRow from 'components/GridRow';
import Heading from 'components/Heading';
import ImageContainer from 'containers/ImageContainer';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Clients (props) {

	const { aria, bemClass, className, description, heading, clientIcons } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<div
			className={ className }
			{ ...ariaAttrs }
		>
			<GridRow align={ GridRow.ALIGN_STRETCH }>
				<GridCol
					breakpoints={ [{
						breakpoint: 'medium',
						count: 6
					}] }
					count={ 12 }
				>
					<div className={ bemClass.element('content') }>
						<Heading
							classes={ bemClass.element('heading') }
							level={ 2 }
						>
							{ heading }
						</Heading>
						<Editorial
							classes={ bemClass.element('description') }
							content={ description }
						/>
					</div>
				</GridCol>
				<GridCol
					breakpoints={ [{
						breakpoint: 'medium',
						count: 6
					}] }
					count={ 12 }
				>
					<div className={ bemClass.element('icons') }>
						{ clientIcons.map(getClientsIconItem(bemClass.element('icons-item'))) }
					</div>
				</GridCol>
			</GridRow>
		</div>
	);
}

function getClientsIconItem (className) {

	return (props) => {

		const { meta: { id } } = props; // eslint-disable-line react/prop-types

		return (
			<ImageContainer
				classes={ className }
				key={ id }
				{ ...props }
			/>
		);
	};
}

Clients.defaultProps = {
	className: 'c-clients'
};

Clients.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	clientIcons: React.PropTypes.arrayOf(React.PropTypes.object.isRequired).isRequired, // TODO: Replace with custom 'image' PropType.
	description: React.PropTypes.string.isRequired,
	heading: React.PropTypes.string.isRequired
};

export default BemClasses(Clients);