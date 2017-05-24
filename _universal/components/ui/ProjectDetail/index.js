import React from 'react';
import { get } from 'lodash';
import { LOADING_CLASS } from 'constants/cssClasses';
import combineClasses from 'modules/combineClasses';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import Animate from 'components/lib/Animate';
import propTypes from 'components/lib/propTypes';
import ErrorComponent from 'components/ui/Error';
import ProjectFeature from 'components/ui/ProjectFeature';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

// TODO: Implement loading CSS.
function ProjectDetail (props) {

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
				data && getFeatures(bemClass)(get(data, 'features'))
			}
		</div>
	);
}

function getFeatures (bemClass) {

	return (features) => {

		return (
			<div className={ bemClass.element('features') }>
				{ features && features.map(getFeature) }
			</div>
		);
	};
}

function getFeature (featureProps, i) {

	const { meta: { id } } = featureProps;

	return (
		<Animate
			index={ i }
			key={ id }
			type={ Animate.SLIDE_DOWN }
		>
			<ProjectFeature
				{ ...featureProps }
			/>
		</Animate>
	);
}

ProjectDetail.defaultProps = {
	className: 'c-project-detail'
};

ProjectDetail.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	project: propTypes.asyncState
};

export default BemClasses(ProjectDetail);