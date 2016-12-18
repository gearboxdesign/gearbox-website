	import React from 'react'; // eslint-disable-line no-unused-vars
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
	const { aria, bemClass, caption, className, heading, subHeading } = props,
		ariaAttrs = getAriaAttrs(aria);
	/* eslint-enable */

	console.log(props);

	// TODO: Add constraint.
	return (
		<div className={ className }>
			<GridRow>
				<GridCol count={ 12 }>
					<div className={ bemClass.element('container') }>
						<div className={ bemClass.element('headings-container') }>
							<h1 className={ bemClass.element('heading') }>{ heading.split(' ').map(wrapTextElement(bemClass.element('heading-item'))) }</h1>
							<h2 className={ bemClass.element('subheading') }>{ subHeading.split(' ').map(wrapTextElement(bemClass.element('subheading-item'))) }</h2>
						</div>
						<p className={ bemClass.element('caption') }>{ caption }</p>
					</div>
				</GridCol>
			</GridRow>
		</div>
	);
}

function wrapTextElement (className) {

	return (textStr, i) => {
		return (
			<span
				className = { className }
				key={ i }
			>
				{ textStr }
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
	subHeading: React.PropTypes.string.isRequired
};

export default BemClasses(Hero);