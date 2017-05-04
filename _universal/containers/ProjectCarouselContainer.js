import React from 'react'; // eslint-disable-line no-unused-vars
import { get } from 'lodash';
import { connect } from 'react-redux';
import { setCurrentProjectSlug } from 'actions/actionCreators';
import ProjectCarousel from 'components/ui/ProjectCarousel';

function mapStateToProps (state) {

	const { currentProjectSlug, projects } = state,
		currentProject = get(projects, `data.${ currentProjectSlug }`);

	return { 
		currentProject,
		projects 
	};
}

function mapDispatchToProps (dispatch) {

	return {
		setCurrentProjectSlugHandler: (slug) => {
			dispatch(setCurrentProjectSlug(slug));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCarousel);