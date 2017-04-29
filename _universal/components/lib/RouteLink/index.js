import React from 'react';
import { trim } from 'lodash';
import { Link } from 'react-router';

export default function RouteLink (props, context) {

	const { lang } = context,
		{ to, ...restProps } = props,
		langTo = (lang && to) && trim(`/${ lang }${ to }`);

	return (
		<Link
			to={ langTo || to } // eslint-disable-line no-undefined
			{ ...restProps }
		/>
	);
}

RouteLink.contextTypes = {
	lang: React.PropTypes.string
};

RouteLink.propTypes = {
	to: React.PropTypes.string
};