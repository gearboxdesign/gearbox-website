import React from 'react';
import bem from 'modules/bem';
import propTypes from 'components/lib/propTypes';
import Badge from 'components/ui/Badges/Badge';
import BemClasses from 'components/hoc/BemClasses';
import Animate from 'components/lib/Animate';

function TwitterBadge (props) {

	const { bemClass, className, index } = props;

	console.log(index);

	return (
		<div className={ className }>
			<Animate
				index={ index }
				type={ Animate.SCALE }
			>
				<p
					className={ bem(bemClass.element('icon')).modifiers('twitter') }
					role="presentation"
				>
					Twitter
				</p>
			</Animate>
		</div>
	);
}

TwitterBadge.defaultProps = {
	className: 'c-badge'
};

TwitterBadge.propTypes = {
	bemClass: propTypes.bemClass,
	className: React.PropTypes.string.isRequired,
	index: React.PropTypes.number.isRequired
};

export default Badge(BemClasses(TwitterBadge));