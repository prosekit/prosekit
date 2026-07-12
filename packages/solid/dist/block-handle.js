import { n as useEditorContext } from "./editor-context.js";
import { createEffect, createSignal, mergeProps, splitProps } from "solid-js";
import h from "solid-js/h";
import { registerBlockHandleAddElement, registerBlockHandleDraggableElement, registerBlockHandlePopupElement, registerBlockHandlePositionerElement, registerBlockHandleRootElement } from "@prosekit/web/block-handle";
/** A Solid component that renders an `prosekit-block-handle-add` custom element. */
const BlockHandleAdd = (props) => {
	registerBlockHandleAddElement();
	const [getElement, setElement] = createSignal(null);
	const [elementProps, restProps] = splitProps(props, ["editor"]);
	const p0Fallback = useEditorContext();
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, { editor: elementProps.editor ?? p0Fallback });
	});
	return () => h("prosekit-block-handle-add", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-block-handle-draggable` custom element. */
const BlockHandleDraggable = (props) => {
	registerBlockHandleDraggableElement();
	const [getElement, setElement] = createSignal(null);
	const [elementProps, restProps] = splitProps(props, ["editor"]);
	const p0Fallback = useEditorContext();
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, { editor: elementProps.editor ?? p0Fallback });
	});
	return () => h("prosekit-block-handle-draggable", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-block-handle-popup` custom element. */
const BlockHandlePopup = (props) => {
	registerBlockHandlePopupElement();
	const restProps = props;
	return () => h("prosekit-block-handle-popup", restProps);
};
/** A Solid component that renders an `prosekit-block-handle-positioner` custom element. */
const BlockHandlePositioner = (props) => {
	registerBlockHandlePositionerElement();
	const [getElement, setElement] = createSignal(null);
	const [elementProps, restProps] = splitProps(props, [
		"altBoundary",
		"autoUpdate",
		"boundary",
		"elementContext",
		"fitViewport",
		"flip",
		"hide",
		"hoist",
		"inline",
		"offset",
		"overflowPadding",
		"overlap",
		"placement",
		"rootBoundary",
		"sameHeight",
		"sameWidth",
		"shift",
		"strategy"
	]);
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, {
			altBoundary: elementProps.altBoundary,
			autoUpdate: elementProps.autoUpdate,
			boundary: elementProps.boundary,
			elementContext: elementProps.elementContext,
			fitViewport: elementProps.fitViewport,
			flip: elementProps.flip,
			hide: elementProps.hide,
			hoist: elementProps.hoist,
			inline: elementProps.inline,
			offset: elementProps.offset,
			overflowPadding: elementProps.overflowPadding,
			overlap: elementProps.overlap,
			placement: elementProps.placement,
			rootBoundary: elementProps.rootBoundary,
			sameHeight: elementProps.sameHeight,
			sameWidth: elementProps.sameWidth,
			shift: elementProps.shift,
			strategy: elementProps.strategy
		});
	});
	return () => h("prosekit-block-handle-positioner", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-block-handle-root` custom element. */
const BlockHandleRoot = (props) => {
	registerBlockHandleRootElement();
	const [getElement, setElement] = createSignal(null);
	const handlers = [];
	const [elementProps, eventHandlers, restProps] = splitProps(props, ["editor"], ["onStateChange"]);
	const p0Fallback = useEditorContext();
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, { editor: elementProps.editor ?? p0Fallback });
		handlers.length = 0;
		handlers.push(eventHandlers.onStateChange);
	});
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		const ac = new AbortController();
		for (const [index, eventName] of ["stateChange"].entries()) element.addEventListener(eventName, (event) => {
			handlers[index]?.(event);
		}, { signal: ac.signal });
		return () => ac.abort();
	});
	return () => h("prosekit-block-handle-root", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
export { BlockHandleAdd, BlockHandleDraggable, BlockHandlePopup, BlockHandlePositioner, BlockHandleRoot };

//# sourceMappingURL=block-handle.js.map