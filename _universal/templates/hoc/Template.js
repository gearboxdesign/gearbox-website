import React from 'react';
import { get, isFunction } from 'lodash';

export default function (Component) {

	class Template extends React.Component {

		componentDidMount () {

			const { title, openGraph, pageMeta } = this.props;

			document.title = `Gearbox Design | ${ title }`;
			document.querySelectorAll('meta[property*="og"]').forEach(setOpenGraphData(openGraph,
				document.location.href,
				(key, value) => {
					return (key === 'image' && get(value, 'url')) || value;
				}));
			document.querySelectorAll('meta[name]').forEach(setPageMetaData(pageMeta));
		}

		render () {

			return (
				<Component { ...this.props } />
			);
		}
	}

	Template.propTypes = {
		openGraph: React.PropTypes.object.isRequired,
		pageMeta: React.PropTypes.object.isRequired,
		title: React.PropTypes.string.isRequired
	};

	const componentName = Component.displayName ||
		Component.name ||
		'Component';

	Template.displayName = `template(${ componentName })`;

	return Template;
}

function setOpenGraphData (data, url, valueTransform) {

	return (node) => {

		const match = /^og:(\w+)$/gi.exec(node.getAttribute('property')),
			key = Array.isArray(match) && match[1],
			value = isFunction(valueTransform) ? valueTransform(key, data[key]) : data[key];

		if (key === 'url') {
			node.setAttribute('content', url);
		}
		else if (value) {
			node.setAttribute('content', value);
		}
	};
}

function setPageMetaData (data) {

	return (node) => {

		const key = node.getAttribute('name'),
			value = data[key];

		if (value) {
			node.setAttribute('content', value);
		}
	};
}