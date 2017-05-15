import React from 'react';
import { connect } from 'react-redux';
import { toggleNav } from 'actions/actionCreators';
import Header from 'components/ui/Header';
import StoreRegister from 'components/hoc/StoreRegister';
import navActiveReducer from 'reducers/navActiveReducer';
import { addScrollListener, removeScrollListener, getScrollPos } from 'modules/scrollTracker';

class HeaderContainer extends React.PureComponent {

	constructor (props) {

		super(props);

		this.state = {
			docked: true
		};

		this.scrollHandler = (pos) => {

			this.setState({ docked: !pos.y });
		};
	}

	componentDidMount () {

		addScrollListener(this.scrollHandler);

		this.scrollHandler(getScrollPos());
	}

	componentWillUnmount () {

		removeScrollListener(this.scrollHandler);
	}

	render () {

		const { navigation: { childPages }, ...restProps } = this.props,
			{ docked } = this.state;

		return (
			<Header
				classes={ docked ? 'is-docked' : 'is-scrolled' }
				navigation={ childPages.reduce(getMainNavPages, []) }
				{ ...restProps }
			/>
		);
	}
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

function mapStateToProps (state) {

	const { navActive } = state;

	return {
		navActive
	};
}

function mapDispatchToProps (dispatch) {

	return {
		toggleNavHandler: (value) => {
			return dispatch(toggleNav(value));
		}
	};
}

HeaderContainer.defaultProps = {};

HeaderContainer.propTypes = {
	navigation: React.PropTypes.object.isRequired
};

export default StoreRegister(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer), {
	navActive: navActiveReducer
});