import React from 'react'; // eslint-disable-line no-unused-vars
import HeaderContainer from 'containers/HeaderContainer';
import FooterContainer from 'containers/FooterContainer';
import BemClasses from 'components/hoc/BemClasses';
import { connect } from 'react-redux';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function mapStateToProps (state) {

	const { routeReady } = state;

	return {
		routeReady
	};
}

function Default (props) {

	const { children, className, navigation, routeReady } = props;

	return (
		<div className={ routeReady ? className : `${ className } is-loading` }>
			<HeaderContainer navigation={ navigation } />
			{ children }
			<FooterContainer navigation={ navigation } />
		</div>
	);
}

Default.defaultProps = {
	className: 't-default'
};

Default.propTypes = {
	children: React.PropTypes.any,
	className: React.PropTypes.string.isRequired,
	navigation: React.PropTypes.array.isRequired,
	routeReady: React.PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(BemClasses(Default));