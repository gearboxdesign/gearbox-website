import React from 'react';
import Badge from 'components/ui/Badges/Badge';
import BemClasses from 'components/hoc/BemClasses';
import Animate from 'components/lib/Animate';

function TwitterBadge (props) {

	const { className, index } = props;

	return (
		<div className={ className }>
			<Animate
				index={ index + 1 }
				type={ Animate.SCALE }
			>
				<img
					alt=""
					src=""
				/>
			</Animate>
		</div>
	);
}

TwitterBadge.defaultProps = {
	className: 'c-badge'
};

TwitterBadge.propTypes = {
	className: React.PropTypes.string.isRequired,
	index: React.PropTypes.number.isRequired
};

export default Badge(BemClasses(TwitterBadge, {
	modifiers: 'twitter'
}));