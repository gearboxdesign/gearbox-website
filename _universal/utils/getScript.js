import React from 'react';

export default function (props, i) {

	const { body, src } = props; // eslint-disable-line react/prop-types

	if (body) {

		return (
			<script dangerouslySetInnerHTML={ { __html: body } } /> // eslint-disable-line react/no-danger
		);
	}

	return (
		<script src={ src } />
	);
}
