import React from 'react'; // eslint-disable-line no-unused-vars

export default function (Component, reducers, options = {}) { // eslint-disable-line no-unused-vars

	class StoreRegister extends React.Component {

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

	return StoreRegister;
}