import { n as useEditorContext } from "./editor-context.js";
import { computed, defineComponent, h, shallowRef, watchEffect } from "vue";
import { registerBlockHandleAddElement, registerBlockHandleDraggableElement, registerBlockHandlePopupElement, registerBlockHandlePositionerElement, registerBlockHandleRootElement } from "@prosekit/web/block-handle";
/** A Vue component that renders an `prosekit-block-handle-add` custom element. */
const BlockHandleAdd = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerBlockHandleAddElement();
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
		return h("prosekit-block-handle-add", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: ["editor"] });
/** A Vue component that renders an `prosekit-block-handle-draggable` custom element. */
const BlockHandleDraggable = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerBlockHandleDraggableElement();
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
		return h("prosekit-block-handle-draggable", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: ["editor"] });
/** A Vue component that renders an `prosekit-block-handle-popup` custom element. */
const BlockHandlePopup = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerBlockHandlePopupElement();
	return () => {
		return h("prosekit-block-handle-popup", props, slots.default?.());
	};
}, { props: [] });
/** A Vue component that renders an `prosekit-block-handle-positioner` custom element. */
const BlockHandlePositioner = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerBlockHandlePositionerElement();
	const elementRef = shallowRef(null);
	const splittedProps = computed(() => {
		const { altBoundary: p0, autoUpdate: p1, boundary: p2, elementContext: p3, fitViewport: p4, flip: p5, hide: p6, hoist: p7, inline: p8, offset: p9, overflowPadding: p10, overlap: p11, placement: p12, rootBoundary: p13, sameHeight: p14, sameWidth: p15, shift: p16, strategy: p17, ...restProps } = props;
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
			p17
		], restProps];
	});
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15, p16, p17] = splittedProps.value[0];
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
	return () => {
		const restProps = splittedProps.value[1];
		return h("prosekit-block-handle-positioner", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: [
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
] });
/** A Vue component that renders an `prosekit-block-handle-root` custom element. */
const BlockHandleRoot = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerBlockHandleRootElement();
	const elementRef = shallowRef(null);
	const p0Fallback = useEditorContext();
	const splittedProps = computed(() => {
		const { editor: p0, onStateChange: e0, ...restProps } = props;
		return [[p0, e0], restProps];
	});
	const handlers = [];
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const [p0, e0] = splittedProps.value[0];
		Object.assign(element, { editor: p0 ?? p0Fallback });
		handlers.length = 0;
		handlers.push(e0);
	});
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const ac = new AbortController();
		for (const [index, eventName] of ["stateChange"].entries()) element.addEventListener(eventName, (event) => {
			handlers[index]?.(event);
		}, { signal: ac.signal });
		return () => ac.abort();
	});
	return () => {
		const restProps = splittedProps.value[1];
		return h("prosekit-block-handle-root", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: ["editor", "onStateChange"] });
export { BlockHandleAdd, BlockHandleDraggable, BlockHandlePopup, BlockHandlePositioner, BlockHandleRoot };

//# sourceMappingURL=block-handle.js.map