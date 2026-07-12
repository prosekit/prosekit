import { createEffect, createSignal, mergeProps, splitProps } from "solid-js";
import h from "solid-js/h";
import { registerResizableHandleElement, registerResizableRootElement } from "@prosekit/web/resizable";
/** A Solid component that renders an `prosekit-resizable-root` custom element. */
const ResizableRoot = (props) => {
	registerResizableRootElement();
	const [getElement, setElement] = createSignal(null);
	const handlers = [];
	const [elementProps, eventHandlers, restProps] = splitProps(props, [
		"aspectRatio",
		"height",
		"width"
	], ["onResizeEnd", "onResizeStart"]);
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, {
			aspectRatio: elementProps.aspectRatio,
			height: elementProps.height,
			width: elementProps.width
		});
		handlers.length = 0;
		handlers.push(eventHandlers.onResizeEnd);
		handlers.push(eventHandlers.onResizeStart);
	});
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		const ac = new AbortController();
		for (const [index, eventName] of ["resizeEnd", "resizeStart"].entries()) element.addEventListener(eventName, (event) => {
			handlers[index]?.(event);
		}, { signal: ac.signal });
		return () => ac.abort();
	});
	return () => h("prosekit-resizable-root", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-resizable-handle` custom element. */
const ResizableHandle = (props) => {
	registerResizableHandleElement();
	const [getElement, setElement] = createSignal(null);
	const [elementProps, restProps] = splitProps(props, ["position"]);
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, { position: elementProps.position });
	});
	return () => h("prosekit-resizable-handle", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
export { ResizableHandle, ResizableRoot };

//# sourceMappingURL=resizable.js.map