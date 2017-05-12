import React from 'react';
import { get } from 'lodash';
import { LOADING_CLASS } from 'constants/cssClasses';
import BemClasses from 'components/hoc/BemClasses';
import combineClasses from 'modules/combineClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import ErrorComponent from 'components/ui/Error';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

// TODO: Implement loading CSS.
function ProjectTile (props) {

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
				data && getDetail(data)
			}
		</div>
	);
}

function getDetail (projectProps) {

	const { title } = projectProps;

	return (
		<p>{ title }</p>
	);
}

ProjectTile.defaultProps = {
	className: 'c-project-tile'
};

ProjectTile.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	project: propTypes.asyncState
};

export default BemClasses(ProjectTile);