import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';
import Editorial from 'components/Editorial';
import GridCol from 'components/GridCol';
import GridRow from 'components/GridRow';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Skills (props) {

	const { bemClass, className, description, heading, skillsList } = props;

	return (
		<div className={ className }>
			<GridRow>
				<GridCol
					breakpoints={ [{
						breakpoint: 'medium',
						count: 6
					}] }
					count={ 12 }
				>
					<div className={ bemClass.element('content') }>
						<h2 className={ bemClass.element('heading') }>
							<span className={ bemClass.element('heading-inner') }>{ heading }</span>
						</h2>
						<Editorial
							classes={ bemClass.element('description') }
							content={ description }
						/>
						<ul className={ bemClass.element('list') }>
							{ skillsList.map(getSkillsListItem(bemClass.element('list-item'))) }
						</ul>
					</div>
				</GridCol>
				<GridCol
					breakpoints={ [{
						breakpoint: 'medium',
						count: 6
					}] }
					count={ 12 }
				>
					<div className={ bemClass.element('graphics') }>
						<p>Graphics</p>
					</div>
				</GridCol>
			</GridRow>
		</div>
	);
}

function getSkillsListItem (className) {

	return (item, i) => {

		return (
			<li
				className={ className }
				key={ i }
			>
				{ item }
			</li>
		);
	};
}

Skills.defaultProps = {
	className: 'c-skills'
};

Skills.propTypes = {
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
	heading: React.PropTypes.string.isRequired,
	skillsList: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired
};

export default BemClasses(Skills);