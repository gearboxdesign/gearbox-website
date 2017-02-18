import React from 'react'; // eslint-disable-line no-unused-vars
import { trim } from 'lodash';
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

	const { animationEnabled, routeReady } = state;

	return {
		animationEnabled,
		routeReady
	};
}

function Base (props) {

	const { animationEnabled, children, className, footerProps, headerProps, routeReady } = props,
		animationEnabledClass = animationEnabled ? 'animation-is-enabled' : '',
		loadingClass = !routeReady ? 'is-loading' : '';

	return (
		<div className={ trim(`${ className } ${ animationEnabledClass } ${ loadingClass }`) }>
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
	animationEnabled: React.PropTypes.bool.isRequired,
	children: React.PropTypes.node,
	className: React.PropTypes.string.isRequired,
	footerProps: React.PropTypes.shape({

	}).isRequired,
	headerProps: React.PropTypes.shape({
		navigation: React.PropTypes.object.isRequired
	}).isRequired,
	routeReady: React.PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(BemClasses(Base));