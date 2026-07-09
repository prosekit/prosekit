import { n as useEditorContext } from "./editor-context.js";
import { computed, defineComponent, h, shallowRef, watchEffect } from "vue";
import { registerTableHandleColumnMenuRootElement, registerTableHandleColumnMenuTriggerElement, registerTableHandleColumnPopupElement, registerTableHandleColumnPositionerElement, registerTableHandleDragPreviewElement, registerTableHandleDropIndicatorElement, registerTableHandleRootElement, registerTableHandleRowMenuRootElement, registerTableHandleRowMenuTriggerElement, registerTableHandleRowPopupElement, registerTableHandleRowPositionerElement } from "@prosekit/web/table-handle";
/** A Vue component that renders an `prosekit-table-handle-column-popup` custom element. */
const TableHandleColumnPopup = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerTableHandleColumnPopupElement();
	return () => {
		return h("prosekit-table-handle-column-popup", props, slots.default?.());
	};
}, { props: [] });
/** A Vue component that renders an `prosekit-table-handle-column-positioner` custom element. */
const TableHandleColumnPositioner = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerTableHandleColumnPositionerElement();
	const elementRef = shallowRef(null);
	const p3Fallback = useEditorContext();
	const splittedProps = computed(() => {
		const { altBoundary: p0, autoUpdate: p1, boundary: p2, editor: p3, elementContext: p4, fitViewport: p5, flip: p6, hide: p7, hoist: p8, inline: p9, offset: p10, overflowPadding: p11, overlap: p12, placement: p13, rootBoundary: p14, sameHeight: p15, sameWidth: p16, shift: p17, strategy: p18, ...restProps } = props;
		return [[
			p0,
			p1,
			p2,
			p3,
			p4,
			p5,
			p6,
			p7,
			p8,
			p9,
			p10,
			p11,
			p12,
			p13,
			p14,
			p15,
			p16,
			p17,
			p18
		], restProps];
	});
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18] = splittedProps.value[0];
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
	return () => {
		const restProps = splittedProps.value[1];
		return h("prosekit-table-handle-column-positioner", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: [
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
] });
/** A Vue component that renders an `prosekit-table-handle-column-menu-root` custom element. */
const TableHandleColumnMenuRoot = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerTableHandleColumnMenuRootElement();
	const elementRef = shallowRef(null);
	const splittedProps = computed(() => {
		const { defaultOpen: p0, disabled: p1, open: p2, ...restProps } = props;
		return [[
			p0,
			p1,
			p2
		], restProps];
	});
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const [p0, p1, p2] = splittedProps.value[0];
		Object.assign(element, {
			defaultOpen: p0,
			disabled: p1,
			open: p2
		});
	});
	return () => {
		const restProps = splittedProps.value[1];
		return h("prosekit-table-handle-column-menu-root", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: [
	"defaultOpen",
	"disabled",
	"open"
] });
/** A Vue component that renders an `prosekit-table-handle-column-menu-trigger` custom element. */
const TableHandleColumnMenuTrigger = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerTableHandleColumnMenuTriggerElement();
	const elementRef = shallowRef(null);
	const p0Fallback = useEditorContext();
	const splittedProps = computed(() => {
		const { editor: p0, ...restProps } = props;
		return [[p0], restProps];
	});
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const [p0] = splittedProps.value[0];
		Object.assign(element, { editor: p0 ?? p0Fallback });
	});
	return () => {
		const restProps = splittedProps.value[1];
		return h("prosekit-table-handle-column-menu-trigger", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: ["editor"] });
/** A Vue component that renders an `prosekit-table-handle-drag-preview` custom element. */
const TableHandleDragPreview = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerTableHandleDragPreviewElement();
	const elementRef = shallowRef(null);
	const p0Fallback = useEditorContext();
	const splittedProps = computed(() => {
		const { editor: p0, ...restProps } = props;
		return [[p0], restProps];
	});
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const [p0] = splittedProps.value[0];
		Object.assign(element, { editor: p0 ?? p0Fallback });
	});
	return () => {
		const restProps = splittedProps.value[1];
		return h("prosekit-table-handle-drag-preview", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: ["editor"] });
