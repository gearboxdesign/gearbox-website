/* global window */

let API_URL;

if (process.env.CLIENT) {
	API_URL = `http://localhost:${ window.PORT }/api`;
}
else {
	API_URL = `http://localhost:${ process.env.PORT }/api`;	
}


export default {
	PAGES: `${ API_URL }/pages`
};
