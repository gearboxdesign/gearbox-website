import React from 'react';
import { get, partial } from 'lodash';
import { clearContent, getFooter, getHeader, getTranslations } from 'actions/actionCreators';
import getRouteLang from 'lib/getRouteLang';
import BaseTemplate from 'templates/Base';

export default function baseController (store, siteMapTree) {

	return (nextState, callback) => { // eslint-disable-line consistent-return

		const { location: { pathname } } = nextState,
			// NOTE: location.state.lang refers to the previous language when a language change is requested.
			prevLang = get(nextState, 'location.state.lang'),
			lang = getRouteLang(pathname),
			languageChanged = prevLang && prevLang !== lang;

		if (languageChanged) {
			store.dispatch(clearContent());
		}

		const headerProps = get(store.getState(), 'header.data'),
			footerProps = get(store.getState(), 'footer.data');

		// NOTE: Synchronous response must be returned for SSR.
		if (!languageChanged && headerProps && footerProps) {

			try {
				callback(null, createBaseComponent(createBaseProps(lang, siteMapTree, [
					headerProps,
					footerProps
				])));
			}
			catch (err) {

				callback(err);
			}
		}
		else {

			Promise.all([
				headerProps ?
					Promise.resolve(headerProps) :
					getHeader()(store.dispatch, store.getState),
				footerProps ?
					Promise.resolve(footerProps) :
					getFooter()(store.dispatch, store.getState),
				getTranslations(lang)(store.dispatch, store.getState)
			])
			.then(extractBaseProps)
			.then(partial(createBaseProps, lang, siteMapTree))
			.then(createBaseComponent)
			.then((template) => { setTimeout(callback.bind(null, null, template), 0); })
			.catch(callback.bind(null));
		}
	};
}

function extractBaseProps ([header, footer, translations]) {

	if (header.errors || footer.errors || translations.errors) {

		const err = new Error('Unable to retrieve base data.');

		err.errors = []
			.concat(header.errors || [])
			.concat(footer.errors || [])
			.concat(translations.errors || []);
		err.status = 500;

		throw err;
	}

	return [header.data, footer.data, translations.data];
}

function createBaseProps (lang, siteMapTree, [headerProps, footerProps]) {

	return {
		lang,
		headerProps: {
			navigation: siteMapTree,
			...headerProps
		},
		footerProps
	};
}

function createBaseComponent (baseProps) {

	return (routeProps) => {

		return (
			<BaseTemplate
				{ ...Object.assign({
					...baseProps
				}, routeProps) }
			/>
		);
	};
}