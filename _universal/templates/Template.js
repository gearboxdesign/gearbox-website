import React from 'react';
import { loadRoute, setDocumentData } from 'actions/actionCreators';

export default function (Component) {

	class Template extends React.PureComponent {

		componentWillMount () {

			const { title, openGraph, pageMeta } = this.props,
				{ store } = this.context;

			if (process.env.CLIENT) {

				store.dispatch(setDocumentData({
					title,
					openGraph,
					pageMeta
				}));
			}
		}

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

	Template.propTypes = {
		openGraph: React.PropTypes.object,
		pageMeta: React.PropTypes.object,
		title: React.PropTypes.string.isRequired
	};

	Template.contextTypes = {
		store: React.PropTypes.object
	};

	const componentName = Component.displayName ||
		Component.name ||
		'Component';

	Template.displayName = `template(${ componentName })`;

	Template.wrappedComponent = Component;

	return Template;
}