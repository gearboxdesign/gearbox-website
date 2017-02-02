import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';
import ActionLink from 'components/Links/ActionLink';
import Heading from 'components/Heading';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function FeaturedLinks (props) {

	const { bemClass, caption, className, heading, link: { label, url } } = props;

	return (
		<div className={ className }>
			<Heading
				classes={ bemClass.element('heading') }
				level={ 2 }
			>
				{ heading }
			</Heading>
			<p className={ bemClass.element('caption') }>{ caption }</p>
			<ActionLink
				label={ label }
				modifiers={ ['button', 'button-invert'] }
				to={ url }
			/>
		</div>
	);
}

FeaturedLinks.defaultProps = {
	className: 'c-featured-link'
};

FeaturedLinks.propTypes = {
	bemClass: propTypes.bemClass.isRequired,
	caption: React.PropTypes.string.isRequired,
	className: React.PropTypes.string.isRequired,
	heading: React.PropTypes.string.isRequired,
	link: propTypes.link.isRequired
};

export default BemClasses(FeaturedLinks);