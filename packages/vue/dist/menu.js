import { computed, defineComponent, h, shallowRef, watchEffect } from "vue";
import { registerMenuItemElement, registerMenuPopupElement, registerMenuPositionerElement, registerMenuRootElement, registerMenuSubmenuRootElement, registerMenuSubmenuTriggerElement, registerMenuTriggerElement } from "@prosekit/web/menu";
/** A Vue component that renders an `prosekit-menu-item` custom element. */
const MenuItem = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerMenuItemElement();
	const elementRef = shallowRef(null);
	const splittedProps = computed(() => {
		const { closeOnSelect: p0, disabled: p1, value: p2, onSelect: e0, ...restProps } = props;
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
			closeOnSelect: p0,
			disabled: p1,
			value: p2
		});
		handlers.length = 0;
		handlers.push(e0);
	});
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const ac = new AbortController();
		for (const [index, eventName] of ["select"].entries()) element.addEventListener(eventName, (event) => {
			handlers[index]?.(event);
		}, { signal: ac.signal });
		return () => ac.abort();
	});
	return () => {
		const restProps = splittedProps.value[1];
		return h("prosekit-menu-item", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: [
	"closeOnSelect",
	"disabled",
	"value",
	"onSelect"
] });
/** A Vue component that renders an `prosekit-menu-popup` custom element. */
const MenuPopup = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerMenuPopupElement();
	const elementRef = shallowRef(null);
	const splittedProps = computed(() => {
		const { eventTarget: p0, ...restProps } = props;
		return [[p0], restProps];
	});
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const [p0] = splittedProps.value[0];
		Object.assign(element, { eventTarget: p0 });
	});
	return () => {
		const restProps = splittedProps.value[1];
		return h("prosekit-menu-popup", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: ["eventTarget"] });
/** A Vue component that renders an `prosekit-menu-positioner` custom element. */
const MenuPositioner = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerMenuPositionerElement();
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
		return h("prosekit-menu-positioner", {
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
/** A Vue component that renders an `prosekit-menu-root` custom element. */
const MenuRoot = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerMenuRootElement();
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
		return h("prosekit-menu-root", {
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
/** A Vue component that renders an `prosekit-menu-submenu-root` custom element. */
const MenuSubmenuRoot = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerMenuSubmenuRootElement();
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
		return h("prosekit-menu-submenu-root", {
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
/** A Vue component that renders an `prosekit-menu-submenu-trigger` custom element. */
const MenuSubmenuTrigger = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerMenuSubmenuTriggerElement();
	const elementRef = shallowRef(null);
	const splittedProps = computed(() => {
		const { disabled: p0, value: p1, ...restProps } = props;
		return [[p0, p1], restProps];
	});
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const [p0, p1] = splittedProps.value[0];
		Object.assign(element, {
			disabled: p0,
			value: p1
		});
	});
	return () => {
		const restProps = splittedProps.value[1];
		return h("prosekit-menu-submenu-trigger", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: ["disabled", "value"] });
/** A Vue component that renders an `prosekit-menu-trigger` custom element. */
const MenuTrigger = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerMenuTriggerElement();
	const elementRef = shallowRef(null);
	const splittedProps = computed(() => {
		const { disabled: p0, onOpenChange: e0, ...restProps } = props;
		return [[p0, e0], restProps];
	});
	const handlers = [];
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const [p0, e0] = splittedProps.value[0];
		Object.assign(element, { disabled: p0 });
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
		return h("prosekit-menu-trigger", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: ["disabled", "onOpenChange"] });
export { MenuItem, MenuPopup, MenuPositioner, MenuRoot, MenuSubmenuRoot, MenuSubmenuTrigger, MenuTrigger };

//# sourceMappingURL=menu.js.map