import React from 'react'; // eslint-disable-line no-unused-vars
import { map as fMap, flow as fFlow, toPairs as fToPairs } from 'lodash/fp';
import getScript from 'lib/getScript';

export default function Head (props) {

	const {
		author,
		browserHints,
		canonical,
		description,
		iconPath,
		openGraph,
		scripts,
		stylesheets,
		title
	} = props;

	/* eslint-disable no-magic-numbers */
	return (
		<head>

			<meta charSet="utf-8" />

			<title>{ title }</title>

			{/* OpenGraph Tags */}
			{ getOpenGraphTags(openGraph) }

			{/* Content Metadata */}
			<meta
				content={ author }
				name="author"
			/>
			<meta
				content={ description }
				name="description"
			/>

			<meta
				content="width=device-width, initial-scale=1, minimal-ui"
				name="viewport"
			/>

			<meta
				content="#ffffff"
				name="msapplication-TileColor"
			/>

			<meta
				content={ `${ iconPath }ms-icon-144x144.png` }
				name="msapplication-TileImage"
			/>

			<meta
				content="#ffffff"
				name="theme-color"
			/>

			{/* Links */}
			<link
				href={ canonical }
				rel="canonical"
			/>

			<link
				href="/manifest.json"
				rel="manifest"
			/>

			{/* Icons */}
			{ getAppleIcons(iconPath)([57, 60, 72, 76, 114, 120, 144, 152, 180]) }
			{ getAndroidIcons(iconPath)([192]) }
			{ getFavicons(iconPath)([16, 32, 96]) }

			{/* Browser Hints */}
			{ browserHints.map(getLink) }

			{/* Stylesheets */}
			{ stylesheets.map(getStylesheet) }

			{/* Scripts */}
			{ scripts.map(getScript) }

		</head>
	);

	/* eslint-enable */
}

Head.defaultProps = {
	author: 'Matt Robinson',
	browserHints: [],
	description: 'Gearbox Design - The portfolio of Front End Develop Matthew James Robinson.',
	openGraph: {
		description: 'Gearbox Design - The portfolio of Front End Develop Matthew James Robinson.',
		title: 'Gearbox Design'
	},
	scripts: [],
	stylesheets: [],
	title: 'GearboxDesign'
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
	iconPath: React.PropTypes.string.isRequired,
	openGraph: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
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

function getAppleIcons (iconPath) {

	return fFlow(
		fMap((size) => {
			return {
				href: `${ iconPath }/apple-icon-${ size }x${ size }.png`,
				rel: 'apple-touch-icon',
				sizes: `${ size }x${ size }`
			};
		}),
		fMap(getLink)
	);
}

function getAndroidIcons (iconPath) {

	return fFlow(
		fMap((size) => {
			return {
				href: `${ iconPath }/android-icon-${ size }x${ size }.png`,
				rel: 'icon',
				type: 'image/png',
				sizes: `${ size }x${ size }`
			};
		}),
		fMap(getLink)
	);
}

function getFavicons (iconPath) {

	return fFlow(
		fMap((size) => {
			return {
				href: `${ iconPath }/favicon-${ size }x${ size }.png`,
				rel: 'icon',
				type: 'image/png',
				sizes: `${ size }x${ size }`
			};
		}),
		fMap(getLink)
	);
}

function getLink (props) {

	return <link { ...props } />;
}

const getOpenGraphTags = fFlow(fToPairs, fMap(([key, value]) => {

	return (
		<meta
			content={ value }
			property={ `og:${ key }` }
		/>
	);
}));

function getStylesheet (props) {

	return getLink(Object.assign({
		rel: 'stylesheet'
	}, props));
}