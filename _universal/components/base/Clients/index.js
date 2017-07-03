import React from 'react';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import Animate from 'components/lib/Animate';
import Editorial from 'components/ui/Editorial';
import GridCol from 'components/lib/GridCol';
import GridRow from 'components/lib/GridRow';
import Heading from 'components/ui/Heading';
import ImageContainer from 'containers/ImageContainer';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Clients (props) {

	const { aria, bemClass, className, clientIcons, description, heading, index } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<div
			className={ className }
			{ ...ariaAttrs }
		>
			<GridRow align={ GridRow.ALIGN_STRETCH }>
				<GridCol
					breakpoints={ [{
						breakpoint: 'large',
						count: 6
					}] }
					count={ 12 }
				>
					<Animate
						index={ index }
						modifiers={ 'full-height' }
						type={ Animate.SLIDE_LEFT }
					>
						<div className={ bemClass.element('content') }>
							<Heading
								classes={ bemClass.element('heading') }
								level={ 2 }
								text={ heading }
							/>
							<Editorial
								classes={ bemClass.element('description') }
								content={ description }
							/>
						</div>
					</Animate>
				</GridCol>
				<GridCol
					breakpoints={ [{
						breakpoint: 'large',
						count: 6
					}] }
					count={ 12 }
				>
					<Animate
						index={ index }
						modifiers={ 'full-height' }
						type={ Animate.FADE }
					>
						<div className={ bemClass.element('icons') }>
							{ clientIcons.map(getClientsIconItem(bemClass)) }
						</div>
					</Animate>
				</GridCol>
			</GridRow>
		</div>
	);
}

function getClientsIconItem (bemClass) {

	return (props) => {

		const { meta: { id } } = props; // eslint-disable-line react/prop-types

		return (
			<ImageContainer
				classes={ bemClass.element('icons-item') }
				key={ id }
				{ ...props }
			/>
		);
	};
}

Clients.defaultProps = {
	className: 'c-clients',
	index: 0
};

Clients.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	clientIcons: React.PropTypes.arrayOf(propTypes.image.isRequired).isRequired,
	description: React.PropTypes.string.isRequired,
	heading: React.PropTypes.string.isRequired,
	index: React.PropTypes.number.isRequired
};

export default BemClasses(Clients);