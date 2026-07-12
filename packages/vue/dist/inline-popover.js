import { n as useEditorContext } from "./editor-context.js";
import { computed, defineComponent, h, shallowRef, watchEffect } from "vue";
import { registerInlinePopoverPopupElement, registerInlinePopoverPositionerElement, registerInlinePopoverRootElement } from "@prosekit/web/inline-popover";
/** A Vue component that renders an `prosekit-inline-popover-popup` custom element. */
const InlinePopoverPopup = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerInlinePopoverPopupElement();
	return () => {
		return h("prosekit-inline-popover-popup", props, slots.default?.());
	};
}, { props: [] });
/** A Vue component that renders an `prosekit-inline-popover-positioner` custom element. */
const InlinePopoverPositioner = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerInlinePopoverPositionerElement();
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
		return h("prosekit-inline-popover-positioner", {
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
/** A Vue component that renders an `prosekit-inline-popover-root` custom element. */
const InlinePopoverRoot = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerInlinePopoverRootElement();
	const elementRef = shallowRef(null);
	const p4Fallback = useEditorContext();
	const splittedProps = computed(() => {
		const { anchor: p0, defaultOpen: p1, disabled: p2, dismissOnEscape: p3, editor: p4, open: p5, onOpenChange: e0, ...restProps } = props;
		return [[
			p0,
			p1,
			p2,
			p3,
			p4,
			p5,
			e0
		], restProps];
	});
	const handlers = [];
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const [p0, p1, p2, p3, p4, p5, e0] = splittedProps.value[0];
		Object.assign(element, {
			anchor: p0,
			defaultOpen: p1,
			disabled: p2,
			dismissOnEscape: p3,
			editor: p4 ?? p4Fallback,
			open: p5
		});
		handlers.length = 0;
		handlers.push(e0);
	});
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const ac = new AbortController();
		for (const [index, eventName] of ["openChange"].entries()) element.addEventListener(eventName, (event) => {
			handlers[index]?.(event);
		}, { signal: ac.signal });
		return () => ac.abort();
	});
	return () => {
		const restProps = splittedProps.value[1];
		return h("prosekit-inline-popover-root", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: [
	"anchor",
	"defaultOpen",
	"disabled",
	"dismissOnEscape",
	"editor",
	"open",
	"onOpenChange"
] });
export { InlinePopoverPopup, InlinePopoverPositioner, InlinePopoverRoot };

//# sourceMappingURL=inline-popover.js.map