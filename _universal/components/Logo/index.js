import React from 'react'; // eslint-disable-line no-unused-vars
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

		this.scrollListener = (pos) => {

			this.setState({
				rotation: pos.y
			});
		};
	}

	componentDidMount () {

		addScrollListener(this.scrollListener);
	}

	componentWillUnmount () {

		removeScrollListener(this.scrollListener);
	}

	render () {

		const { aria, bemClass, className } = this.props,
			ariaAttrs = getAriaAttrs(aria),
			{ rotation } = this.state;

		return (
			<p
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
			</p>
		);
	}
}

Logo.defaultProps = {
	className: 'c-logo'
};

Logo.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired
};

export default BemClasses(Logo);