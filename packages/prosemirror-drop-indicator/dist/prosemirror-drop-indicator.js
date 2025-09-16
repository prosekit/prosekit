import { NodeSelection, Plugin, PluginKey, TextSelection } from "prosemirror-state";
import { isHTMLElement } from "@ocavue/utils";

//#region src/drop-target.ts
function getTargetsByView(view) {
	let stack = [[-1, view.state.doc]];
	let targets = [];
	while (stack.length > 0) {
		const [pos, node] = stack.pop();
		if (pos >= 0) {
			let dom = view.nodeDOM(pos);
			if (dom && isHTMLElement(dom)) {
				let { top, bottom, left: x1, right: x2 } = dom.getBoundingClientRect();
				targets.push([pos, [
					x1,
					top,
					x2,
					top
				]], [pos + node.nodeSize, [
					x1,
					bottom,
					x2,
					bottom
				]]);
			}
		}
		if (node.isBlock && !node.isTextblock) {
			let childPos = pos + 1;
			for (let child of node.children) {
				stack.push([childPos, child]);
				childPos += child.nodeSize;
			}
		}
	}
	return targets;
}
/**
* @internal
*/
function buildGetTarget(view, onDrag) {
	let prevTargets = [];
	let prevDoc;
	let prevRect;
	const getTargets = () => {
		const rect = view.dom.getBoundingClientRect();
		const doc = view.state.doc;
		if (prevTargets && prevDoc && prevRect && rect.width === prevRect.width && rect.height === prevRect.height && rect.x === prevRect.x && rect.y === prevRect.y && prevDoc.eq(doc)) return prevTargets;
		prevRect = rect;
		prevDoc = doc;
		prevTargets = getTargetsByView(view);
		return prevTargets;
	};
	const getTargetImpl = (point, event) => {
		if (!view.editable || view.isDestroyed) return;
		const compare = (p1, p2) => {
			const [pos1, line1] = p1;
			const [pos2, line2] = p2;
			const p1Distance = pointLineDistance(point, line1);
			const p2Distance = pointLineDistance(point, line2);
			return p1Distance - p2Distance || pos1 - pos2;
		};
		let targets = getTargets();
		targets.sort(compare);
		targets = targets.slice(0, 8);
		const target = targets.find((target$1) => onDrag?.({
			view,
			pos: target$1[0],
			event
		}) !== false);
		if (target && isDraggingToItself(view, target[0])) return;
		return target;
	};
	let prevPoint;
	let prevTarget;
	const getTargetCached = (point, event) => {
		if (prevPoint && pointEqual(prevPoint, point)) return prevTarget;
		prevPoint = point;
		prevTarget = getTargetImpl(point, event);
		return prevTarget;
	};
	return getTargetCached;
}
function pointEqual(a, b) {
	return a[0] === b[0] && a[1] === b[1];
}
function pointPointDistance(a, b) {
	return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}
function pointLineDistance(point, line) {
	return Math.min(pointPointDistance(point, [line[0], line[1]]), pointPointDistance(point, [line[2], line[3]]));
}
/**
* Whether the dragging node is being dragged to the same position. For example,
* dragging a list node into a new position that is just below the list node, or
* dragging a nested quoteblock into itself.
*/
function isDraggingToItself(view, pos) {
	const dragging = view.dragging;
	if (!dragging) return;
	const { move } = dragging;
	if (!move) return;
	const selection = view.state.selection;
	if (!(selection instanceof NodeSelection)) return;
	const { from, to } = selection;
	return from <= pos && pos <= to;
}

//#endregion
//#region src/drop-indicator-plugin.ts
/**
* @public
*
* @param options - The options for the drop indicator plugin.
*/
function createDropIndicatorPlugin(options) {
	let getTarget;
	return new Plugin({
		key: new PluginKey("prosekit-drop-indicator"),
		view: (view) => {
			getTarget = buildGetTarget(view, options.onDrag);
			return createDropIndicatorView(view, getTarget, options);
		},
		props: { handleDrop(view, event, slice, move) {
			if (!getTarget) return false;
			const target = getTarget([event.clientX, event.clientY], event);
			if (!target) return false;
			event.preventDefault();
			let insertPos = target[0];
			let tr = view.state.tr;
			if (move) {
				let { node } = view.dragging || {};
				if (node) node.replace(tr);
				else tr.deleteSelection();
			}
			let pos = tr.mapping.map(insertPos);
			let isNode = slice.openStart == 0 && slice.openEnd == 0 && slice.content.childCount == 1;
			let beforeInsert = tr.doc;
			if (isNode) tr.replaceRangeWith(pos, pos, slice.content.firstChild);
			else tr.replaceRange(pos, pos, slice);
			if (tr.doc.eq(beforeInsert)) return true;
			let $pos = tr.doc.resolve(pos);
			if (isNode && NodeSelection.isSelectable(slice.content.firstChild) && $pos.nodeAfter && $pos.nodeAfter.sameMarkup(slice.content.firstChild)) tr.setSelection(new NodeSelection($pos));
			else {
				let end = tr.mapping.map(insertPos);
				tr.mapping.maps[tr.mapping.maps.length - 1].forEach((_from, _to, _newFrom, newTo) => end = newTo);
				tr.setSelection(selectionBetween(view, $pos, tr.doc.resolve(end)));
			}
			view.focus();
			view.dispatch(tr.setMeta("uiEvent", "drop"));
			return true;
		} }
	});
}
function selectionBetween(view, $anchor, $head, bias) {
	return view.someProp("createSelectionBetween", (f) => f(view, $anchor, $head)) || TextSelection.between($anchor, $head, bias);
}
function createDropIndicatorView(view, getTarget, options) {
	let dom = view.dom;
	let hideId;
	let prevX;
	let prevY;
	let hasDragOverEvent = false;
	const scheduleHide = () => {
		if (hideId) clearTimeout(hideId);
		hasDragOverEvent = false;
		hideId = setTimeout(() => {
			if (hasDragOverEvent) return;
			options.onHide?.();
		}, 30);
	};
	const handleDragOver = (event) => {
		hasDragOverEvent = true;
		const { clientX, clientY } = event;
		if (prevX === clientX && prevY === clientY) return;
		prevX = clientX;
		prevY = clientY;
		let target = getTarget([clientX, clientY], event);
		if (!target) {
			scheduleHide();
			return;
		} else {
			const [pos, [x1, y1, x2, y2]] = target;
			const line = {
				p1: {
					x: x1,
					y: y1
				},
				p2: {
					x: x2,
					y: y2
				}
			};
			options.onShow?.({
				view,
				pos,
				line
			});
		}
	};
	dom.addEventListener("dragover", handleDragOver);
	dom.addEventListener("dragend", scheduleHide);
	dom.addEventListener("drop", scheduleHide);
	dom.addEventListener("dragleave", scheduleHide);
	const destroy = () => {
		dom.removeEventListener("dragover", handleDragOver);
		dom.removeEventListener("dragend", scheduleHide);
		dom.removeEventListener("drop", scheduleHide);
		dom.removeEventListener("dragleave", scheduleHide);
	};
	return { destroy };
}

//#endregion
export { createDropIndicatorPlugin };
//# sourceMappingURL=prosemirror-drop-indicator.js.map