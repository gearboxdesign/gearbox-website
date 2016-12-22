export default function (initialState) {

	let state = reset(initialState);

	function get () {

		return state;
	}

	function set (newState = {}) {

		state = Object.assign({}, state, newState);

		return state;
	}

	function reset (newState = {}) {

		state = { ...newState };

		return state;
	}

	function eject () {

		const prevState = state;
		clear();

		return prevState;
	}

	function clear () {

		state = null;

		return state;
	}

	return {
		eject,
		get,
		reset,
		set
	};
}