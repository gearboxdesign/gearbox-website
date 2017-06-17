import React from 'react';
import ImageContainer from 'containers/ImageContainer';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function ProjectSlidePoster (props) {

	const { aria, bemClass, caption, className, image, title } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<div className={ className }
			{ ...ariaAttrs }
		>
			<ImageContainer
				classes={ bemClass.element('image') }
				options={ {
					defaultImage: {},
					smallImage: {
						width: 960,
						height: 840,
						fit: 'pad',
						sizes: '100vw',
						widths: [320, 480, 640, 800, 960] // eslint-disable-line no-magic-numbers
					},
					mediumImage: {
						width: 960,
						height: 864,
						fit: 'pad',
						media: '(min-width: 800px)',
						sizes: '75vw',
						widths: [640, 800, 960] // eslint-disable-line no-magic-numbers
					}
				} }
				{ ...image }
			/>
			<div className={ bemClass.element('label') }>
				<h2 className={ bemClass.element('title') }>
					<span className={ bemClass.element('title-item') }>{ title }</span>
				</h2>
				<p className={ bemClass.element('caption') }>
					<span className={ bemClass.element('caption-item') }>{ caption }</span>
				</p>
			</div>
		</div>
	);
}

ProjectSlidePoster.defaultProps = {
	className: 'c-project-slide-poster'
};

ProjectSlidePoster.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	caption: React.PropTypes.string.isRequired,
	image: propTypes.image.isRequired,
	title: React.PropTypes.string.isRequired
};

export default BemClasses(ProjectSlidePoster);