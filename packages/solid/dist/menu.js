import { createEffect, createSignal, mergeProps, splitProps } from "solid-js";
import h from "solid-js/h";
import { registerMenuItemElement, registerMenuPopupElement, registerMenuPositionerElement, registerMenuRootElement, registerMenuSubmenuRootElement, registerMenuSubmenuTriggerElement, registerMenuTriggerElement } from "@prosekit/web/menu";
/** A Solid component that renders an `prosekit-menu-item` custom element. */
const MenuItem = (props) => {
	registerMenuItemElement();
	const [getElement, setElement] = createSignal(null);
	const handlers = [];
	const [elementProps, eventHandlers, restProps] = splitProps(props, [
		"closeOnSelect",
		"disabled",
		"value"
	], ["onSelect"]);
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, {
			closeOnSelect: elementProps.closeOnSelect,
			disabled: elementProps.disabled,
			value: elementProps.value
		});
		handlers.length = 0;
		handlers.push(eventHandlers.onSelect);
	});
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		const ac = new AbortController();
		for (const [index, eventName] of ["select"].entries()) element.addEventListener(eventName, (event) => {
			handlers[index]?.(event);
		}, { signal: ac.signal });
		return () => ac.abort();
	});
	return () => h("prosekit-menu-item", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-menu-popup` custom element. */
const MenuPopup = (props) => {
	registerMenuPopupElement();
	const [getElement, setElement] = createSignal(null);
	const [elementProps, restProps] = splitProps(props, ["eventTarget"]);
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, { eventTarget: elementProps.eventTarget });
	});
	return () => h("prosekit-menu-popup", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-menu-positioner` custom element. */
const MenuPositioner = (props) => {
	registerMenuPositionerElement();
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
	return () => h("prosekit-menu-positioner", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-menu-root` custom element. */
const MenuRoot = (props) => {
	registerMenuRootElement();
	const [getElement, setElement] = createSignal(null);
	const handlers = [];
	const [elementProps, eventHandlers, restProps] = splitProps(props, [
		"defaultOpen",
		"disabled",
		"open"
	], ["onOpenChange"]);
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, {
			defaultOpen: elementProps.defaultOpen,
			disabled: elementProps.disabled,
			open: elementProps.open
		});
		handlers.length = 0;
		handlers.push(eventHandlers.onOpenChange);
	});
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		const ac = new AbortController();
		for (const [index, eventName] of ["openChange"].entries()) element.addEventListener(eventName, (event) => {
			handlers[index]?.(event);
		}, { signal: ac.signal });
		return () => ac.abort();
	});
	return () => h("prosekit-menu-root", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-menu-submenu-root` custom element. */
const MenuSubmenuRoot = (props) => {
	registerMenuSubmenuRootElement();
	const [getElement, setElement] = createSignal(null);
	const handlers = [];
	const [elementProps, eventHandlers, restProps] = splitProps(props, [
		"defaultOpen",
		"disabled",
		"open"
	], ["onOpenChange"]);
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, {
			defaultOpen: elementProps.defaultOpen,
			disabled: elementProps.disabled,
			open: elementProps.open
		});
		handlers.length = 0;
		handlers.push(eventHandlers.onOpenChange);
	});
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		const ac = new AbortController();
		for (const [index, eventName] of ["openChange"].entries()) element.addEventListener(eventName, (event) => {
			handlers[index]?.(event);
		}, { signal: ac.signal });
		return () => ac.abort();
	});
	return () => h("prosekit-menu-submenu-root", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-menu-submenu-trigger` custom element. */
const MenuSubmenuTrigger = (props) => {
	registerMenuSubmenuTriggerElement();
	const [getElement, setElement] = createSignal(null);
	const [elementProps, restProps] = splitProps(props, ["disabled", "value"]);
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, {
			disabled: elementProps.disabled,
			value: elementProps.value
		});
	});
	return () => h("prosekit-menu-submenu-trigger", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-menu-trigger` custom element. */
const MenuTrigger = (props) => {
	registerMenuTriggerElement();
	const [getElement, setElement] = createSignal(null);
	const handlers = [];
	const [elementProps, eventHandlers, restProps] = splitProps(props, ["disabled"], ["onOpenChange"]);
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, { disabled: elementProps.disabled });
		handlers.length = 0;
		handlers.push(eventHandlers.onOpenChange);
	});
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		const ac = new AbortController();
		for (const [index, eventName] of ["openChange"].entries()) element.addEventListener(eventName, (event) => {
			handlers[index]?.(event);
		}, { signal: ac.signal });
		return () => ac.abort();
	});
	return () => h("prosekit-menu-trigger", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
export { MenuItem, MenuPopup, MenuPositioner, MenuRoot, MenuSubmenuRoot, MenuSubmenuTrigger, MenuTrigger };

//# sourceMappingURL=menu.js.map