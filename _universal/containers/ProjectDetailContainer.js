import React from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import ProjectDetail from 'components/ui/ProjectDetail';

function mapStateToProps (state) {

	const { currentProjectSlug, projects } = state;

	return {
		project: get(projects, `data.${ currentProjectSlug }`)
	};
}

export default connect(mapStateToProps)(ProjectDetail);