/** A Vue component that renders an `prosekit-table-handle-drop-indicator` custom element. */
const TableHandleDropIndicator = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerTableHandleDropIndicatorElement();
	const elementRef = shallowRef(null);
	const p0Fallback = useEditorContext();
	const splittedProps = computed(() => {
		const { editor: p0, ...restProps } = props;
		return [[p0], restProps];
	});
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const [p0] = splittedProps.value[0];
		Object.assign(element, { editor: p0 ?? p0Fallback });
	});
	return () => {
		const restProps = splittedProps.value[1];
		return h("prosekit-table-handle-drop-indicator", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: ["editor"] });
/** A Vue component that renders an `prosekit-table-handle-root` custom element. */
const TableHandleRoot = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerTableHandleRootElement();
	const elementRef = shallowRef(null);
	const p0Fallback = useEditorContext();
	const splittedProps = computed(() => {
		const { editor: p0, ...restProps } = props;
		return [[p0], restProps];
	});
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const [p0] = splittedProps.value[0];
		Object.assign(element, { editor: p0 ?? p0Fallback });
	});
	return () => {
		const restProps = splittedProps.value[1];
		return h("prosekit-table-handle-root", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: ["editor"] });
/** A Vue component that renders an `prosekit-table-handle-row-popup` custom element. */
const TableHandleRowPopup = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerTableHandleRowPopupElement();
	return () => {
		return h("prosekit-table-handle-row-popup", props, slots.default?.());
	};
}, { props: [] });
/** A Vue component that renders an `prosekit-table-handle-row-positioner` custom element. */
const TableHandleRowPositioner = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerTableHandleRowPositionerElement();
	const elementRef = shallowRef(null);
	const p3Fallback = useEditorContext();
	const splittedProps = computed(() => {
		const { altBoundary: p0, autoUpdate: p1, boundary: p2, editor: p3, elementContext: p4, fitViewport: p5, flip: p6, hide: p7, hoist: p8, inline: p9, offset: p10, overflowPadding: p11, overlap: p12, placement: p13, rootBoundary: p14, sameHeight: p15, sameWidth: p16, shift: p17, strategy: p18, ...restProps } = props;
		return [[
			p0,
			p1,
			p2,
			p3,
			p4,
			p5,
			p6,
			p7,
			p8,
			p9,
			p10,
			p11,
			p12,
			p13,
			p14,
			p15,
			p16,
			p17,
			p18
		], restProps];
	});
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17, p18] = splittedProps.value[0];
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
	return () => {
		const restProps = splittedProps.value[1];
		return h("prosekit-table-handle-row-positioner", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: [
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
] });
/** A Vue component that renders an `prosekit-table-handle-row-menu-root` custom element. */
const TableHandleRowMenuRoot = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerTableHandleRowMenuRootElement();
	const elementRef = shallowRef(null);
	const splittedProps = computed(() => {
		const { defaultOpen: p0, disabled: p1, open: p2, ...restProps } = props;
		return [[
			p0,
			p1,
			p2
		], restProps];
	});
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const [p0, p1, p2] = splittedProps.value[0];
		Object.assign(element, {
			defaultOpen: p0,
			disabled: p1,
			open: p2
		});
	});
	return () => {
		const restProps = splittedProps.value[1];
		return h("prosekit-table-handle-row-menu-root", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: [
	"defaultOpen",
	"disabled",
	"open"
] });
/** A Vue component that renders an `prosekit-table-handle-row-menu-trigger` custom element. */
const TableHandleRowMenuTrigger = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerTableHandleRowMenuTriggerElement();
	const elementRef = shallowRef(null);
	const p0Fallback = useEditorContext();
	const splittedProps = computed(() => {
		const { editor: p0, ...restProps } = props;
		return [[p0], restProps];
	});
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const [p0] = splittedProps.value[0];
		Object.assign(element, { editor: p0 ?? p0Fallback });
	});
	return () => {
		const restProps = splittedProps.value[1];
		return h("prosekit-table-handle-row-menu-trigger", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: ["editor"] });
export { TableHandleColumnMenuRoot, TableHandleColumnMenuTrigger, TableHandleColumnPopup, TableHandleColumnPositioner, TableHandleDragPreview, TableHandleDropIndicator, TableHandleRoot, TableHandleRowMenuRoot, TableHandleRowMenuTrigger, TableHandleRowPopup, TableHandleRowPositioner };

//# sourceMappingURL=table-handle.js.map