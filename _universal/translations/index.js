import { get, partial } from 'lodash';
import en from './en.json';

const LANGS = Object.freeze({
	en
});

export const LANG_CODES = Object.keys(LANGS);

export default function translations (lang) {

	return partial(get, LANGS[lang] || LANGS['en']);
}