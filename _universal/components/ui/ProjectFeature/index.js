import React from 'react';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import GridCol from 'components/lib/GridCol';
import GridRow from 'components/lib/GridRow';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

// TODO: Implement loading CSS.
function ProjectFeature (props) {

	const { aria, bemClass, className, title } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<article className={ className }>
			<GridRow align={ GridRow.ALIGN_STRETCH }>
				<GridCol
					breakpoints={ [{
						breakpoint: 'medium',
						count: 8
					}] }
					count={ 12 }
				>
					<div className={ bemClass.element('images') }>
						<p>Images</p>
					</div>
				</GridCol>
				<GridCol
					breakpoints={ [{
						breakpoint: 'medium',
						count: 4
					}] }
					count={ 12 }
				>
					<div className={ bemClass.element('detail') }>
						<p>{ title }</p>
					</div>
				</GridCol>
			</GridRow>
		</article>
	);
}

ProjectFeature.defaultProps = {
	className: 'c-project-feature'
};

ProjectFeature.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	title: React.PropTypes.string.isRequired
};

export default BemClasses(ProjectFeature);