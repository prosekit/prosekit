"use client";
import { n as useEditorContext } from "./editor-context.js";
import { createElement, forwardRef, useCallback, useLayoutEffect, useRef } from "react";
import { registerAutocompleteEmptyElement, registerAutocompleteItemElement, registerAutocompletePopupElement, registerAutocompletePositionerElement, registerAutocompleteRootElement } from "@prosekit/web/autocomplete";
function AutocompleteEmptyComponent(props, forwardedRef) {
	registerAutocompleteEmptyElement();
	const elementRef = useRef(null);
	const { ...restProps } = props;
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-autocomplete-empty", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A React component that renders an `prosekit-autocomplete-empty` custom element. */
const AutocompleteEmpty = /* @__PURE__ */ forwardRef(AutocompleteEmptyComponent);
function AutocompleteItemComponent(props, forwardedRef) {
	registerAutocompleteItemElement();
	const elementRef = useRef(null);
	const handlersRef = useRef([]);
	const { disabled: p0, value: p1, onSelect: e0, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, {
			disabled: p0,
			value: p1
		});
		handlersRef.current = [e0];
	});
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		const ac = new AbortController();
		for (const [index, eventName] of ["select"].entries()) element.addEventListener(eventName, (event) => {
			handlersRef.current[index]?.(event);
		}, { signal: ac.signal });
		return () => ac.abort();
	}, []);
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-autocomplete-item", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A React component that renders an `prosekit-autocomplete-item` custom element. */
const AutocompleteItem = /* @__PURE__ */ forwardRef(AutocompleteItemComponent);
function AutocompletePopupComponent(props, forwardedRef) {
	registerAutocompletePopupElement();
	const elementRef = useRef(null);
	const handlersRef = useRef([]);
	const { onValueChange: e0, onValuesChange: e1, ...restProps } = props;
	useLayoutEffect(() => {
		if (!elementRef.current) return;
		handlersRef.current = [e0, e1];
	});
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		const ac = new AbortController();
		for (const [index, eventName] of ["valueChange", "valuesChange"].entries()) element.addEventListener(eventName, (event) => {
			handlersRef.current[index]?.(event);
		}, { signal: ac.signal });
		return () => ac.abort();
	}, []);
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-autocomplete-popup", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A React component that renders an `prosekit-autocomplete-popup` custom element. */
const AutocompletePopup = /* @__PURE__ */ forwardRef(AutocompletePopupComponent);
function AutocompletePositionerComponent(props, forwardedRef) {
	registerAutocompletePositionerElement();
	const elementRef = useRef(null);
	const { altBoundary: p0, autoUpdate: p1, boundary: p2, elementContext: p3, fitViewport: p4, flip: p5, hide: p6, hoist: p7, inline: p8, offset: p9, overflowPadding: p10, overlap: p11, placement: p12, rootBoundary: p13, sameHeight: p14, sameWidth: p15, shift: p16, strategy: p17, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
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
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-autocomplete-positioner", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A React component that renders an `prosekit-autocomplete-positioner` custom element. */
const AutocompletePositioner = /* @__PURE__ */ forwardRef(AutocompletePositionerComponent);
function AutocompleteRootComponent(props, forwardedRef) {
	registerAutocompleteRootElement();
	const elementRef = useRef(null);
	const handlersRef = useRef([]);
	const p1Fallback = useEditorContext();
	const { anchor: p0, editor: p1, filter: p2, followCursor: p3, queryBuilder: p4, regex: p5, onOpenChange: e0, onQueryChange: e1, onValueChange: e2, onValuesChange: e3, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, {
			anchor: p0,
			editor: p1 ?? p1Fallback,
			filter: p2,
			followCursor: p3,
			queryBuilder: p4,
			regex: p5
		});
		handlersRef.current = [
			e0,
			e1,
			e2,
			e3
		];
	});
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		const ac = new AbortController();
		for (const [index, eventName] of [
			"openChange",
			"queryChange",
			"valueChange",
			"valuesChange"
		].entries()) element.addEventListener(eventName, (event) => {
			handlersRef.current[index]?.(event);
		}, { signal: ac.signal });
		return () => ac.abort();
	}, []);
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-autocomplete-root", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A React component that renders an `prosekit-autocomplete-root` custom element. */
const AutocompleteRoot = /* @__PURE__ */ forwardRef(AutocompleteRootComponent);
/**

@module

## Anatomy

```jsx
import {
AutocompleteEmpty,
AutocompleteItem,
AutocompletePopup,
AutocompletePositioner,
AutocompleteRoot,
} from 'prosekit/react/autocomplete'

<AutocompleteRoot>
<AutocompletePositioner>
<AutocompletePopup>
<AutocompleteItem>...</AutocompleteItem>
<AutocompleteEmpty>...</AutocompleteEmpty>
</AutocompletePopup>
</AutocompletePositioner>
</AutocompleteRoot>
```
*/
export { AutocompleteEmpty, AutocompleteItem, AutocompletePopup, AutocompletePositioner, AutocompleteRoot };

//# sourceMappingURL=autocomplete.js.map