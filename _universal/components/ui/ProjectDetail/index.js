import React from 'react';
import { get, kebabCase } from 'lodash';
import { ANIMATION_ENABLED_CLASS, LOADING_CLASS } from 'constants/cssClasses';
import combineClasses from 'modules/combineClasses';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import ContentIndex from 'components/lib/ContentIndex';
import ContentIndexControlsContainer from 'containers/ContentIndexControlsContainer';
import ErrorComponent from 'components/ui/Error';
import ProjectFeature from 'components/ui/ProjectFeature';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

// NOTE: Used as a workaround to enable animations only after the first project change.
let animationEnabled = false;

// TODO: Implement loading CSS.
class ProjectDetail extends React.PureComponent {

	componentWillReceiveProps (nextProps) {

		if (process.env.CLIENT) {

			const idPath = 'project.data.meta.id',
				currentProjectId = get(this.props, idPath),
				nextProjectId = get(nextProps, idPath);

			animationEnabled = animationEnabled || currentProjectId !== nextProjectId;
		}
	}

	render () {

		const { aria,
			className,
			index,
			project
		} = this.props,
			ariaAttrs = getAriaAttrs(aria),
			loading = get(project, 'loading'),
			data = get(project, 'data'),
			errors = get(project, 'errors'),
			features = get(data, 'features');

		return (
			<div
				className={ combineClasses(
					className,
					animationEnabled && ANIMATION_ENABLED_CLASS,
					loading && LOADING_CLASS).join(' ') }
				{ ...ariaAttrs }
			>
				{ errors ?
					<ErrorComponent errors={ errors } /> :
					features && (
						<ContentIndex
							controls={ ContentIndexControlsContainer }
							id="project-features"
							viewportOffsetBottom={ 120 }
							viewportOffsetTop={ 120 }
						>
							{ features.map(getFeatureItem(index)) }
						</ContentIndex>
					)
				}
			</div>
		);
	}
}

function getFeatureItem (startIndex) {

	return (featureProps, i) => {

		const { meta: { id }, title } = featureProps;

		return (
			<ProjectFeature
				id={ kebabCase(title) }
				index={ startIndex + i }
				key={ id }
				{ ...featureProps }
			/>
		);
	};
}

ProjectDetail.defaultProps = {
	className: 'c-project-detail'
};

ProjectDetail.propTypes = {
	aria: propTypes.aria,
	className: React.PropTypes.string.isRequired,
	index: React.PropTypes.number.isRequired,
	project: propTypes.asyncState
};

export default BemClasses(ProjectDetail);
