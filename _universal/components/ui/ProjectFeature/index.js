import React from 'react';
import { kebabCase } from 'lodash';
import bem from 'modules/bem';
import BemClasses from 'components/hoc/BemClasses';
import getAriaAttrs from 'components/lib/getAriaAttrs';
import propTypes from 'components/lib/propTypes';
import Animate from 'components/lib/Animate';
import ImageContainer from 'containers/ImageContainer';
import Editorial from 'components/ui/Editorial';
import GridCol from 'components/lib/GridCol';
import GridRow from 'components/lib/GridRow';
import Quote from 'components/ui/Quote';

/* eslint-disable global-require */
if (process.env.CLIENT) {
	require('./styles.scss');
}

/* eslint-enable */

// TODO: Implement loading CSS.
function ProjectFeature (props) {

	const {
		aria,
		bemClass,
		className,
		description,
		heading,
		image,
		index,
		quote,
		title
	} = props,
		ariaAttrs = getAriaAttrs(aria);

	return (
		<article
			className={ className }
			id={ kebabCase(title) }
			{ ...ariaAttrs }
		>
			<h2 className={ bem(bemClass.element('heading')).modifiers('main') }>{ heading }</h2>
			<GridRow align={ GridRow.ALIGN_STRETCH }>
				<GridCol
					breakpoints={ [{
						breakpoint: 'medium',
						count: 8
					}] }
					count={ 12 }
				>
					<Animate
						index={ index }
						type={ Animate.SLIDE_LEFT }
					>
						<div className={ bemClass.element('images') }>
							<div className={ bemClass.element('poster') }>
								{/* TODO Correct dimensions */}
								<ImageContainer
									classes={ bemClass.element('image') }
									options={ {
										defaultImage: {},
										smallImage: {
											width: 960,
											height: 840,
											fit: 'pad',
											sizes: '100vw',
											widths: [320, 480, 640, 800, 960] // eslint-disable-line no-magic-numbers
										},
										mediumImage: {
											width: 960,
											height: 864,
											fit: 'pad',
											media: '(min-width: 800px)',
											sizes: '75vw',
											widths: [640, 800, 960] // eslint-disable-line no-magic-numbers
										}
									} }
									{ ...image }
								/>
							</div>
						</div>
					</Animate>
				</GridCol>
				<GridCol
					breakpoints={ [{
						breakpoint: 'medium',
						count: 4
					}] }
					count={ 12 }
				>
					<Animate
						classes={ bemClass.element('label') }
						index={ index }
						type={ Animate.SLIDE_RIGHT }
					>
						<h2 className={ bem(bemClass.element('heading')).modifiers('detail') }>{ heading }</h2>
					</Animate>
					<Animate
						index={ index }
						type={ Animate.FADE }
					>
						<div className={ bemClass.element('detail') }>
							<Editorial
								classes={ bemClass.element('description') }
								content={ description }
							/>
							{ quote && (
								<Quote
									classes={ bemClass.element('quote') }
									{ ...quote }
								/>
							) }
						</div>
					</Animate>
				</GridCol>
			</GridRow>
		</article>
	);
}

ProjectFeature.defaultProps = {
	className: 'c-project-feature',
	index: 0
};

ProjectFeature.propTypes = {
	aria: propTypes.aria,
	bemClass: propTypes.bemClass.isRequired,
	className: React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
	heading: React.PropTypes.string.isRequired,
	image: propTypes.image.isRequired,
	index: React.PropTypes.number.isRequired,
	quote: propTypes.quote,
	title: React.PropTypes.string.isRequired
};

export default BemClasses(ProjectFeature);