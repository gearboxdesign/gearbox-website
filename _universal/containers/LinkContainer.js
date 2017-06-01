import React from 'react';
import { isPlainObject, trim } from 'lodash';
import { Link } from 'react-router';

export default function LinkContainer (props, context) {

	const { lang } = context,
		{ to, ...restProps } = props,
		toIsObject = isPlainObject(to),
		url = toIsObject ? to.pathname : to,
		langUrl = (lang && url) && trim(`/${ lang }${ url }`);

	let processedTo;

	if (toIsObject) {
		processedTo = Object.assign({}, to, langUrl && { pathname: langUrl });
	}
	else {
		processedTo = langUrl || to;
	}

	return (
		<Link
			to={ processedTo }
			{ ...restProps }
		/>
	);
}

LinkContainer.propTypes = {
	to: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.object
	]).isRequired
};

LinkContainer.contextTypes = {
	lang: React.PropTypes.string
};