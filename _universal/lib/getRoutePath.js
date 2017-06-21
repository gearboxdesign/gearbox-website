import { LANGUAGE_CODES } from 'constants/translations';

export default function getRoutePath (pathname) {

	const pathFragments = pathname.split('/').slice(1);

	return LANGUAGE_CODES.includes(pathFragments[0]) ? `/${ pathFragments.slice(1).join('/') }` : pathname;
}