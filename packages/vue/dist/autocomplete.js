import { n as useEditorContext } from "./editor-context.js";
import { computed, defineComponent, h, shallowRef, watchEffect } from "vue";
import { registerAutocompleteEmptyElement, registerAutocompleteItemElement, registerAutocompletePopupElement, registerAutocompletePositionerElement, registerAutocompleteRootElement } from "@prosekit/web/autocomplete";
/** A Vue component that renders an `prosekit-autocomplete-empty` custom element. */
const AutocompleteEmpty = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerAutocompleteEmptyElement();
	return () => {
		return h("prosekit-autocomplete-empty", props, slots.default?.());
	};
}, { props: [] });
/** A Vue component that renders an `prosekit-autocomplete-item` custom element. */
const AutocompleteItem = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerAutocompleteItemElement();
	const elementRef = shallowRef(null);
	const splittedProps = computed(() => {
		const { disabled: p0, value: p1, onSelect: e0, ...restProps } = props;
		return [[
			p0,
			p1,
			e0
		], restProps];
	});
	const handlers = [];
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const [p0, p1, e0] = splittedProps.value[0];
		Object.assign(element, {
			disabled: p0,
			value: p1
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
		return h("prosekit-autocomplete-item", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: [
	"disabled",
	"value",
	"onSelect"
] });
/** A Vue component that renders an `prosekit-autocomplete-popup` custom element. */
const AutocompletePopup = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerAutocompletePopupElement();
	const elementRef = shallowRef(null);
	const splittedProps = computed(() => {
		const { onValueChange: e0, onValuesChange: e1, ...restProps } = props;
		return [[e0, e1], restProps];
	});
	const handlers = [];
	watchEffect(() => {
		if (!elementRef.value) return;
		const [e0, e1] = splittedProps.value[0];
		handlers.length = 0;
		handlers.push(e0);
		handlers.push(e1);
	});
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const ac = new AbortController();
		for (const [index, eventName] of ["valueChange", "valuesChange"].entries()) element.addEventListener(eventName, (event) => {
			handlers[index]?.(event);
		}, { signal: ac.signal });
		return () => ac.abort();
	});
	return () => {
		const restProps = splittedProps.value[1];
		return h("prosekit-autocomplete-popup", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: ["onValueChange", "onValuesChange"] });
/** A Vue component that renders an `prosekit-autocomplete-positioner` custom element. */
const AutocompletePositioner = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerAutocompletePositionerElement();
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
		return h("prosekit-autocomplete-positioner", {
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
/** A Vue component that renders an `prosekit-autocomplete-root` custom element. */
const AutocompleteRoot = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerAutocompleteRootElement();
	const elementRef = shallowRef(null);
	const p1Fallback = useEditorContext();
	const splittedProps = computed(() => {
		const { anchor: p0, editor: p1, filter: p2, followCursor: p3, queryBuilder: p4, regex: p5, onOpenChange: e0, onQueryChange: e1, onValueChange: e2, onValuesChange: e3, ...restProps } = props;
		return [[
			p0,
			p1,
			p2,
			p3,
			p4,
			p5,
			e0,
			e1,
			e2,
			e3
		], restProps];
	});
	const handlers = [];
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const [p0, p1, p2, p3, p4, p5, e0, e1, e2, e3] = splittedProps.value[0];
		Object.assign(element, {
			anchor: p0,
			editor: p1 ?? p1Fallback,
			filter: p2,
			followCursor: p3,
			queryBuilder: p4,
			regex: p5
		});
		handlers.length = 0;
		handlers.push(e0);
		handlers.push(e1);
		handlers.push(e2);
		handlers.push(e3);
	});
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const ac = new AbortController();
		for (const [index, eventName] of [
			"openChange",
			"queryChange",
			"valueChange",
			"valuesChange"
		].entries()) element.addEventListener(eventName, (event) => {
			handlers[index]?.(event);
		}, { signal: ac.signal });
		return () => ac.abort();
	});
	return () => {
		const restProps = splittedProps.value[1];
		return h("prosekit-autocomplete-root", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: [
	"anchor",
	"editor",
	"filter",
	"followCursor",
	"queryBuilder",
	"regex",
	"onOpenChange",
	"onQueryChange",
	"onValueChange",
	"onValuesChange"
] });
export { AutocompleteEmpty, AutocompleteItem, AutocompletePopup, AutocompletePositioner, AutocompleteRoot };

//# sourceMappingURL=autocomplete.js.map