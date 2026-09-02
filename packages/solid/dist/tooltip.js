import { createEffect, createSignal, mergeProps, splitProps } from "solid-js";
import h from "solid-js/h";
import { registerTooltipPopupElement, registerTooltipPositionerElement, registerTooltipRootElement, registerTooltipTriggerElement } from "@prosekit/web/tooltip";
/** A Solid component that renders an `prosekit-tooltip-popup` custom element. */
const TooltipPopup = (props) => {
	registerTooltipPopupElement();
	const restProps = props;
	return () => h("prosekit-tooltip-popup", restProps);
};
/** A Solid component that renders an `prosekit-tooltip-positioner` custom element. */
const TooltipPositioner = (props) => {
	registerTooltipPositionerElement();
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
	return () => h("prosekit-tooltip-positioner", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-tooltip-root` custom element. */
const TooltipRoot = (props) => {
	registerTooltipRootElement();
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
	return () => h("prosekit-tooltip-root", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-tooltip-trigger` custom element. */
const TooltipTrigger = (props) => {
	registerTooltipTriggerElement();
	const [getElement, setElement] = createSignal(null);
	const [elementProps, restProps] = splitProps(props, [
		"closeDelay",
		"disabled",
		"openDelay"
	]);
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, {
			closeDelay: elementProps.closeDelay,
			disabled: elementProps.disabled,
			openDelay: elementProps.openDelay
		});
	});
	return () => h("prosekit-tooltip-trigger", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
export { TooltipPopup, TooltipPositioner, TooltipRoot, TooltipTrigger };

//# sourceMappingURL=tooltip.js.map