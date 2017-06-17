import React from 'react';
import { isPlainObject } from 'lodash';
import BemClasses from 'components/hoc/BemClasses';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Image (props) {

	const { alt, className, defaultImage, smallImage, mediumImage, largeImage } = props,
		usePicture = smallImage || mediumImage || largeImage,
		image = getImage(defaultImage, alt, className);

	if (usePicture) {

		const sources = [
			largeImage,
			mediumImage,
			smallImage
		].filter(isPlainObject);

		return (
			<picture>
				{ sources.map(getImageSource) }
				{ image }
			</picture>
		);
	}

	return image;
}

function getImage (image, alt, className) {

	const { sizes, srcSet, url } = image,
		restProps = {};

	if (sizes && srcSet) {
		restProps.sizes = sizes;
		restProps.srcSet = srcSet;
	}

	return (
		<img
			alt={ alt }
			className={ className }
			src={ url }
			{ ...restProps }
		/>
	);
}

function getImageSource (srcProps, i) {

	const { url, ...restProps } = srcProps; // eslint-disable-line no-unused-vars

	if (srcProps.srcSet) {

		return (
			<source
				key={ i }
				{ ...restProps }
			/>
		);
	}

	return null;
}

Image.defaultProps = {
	alt: '',
	className: 'c-image'
};

const imageShape = React.PropTypes.shape({
	url: React.PropTypes.string.isRequired,
	media: React.PropTypes.string,
	sizes: React.PropTypes.string,
	srcSet: React.PropTypes.string
});

Image.propTypes = {
	alt: React.PropTypes.string.isRequired,
	className: React.PropTypes.string.isRequired,
	defaultImage: imageShape.isRequired,
	largeImage: imageShape,
	mediumImage: imageShape,
	smallImage: imageShape
};

export default BemClasses(Image);