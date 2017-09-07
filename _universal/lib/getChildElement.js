import React from 'react';
import { get } from 'lodash';
import { createError } from 'lib/errorFactory';
import getComponent from 'lib/getComponent';
import ErrorComponent from 'components/ui/Error';

export default function getChildElement (props, i) {

	const componentId = get(props, 'meta.componentId'),
		id = get(props, 'meta.id');

	if (componentId) {

		try {

			const Component = getComponent(componentId);

			return (
				<Component
					index={ i }
					key={ id }
					{ ...props }
				/>
			);
		}
		catch (error) {

			return (
				<ErrorComponent
					error={ createError(error.message) }
					key={ id }
				/>
			);
		}
	}

	return (
		<ErrorComponent
			error={ createError(`componentId is not defined for entry: ${ id }.`) }
			key={ id }
		/>
	);
}

