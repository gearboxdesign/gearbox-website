import React from 'react';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import BemClasses from 'components/hoc/BemClasses';
import Editorial from 'components/ui/Editorial';
import Heading from 'components/ui/Heading';
import Tag from 'components/ui/Tag';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function ProjectSummaryContent (props) {

	const { aria, bemClass, className, description, heading, tags, url } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<aside
			className={ className }
			{ ...ariaAttrs }
		>
			<Heading
				classes={ bemClass.element('heading') }
				level={ 2 }
				text={ heading }
			/>
			<Editorial
				classes={ bemClass.element('description') }
				content={ description }
			/>
			{ tags && (
				<div className={ bemClass.element('tag-list') }>{
					tags.map(getTag)
				}
				</div>
			) }
		</aside>
	);
}

function getTag (tag) {

	return (
		<Tag
			key={ tag }
			text={ tag }
		/>
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
	tags: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
	url: React.PropTypes.string
};

export default BemClasses(ProjectSummaryContent);