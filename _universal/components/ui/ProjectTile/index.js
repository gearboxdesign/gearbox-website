import React from 'react'; // eslint-disable-line no-unused-vars
import { get } from 'lodash';
import { Link } from 'react-router';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import ErrorComponent from 'components/ui/Error';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function ProjectTile (props) {

	const { aria, bemClass, className, project, setCurrentProjectHandler } = props,
		ariaAttrs = getAriaAttrs(aria),
		data = get(project, 'data'),
		errors = get(project, 'errors');

	return (
		<div
			className={ className }
			{ ...ariaAttrs }
		>
			{ errors ?
				<ErrorComponent errors={ errors } /> :
				getContent(data)
			}
		</div>
	);
}

function getContent (data = {}) {

	const { slug } = data;

	// TODO: Resolve location from controlled source.
	return (
		<p>{ slug }</p>
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