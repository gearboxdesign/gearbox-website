import React from 'react';
import { ANIMATION_ENABLED_CLASS, LOADING_CLASS } from 'constants/cssClasses';
import combineClasses from 'modules/combineClasses';
import HeaderContainer from 'containers/HeaderContainer';
import ClientErrorContainer from 'containers/ClientErrorContainer';
import Footer from 'components/ui/Footer';
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

// NOTE: Used as a workaround to enable animations only after the initial render.
let animationEnabled = false;

class BaseTemplate extends React.PureComponent {

	getChildContext () {

		const { lang } = this.props;

		return {
			lang
		};
	}

	componentDidMount () {

		animationEnabled = true;
	}

	render () {

		const {
			children,
			className,
			footerProps,
			headerProps,
			routeReady
		} = this.props;

		return (
			<div
				className={ combineClasses(
					className,
					animationEnabled && ANIMATION_ENABLED_CLASS,
					!routeReady && LOADING_CLASS
				).join(' ') }
			>
				<HeaderContainer { ...headerProps } />
				<ClientErrorContainer />
				{ children }
				<Footer { ...footerProps } />
			</div>
		);
	}
}

BaseTemplate.defaultProps = {
	className: 't-base'
};

BaseTemplate.propTypes = {
	children: React.PropTypes.node,
	className: React.PropTypes.string.isRequired,
	footerProps: React.PropTypes.shape({}).isRequired,
	headerProps: React.PropTypes.shape({
		navigation: React.PropTypes.object.isRequired
	}).isRequired,
	lang: React.PropTypes.string,
	routeReady: React.PropTypes.bool.isRequired
};

BaseTemplate.childContextTypes = {
	lang: React.PropTypes.string
};

export default connect(mapStateToProps)(BemClasses(BaseTemplate));