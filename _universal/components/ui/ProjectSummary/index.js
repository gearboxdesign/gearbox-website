import React from 'react';
import { get } from 'lodash';
import { LOADING_CLASS } from 'constants/cssClasses';
import combineClasses from 'modules/combineClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import BemClasses from 'components/hoc/BemClasses';
import ErrorComponent from 'components/ui/Error';
import ProjectSummaryContent from 'components/ui/ProjectSummaryContent';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function ProjectSummary (props) {

	const { aria, className, project } = props,
		ariaAttrs = getAriaAttrs(aria),
		loading = get(project, 'loading'),
		data = get(project, 'data'),
		error = get(project, 'error');

	return (
		<div
			className={ combineClasses(className, loading && LOADING_CLASS).join(' ') }
			{ ...ariaAttrs }
		>
			{ error ?
				<ErrorComponent error={ error } /> :
				data && <ProjectSummaryContent { ...data } />
			}
		</div>
	);
}

ProjectSummary.defaultProps = {
	className: 'c-project-summary'
};

ProjectSummary.propTypes = {
	aria: propTypes.aria,
	className: React.PropTypes.string.isRequired,
	project: propTypes.asyncState
};

export default BemClasses(ProjectSummary);