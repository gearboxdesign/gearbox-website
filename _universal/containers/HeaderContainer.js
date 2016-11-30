import React from 'react'; // eslint-disable-line no-unused-vars
import Header from 'components/Header';

class HeaderContainer extends React.Component {

	constructor (props) {

		super(props);

		this.state = {};
	}

	render () {

		const { navigation, ...restProps } = this.props;

		return (
			<Header navigation={ navigation.reduce(this.getMainNavPages.bind(this), []) }
				{ ...restProps }
			/>
		);
	}

	getMainNavPages (pages, page) {

		const { childPages, includeInMainNavigation } = page;

		if (includeInMainNavigation) {

			return pages.concat(Object.assign({}, page, {
				childPages: childPages && childPages.reduce(this.getMainNavPages.bind(this), [])
			}));
		}

		return pages;
	}
}

HeaderContainer.defaultProps = {};

HeaderContainer.propTypes = {
	navigation: React.PropTypes.array.isRequired
};

export default HeaderContainer;