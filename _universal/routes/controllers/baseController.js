import { get, omit, partial } from 'lodash';
import { clearContent, getFooter, getHeader, getTranslations } from 'actions/actionCreators';
import getRouteLang from 'lib/getRouteLang';
import BaseTemplate from 'templates/Base';
import Partial from 'components/hoc/Partial';

export default function baseController (store, siteMapTree) {

	return (nextState, callback) => { // eslint-disable-line consistent-return

		const { location: { hash, pathname, search, state } } = nextState,
			href = pathname + search + hash,
			prevLang = get(state, 'lang'),
			lang = getRouteLang(pathname),
			languageChanged = prevLang ? prevLang !== lang : false;

		if (languageChanged) {

			store.dispatch(clearContent());

			if (process.env.CLIENT) {

				/**
				 * NOTE: Clears any previous language state from history, important in the event
				 * 	of a page refresh if the last navigation event contained language state causing
				 * 	an false positive for 'languageChanged'. 
				 */
				window.history.replaceState(omit(state, ['lang']), null, `${ href }`);
			}
		}

		const headerProps = get(store.getState(), 'header.data'),
			footerProps = get(store.getState(), 'footer.data');

		// NOTE: Synchronous response must be returned for SSR.
		if (!languageChanged && headerProps && footerProps) {

			try {
				callback(null, Partial(BaseTemplate, createBaseProps(lang, siteMapTree, [
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
			.then(partial(Partial, BaseTemplate))
			.then((template) => { setTimeout(callback.bind(null, null, template), 0); })
			.catch(callback.bind(null));
		}
	};
}

function extractBaseProps ([header, footer, translations]) {

	if (header.error) {
		throw header.error;
	}

	if (footer.error) {
		throw footer.error;
	}

	if (translations.error) {
		throw translations.error;
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