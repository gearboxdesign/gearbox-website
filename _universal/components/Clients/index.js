import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import Animate from 'components/Animate';
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

	const { aria, bemClass, className, clientIcons, description, heading, index } = props,
		ariaAttrs = getAriaAttrs(aria);

	console.log(index);

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
					<Animate type={ Animate.SLIDE_LEFT }>
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
					</Animate>
				</GridCol>
				<GridCol
					breakpoints={ [{
						breakpoint: 'medium',
						count: 6
					}] }
					count={ 12 }
				>
					<Animate type={ Animate.SLIDE_RIGHT }>
						<div className={ bemClass.element('icons') }>
							{ clientIcons.map(getClientsIconItem(bemClass.element('icons-item'))) }
						</div>
					</Animate>
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
	clientIcons: React.PropTypes.arrayOf(propTypes.image.isRequired).isRequired,
	description: React.PropTypes.string.isRequired,
	heading: React.PropTypes.string.isRequired,
	index: React.PropTypes.number.isRequired
};

export default BemClasses(Clients);