import { get, isFunction } from 'lodash';
import getComponent from 'lib/getComponent';

export default function initComponents (store, components) {

	const Components = components.map(getChildComponent);

	return Promise.all(Components.map((Component) => {
		return isFunction(Component.onInit) && Component.onInit(store);
	}));
}

function getChildComponent (props) {

	const componentId = get(props, 'meta.componentId');

	return getComponent(componentId);
}