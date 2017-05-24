/* global window */

let API_URL;

if (process.env.CLIENT) {
	API_URL = `${ window.location.origin }/api`;
}
else {
	// TODO: Verify this.
	API_URL = `http://localhost:${ process.env.PORT }/api`;
}

export const CONTACT = `${ API_URL }/contact`;
export const FOOTER = `${ API_URL }/footer`;
export const HEADER = `${ API_URL }/header`;
export const PAGES = `${ API_URL }/pages`;
export const TRANSLATIONS = `${ API_URL }/translations`;
export const TWEETS = `${ API_URL }/tweets`;
export const PROJECTS = `${ API_URL }/projects`;