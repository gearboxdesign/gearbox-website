import React from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { setExample } from 'actions/actionCreators';
import Example from 'components/Example';
import StoreRegister from 'components/hoc/StoreRegister';
import exampleReducer from 'reducers/exampleReducer';

function ExampleContainer (props, context) {

	const { router: { location: { query: routeQuery } }, routeParams } = context;
	
	return (
		<Example { ...Object.assign({
			routeParams,
			routeQuery
		}, props) } />
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
	routeParams: React.PropTypes.object
};

export default StoreRegister(connect(mapStateToProps, mapDispatchToProps)(ExampleContainer), {
	example: exampleReducer
});