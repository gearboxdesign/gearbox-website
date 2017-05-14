import React from 'react';
import { get, partial } from 'lodash';
import { setFooter, setHeader } from 'actions/actionCreators';
import { FOOTER, HEADER } from 'constants/apiUrls';
import { getJSON } from 'modules/fetchJSON';
import getRouteLang from 'lib/getRouteLang';
import BaseTemplate from 'templates/Base';

export default function baseController (store, siteMapTree) {

	return (nextState, callback) => { // eslint-disable-line consistent-return

		const { location: { pathname } } = nextState,
			lang = getRouteLang(pathname),
			storeState = store.getState(),
			headerState = get(storeState, 'header'),
			footerState = get(storeState, 'footer');

		if (headerState && footerState) {

			return callback(null, createTemplate(createTemplateState(lang, siteMapTree, [
				headerState,
				footerState
			])));
		}

		// NOTE: Only cache ViewModels on the server or in production.
		Promise.all([
			getJSON(HEADER).then(partial(storeHeaderState, store.dispatch)),
			getJSON(FOOTER).then(partial(storeFooterState, store.dispatch))
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

	dispatch(setFooter(value));

	return value;
}

function storeHeaderState (dispatch, value) {

	dispatch(setHeader(value));

	return value;
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