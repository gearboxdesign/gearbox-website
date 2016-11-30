import React from 'react'; // eslint-disable-line no-unused-vars
import HeaderContainer from 'containers/HeaderContainer';
import FooterContainer from 'containers/FooterContainer';

function Default (props) {

	const { children, navigation } = props;

	return (
		<div>
			<HeaderContainer navigation={ navigation } />
			{ children }
			<FooterContainer navigation={ navigation } />
		</div>
	);
}

Default.defaultProps = {};

Default.propTypes = {
	children: React.PropTypes.any,
	navigation: React.PropTypes.array.isRequired
};

export default Default;