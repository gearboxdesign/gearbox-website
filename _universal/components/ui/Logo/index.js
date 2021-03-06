import React from 'react';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import { addScrollListener, removeScrollListener } from 'modules/scrollTracker';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

class Logo extends React.PureComponent {

	constructor (props) {

		super(props);

		this.state = {
			rotation: 0
		};

		this.scrollHandler = (pos) => {

			this.setState({
				rotation: pos.y
			});
		};
	}

	componentDidMount () {

		const { enableScroll } = this.props;

		if (enableScroll) {
			addScrollListener(this.scrollHandler);
		}
	}

	componentWillUnmount () {

		const { enableScroll } = this.props;

		if (enableScroll) {
			removeScrollListener(this.scrollHandler);
		}
	}

	render () {

		const { aria, bemClass, className } = this.props,
			ariaAttrs = getAriaAttrs(aria),
			{ rotation } = this.state;

		return (
			<div
				className={ className }
				{ ...ariaAttrs }
			>
				<span
					className={ bemClass.element('back') }
					style={ {
						transform: `translate(-50%, -50%) rotate(${ rotation }deg)`
					} }
				/>
				<span className={ bemClass.element('front') }>
					Gearbox Design
				</span>
			</div>
		);
	}
}

Logo.defaultProps = {
	className: 'c-logo',
	enableScroll: false
};

Logo.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	enableScroll: React.PropTypes.bool.isRequired
};

export default BemClasses(Logo);