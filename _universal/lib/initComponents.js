import { get, isFunction } from 'lodash';
import getComponent from 'lib/getComponent';

export default function initComponents (store) {

	return (viewModel) => {

		const components = get(viewModel, 'components', []).map(getChildComponent);

		return Promise.all(components.map((Component) => {
			return isFunction(Component.onInit) && Component.onInit(store);
		}))
		.then(() => { return viewModel; });
	};
}

function getChildComponent (props) {

	const componentId = get(props, 'meta.componentId');

	return getComponent(componentId);
}