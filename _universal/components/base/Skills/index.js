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

function Skills (props) {

	const { aria, bemClass, className, description, heading, index, skillsIcons, skillsList } = props,
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
							<ul className={ bemClass.element('list') }>
								{ skillsList.map(getSkillsListItem(bemClass)) }
							</ul>
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
							{ skillsIcons.map(getSkillsIconItem(bemClass)) }
						</div>
					</Animate>
				</GridCol>
			</GridRow>
		</div>
	);
}

function getSkillsListItem (bemClass) {

	return (text) => {

		return (
			<li className={ bemClass.element('list-item') }>
				{ text }
			</li>
		);
	};
}

function getSkillsIconItem (bemClass) {

	return (iconProps) => {

		const { meta: { id } } = iconProps;

		return (
			<ImageContainer
				classes={ bemClass.element('icons-item') }
				key={ id }
				{ ...iconProps }
			/>
		);
	};
}

Skills.defaultProps = {
	className: 'c-skills',
	index: 0
};

Skills.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
	heading: React.PropTypes.string.isRequired,
	index: React.PropTypes.number.isRequired,
	skillsIcons: React.PropTypes.arrayOf(propTypes.image.isRequired).isRequired,
	skillsList: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired
};

export default BemClasses(Skills);