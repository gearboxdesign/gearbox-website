import React from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import ProjectDetail from 'components/ui/ProjectDetail';

function ProjectDetailContainer (props) {

	return (
		<ProjectDetail { ...props } />
	);
}

function mapStateToProps (state) {

	const { projects } = state;

	return {
		projects
	};
}

ProjectDetailContainer.defaultProps = {};

ProjectDetailContainer.propTypes = {};

export default connect(mapStateToProps)(ProjectDetailContainer);