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

function PageHeader (props) {

	const { bemClass, className, description, heading } = props;

	return (
		<div className={ className }>
			<GridRow>
				<GridCol count={ 12 }>
					<h1 className={ bemClass.element('heading') }>
						<span className={ bemClass.element('heading-inner') }>{ heading }</span>
					</h1>
					<Editorial
						classes={ bemClass.element('description') }
						content={ description }
					/>
				</GridCol>
			</GridRow>
		</div>
	);
}

PageHeader.defaultProps = {
	className: 'c-page-header'
};

PageHeader.propTypes = {
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
	heading: React.PropTypes.string.isRequired
};

export default BemClasses(PageHeader);