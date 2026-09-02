import { createElement } from "preact";
import { useCallback, useLayoutEffect, useRef } from "preact/hooks";
import { forwardRef } from "preact/compat";
import { registerPopoverPopupElement, registerPopoverPositionerElement, registerPopoverRootElement, registerPopoverTriggerElement } from "@prosekit/web/popover";
function PopoverPopupComponent(props, forwardedRef) {
	registerPopoverPopupElement();
	const elementRef = useRef(null);
	const { ...restProps } = props;
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-popover-popup", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-popover-popup` custom element. */
const PopoverPopup = /* @__PURE__ */ forwardRef(PopoverPopupComponent);
function PopoverPositionerComponent(props, forwardedRef) {
	registerPopoverPositionerElement();
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
	return createElement("prosekit-popover-positioner", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-popover-positioner` custom element. */
const PopoverPositioner = /* @__PURE__ */ forwardRef(PopoverPositionerComponent);
function PopoverRootComponent(props, forwardedRef) {
	registerPopoverRootElement();
	const elementRef = useRef(null);
	const handlersRef = useRef([]);
	const { defaultOpen: p0, disabled: p1, modal: p2, open: p3, onOpenChange: e0, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, {
			defaultOpen: p0,
			disabled: p1,
			modal: p2,
			open: p3
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
	return createElement("prosekit-popover-root", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-popover-root` custom element. */
const PopoverRoot = /* @__PURE__ */ forwardRef(PopoverRootComponent);
function PopoverTriggerComponent(props, forwardedRef) {
	registerPopoverTriggerElement();
	const elementRef = useRef(null);
	const handlersRef = useRef([]);
	const { closeDelay: p0, delay: p1, disabled: p2, openOnHover: p3, onOpenChange: e0, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, {
			closeDelay: p0,
			delay: p1,
			disabled: p2,
			openOnHover: p3
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
	return createElement("prosekit-popover-trigger", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-popover-trigger` custom element. */
const PopoverTrigger = /* @__PURE__ */ forwardRef(PopoverTriggerComponent);
export { PopoverPopup, PopoverPositioner, PopoverRoot, PopoverTrigger };

//# sourceMappingURL=popover.js.map