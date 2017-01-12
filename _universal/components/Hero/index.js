import React from 'react'; // eslint-disable-line no-unused-vars
import { last } from 'lodash';
import ActionLink from 'components/ActionLink';
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import GridCol from 'components/GridCol';
import GridRow from 'components/GridRow';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Hero (props) {

	/* eslint-disable no-unused-vars */
	const { aria, bemClass, caption, className, heading, links, subHeading } = props,
		ariaAttrs = getAriaAttrs(aria);

	/* eslint-enable */

	const headingTextElements = heading.split(' ')
			.map(wrapTextElement(bemClass.element('heading-item')))
			.reduce(groupTextElements(1), [])
			.map(wrapTextElement(bemClass.element('heading-group'))),
		subHeadingTextElements = subHeading.split(' ')
			.map(wrapTextElement(bemClass.element('subheading-item')))
			.reduce(groupTextElements(3), [])
			.map(wrapTextElement(bemClass.element('subheading-group')));

	return (
		<div className={ className }>
			<GridRow>
				<GridCol count={ 12 }>
					<div className={ bemClass.element('container') }>
						<div className={ bemClass.element('headings-container') }>
							<h1 className={ bemClass.element('heading') }>{ headingTextElements }</h1>
							<h2 className={ bemClass.element('subheading') }>{ subHeadingTextElements }</h2>
						</div>
						<p className={ bemClass.element('caption') }>{ caption }</p>
						<nav className={ bemClass.element('nav') }>{ links.map(getActionLinks(bemClass.element('nav-link'))) }</nav>
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

function getActionLinks (classes) {

	return (link, i) => {

		const { label, url } = link;

		return (
			<ActionLink
				classes={ classes }
				key={ i }
				label={ label }
				to={ url }
			/>
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
	links: React.PropTypes.arrayOf(propTypes.link.isRequired),
	subHeading: React.PropTypes.string.isRequired
};

export default BemClasses(Hero);