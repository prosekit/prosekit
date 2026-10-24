import { n as useEditorContext } from "./editor-context.js";
import { createElement } from "preact";
import { useCallback, useLayoutEffect, useRef } from "preact/hooks";
import { forwardRef } from "preact/compat";
import { registerInlinePopoverPopupElement, registerInlinePopoverPositionerElement, registerInlinePopoverRootElement } from "@prosekit/web/inline-popover";
function InlinePopoverPopupComponent(props, forwardedRef) {
	registerInlinePopoverPopupElement();
	const elementRef = useRef(null);
	const { ...restProps } = props;
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-inline-popover-popup", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-inline-popover-popup` custom element. */
const InlinePopoverPopup = /* @__PURE__ */ forwardRef(InlinePopoverPopupComponent);
function InlinePopoverPositionerComponent(props, forwardedRef) {
	registerInlinePopoverPositionerElement();
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
	return createElement("prosekit-inline-popover-positioner", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-inline-popover-positioner` custom element. */
const InlinePopoverPositioner = /* @__PURE__ */ forwardRef(InlinePopoverPositionerComponent);
function InlinePopoverRootComponent(props, forwardedRef) {
	registerInlinePopoverRootElement();
	const elementRef = useRef(null);
	const handlersRef = useRef([]);
	const p4Fallback = useEditorContext();
	const { anchor: p0, defaultOpen: p1, disabled: p2, dismissOnEscape: p3, editor: p4, open: p5, onOpenChange: e0, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, {
			anchor: p0,
			defaultOpen: p1,
			disabled: p2,
			dismissOnEscape: p3,
			editor: p4 ?? p4Fallback,
			open: p5
		});
		handlersRef.current = [e0];
	});
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		const ac = new AbortController();
		for (const [index, eventName] of ["openChange"].entries()) element.addEventListener(eventName, (event) => {
			handlersRef.current[index]?.(event);
		}, { signal: ac.signal });
		return () => ac.abort();
	}, []);
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-inline-popover-root", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-inline-popover-root` custom element. */
const InlinePopoverRoot = /* @__PURE__ */ forwardRef(InlinePopoverRootComponent);
export { InlinePopoverPopup, InlinePopoverPositioner, InlinePopoverRoot };

//# sourceMappingURL=inline-popover.js.map