import React from 'react';
import { LANGUAGE_CODES } from 'constants/translations';
import getRoutePath from 'lib/getRoutePath';
import LanguageSelector from 'components/ui/LanguageSelector';

export default function LanguageSelectorContainer (props, context) {

	const { lang, router: { location: { pathname } } } = context;

	return (
		<LanguageSelector
			currentLang={ lang }
			links={ LANGUAGE_CODES.map(getLang(getRoutePath(pathname))) }
			{ ...props }
		/>
	);
}

function getLang (to) {

	return (lang) => {

		return {
			lang,
			pathname: `/${ lang }${ to }`
		};
	};
}

LanguageSelectorContainer.defaultProps = {};

LanguageSelectorContainer.propTypes = {};

LanguageSelectorContainer.contextTypes = {
	lang: React.PropTypes.string,
	router: React.PropTypes.object.isRequired
};