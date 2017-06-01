import { LANGUAGE_CODES } from 'constants/translations';

export default function getLang (pathname) {

	const pathFragments = pathname.split('/').slice(1);

	return LANGUAGE_CODES.includes(pathFragments[0]) ? pathFragments[0] : null;
}