import React from 'react';
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';

function Heading (props) {

	const { bemClass, className, level, style, text } = props,
		textElements = text
			.split(' ')
			.map(wrapTextElement(bemClass.element('item'))),
		headingProps = {
			className,
			style
		};

	/* eslint-disable indent, no-magic-numbers */
	switch (level) {

		case 2: {
			return <h2 { ...headingProps }>{ textElements }</h2>;
		}
		case 3: {
			return <h3 { ...headingProps }>{ textElements }</h3>;
		}
		case 4: {
			return <h4 { ...headingProps }>{ textElements }</h4>;
		}
		case 5: {
			return <h5 { ...headingProps }>{ textElements }</h5>;
		}
		case 6: {
			return <h6 { ...headingProps }>{ textElements }</h6>;
		}
		default: {
			return <h1 { ...headingProps }>{ textElements }</h1>;
		}
	}

	/* eslint-enable */
}

function wrapTextElement (className) {

	return (text) => {

		return (
			<span className={ className }>
				{ text }
			</span>
		);
	};
}

Heading.defaultProps = {
	className: 'c-heading',
	level: 1
};

Heading.propTypes = {
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	level: React.PropTypes.number.isRequired,
	style: React.PropTypes.object,
	text: React.PropTypes.string.isRequired
};

export default BemClasses(Heading);