import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';
import { addScrollListener, removeScrollListener } from 'modules/scrollTracker';

if (process.env.CLIENT) {
	require('./styles.scss');
}

class Logo extends React.Component {

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

		const { bemClass, className } = this.props,
			{ rotation } = this.state;

		return (
			<p className={ className }>
				<span className={ bemClass.element('back') } 
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
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired
};

export default BemClasses(Logo);