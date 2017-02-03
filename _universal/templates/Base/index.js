import React from 'react'; // eslint-disable-line no-unused-vars
import HeaderContainer from 'containers/HeaderContainer';
import Footer from 'components/Footer';
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

function Base (props) {

	const { children, className, footerProps, headerProps, routeReady } = props;

	return (
		<div className={ routeReady ? className : `${ className } is-loading` }>
			<HeaderContainer { ...headerProps } />
			{ children }
			<Footer { ...footerProps } />
		</div>
	);
}

Base.defaultProps = {
	className: 't-base'
};

Base.propTypes = {
	children: React.PropTypes.any,
	className: React.PropTypes.string.isRequired,
	footerProps: React.PropTypes.shape({

	}).isRequired,
	headerProps: React.PropTypes.shape({
		navigation: React.PropTypes.object.isRequired
	}).isRequired,
	routeReady: React.PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(BemClasses(Base));