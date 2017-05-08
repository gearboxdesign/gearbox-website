import { LANG_CODES } from 'translations';

export default function getRoutePath (pathname) {

	const pathFragments = pathname.split('/').slice(1);

	return LANG_CODES.includes(pathFragments[0]) ?
		`/${ pathFragments.slice(1).join('/') }` :
		pathname;
}