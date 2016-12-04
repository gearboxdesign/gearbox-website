import React from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { setNavState } from 'actions/actionCreators';
import Header from 'components/Header';
import StoreRegister from 'components/hoc/StoreRegister';
import navStateReducer from 'reducers/navStateReducer';
import { addScrollListener, removeScrollListener } from 'modules/scrollTracker';

class HeaderContainer extends React.Component {

	constructor (props) {

		super(props);

		this.state = {
			docked: true
		};

		this.scrollListener = (pos) => {
			
			this.setState({
				docked: !pos.y
			});
		};
	}

	componentDidMount () {

		addScrollListener(this.scrollListener);
	}

	componentWillUnmount () {

		removeScrollListener(this.scrollListener);
	}

	render () {

		const { navigation, ...restProps } = this.props,
			{ docked } = this.state;

		return (
			<Header classes={ docked ? 'is-docked' : 'is-scrolled' }
				navigation={ navigation.reduce(getMainNavPages, []) }
				{ ...restProps }
			/>
		);		
	}
}

function mapStateToProps (state) {

	const { navState } = state;

	return {
		navState
	};
}

function mapDispatchToProps (dispatch) {

	return {
		setNavStateHandler: (value) => {
			return dispatch(setNavState(value));
		}
	};
}

function getMainNavPages (pages, page) {

	const { childPages, includeInMainNavigation } = page;

	if (includeInMainNavigation) {

		return pages.concat(Object.assign({}, page, {
			childPages: childPages && childPages.reduce(getMainNavPages, [])
		}));
	}

	return pages;
}

HeaderContainer.defaultProps = {};

HeaderContainer.propTypes = {
	navigation: React.PropTypes.array.isRequired
};

export default StoreRegister(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer), {
	navState: navStateReducer
});