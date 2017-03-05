import React from 'react'; // eslint-disable-line no-unused-vars
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import SocialLink from 'components/Links/SocialLink';
import GridCol from 'components/GridCol';
import GridRow from 'components/GridRow';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

function Footer (props) {

	const { aria, bemClass, caption, className, copyright, heading, preCaption, socialLinks } = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<footer
			className={ className }
			{ ...ariaAttrs }
		>
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
						<div className={ bemClass.element('actions') }>
							<p className={ bemClass.element('caption') }>
								<span className={ bemClass.element('caption-pre') }>{preCaption}</span>
								<span className={ bemClass.element('caption-main') }>{ caption }</span>
							</p>
							<nav className={ bemClass.element('social-nav') }>{
								socialLinks.map(getSocialLinks(bemClass.element('social-nav-link')))
							}
							</nav>
						</div>
					</GridCol>
					<GridCol count={ 12 }>
						<p className={ bemClass.element('copyright') }>{ copyright }</p>
					</GridCol>
				</GridRow>
			</div>
		</footer>
	);
}

function getSocialLinks (classes) {

	return (props) => {

		const { meta: { id }, title, url, ...restProps } = props;  // eslint-disable-line react/prop-types

		return (
			<SocialLink
				classes={ classes }
				key={ id }
				modifiers={ title.toLowerCase() }
				title={ title }
				to={ url }
				{ ...restProps }
			/>
		);
	};
}


Footer.defaultProps = {
	className: 'c-footer'
};

Footer.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	caption: React.PropTypes.string.isRequired,
	className: React.PropTypes.string.isRequired,
	copyright: React.PropTypes.string.isRequired,
	heading: React.PropTypes.string.isRequired,
	preCaption: React.PropTypes.string.isRequired,
	socialLinks: React.PropTypes.arrayOf(React.PropTypes.shape({
		label: React.PropTypes.string.isRequired,
		title: React.PropTypes.string.isRequired,
		url: React.PropTypes.string.isRequired,
		type: React.PropTypes.string
	}))
};

export default BemClasses(Footer);