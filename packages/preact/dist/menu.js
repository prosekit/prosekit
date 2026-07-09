import { createElement } from "preact";
import { useCallback, useLayoutEffect, useRef } from "preact/hooks";
import { forwardRef } from "preact/compat";
import { registerMenuItemElement, registerMenuPopupElement, registerMenuPositionerElement, registerMenuRootElement, registerMenuSubmenuRootElement, registerMenuSubmenuTriggerElement, registerMenuTriggerElement } from "@prosekit/web/menu";
function MenuItemComponent(props, forwardedRef) {
	registerMenuItemElement();
	const elementRef = useRef(null);
	const handlersRef = useRef([]);
	const { closeOnSelect: p0, disabled: p1, value: p2, onSelect: e0, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, {
			closeOnSelect: p0,
			disabled: p1,
			value: p2
		});
		handlersRef.current = [e0];
	});
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		const ac = new AbortController();
		for (const [index, eventName] of ["select"].entries()) element.addEventListener(eventName, (event) => {
			handlersRef.current[index]?.(event);
		}, { signal: ac.signal });
		return () => ac.abort();
	}, []);
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-menu-item", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-menu-item` custom element. */
const MenuItem = /* @__PURE__ */ forwardRef(MenuItemComponent);
function MenuPopupComponent(props, forwardedRef) {
	registerMenuPopupElement();
	const elementRef = useRef(null);
	const { eventTarget: p0, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, { eventTarget: p0 });
	});
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-menu-popup", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-menu-popup` custom element. */
const MenuPopup = /* @__PURE__ */ forwardRef(MenuPopupComponent);
function MenuPositionerComponent(props, forwardedRef) {
	registerMenuPositionerElement();
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
	return createElement("prosekit-menu-positioner", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-menu-positioner` custom element. */
const MenuPositioner = /* @__PURE__ */ forwardRef(MenuPositionerComponent);
function MenuRootComponent(props, forwardedRef) {
	registerMenuRootElement();
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
	return createElement("prosekit-menu-root", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-menu-root` custom element. */
const MenuRoot = /* @__PURE__ */ forwardRef(MenuRootComponent);
function MenuSubmenuRootComponent(props, forwardedRef) {
	registerMenuSubmenuRootElement();
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
	return createElement("prosekit-menu-submenu-root", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-menu-submenu-root` custom element. */
const MenuSubmenuRoot = /* @__PURE__ */ forwardRef(MenuSubmenuRootComponent);
function MenuSubmenuTriggerComponent(props, forwardedRef) {
	registerMenuSubmenuTriggerElement();
	const elementRef = useRef(null);
	const { disabled: p0, value: p1, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, {
			disabled: p0,
			value: p1
		});
	});
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-menu-submenu-trigger", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-menu-submenu-trigger` custom element. */
const MenuSubmenuTrigger = /* @__PURE__ */ forwardRef(MenuSubmenuTriggerComponent);
function MenuTriggerComponent(props, forwardedRef) {
	registerMenuTriggerElement();
	const elementRef = useRef(null);
	const handlersRef = useRef([]);
	const { disabled: p0, onOpenChange: e0, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, { disabled: p0 });
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
	return createElement("prosekit-menu-trigger", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A Preact component that renders an `prosekit-menu-trigger` custom element. */
const MenuTrigger = /* @__PURE__ */ forwardRef(MenuTriggerComponent);
export { MenuItem, MenuPopup, MenuPositioner, MenuRoot, MenuSubmenuRoot, MenuSubmenuTrigger, MenuTrigger };

//# sourceMappingURL=menu.js.map