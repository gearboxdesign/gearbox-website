import { noop } from 'lodash';

const trackers = new WeakMap();

export function addDragListeners (elem, callbacks) {

	if (trackers.has(elem)) {
		return;
	}

	trackers.set(elem, dragMonitor(elem, callbacks));
}

export function removeDragListeners (elem) {

	if (trackers.has(elem)) {
		trackers.get(elem).destroy();
		trackers.delete(elem);
	}
}

function dragMonitor (elem, callbacks) {

	const {
		start: startCallback = noop,
		drag: dragCallback = noop,
		end: endCallback = noop
	} = callbacks;

	let currentDragPos = null;

	// Init
	elem.addEventListener('mousedown', startDrag);
	elem.addEventListener('mousemove', drag);
	elem.addEventListener('mouseup', endDrag);

	function startDrag (evt) {

		const { clientX, clientY } = evt,
			elemBoundingRect = elem.getBoundingClientRect(),
			dragPos = getDragPos(clientX, clientY, elemBoundingRect);

		currentDragPos = dragPos;

		startCallback({
			originalEvent: evt,
			...dragPos
		});
	}

	function drag (evt) {

		if (currentDragPos) {

			const { clientX, clientY } = evt,
				elemBoundingRect = elem.getBoundingClientRect(),
				{ offsetX: currentOffsetX, offsetY: currentOffsetY } = currentDragPos,
				{ offsetX, offsetY, relativeX, relativeY } = getDragPos(clientX, clientY, elemBoundingRect);

			dragCallback({
				originalEvent: evt,
				dragX: offsetX - currentOffsetX,
				dragY: offsetY - currentOffsetY,
				offsetX,
				offsetY,
				relativeX,
				relativeY
			});
		}
	}

	function endDrag () {

		currentDragPos = null;

		endCallback();
	}

	function getDragPos (clientX, clientY, elemBoundingRect) {

		const relativeX = clientX - elemBoundingRect.left,
			relativeY = clientY - elemBoundingRect.top,
			offsetX = relativeX / elemBoundingRect.width,
			offsetY = relativeY / elemBoundingRect.height;

		return {
			offsetX,
			offsetY,
			relativeX,
			relativeY
		};
	}

	function destroy () {

		elem.removeEventListener('mousedown', startDrag);
		elem.removeEventListener('mousemove', drag);
		elem.removeEventListener('mouseup', endDrag);
	}

	return {
		destroy
	};
}