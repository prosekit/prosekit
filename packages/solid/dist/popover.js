import { createEffect, createSignal, mergeProps, splitProps } from "solid-js";
import h from "solid-js/h";
import { registerPopoverPopupElement, registerPopoverPositionerElement, registerPopoverRootElement, registerPopoverTriggerElement } from "@prosekit/web/popover";
/** A Solid component that renders an `prosekit-popover-popup` custom element. */
const PopoverPopup = (props) => {
	registerPopoverPopupElement();
	const restProps = props;
	return () => h("prosekit-popover-popup", restProps);
};
/** A Solid component that renders an `prosekit-popover-positioner` custom element. */
const PopoverPositioner = (props) => {
	registerPopoverPositionerElement();
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
	return () => h("prosekit-popover-positioner", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-popover-root` custom element. */
const PopoverRoot = (props) => {
	registerPopoverRootElement();
	const [getElement, setElement] = createSignal(null);
	const handlers = [];
	const [elementProps, eventHandlers, restProps] = splitProps(props, [
		"defaultOpen",
		"disabled",
		"modal",
		"open"
	], ["onOpenChange"]);
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, {
			defaultOpen: elementProps.defaultOpen,
			disabled: elementProps.disabled,
			modal: elementProps.modal,
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
	return () => h("prosekit-popover-root", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-popover-trigger` custom element. */
const PopoverTrigger = (props) => {
	registerPopoverTriggerElement();
	const [getElement, setElement] = createSignal(null);
	const handlers = [];
	const [elementProps, eventHandlers, restProps] = splitProps(props, [
		"closeDelay",
		"delay",
		"disabled",
		"openOnHover"
	], ["onOpenChange"]);
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, {
			closeDelay: elementProps.closeDelay,
			delay: elementProps.delay,
			disabled: elementProps.disabled,
			openOnHover: elementProps.openOnHover
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
	return () => h("prosekit-popover-trigger", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
export { PopoverPopup, PopoverPositioner, PopoverRoot, PopoverTrigger };

//# sourceMappingURL=popover.js.map