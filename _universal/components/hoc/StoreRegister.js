import React from 'react'; // eslint-disable-line no-unused-vars

export default function (Component, reducers, options = {}) { // eslint-disable-line no-unused-vars

	class StoreRegister extends React.PureComponent {

		componentWillMount () {

			const { store } = this.context;

			if (reducers) {
				store.registerReducers({ ...reducers });
			}
		}

		render () {

			return <Component { ...this.props } />;
		}
	}

	StoreRegister.contextTypes = {
		store: React.PropTypes.object
	};

	const componentName = Component.displayName ||
		Component.name ||
		'Component';

	StoreRegister.displayName = `storeRegister(${ componentName })`;

	StoreRegister.wrappedComponent = Component;

	return StoreRegister;
}