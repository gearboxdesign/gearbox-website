import { trim } from 'lodash';

export default function sanitizePath (path) {

	return trim(path.replace(/\/+/g, '/'));
}