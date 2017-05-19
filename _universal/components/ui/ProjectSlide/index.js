import React from 'react';
import { get } from 'lodash';
import { LOADING_CLASS } from 'constants/cssClasses';
import combineClasses from 'modules/combineClasses';
import ImageContainer from 'containers/ImageContainer';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import ErrorComponent from 'components/ui/Error';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

// TODO: Implement loading CSS.
function ProjectSlide (props) {

	const { aria, bemClass, className, project } = props,
		ariaAttrs = getAriaAttrs(aria),
		loading = get(project, 'loading'),
		data = get(project, 'data'),
		errors = get(project, 'errors');

	return (
		<div
			className={ combineClasses(className, loading && LOADING_CLASS).join(' ') }
			{ ...ariaAttrs }
		>
			{ errors ?
				<ErrorComponent errors={ errors } /> :
				data && getPoster(bemClass, data)
			}
		</div>
	);
}

function getPoster (bemClass, projectProps) {

	const { caption, image, title } = projectProps;

	return (
		<div className={ bemClass.element('poster') }>
			<ImageContainer
				classes={ bemClass.element('image') }
				options={ {
					defaultImage: {},
					smallImage: {
						width: 960,
						height: 840,
						fit: 'pad',
						sizes: '100vw',
						widths: [320, 480, 640, 800, 960]
					},
					mediumImage: {
						width: 960,
						height: 864,
						fit: 'pad',
						media: '(min-width: 800px)',
						sizes: '75vw',
						widths: [640, 800, 960]
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

ProjectSlide.defaultProps = {
	className: 'c-project-slide'
};

ProjectSlide.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	project: propTypes.asyncState
};

export default BemClasses(ProjectSlide);