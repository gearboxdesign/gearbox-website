import React from 'react';
import { get, merge, pick } from 'lodash';
import queryString from 'query-string';
import { BREAKPOINTS } from 'constants/mediaQueries';
import Image from 'components/ui/Image';

export default function ImageContainer (props) {

	const { defaultImage, smallImage, mediumImage, largeImage, options = {}, ...restProps } = props,
		updatedProps = Object.assign({
			defaultImage: getImage('DEFAULT', defaultImage, options.defaultImage),
			smallImage: getImage('SMALL', smallImage, options.smallImage),
			mediumImage: getImage('MEDIUM', mediumImage, options.mediumImage),
			largeImage: getImage('LARGE', largeImage, options.largeImage)
		}, restProps);

	return <Image { ...updatedProps } />;
}

function getImage (key, props, options) {

	if (props) {

		return {
			url: getImageUrl(props.url, options),
			sizes: get(options, 'sizes'),
			media: get(options, 'media') || BREAKPOINTS[key],
			srcSet: getImageSrcSet(props.url, options)
		};
	}

	return null;
}

function getImageUrl (src, options) {

	if (!src) {
		return '';
	}

	const query = queryString.stringify(pick(options, ['width', 'height', 'fit']));

	return src + (query ? '?'.concat(query) : '');
}

function getImageSrcSet (src, options) {

	if (!src) {
		return '';
	}

	const widths = get(options, 'widths') || [];

	return widths.map(getImageSrc(src, options)).join(',') ||
		getImageUrl(src, options);
}

function getImageSrc (src, options) {

	return (srcWidth) => {

		const width = get(options, 'width'),
			height = get(options, 'height'),
			query = {
				w: srcWidth // eslint-disable-line id-length
			};

		if (width && height) {
			query.h = Math.round(srcWidth * (height / width)); // eslint-disable-line id-length
		}

		return getImageUrl(src, merge({}, pick(options, 'fit'), query)).concat(' ', srcWidth, 'w');
	};
}

ImageContainer.defaultProps = {};

const imageShape = React.PropTypes.shape({
	url: React.PropTypes.string.isRequired,
	sizes: React.PropTypes.string,
	widths: React.PropTypes.array
});

ImageContainer.propTypes = {
	defaultImage: imageShape.isRequired,
	largeImage: imageShape,
	mediumImage: imageShape,
	options: React.PropTypes.object,
	smallImage: imageShape
};