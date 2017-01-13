import React from 'react'; // eslint-disable-line no-unused-vars
import propTypes from 'components/lib/propTypes';
import BemClasses from 'components/hoc/BemClasses';
import GridCol from 'components/GridCol';
import GridRow from 'components/GridRow';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Footer (props) {

	const { bemClass, caption, className, copyright, heading, socialButtons } = props;

	return (
		<footer className={ className }>
			<div className={ bemClass.element('inner') }>
				<GridRow align={ GridRow.ALIGN_BOTTOM }>
					<GridCol
						breakpoints={ [{
							breakpoint: 'small',
							count: 6
						}] }
						count={ 12 }
					>
						<h2 className={ bemClass.element('heading') }>{ heading }</h2>
					</GridCol>
					<GridCol
						breakpoints={ [{
							breakpoint: 'small',
							count: 6
						}] }
						count={ 12 }
					>
						<p className={ bemClass.element('caption') }>{ caption }</p>
					</GridCol>
					<GridCol count={ 12 }>
						<p className={ bemClass.element('copyright') }>{ copyright }</p>
					</GridCol>
				</GridRow>
			</div>
		</footer>
	);
}

Footer.defaultProps = {
	className: 'c-footer'
};

Footer.propTypes = {
	bemClass: propTypes.bemClass.isRequired,
	caption: React.PropTypes.string.isRequired,
	className: React.PropTypes.string.isRequired,
	copyright: React.PropTypes.string.isRequired,
	heading: React.PropTypes.string.isRequired,
	socialButtons: React.PropTypes.arrayOf(React.PropTypes.shape({
		description: React.PropTypes.string.isRequired,
		title: React.PropTypes.string.isRequired,
		type: React.PropTypes.string.isRequired
	}))
};

export default BemClasses(Footer);