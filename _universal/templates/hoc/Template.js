import React from 'react';

export default function (Component) {

	class Template extends React.Component {

		componentDidMount () {

			if (process.env.CLIENT) {

				// TODO: Reset OG and meta descriptions here.
				const { title } = this.props;

				document.title = `Gearbox Design | ${ title }`;
			}
		}

		render () {

			return (
				<Component { ...this.props } />
			);
		}
	}

	Template.propTypes = {
		title: React.PropTypes.string.isRequired
	};

	return Template;
}