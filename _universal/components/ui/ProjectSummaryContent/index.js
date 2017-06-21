import React from 'react';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import BemClasses from 'components/hoc/BemClasses';
import Editorial from 'components/ui/Editorial';
import Heading from 'components/ui/Heading';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function ProjectSummaryContent (props) {

	const { aria, bemClass, className, description, heading, tags } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<aside className={ className }>
			<Heading
				classes={ bemClass.element('heading') }
				level={ 2 }
				text={ heading }
			/>
			<Editorial
				classes={ bemClass.element('description') }
				content={ description }
			/>
		</aside>
	);
}

ProjectSummaryContent.defaultProps = {
	className: 'c-project-summary-content'
};

ProjectSummaryContent.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
	heading: React.PropTypes.string.isRequired,
	tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

export default BemClasses(ProjectSummaryContent);