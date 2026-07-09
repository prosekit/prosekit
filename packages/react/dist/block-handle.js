"use client";
import { n as useEditorContext } from "./editor-context.js";
import { createElement, forwardRef, useCallback, useLayoutEffect, useRef } from "react";
import { registerBlockHandleAddElement, registerBlockHandleDraggableElement, registerBlockHandlePopupElement, registerBlockHandlePositionerElement, registerBlockHandleRootElement } from "@prosekit/web/block-handle";
function BlockHandleAddComponent(props, forwardedRef) {
	registerBlockHandleAddElement();
	const elementRef = useRef(null);
	const p0Fallback = useEditorContext();
	const { editor: p0, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, { editor: p0 ?? p0Fallback });
	});
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-block-handle-add", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A React component that renders an `prosekit-block-handle-add` custom element. */
const BlockHandleAdd = /* @__PURE__ */ forwardRef(BlockHandleAddComponent);
function BlockHandleDraggableComponent(props, forwardedRef) {
	registerBlockHandleDraggableElement();
	const elementRef = useRef(null);
	const p0Fallback = useEditorContext();
	const { editor: p0, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, { editor: p0 ?? p0Fallback });
	});
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-block-handle-draggable", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A React component that renders an `prosekit-block-handle-draggable` custom element. */
const BlockHandleDraggable = /* @__PURE__ */ forwardRef(BlockHandleDraggableComponent);
function BlockHandlePopupComponent(props, forwardedRef) {
	registerBlockHandlePopupElement();
	const elementRef = useRef(null);
	const { ...restProps } = props;
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-block-handle-popup", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A React component that renders an `prosekit-block-handle-popup` custom element. */
const BlockHandlePopup = /* @__PURE__ */ forwardRef(BlockHandlePopupComponent);
function BlockHandlePositionerComponent(props, forwardedRef) {
	registerBlockHandlePositionerElement();
	const elementRef = useRef(null);
	const { altBoundary: p0, autoUpdate: p1, boundary: p2, elementContext: p3, fitViewport: p4, flip: p5, hide: p6, hoist: p7, inline: p8, offset: p9, overflowPadding: p10, overlap: p11, placement: p12, rootBoundary: p13, sameHeight: p14, sameWidth: p15, shift: p16, strategy: p17, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, {
			altBoundary: p0,
			autoUpdate: p1,
			boundary: p2,
			elementContext: p3,
			fitViewport: p4,
			flip: p5,
			hide: p6,
			hoist: p7,
			inline: p8,
			offset: p9,
			overflowPadding: p10,
			overlap: p11,
			placement: p12,
			rootBoundary: p13,
			sameHeight: p14,
			sameWidth: p15,
			shift: p16,
			strategy: p17
		});
	});
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-block-handle-positioner", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A React component that renders an `prosekit-block-handle-positioner` custom element. */
const BlockHandlePositioner = /* @__PURE__ */ forwardRef(BlockHandlePositionerComponent);
function BlockHandleRootComponent(props, forwardedRef) {
	registerBlockHandleRootElement();
	const elementRef = useRef(null);
	const handlersRef = useRef([]);
	const p0Fallback = useEditorContext();
	const { editor: p0, onStateChange: e0, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, { editor: p0 ?? p0Fallback });
		handlersRef.current = [e0];
	});
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		const ac = new AbortController();
		for (const [index, eventName] of ["stateChange"].entries()) element.addEventListener(eventName, (event) => {
			handlersRef.current[index]?.(event);
		}, { signal: ac.signal });
		return () => ac.abort();
	}, []);
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-block-handle-root", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A React component that renders an `prosekit-block-handle-root` custom element. */
const BlockHandleRoot = /* @__PURE__ */ forwardRef(BlockHandleRootComponent);
/**

@module

## Anatomy

```jsx
import {
BlockHandleAdd,
BlockHandleDraggable,
BlockHandlePopup,
BlockHandlePositioner,
BlockHandleRoot,
} from 'prosekit/react/block-handle'

<BlockHandleRoot>
<BlockHandlePositioner>
<BlockHandlePopup>
<BlockHandleAdd>...</BlockHandleAdd>
<BlockHandleDraggable>...</BlockHandleDraggable>
</BlockHandlePopup>
</BlockHandlePositioner>
</BlockHandleRoot>
```
*/
export { BlockHandleAdd, BlockHandleDraggable, BlockHandlePopup, BlockHandlePositioner, BlockHandleRoot };

//# sourceMappingURL=block-handle.js.map