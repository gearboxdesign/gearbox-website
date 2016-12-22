import React from 'react'; // eslint-disable-line no-unused-vars
import getScript from 'utils/getScript';

export default function Foot (props) {

	const { viewModel,
		scripts,
		sitemap,
		storeReducers,
		storeState
	} = props;

	/* eslint-disable react/no-danger */
	return (
		<div>
			<script
				dangerouslySetInnerHTML={ {
					__html: `window.VIEW_MODEL = ${ JSON.stringify(viewModel) };
					window.STORE_REDUCERS = ${ JSON.stringify(storeReducers) };
					window.STORE_STATE = ${ JSON.stringify(storeState) };
					window.SITE_MAP = ${ JSON.stringify(sitemap) };
					window.PORT = ${ JSON.stringify(process.env.PORT) };`
				} }
				key={ scripts.length }
			/>
			{ scripts.map(getScript) }
		</div>
	);

	/* eslint-enable */
}

Foot.defaultProps = {
	storeReducers: {},
	storeState: {},
	scripts: [],
	sitemap: {},
	viewModel: {}
};

Foot.propTypes = {
	scripts: React.PropTypes.arrayOf(React.PropTypes.shape({
		src: React.PropTypes.string,
		body: React.PropTypes.string
	})),
	sitemap: React.PropTypes.object.isRequired,
	storeReducers: React.PropTypes.object.isRequired,
	storeState: React.PropTypes.object.isRequired,
	viewModel: React.PropTypes.object.isRequired
};