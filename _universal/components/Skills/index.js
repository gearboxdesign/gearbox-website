import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import propTypes from 'components/lib/propTypes';
import Editorial from 'components/Editorial';
import GridCol from 'components/GridCol';
import GridRow from 'components/GridRow';
import Heading from 'components/Heading';
import ImageContainer from 'containers/ImageContainer';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Skills (props) {

	const { bemClass, className, description, heading, skillsIcons, skillsList } = props;

	return (
		<div className={ className }>
			<GridRow align={ GridRow.ALIGN_STRETCH }>
				<GridCol
					breakpoints={ [{
						breakpoint: 'medium',
						count: 6
					}] }
					count={ 12 }
				>
					<div className={ bemClass.element('content') }>
						<Heading
							classes={ bemClass.element('heading') }
							level={ 2 }
						>
							{ heading }
						</Heading>
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
					<div className={ bemClass.element('icons') }>
						{ skillsIcons.map(getSkillsIconItem(bemClass.element('icons-item'))) }
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

function getSkillsIconItem (className) {

	return (iconProps, i) => {

		return (
			<ImageContainer
				classes={ className }
				key={ i }
				{ ...iconProps }
			/>
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
	skillsIcons: React.PropTypes.arrayOf(React.PropTypes.object.isRequired).isRequired,
	skillsList: React.PropTypes.arrayOf(React.PropTypes.string.isRequired).isRequired
};

export default BemClasses(Skills);