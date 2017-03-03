import React from 'react';
import { loadRoute } from 'actions/actionCreators';

export default function (Component) {

	class Template extends React.PureComponent {

		componentDidMount () {

			const { store } = this.context;

			if (process.env.CLIENT) {
				store.dispatch(loadRoute(true));
			}
		}

		render () {

			return (
				<Component { ...this.props } />
			);
		}
	}

	Template.defaultProps = {};

	Template.propTypes = {};

	Template.contextTypes = {
		store: React.PropTypes.object
	};

	const componentName = Component.displayName ||
		Component.name ||
		'Component';

	Template.displayName = `template(${ componentName })`;

	return Template;
}