import { n as useEditorContext } from "./editor-context.js";
import { createEffect, createSignal, mergeProps, splitProps } from "solid-js";
import { registerAutocompleteEmptyElement, registerAutocompleteItemElement, registerAutocompletePopupElement, registerAutocompletePositionerElement, registerAutocompleteRootElement } from "@prosekit/web/autocomplete";
import h from "solid-js/h";
/** A Solid component that renders an `prosekit-autocomplete-empty` custom element. */
const AutocompleteEmpty = (props) => {
	registerAutocompleteEmptyElement();
	const restProps = props;
	return () => h("prosekit-autocomplete-empty", restProps);
};
/** A Solid component that renders an `prosekit-autocomplete-item` custom element. */
const AutocompleteItem = (props) => {
	registerAutocompleteItemElement();
	const [getElement, setElement] = createSignal(null);
	const handlers = [];
	const [elementProps, eventHandlers, restProps] = splitProps(props, ["disabled", "value"], ["onSelect"]);
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, {
			disabled: elementProps.disabled,
			value: elementProps.value
		});
		handlers.length = 0;
		handlers.push(eventHandlers.onSelect);
	});
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		const ac = new AbortController();
		for (const [index, eventName] of ["select"].entries()) element.addEventListener(eventName, (event) => {
			handlers[index]?.(event);
		}, { signal: ac.signal });
		return () => ac.abort();
	});
	return () => h("prosekit-autocomplete-item", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-autocomplete-popup` custom element. */
const AutocompletePopup = (props) => {
	registerAutocompletePopupElement();
	const [getElement, setElement] = createSignal(null);
	const handlers = [];
	const [eventHandlers, restProps] = splitProps(props, ["onValueChange", "onValuesChange"]);
	createEffect(() => {
		if (!getElement()) return;
		handlers.length = 0;
		handlers.push(eventHandlers.onValueChange);
		handlers.push(eventHandlers.onValuesChange);
	});
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		const ac = new AbortController();
		for (const [index, eventName] of ["valueChange", "valuesChange"].entries()) element.addEventListener(eventName, (event) => {
			handlers[index]?.(event);
		}, { signal: ac.signal });
		return () => ac.abort();
	});
	return () => h("prosekit-autocomplete-popup", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-autocomplete-positioner` custom element. */
const AutocompletePositioner = (props) => {
	registerAutocompletePositionerElement();
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
	return () => h("prosekit-autocomplete-positioner", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
/** A Solid component that renders an `prosekit-autocomplete-root` custom element. */
const AutocompleteRoot = (props) => {
	registerAutocompleteRootElement();
	const [getElement, setElement] = createSignal(null);
	const handlers = [];
	const [elementProps, eventHandlers, restProps] = splitProps(props, [
		"anchor",
		"editor",
		"filter",
		"followCursor",
		"queryBuilder",
		"regex"
	], [
		"onOpenChange",
		"onQueryChange",
		"onValueChange",
		"onValuesChange"
	]);
	const p1Fallback = useEditorContext();
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, {
			anchor: elementProps.anchor,
			editor: elementProps.editor ?? p1Fallback,
			filter: elementProps.filter,
			followCursor: elementProps.followCursor,
			queryBuilder: elementProps.queryBuilder,
			regex: elementProps.regex
		});
		handlers.length = 0;
		handlers.push(eventHandlers.onOpenChange);
		handlers.push(eventHandlers.onQueryChange);
		handlers.push(eventHandlers.onValueChange);
		handlers.push(eventHandlers.onValuesChange);
	});
	createEffect(() => {
		const element = getElement();
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
	return () => h("prosekit-autocomplete-root", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
export { AutocompleteEmpty, AutocompleteItem, AutocompletePopup, AutocompletePositioner, AutocompleteRoot };

//# sourceMappingURL=autocomplete.js.map