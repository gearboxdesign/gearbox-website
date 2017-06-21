import React from 'react';
import { loadRoute, setDocument } from 'actions/actionCreators';

export default function (Component) {

	class Template extends React.PureComponent {

		getChildContext () {

			const { routeData } = this.props;

			return {
				routeData
			};
		}

		componentWillMount () {

			const { title, openGraph, pageMeta } = this.props,
				{ store } = this.context;

			store.dispatch(setDocument({
				title,
				openGraph,
				pageMeta
			}));
		}

		componentDidMount () {

			const { store } = this.context;

			if (process.env.CLIENT) {
				store.dispatch(loadRoute(true));
			}
		}

		render () {

			const { router } = this.context;
			const { title, routeData, router: { location: { query: routeQuery } } } = this.props;

			console.log(title, routeData, routeQuery);

			return (
				<Component
					router={ router }
					{ ...this.props }
				/>
			);
		}
	}

	Template.defaultProps = {};

	Template.propTypes = {
		openGraph: React.PropTypes.object,
		pageMeta: React.PropTypes.object,
		routeData: React.PropTypes.object,
		router: React.PropTypes.object.isRequired,
		title: React.PropTypes.string.isRequired
	};

	Template.contextTypes = {
		store: React.PropTypes.object.isRequired,
		router: React.PropTypes.object.isRequired
	};

	Template.childContextTypes = {
		routeData: React.PropTypes.object
	};

	const componentName = Component.displayName ||
		Component.name ||
		'Component';

	Template.displayName = `template(${ componentName })`;

	Template.wrappedComponent = Component;

	return Template;
}