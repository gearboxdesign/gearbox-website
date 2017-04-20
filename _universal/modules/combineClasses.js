import { isString } from 'lodash';

export default function combineClasses (...classes) {

	return classes.reduce((classArr, cls) => {

		return isString(cls) ? classArr.concat(cls) : classArr;

	}, []);
}