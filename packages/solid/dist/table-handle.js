import { n as useEditorContext } from "./editor-context.js";
import { createEffect, createSignal, mergeProps, splitProps } from "solid-js";
import h from "solid-js/h";
import { registerTableHandleColumnMenuRootElement, registerTableHandleColumnMenuTriggerElement, registerTableHandleColumnPopupElement, registerTableHandleColumnPositionerElement, registerTableHandleDragPreviewElement, registerTableHandleDropIndicatorElement, registerTableHandleRootElement, registerTableHandleRowMenuRootElement, registerTableHandleRowMenuTriggerElement, registerTableHandleRowPopupElement, registerTableHandleRowPositionerElement } from "@prosekit/web/table-handle";
/** A Solid component that renders an `prosekit-table-handle-column-popup` custom element. */
const TableHandleColumnPopup = (props) => {
	registerTableHandleColumnPopupElement();
	const restProps = props;
	return () => h("prosekit-table-handle-column-popup", restProps);
};
/** A Solid component that renders an `prosekit-table-handle-column-positioner` custom element. */
const TableHandleColumnPositioner = (props) => {
	registerTableHandleColumnPositionerElement();
	const [getElement, setElement] = createSignal(null);
	const [elementProps, restProps] = splitProps(props, [
		"altBoundary",
		"autoUpdate",
		"boundary",
		"editor",
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
	const p3Fallback = useEditorContext();
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, {
			altBoundary: elementProps.altBoundary,
			autoUpdate: elementProps.autoUpdate,
			boundary: elementProps.boundary,
			editor: elementProps.editor ?? p3Fallback,
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
	return () => h("prosekit-table-handle-column-positioner", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-table-handle-column-menu-root` custom element. */
const TableHandleColumnMenuRoot = (props) => {
	registerTableHandleColumnMenuRootElement();
	const [getElement, setElement] = createSignal(null);
	const [elementProps, restProps] = splitProps(props, [
		"defaultOpen",
		"disabled",
		"open"
	]);
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, {
			defaultOpen: elementProps.defaultOpen,
			disabled: elementProps.disabled,
			open: elementProps.open
		});
	});
	return () => h("prosekit-table-handle-column-menu-root", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-table-handle-column-menu-trigger` custom element. */
const TableHandleColumnMenuTrigger = (props) => {
	registerTableHandleColumnMenuTriggerElement();
	const [getElement, setElement] = createSignal(null);
	const [elementProps, restProps] = splitProps(props, ["editor"]);
	const p0Fallback = useEditorContext();
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, { editor: elementProps.editor ?? p0Fallback });
	});
	return () => h("prosekit-table-handle-column-menu-trigger", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-table-handle-drag-preview` custom element. */
const TableHandleDragPreview = (props) => {
	registerTableHandleDragPreviewElement();
	const [getElement, setElement] = createSignal(null);
	const [elementProps, restProps] = splitProps(props, ["editor"]);
	const p0Fallback = useEditorContext();
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, { editor: elementProps.editor ?? p0Fallback });
	});
	return () => h("prosekit-table-handle-drag-preview", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-table-handle-drop-indicator` custom element. */
const TableHandleDropIndicator = (props) => {
	registerTableHandleDropIndicatorElement();
	const [getElement, setElement] = createSignal(null);
	const [elementProps, restProps] = splitProps(props, ["editor"]);
	const p0Fallback = useEditorContext();
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, { editor: elementProps.editor ?? p0Fallback });
	});
	return () => h("prosekit-table-handle-drop-indicator", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-table-handle-root` custom element. */
const TableHandleRoot = (props) => {
	registerTableHandleRootElement();
	const [getElement, setElement] = createSignal(null);
	const [elementProps, restProps] = splitProps(props, ["editor"]);
	const p0Fallback = useEditorContext();
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, { editor: elementProps.editor ?? p0Fallback });
	});
	return () => h("prosekit-table-handle-root", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-table-handle-row-popup` custom element. */
const TableHandleRowPopup = (props) => {
	registerTableHandleRowPopupElement();
	const restProps = props;
	return () => h("prosekit-table-handle-row-popup", restProps);
};
/** A Solid component that renders an `prosekit-table-handle-row-positioner` custom element. */
const TableHandleRowPositioner = (props) => {
	registerTableHandleRowPositionerElement();
	const [getElement, setElement] = createSignal(null);
	const [elementProps, restProps] = splitProps(props, [
		"altBoundary",
		"autoUpdate",
		"boundary",
		"editor",
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
	const p3Fallback = useEditorContext();
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, {
			altBoundary: elementProps.altBoundary,
			autoUpdate: elementProps.autoUpdate,
			boundary: elementProps.boundary,
			editor: elementProps.editor ?? p3Fallback,
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
	return () => h("prosekit-table-handle-row-positioner", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-table-handle-row-menu-root` custom element. */
const TableHandleRowMenuRoot = (props) => {
	registerTableHandleRowMenuRootElement();
	const [getElement, setElement] = createSignal(null);
	const [elementProps, restProps] = splitProps(props, [
		"defaultOpen",
		"disabled",
		"open"
	]);
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, {
			defaultOpen: elementProps.defaultOpen,
			disabled: elementProps.disabled,
			open: elementProps.open
		});
	});
	return () => h("prosekit-table-handle-row-menu-root", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-table-handle-row-menu-trigger` custom element. */
const TableHandleRowMenuTrigger = (props) => {
	registerTableHandleRowMenuTriggerElement();
	const [getElement, setElement] = createSignal(null);
	const [elementProps, restProps] = splitProps(props, ["editor"]);
	const p0Fallback = useEditorContext();
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, { editor: elementProps.editor ?? p0Fallback });
	});
	return () => h("prosekit-table-handle-row-menu-trigger", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
export { TableHandleColumnMenuRoot, TableHandleColumnMenuTrigger, TableHandleColumnPopup, TableHandleColumnPositioner, TableHandleDragPreview, TableHandleDropIndicator, TableHandleRoot, TableHandleRowMenuRoot, TableHandleRowMenuTrigger, TableHandleRowPopup, TableHandleRowPositioner };

//# sourceMappingURL=table-handle.js.map