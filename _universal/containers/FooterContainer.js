import React from 'react'; // eslint-disable-line no-unused-vars
import Footer from 'components/Footer';

class FooterContainer extends React.Component {

	constructor (props) {

		super(props);

		this.state = {};
	}

	render () {

		const { navigation, ...restProps } = this.props;

		return (
			<Footer
				navigation={ navigation.reduce(getFooterNavPages, []) }
				{ ...restProps }
			/>
		);
	}
}

function getFooterNavPages (pages, page) {

	const { childPages, includeInFooterNavigation } = page;

	if (includeInFooterNavigation) {

		return pages.concat(Object.assign({}, page, {
			childPages: childPages && childPages.reduce(getFooterNavPages, [])
		}));
	}

	return pages;
}

FooterContainer.defaultProps = {};

FooterContainer.propTypes = {
	navigation: React.PropTypes.array.isRequired
};

export default FooterContainer;