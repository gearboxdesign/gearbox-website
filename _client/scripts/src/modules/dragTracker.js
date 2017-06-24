import { flow, get, noop } from 'lodash';

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

	let startDragPos = null,
		currentDragPos = null;

	const mouseStartDrag = flow(preventMouseEventDefault, startDrag);

	// Init
	elem.addEventListener('mousedown', mouseStartDrag);
	elem.addEventListener('mousemove', drag);
	elem.addEventListener('mouseleave', endDrag);
	elem.addEventListener('mouseup', endDrag);

	elem.addEventListener('touchstart', startDrag);
	elem.addEventListener('touchmove', drag);
	elem.addEventListener('touchend', endDrag);

	function startDrag (evt) {

		const uiEvt = getUIEvent(evt),
			{ clientX, clientY } = uiEvt,
			elemBoundingRect = elem.getBoundingClientRect(),
			dragPos = getDragPos(clientX, clientY, elemBoundingRect);

		startDragPos = dragPos;
		currentDragPos = null;

		startCallback({
			originalEvent: evt,
			...dragPos
		});
	}

	function drag (evt) {

		if (startDragPos) {

			const uiEvt = getUIEvent(evt),
				{ clientX, clientY } = uiEvt,
				elemBoundingRect = elem.getBoundingClientRect();

			currentDragPos = getOffsetPos(clientX, clientY, elemBoundingRect, startDragPos);

			dragCallback(Object.assign({
				originalEvent: evt
			}, currentDragPos));
		}
	}

	function endDrag (evt) {

		if (startDragPos) {

			endCallback(Object.assign({
				originalEvent: evt
			}, currentDragPos));

			startDragPos = null;
		}
	}

	function preventMouseEventDefault (evt) {

		if (get(Object.getPrototypeOf(evt), 'constructor.name') === 'MouseEvent') {
			evt.preventDefault();
		}

		return evt;
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

	function getOffsetPos (clientX, clientY, elemBoundingRect, refDragPos) {

		const {
			offsetX: currentOffsetX,
			offsetY: currentOffsetY,
			relativeX: currentRelativeX,
			relativeY: currentRelativeY
		} = refDragPos,
			{ offsetX, offsetY, relativeX, relativeY } = getDragPos(clientX, clientY, elemBoundingRect);

		return {
			dragX: offsetX - currentOffsetX,
			dragY: offsetY - currentOffsetY,
			shiftX: relativeX - currentRelativeX,
			shiftY: relativeY - currentRelativeY,
			offsetX,
			offsetY,
			relativeX,
			relativeY
		};
	}

	function getUIEvent (evt) {

		return get(evt, 'touches[0]', evt);
	}

	function destroy () {

		elem.removeEventListener('mousedown', mouseStartDrag);
		elem.removeEventListener('mousemove', drag);
		elem.removeEventListener('mouseup', endDrag);

		elem.removeEventListener('touchstart', startDrag);
		elem.removeEventListener('touchmove', drag);
		elem.removeEventListener('touchend', endDrag);
	}

	return {
		destroy
	};
}