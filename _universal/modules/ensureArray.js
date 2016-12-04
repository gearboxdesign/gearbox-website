export default function ensureArray (candidate) {

	return Array.isArray(candidate) ?
		candidate :
		candidate ? [candidate] : [];
}