import React from 'react';
import { ANIMATION_DELAY } from 'constants/animations';
import { last } from 'lodash';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import GridCol from 'components/lib/GridCol';
import GridRow from 'components/lib/GridRow';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Hero (props) {

	const { aria,
			bemClass,
			caption,
			className,
			heading,
			index,
			subHeading
		} = props,
		ariaAttrs = getAriaAttrs(aria),
		styles = {
			'animationDelay': `${ index * ANIMATION_DELAY }s`
		};

	const headingTextElements = heading.split(' ')
			.map(wrapTextElement(bemClass.element('heading-item')))
			.reduce(groupTextElements(1), [])
			.map(wrapTextElement(bemClass.element('heading-group'))),
		subHeadingTextElements = subHeading.split(' ')
			.map(wrapTextElement(bemClass.element('subheading-item')))
			.reduce(groupTextElements(3), []) // eslint-disable-line no-magic-numbers
			.map(wrapTextElement(bemClass.element('subheading-group')));

	return (
		<div
			className={ className }
			{ ...ariaAttrs }
		>
			<GridRow>
				<GridCol count={ 12 }>
					<div className={ bemClass.element('container') }>
						<div
							className={ bemClass.element('headings-container') }
							style={ styles }
						>
							<h1 className={ bemClass.element('heading') }>{ headingTextElements }</h1>
							<h2 className={ bemClass.element('subheading') }>{ subHeadingTextElements }</h2>
						</div>
						<p
							className={ bemClass.element('caption') }
							style={ styles }
						>
							{ caption }
						</p>
					</div>
				</GridCol>
			</GridRow>
		</div>
	);
}

function groupTextElements (groupCount) {

	return (groups, element, i) => {

		if (!(i % groupCount)) {
			return groups.concat([[element]]);
		}

		return groups.slice(0, groups.length - 1)
			.concat([last(groups).concat(element)]);
	};
}

function wrapTextElement (className) {

	return (text, i) => {

		return (
			<span
				className={ className }
				key={ i }
			>
				{ text }
			</span>
		);
	};
}

Hero.defaultProps = {
	className: 'c-hero'
};

Hero.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	caption: React.PropTypes.string.isRequired,
	className: React.PropTypes.string.isRequired,
	heading: React.PropTypes.string.isRequired,
	index: React.PropTypes.number.isRequired,
	subHeading: React.PropTypes.string.isRequired
};

export default BemClasses(Hero);