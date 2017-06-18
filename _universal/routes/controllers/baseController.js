import React from 'react';
import { get, partial } from 'lodash';
import { clearContent, getFooter, getHeader, getTranslations } from 'actions/actionCreators';
import { ERRORS } from 'constants/http';
import { FOOTER, HEADER, TRANSLATIONS } from 'constants/apiUrls';
import { getJSON } from 'modules/fetchJSON';
import getRouteLang from 'lib/getRouteLang';
import BaseTemplate from 'templates/Base';
import ErrorTemplate from 'templates/Error';

const dev = process.env.NODE_ENV === 'development';

let initialRender = true;

export default function baseController (store, siteMapTree) {

	return (nextState, callback) => { // eslint-disable-line consistent-return

		const { location: { pathname } } = nextState,
			prevLang = get(nextState, 'location.state.lang'),
			lang = getRouteLang(pathname),
			translationsUrl = lang ? `${ TRANSLATIONS }/${ lang }` : TRANSLATIONS;

		if (!initialRender && prevLang !== lang) {
			store.dispatch(clearContent());
		}

		const headerState = get(store.getState(), 'header'),
			footerState = get(store.getState(), 'footer');

		// NOTE: A syncronous response must be returned for SSR.
		if (headerState && footerState && prevLang !== lang) {

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
				headerState ?
					Promise.resolve(headerState) :
					getJSON(HEADER).then(partial(storeHeaderState, store.dispatch)),
				footerState ?
					Promise.resolve(footerState) :
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

		initialRender = false;
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
					statusCode,
					title: statusCode.toString()
				},
				routeProps) }
			/>
		);
	};
}