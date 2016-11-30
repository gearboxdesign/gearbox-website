import React from 'react'; // eslint-disable-line no-unused-vars
import getScript from 'utils/getScript';

export default function Foot (props) {

	const { initialModel,
		scripts, 
		sitemap, 
		storeReducers, 
		storeState
	} = props;

	return (
		<div>
			<script dangerouslySetInnerHTML={ // eslint-disable-line react/no-danger
				{
					__html: `window.INITIAL_MODEL = ${ JSON.stringify(initialModel) };
					window.STORE_REDUCERS = ${ JSON.stringify(storeReducers) };
					window.STORE_STATE = ${ JSON.stringify(storeState) };
					window.SITE_MAP = ${ JSON.stringify(sitemap) };`
				} }
				key={ scripts.length }
			/>
			{ scripts.map(getScript) }
		</div>
	);
}

Foot.defaultProps = {
	initialModel: {},
	storeReducers: {},
	storeState: {},
	scripts: []
};

Foot.propTypes = {
	initialModel: React.PropTypes.object.isRequired,
	scripts: React.PropTypes.arrayOf(React.PropTypes.shape({
		src: React.PropTypes.string,
		body: React.PropTypes.string
	})),
	sitemap: React.PropTypes.object.isRequired,
	storeReducers: React.PropTypes.object.isRequired,
	storeState: React.PropTypes.object.isRequired
};