import React from 'react';
import { connect } from 'react-redux';
import { setExample } from 'actions/actionCreators';
import Example from 'components/base/Example';
import exampleReducer from 'reducers/exampleReducer';

function ExampleContainer (props, context) {

	const { router: { location: { query: routeQuery } }, routeData } = context;

	return (
		<Example
			{ ...Object.assign({
				routeData,
				routeQuery
			}, props) }
		/>
	);
}

function mapStateToProps (state) {

	const { example } = state;

	return {
		example
	};
}

function mapDispatchToProps (dispatch) {

	return {
		setExampleHandler: (value) => {
			return dispatch(setExample(value));
		}
	};
}

ExampleContainer.defaultProps = {};

ExampleContainer.propTypes = {};

ExampleContainer.contextTypes = {
	router: React.PropTypes.object,
	routeData: React.PropTypes.object.isRequired
};

const WrappedExampleContainer = connect(mapStateToProps, mapDispatchToProps)(ExampleContainer);

WrappedExampleContainer.onInit = (store) => {

	store.registerReducers({
		example: exampleReducer
	});

	/* eslint-disable */
	// NOTE: Test to prove concept.
	// NOTE: This should also usually be invoked in the containers componentDidMount method.
	return new Promise((res) => {

		setTimeout(() => {
			res();
		}, 5000);
		
		/* eslint-disable */
	});
};

export default WrappedExampleContainer;