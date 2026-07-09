import { n as useEditorContext } from "./editor-context.js";
import { createElement } from "preact";
import { useCallback, useLayoutEffect, useRef } from "preact/hooks";
import { forwardRef } from "preact/compat";
import { registerTableHandleColumnMenuRootElement, registerTableHandleColumnMenuTriggerElement, registerTableHandleColumnPopupElement, registerTableHandleColumnPositionerElement, registerTableHandleDragPreviewElement, registerTableHandleDropIndicatorElement, registerTableHandleRootElement, registerTableHandleRowMenuRootElement, registerTableHandleRowMenuTriggerElement, registerTableHandleRowPopupElement, registerTableHandleRowPositionerElement } from "@prosekit/web/table-handle";
function TableHandleColumnPopupComponent(props, forwardedRef) {
	registerTableHandleColumnPopupElement();
	const elementRef = useRef(null);
	const { ...restProps } = props;
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-table-handle-column-popup", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-table-handle-column-popup` custom element. */
const TableHandleColumnPopup = /* @__PURE__ */ forwardRef(TableHandleColumnPopupComponent);
function TableHandleColumnPositionerComponent(props, forwardedRef) {
	registerTableHandleColumnPositionerElement();
	const elementRef = useRef(null);
	const p3Fallback = useEditorContext();
	const { altBoundary: p0, autoUpdate: p1, boundary: p2, editor: p3, elementContext: p4, fitViewport: p5, flip: p6, hide: p7, hoist: p8, inline: p9, offset: p10, overflowPadding: p11, overlap: p12, placement: p13, rootBoundary: p14, sameHeight: p15, sameWidth: p16, shift: p17, strategy: p18, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, {
			altBoundary: p0,
			autoUpdate: p1,
			boundary: p2,
			editor: p3 ?? p3Fallback,
			elementContext: p4,
			fitViewport: p5,
			flip: p6,
			hide: p7,
			hoist: p8,
			inline: p9,
			offset: p10,
			overflowPadding: p11,
			overlap: p12,
			placement: p13,
			rootBoundary: p14,
			sameHeight: p15,
			sameWidth: p16,
			shift: p17,
			strategy: p18
		});
	});
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-table-handle-column-positioner", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-table-handle-column-positioner` custom element. */
const TableHandleColumnPositioner = /* @__PURE__ */ forwardRef(TableHandleColumnPositionerComponent);
function TableHandleColumnMenuRootComponent(props, forwardedRef) {
	registerTableHandleColumnMenuRootElement();
	const elementRef = useRef(null);
	const { defaultOpen: p0, disabled: p1, open: p2, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, {
			defaultOpen: p0,
			disabled: p1,
			open: p2
		});
	});
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-table-handle-column-menu-root", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-table-handle-column-menu-root` custom element. */
const TableHandleColumnMenuRoot = /* @__PURE__ */ forwardRef(TableHandleColumnMenuRootComponent);
function TableHandleColumnMenuTriggerComponent(props, forwardedRef) {
	registerTableHandleColumnMenuTriggerElement();
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
	return createElement("prosekit-table-handle-column-menu-trigger", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-table-handle-column-menu-trigger` custom element. */
const TableHandleColumnMenuTrigger = /* @__PURE__ */ forwardRef(TableHandleColumnMenuTriggerComponent);
function TableHandleDragPreviewComponent(props, forwardedRef) {
	registerTableHandleDragPreviewElement();
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
	return createElement("prosekit-table-handle-drag-preview", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-table-handle-drag-preview` custom element. */
const TableHandleDragPreview = /* @__PURE__ */ forwardRef(TableHandleDragPreviewComponent);
function TableHandleDropIndicatorComponent(props, forwardedRef) {
	registerTableHandleDropIndicatorElement();
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
	return createElement("prosekit-table-handle-drop-indicator", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-table-handle-drop-indicator` custom element. */
const TableHandleDropIndicator = /* @__PURE__ */ forwardRef(TableHandleDropIndicatorComponent);
function TableHandleRootComponent(props, forwardedRef) {
	registerTableHandleRootElement();
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
	return createElement("prosekit-table-handle-root", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-table-handle-root` custom element. */
const TableHandleRoot = /* @__PURE__ */ forwardRef(TableHandleRootComponent);
function TableHandleRowPopupComponent(props, forwardedRef) {
	registerTableHandleRowPopupElement();
	const elementRef = useRef(null);
	const { ...restProps } = props;
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-table-handle-row-popup", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-table-handle-row-popup` custom element. */
const TableHandleRowPopup = /* @__PURE__ */ forwardRef(TableHandleRowPopupComponent);
function TableHandleRowPositionerComponent(props, forwardedRef) {
	registerTableHandleRowPositionerElement();
	const elementRef = useRef(null);
	const p3Fallback = useEditorContext();
	const { altBoundary: p0, autoUpdate: p1, boundary: p2, editor: p3, elementContext: p4, fitViewport: p5, flip: p6, hide: p7, hoist: p8, inline: p9, offset: p10, overflowPadding: p11, overlap: p12, placement: p13, rootBoundary: p14, sameHeight: p15, sameWidth: p16, shift: p17, strategy: p18, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, {
			altBoundary: p0,
			autoUpdate: p1,
			boundary: p2,
			editor: p3 ?? p3Fallback,
			elementContext: p4,
			fitViewport: p5,
			flip: p6,
			hide: p7,
			hoist: p8,
			inline: p9,
			offset: p10,
			overflowPadding: p11,
			overlap: p12,
			placement: p13,
			rootBoundary: p14,
			sameHeight: p15,
			sameWidth: p16,
			shift: p17,
			strategy: p18
		});
	});
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-table-handle-row-positioner", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-table-handle-row-positioner` custom element. */
const TableHandleRowPositioner = /* @__PURE__ */ forwardRef(TableHandleRowPositionerComponent);
function TableHandleRowMenuRootComponent(props, forwardedRef) {
	registerTableHandleRowMenuRootElement();
	const elementRef = useRef(null);
	const { defaultOpen: p0, disabled: p1, open: p2, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, {
			defaultOpen: p0,
			disabled: p1,
			open: p2
		});
	});
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-table-handle-row-menu-root", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-table-handle-row-menu-root` custom element. */
const TableHandleRowMenuRoot = /* @__PURE__ */ forwardRef(TableHandleRowMenuRootComponent);
function TableHandleRowMenuTriggerComponent(props, forwardedRef) {
	registerTableHandleRowMenuTriggerElement();
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
	return createElement("prosekit-table-handle-row-menu-trigger", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-table-handle-row-menu-trigger` custom element. */
const TableHandleRowMenuTrigger = /* @__PURE__ */ forwardRef(TableHandleRowMenuTriggerComponent);
export { TableHandleColumnMenuRoot, TableHandleColumnMenuTrigger, TableHandleColumnPopup, TableHandleColumnPositioner, TableHandleDragPreview, TableHandleDropIndicator, TableHandleRoot, TableHandleRowMenuRoot, TableHandleRowMenuTrigger, TableHandleRowPopup, TableHandleRowPositioner };

//# sourceMappingURL=table-handle.js.map