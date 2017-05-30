import React from 'react';
import { get, partial } from 'lodash';
import { getFooter, getHeader, getTranslations } from 'actions/actionCreators';
import { ERRORS } from 'constants/http';
import { FOOTER, HEADER, TRANSLATIONS } from 'constants/apiUrls';
import { getJSON } from 'modules/fetchJSON';
import getRouteLang from 'lib/getRouteLang';
import BaseTemplate from 'templates/Base';
import ErrorTemplate from 'templates/Error';

const dev = process.env.NODE_ENV === 'development';

export default function baseController (store, siteMapTree) {

	return (nextState, callback) => { // eslint-disable-line consistent-return

		console.log('baseController');

		const { location: { pathname } } = nextState,
			lang = getRouteLang(pathname),
			translationsUrl = lang ? `${ TRANSLATIONS }/${ lang }` : TRANSLATIONS,
			storeState = store.getState(),
			headerState = get(storeState, 'header'),
			footerState = get(storeState, 'footer');

		// TODO: Consider storing current lang in store, when this changes reducers which cache header, footer, page and projects
		//  should be wiped, otherwise perhaps a complete page unload is a better way to go.

		if (headerState && footerState) {

			try {
				callback(null, createBase(createBaseState(lang, siteMapTree, [
					headerState,
					footerState
				])));
			}
			catch (err) {
				callback(null, createError(err));
			}
		}
		else {

			Promise.all([
				getJSON(HEADER).then(partial(storeHeaderState, store.dispatch)),
				getJSON(FOOTER).then(partial(storeFooterState, store.dispatch)),
				getJSON(translationsUrl).then(partial(storeTranslations, store.dispatch))
			])
			.then(partial(createBaseState, lang, siteMapTree))
			.then(createBase)
			.then((template) => {

				setTimeout(callback.bind(callback, null, template), 0);
			})
			.catch((err) => {

				setTimeout(callback.bind(callback, null, createError(err)), 0);
			});
		}
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

function createBaseState (lang, siteMapTree, [headerState, footerState]) {

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

function createBase (templateProps) {

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

function createError (err) {

	const statusCode = err.status || 0;

	return (routeProps) => {

		return (
			<ErrorTemplate
				{ ...Object.assign({
					errors: err.errors || [
						(dev && (err.message || err.toString())) ||
						ERRORS[statusCode.toString()]
					],
					statusCode
				},
				routeProps) }
			/>
		);
	};
}