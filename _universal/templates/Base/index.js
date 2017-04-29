import React from 'react'; // eslint-disable-line no-unused-vars
import combineClasses from 'modules/combineClasses';
import HeaderContainer from 'containers/HeaderContainer';
import Footer from 'components/ui/Footer';
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

class Base extends React.PureComponent {

	getChildContext () {

		const { lang } = this.props;

		return {
			lang
		};
	}

	render () {

		const { animationEnabled, children, className, footerProps, headerProps, routeReady } = this.props,
			animationEnabledClass = animationEnabled ? 'animation-is-enabled' : '',
			loadingClass = !routeReady ? 'is-loading' : '';

		return (
			<div className={ combineClasses(className, animationEnabledClass, loadingClass).join(' ') }>
				<HeaderContainer { ...headerProps } />
				{ children }
				<Footer { ...footerProps } />
			</div>
		);
	}
}

Base.defaultProps = {
	className: 't-base'
};

Base.propTypes = {
	animationEnabled: React.PropTypes.bool.isRequired,
	children: React.PropTypes.node,
	className: React.PropTypes.string.isRequired,
	footerProps: React.PropTypes.shape({}).isRequired,
	headerProps: React.PropTypes.shape({
		navigation: React.PropTypes.object.isRequired
	}).isRequired,
	lang: React.PropTypes.string,
	routeReady: React.PropTypes.bool.isRequired
};

Base.childContextTypes = {
	lang: React.PropTypes.string
};

export default connect(mapStateToProps)(BemClasses(Base));