import React from 'react';
import { get, partial } from 'lodash';
import { getFooter, getHeader, getTranslations } from 'actions/actionCreators';
import { FOOTER, HEADER, TRANSLATIONS } from 'constants/apiUrls';
import { getJSON } from 'modules/fetchJSON';
import getRouteLang from 'lib/getRouteLang';
import BaseTemplate from 'templates/Base';

export default function baseController (store, siteMapTree) {

	return (nextState, callback) => { // eslint-disable-line consistent-return

		const { location: { pathname } } = nextState,
			lang = getRouteLang(pathname),
			translationsUrl = lang ? `${ TRANSLATIONS }/${ lang }` : TRANSLATIONS,
			storeState = store.getState(),
			headerState = get(storeState, 'header'),
			footerState = get(storeState, 'footer');

		if (headerState && footerState) {

			return callback(null, createTemplate(createTemplateState(lang, siteMapTree, [
				headerState,
				footerState
			])));
		}

		Promise.all([
			getJSON(HEADER).then(partial(storeHeaderState, store.dispatch)),
			getJSON(FOOTER).then(partial(storeFooterState, store.dispatch)),
			getJSON(translationsUrl).then(partial(storeTranslations, store.dispatch))
		])
		.then(partial(createTemplateState, lang, siteMapTree))
		.then(createTemplate)
		.then((template) => {

			setTimeout(callback.bind(callback, null, template), 0);
		})
		.catch(callback);
	};
}

function storeFooterState (dispatch, value) {

	dispatch(getFooter(value));

	return value;
}

function storeHeaderState (dispatch, value) {

	dispatch(getHeader(value));

	return value;
}

function storeTranslations (dispatch, value) {

	dispatch(getTranslations(value));
}

function createTemplateState (lang, siteMapTree, [headerState, footerState]) {

	return {
		lang,
		headerProps: {
			navigation: siteMapTree,
			...headerState
		},
		footerProps: {
			...footerState
		}
	};
}

function createTemplate (templateProps) {

	return (routeProps) => {

		return (
			<BaseTemplate
				{ ...Object.assign({
					...templateProps
				}, routeProps) }
			/>
		);
	};
}