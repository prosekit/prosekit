import { n as useEditorContext } from "./editor-context.js";
import { createEffect, createSignal, mergeProps, splitProps } from "solid-js";
import h from "solid-js/h";
import { registerInlinePopoverPopupElement, registerInlinePopoverPositionerElement, registerInlinePopoverRootElement } from "@prosekit/web/inline-popover";
/** A Solid component that renders an `prosekit-inline-popover-popup` custom element. */
const InlinePopoverPopup = (props) => {
	registerInlinePopoverPopupElement();
	const restProps = props;
	return () => h("prosekit-inline-popover-popup", restProps);
};
/** A Solid component that renders an `prosekit-inline-popover-positioner` custom element. */
const InlinePopoverPositioner = (props) => {
	registerInlinePopoverPositionerElement();
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
	return () => h("prosekit-inline-popover-positioner", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-inline-popover-root` custom element. */
const InlinePopoverRoot = (props) => {
	registerInlinePopoverRootElement();
	const [getElement, setElement] = createSignal(null);
	const handlers = [];
	const [elementProps, eventHandlers, restProps] = splitProps(props, [
		"anchor",
		"defaultOpen",
		"disabled",
		"dismissOnEscape",
		"editor",
		"open"
	], ["onOpenChange"]);
	const p4Fallback = useEditorContext();
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, {
			anchor: elementProps.anchor,
			defaultOpen: elementProps.defaultOpen,
			disabled: elementProps.disabled,
			dismissOnEscape: elementProps.dismissOnEscape,
			editor: elementProps.editor ?? p4Fallback,
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
	return () => h("prosekit-inline-popover-root", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
export { InlinePopoverPopup, InlinePopoverPositioner, InlinePopoverRoot };

//# sourceMappingURL=inline-popover.js.map