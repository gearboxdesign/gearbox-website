import React from 'react'; // eslint-disable-line no-unused-vars
import getScript from 'utils/getScript';

export default function Head (props) {

	const {
		author,
		browserHints,
		canonical,
		description,
		openGraph,
		scripts,
		stylesheets,
		title
	} = props;

	return (
		<head>

			<meta charSet="utf-8" />

			<title>{ title }</title>

			{/* OpenGraph Tags */}
			<meta content={ openGraph.title }
				property="og:title"
			/>
			<meta content={ openGraph.type }
				property="og:type"
			/>
			<meta content={ openGraph.url }
				property="og:url"
			/>
			<meta content={ openGraph.siteName }
				property="og:site_name"
			/>
			<meta content={ openGraph.description }
				property="og:description"
			/>

			{/* Content Metadata */}
			<meta content={ author }
				name="author"
			/>
			<meta content={ description }
				name="description"
			/>

			<meta content="width=device-width, initial-scale=1, minimal-ui"
				name="viewport"
			/>

			{/* Links */}
			<link href={ canonical }
				rel="canonical"
			/>

			<link href="/favicon.ico"
				rel="shortcut icon"
				type="image/icon"
			/>

			{/* Browser Hints */}
			{ browserHints.map(getLink) }

			{/* Stylesheets */}
			{ stylesheets.map(getStylesheet) }

			{/* Scripts */}
			{ scripts.map(getScript) }

		</head>
	);
}

Head.defaultProps = {
	browserHints: [],
	openGraph: [],
	scripts: [],
	stylesheets: [],
	title: 'Untitled'
};

Head.propTypes = {
	author: React.PropTypes.string.isRequired,
	browserHints: React.PropTypes.arrayOf(React.PropTypes.shape({
		as: React.PropTypes.string,
		crossorigin: React.PropTypes.bool,
		href: React.PropTypes.string.isRequired,
		rel: React.PropTypes.string.isRequired,
		type: React.PropTypes.string
	})),
	canonical: React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
	openGraph: React.PropTypes.arrayOf(React.PropTypes.object),
	scripts: React.PropTypes.arrayOf(React.PropTypes.shape({
		src: React.PropTypes.string,
		body: React.PropTypes.string
	})),
	stylesheets: React.PropTypes.arrayOf(React.PropTypes.shape({
		href: React.PropTypes.string.isRequired,
		media: React.PropTypes.string.isRequired
	})),
	title: React.PropTypes.string.isRequired
};

function getStylesheet (props, i) {

	return getLink(Object.assign({
		rel: 'stylesheet'
	}, props), i);
}

function getLink (props, i) {

	return (
		<link key={ i }
			{...props } 
		/>
	);
}