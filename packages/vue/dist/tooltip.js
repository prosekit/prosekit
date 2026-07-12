import { computed, defineComponent, h, shallowRef, watchEffect } from "vue";
import { registerTooltipPopupElement, registerTooltipPositionerElement, registerTooltipRootElement, registerTooltipTriggerElement } from "@prosekit/web/tooltip";
/** A Vue component that renders an `prosekit-tooltip-popup` custom element. */
const TooltipPopup = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerTooltipPopupElement();
	return () => {
		return h("prosekit-tooltip-popup", props, slots.default?.());
	};
}, { props: [] });
/** A Vue component that renders an `prosekit-tooltip-positioner` custom element. */
const TooltipPositioner = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerTooltipPositionerElement();
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
		return h("prosekit-tooltip-positioner", {
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
/** A Vue component that renders an `prosekit-tooltip-root` custom element. */
const TooltipRoot = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerTooltipRootElement();
	const elementRef = shallowRef(null);
	const splittedProps = computed(() => {
		const { defaultOpen: p0, disabled: p1, open: p2, onOpenChange: e0, ...restProps } = props;
		return [[
			p0,
			p1,
			p2,
			e0
		], restProps];
	});
	const handlers = [];
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const [p0, p1, p2, e0] = splittedProps.value[0];
		Object.assign(element, {
			defaultOpen: p0,
			disabled: p1,
			open: p2
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
		return h("prosekit-tooltip-root", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: [
	"defaultOpen",
	"disabled",
	"open",
	"onOpenChange"
] });
/** A Vue component that renders an `prosekit-tooltip-trigger` custom element. */
const TooltipTrigger = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerTooltipTriggerElement();
	const elementRef = shallowRef(null);
	const splittedProps = computed(() => {
		const { closeDelay: p0, disabled: p1, openDelay: p2, ...restProps } = props;
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
			closeDelay: p0,
			disabled: p1,
			openDelay: p2
		});
	});
	return () => {
		const restProps = splittedProps.value[1];
		return h("prosekit-tooltip-trigger", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: [
	"closeDelay",
	"disabled",
	"openDelay"
] });
export { TooltipPopup, TooltipPositioner, TooltipRoot, TooltipTrigger };

//# sourceMappingURL=tooltip.js.map