import { createElement } from "preact";
import { useCallback, useLayoutEffect, useRef } from "preact/hooks";
import { forwardRef } from "preact/compat";
import { registerTooltipPopupElement, registerTooltipPositionerElement, registerTooltipRootElement, registerTooltipTriggerElement } from "@prosekit/web/tooltip";
function TooltipPopupComponent(props, forwardedRef) {
	registerTooltipPopupElement();
	const elementRef = useRef(null);
	const { ...restProps } = props;
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-tooltip-popup", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-tooltip-popup` custom element. */
const TooltipPopup = /* @__PURE__ */ forwardRef(TooltipPopupComponent);
function TooltipPositionerComponent(props, forwardedRef) {
	registerTooltipPositionerElement();
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
	return createElement("prosekit-tooltip-positioner", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-tooltip-positioner` custom element. */
const TooltipPositioner = /* @__PURE__ */ forwardRef(TooltipPositionerComponent);
function TooltipRootComponent(props, forwardedRef) {
	registerTooltipRootElement();
	const elementRef = useRef(null);
	const handlersRef = useRef([]);
	const { defaultOpen: p0, disabled: p1, open: p2, onOpenChange: e0, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, {
			defaultOpen: p0,
			disabled: p1,
			open: p2
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
	return createElement("prosekit-tooltip-root", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-tooltip-root` custom element. */
const TooltipRoot = /* @__PURE__ */ forwardRef(TooltipRootComponent);
function TooltipTriggerComponent(props, forwardedRef) {
	registerTooltipTriggerElement();
	const elementRef = useRef(null);
	const { closeDelay: p0, disabled: p1, openDelay: p2, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, {
			closeDelay: p0,
			disabled: p1,
			openDelay: p2
		});
	});
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-tooltip-trigger", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-tooltip-trigger` custom element. */
const TooltipTrigger = /* @__PURE__ */ forwardRef(TooltipTriggerComponent);
export { TooltipPopup, TooltipPositioner, TooltipRoot, TooltipTrigger };

//# sourceMappingURL=tooltip.js.map