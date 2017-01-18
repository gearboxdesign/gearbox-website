import React from 'react'; // eslint-disable-line no-unused-vars
import { last } from 'lodash';
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';
import GridCol from 'components/GridCol';
import GridRow from 'components/GridRow';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Hero (props) {

	const { bemClass, caption, className, heading, subHeading } = props;

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
	bemClass: propTypes.bemClass.isRequired,
	caption: React.PropTypes.string.isRequired,
	className: React.PropTypes.string.isRequired,
	heading: React.PropTypes.string.isRequired,
	subHeading: React.PropTypes.string.isRequired
};

export default BemClasses(Hero);