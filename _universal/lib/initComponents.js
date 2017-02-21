import React from 'react';
import { get, isFunction } from 'lodash';
import getComponent from 'lib/getComponent';
import ErrorComponent from 'components/Error';

export default function initComponents (store, components) {

	return Promise.all(components.map(getChildComponent(store)));
}

function getChildComponent (store) {

	return (props) => {

		const componentId = get(props, 'meta.componentId');

		return getComponent(componentId).then((Component) => {

			return isFunction(Component.onInit) ? Component.onInit(store) : Component;
		})
		.then(getChildElement(props))
		.catch(getErrorElement(props));
	};
}

function getChildElement (props) {

	const { meta: { id } } = props;

	return (Component) => {

		return (
			<Component
				key={ id }
				{ ...props }
			/>
		);
	};
}

function getErrorElement (props) {

	const { meta: { id } } = props;

	return (err) => {

		return (
			<ErrorComponent
				errors={ [err.message] }
				key={ id }
			/>
		);
	};
}