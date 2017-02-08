import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';

class Image extends React.Component {

	getImage (image) {

		const { alt, className } = this.props,
			{ sizes, srcSet, url } = image,
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

	getImageSource (props) {

		const { url, ...restProps } = props; // eslint-disable-line no-unused-vars

		if (props.srcSet) {

			return (
				<source
					{ ...restProps }
				/>
			);
		}

		return null;
	}

	render () {

		const { defaultImage, smallImage, mediumImage, largeImage } = this.props,
			usePicture = smallImage || mediumImage || largeImage;

		const image = this.getImage(defaultImage);

		if (usePicture) {

			const sources = [
				largeImage,
				mediumImage,
				smallImage
			];

			return (
				<picture>
					{ sources.map(this.getImageSource) }
					{ image }
				</picture>
			);
		}

		return image;
	}
}

Image.defaultProps = {
	alt: '',
	className: 'c-img'
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