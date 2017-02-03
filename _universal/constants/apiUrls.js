/* global window */

let API_URL;

if (process.env.CLIENT) {
	API_URL = `${ window.location.origin }/api`;
}
else {
	API_URL = `http://localhost:${ process.env.PORT }/api`;
}

export default {
	FOOTER: `${ API_URL }/footer`,
	HEADER: `${ API_URL }/header`,
	PAGES: `${ API_URL }/pages`
};
