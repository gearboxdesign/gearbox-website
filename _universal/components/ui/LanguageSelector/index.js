import React from 'react';
import { Link } from 'react-router';
import { kebabCase, upperCase } from 'lodash';
import bem from 'modules/bem';
import propTypes from 'components/lib/propTypes';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import BemClasses from 'components/hoc/BemClasses';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function LanguageSelector (props) {

	const { aria,
		bemClass,
		className,
		currentLang,
		languageLabel,
		links
	} = props,
		linkState = currentLang && { state: { lang: currentLang } },
		ariaAttrs = getAriaAttrs(aria);

	return (
		<div
			className={ className }
			{ ...ariaAttrs }
		>
			<p className={ bemClass.element('label') }>{ languageLabel }:</p>
			{ links.map(getLink(bemClass, linkState)) }
		</div>
	);
}

function getLink (bemClass, linkState) {

	return (linkProps) => {

		const { pathname, lang } = linkProps;

		return (
			<Link
				className={ bem(bemClass.element('link')).modifiers(kebabCase(lang)) }
				key={ lang }
				to={ Object.assign({ pathname }, linkState) }
			>
				{ upperCase(lang) }
			</Link>
		);
	};
}

LanguageSelector.defaultProps = {
	className: 'c-language-selector'
};

LanguageSelector.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass,
	className: React.PropTypes.string.isRequired,
	currentLang: React.PropTypes.string,
	languageLabel: React.PropTypes.string.isRequired,
	links: React.PropTypes.arrayOf(React.PropTypes.shape({
		lang: React.PropTypes.string.isRequired,
		pathname: React.PropTypes.string.isRequired
	}))
};

export default BemClasses(LanguageSelector);