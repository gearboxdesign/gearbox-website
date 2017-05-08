import { LANG_CODES } from 'translations';

export default function getLang (pathname) {

	const pathFragments = pathname.split('/').slice(1);

	return LANG_CODES.includes(pathFragments[0]) ?
		pathFragments[0] :
		undefined; // eslint-disable-line no-undefined
}