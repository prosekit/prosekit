import { t as useEditorExtension } from "./use-editor-extension.js";
import { t as getSafeEditorView } from "./get-safe-editor-view.js";
import { t as resolveAnchor } from "./resolve-anchor.js";
import { createContext, createSignal, defineCustomElement, defineProps, onMount, registerCustomElement, useEffect } from "@aria-ui/core";
import { SelectEvent, ValueChangeEvent, ValuesChangeEvent, defaultItemFilter, setupListboxEmpty, setupListboxItem, setupListboxRoot } from "@aria-ui/elements/listbox";
import { useEventListener } from "@aria-ui/utils";
import { OpenChangeEvent, OverlayPopupPropsDeclaration, OverlayPositionerPropsDeclaration, createOverlayStore, setupOverlayPopup, setupOverlayPositioner } from "@aria-ui/elements/overlay";
import { defineDOMEventHandler, defineKeymap, withPriority } from "@prosekit/core";
import { AutocompleteRule, defineAutocomplete } from "@prosekit/extensions/autocomplete";
/** @internal */
const AutocompleteEmptyPropsDeclaration = /* @__PURE__ */ defineProps({});
/**
* @internal
*/
function setupAutocompleteEmpty(host, props) {
	setupListboxEmpty(host, props);
}
const AutocompleteEmptyElementBase = defineCustomElement(setupAutocompleteEmpty, AutocompleteEmptyPropsDeclaration);
/**
* `<prosekit-autocomplete-empty>` custom element.
*
* Properties: {@link AutocompleteEmptyProps}
*/
var AutocompleteEmptyElement = class extends AutocompleteEmptyElementBase {};
/** @internal */
function registerAutocompleteEmptyElement() {
	registerCustomElement("prosekit-autocomplete-empty", AutocompleteEmptyElement);
}
function preventDefault(event) {
	event.preventDefault();
}
/** @internal */
const AutocompleteItemPropsDeclaration = /* @__PURE__ */ defineProps({
	value: {
		default: "",
		attribute: "value",
		type: "string"
	},
	disabled: {
		default: false,
		attribute: "disabled",
		type: "boolean"
	}
});
/**
* @internal
*/
function setupAutocompleteItem(host, props) {
	setupListboxItem(host, props);
	useEventListener(host, "pointerdown", preventDefault);
	useEventListener(host, "mousedown", preventDefault);
}
const AutocompleteItemElementBase = defineCustomElement(setupAutocompleteItem, AutocompleteItemPropsDeclaration);
/**
* `<prosekit-autocomplete-item>` custom element.
*
* Properties: {@link AutocompleteItemProps}
*
* Events: {@link AutocompleteItemEvents}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-highlighted` | Present when the item is the currently highlighted option |
*/
var AutocompleteItemElement = class extends AutocompleteItemElementBase {};
/** @internal */
function registerAutocompleteItemElement() {
	registerCustomElement("prosekit-autocomplete-item", AutocompleteItemElement);
}
function createLazySignal(getRemote, fallback) {
	return {
		get: () => {
			const remote = getRemote();
			return remote ? remote.get() : fallback;
		},
		set: (value) => {
			const remote = getRemote();
			if (remote) remote.set(value);
		}
	};
}
function useNoFocus(host) {
	onMount(host, () => {
		host.tabIndex = -1;
	});
}
/**
* @internal
*/
const autocompleteStoreContext = createContext("prosekit-autocomplete-store");
/** @internal */
const AutocompletePopupPropsDeclaration = /* @__PURE__ */ defineProps(OverlayPopupPropsDeclaration);
/** @internal */
function setupAutocompletePopup(host, _props) {
	const getStore = autocompleteStoreContext.consume(host);
	const getOverlayStore = () => getStore()?.overlayStore;
	setupOverlayPopup(host, getOverlayStore);
	const query = createLazySignal(() => getStore()?.query, " ");
	const eventTarget = createLazySignal(() => getStore()?.eventTarget, null);
	const filter = createLazySignal(() => getStore()?.filter, defaultItemFilter);
	const getDisabled = () => !getOverlayStore()?.getIsOpen?.();
	setupListboxRoot(host, createPopupListboxProps(filter, query, eventTarget, {
		get: getDisabled,
		set: () => {}
	}));
	useNoFocus(host);
}
function createPopupListboxProps(filter, query, eventTarget, disabled) {
	return {
		value: createSignal(""),
		values: createSignal([]),
		multiple: createSignal(false),
		disabled,
		orientation: createSignal("vertical"),
		loop: createSignal(false),
		autoHighlight: createSignal(true),
		query,
		eventTarget,
		filter
	};
}
const AutocompletePopupElementBase = defineCustomElement(setupAutocompletePopup, AutocompletePopupPropsDeclaration);
/**
* `<prosekit-autocomplete-popup>` custom element.
*
* Properties: {@link AutocompletePopupProps}
*
* Events: {@link AutocompletePopupEvents}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-state` | `"open"` when the autocomplete is visible, `"closed"` otherwise |
*/
var AutocompletePopupElement = class extends AutocompletePopupElementBase {};
/** @internal */
function registerAutocompletePopupElement() {
	registerCustomElement("prosekit-autocomplete-popup", AutocompletePopupElement);
}
const defaultBoundary = typeof document !== "undefined" && document.querySelector("body") || "clippingAncestors";
/** @internal */
const AutocompletePositionerPropsDeclaration = /* @__PURE__ */ defineProps({
	...OverlayPositionerPropsDeclaration,
	placement: {
		default: "bottom-start",
		attribute: "placement",
		type: "string"
	},
	offset: {
		default: {
			mainAxis: 8,
			crossAxis: -4
		},
		attribute: false
	},
	hide: {
		default: true,
		attribute: "hide",
		type: "boolean"
	},
	inline: {
		default: true,
		attribute: "inline",
		type: "boolean"
	},
	hoist: {
		default: true,
		attribute: "hoist",
		type: "boolean"
	},
	fitViewport: {
		default: true,
		attribute: "fit-viewport",
		type: "boolean"
	},
	boundary: {
		default: defaultBoundary,
		attribute: false
	},
	overflowPadding: {
		default: 8,
		attribute: "overflow-padding",
		type: "number"
	}
});
/** @internal */
function setupAutocompletePositioner(host, props) {
	const getStore = autocompleteStoreContext.consume(host);
	const getOverlayStore = () => getStore()?.overlayStore;
	setupOverlayPositioner(host, props, getOverlayStore);
}
const AutocompletePositionerElementBase = defineCustomElement(setupAutocompletePositioner, AutocompletePositionerPropsDeclaration);
/**
* `<prosekit-autocomplete-positioner>` custom element.
*
* Properties: {@link AutocompletePositionerProps}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-state` | `"open"` when the autocomplete is visible, `"closed"` otherwise |
* | `data-side` | The side of the anchor element the positioner is on |
* | `data-align` | The alignment of the positioner relative to the anchor element |
*
* CSS variables:
*
* | Variable | Description |
* | --- | --- |
* | `--transform-origin` | The coordinates that this element is anchored to. Useful for scale animations. |
*/
var AutocompletePositionerElement = class extends AutocompletePositionerElementBase {};
/** @internal */
function registerAutocompletePositionerElement() {
	registerCustomElement("prosekit-autocomplete-positioner", AutocompletePositionerElement);
}
function cloneKeyboardEvent(source) {
	return new KeyboardEvent(source.type, {
		code: source.code,
		key: source.key,
		location: source.location,
		repeat: source.repeat,
		altKey: source.altKey,
		ctrlKey: source.ctrlKey,
		metaKey: source.metaKey,
		shiftKey: source.shiftKey,
		view: source.view,
		bubbles: false,
		cancelable: true
	});
}
var KeyboardEventTarget = class extends EventTarget {
	dispatchEvent(event) {
		const newEvent = cloneKeyboardEvent(event);
		const result = super.dispatchEvent(newEvent);
		if (newEvent.defaultPrevented) event.preventDefault();
		return result;
	}
};
function defaultQueryBuilder(match) {
	return match[0].toLowerCase().replaceAll(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, "").replaceAll(/\s{2,}/g, " ").trim();
}
/** @internal */
const AutocompleteRootPropsDeclaration = /* @__PURE__ */ defineProps({
	editor: {
		default: null,
		attribute: false
	},
	regex: {
		default: null,
		attribute: false
	},
	filter: {
		default: defaultItemFilter,
		attribute: false
	},
	queryBuilder: {
		default: defaultQueryBuilder,
		attribute: false
	},
	anchor: {
		default: null,
		attribute: false
	},
	followCursor: {
		default: false,
		attribute: "follow-cursor",
		type: "boolean"
	}
});
var QueryChangeEvent = class extends Event {
	constructor(query) {
		super("queryChange", { bubbles: true });
		this.detail = query;
	}
};
/**
* @internal
*/
function setupAutocompleteRoot(host, props) {
	const getEditor = props.editor.get;
	const reference = createSignal(void 0);
	const open = createSignal(false);
	const query = createSignal("");
	const keyboardTarget = new KeyboardEventTarget();
	const eventTarget = createSignal(keyboardTarget);
	const handlers = {};
	const overlayStore = createOverlayStore(open.get, open.set, () => false, () => false, (event) => host.dispatchEvent(event));
	useEffect(host, () => {
		overlayStore.setAnchorElement(reference.get());
	});
	const autocompleteStore = {
		overlayStore,
		query,
		eventTarget,
		filter: props.filter
	};
	autocompleteStoreContext.provide(host, autocompleteStore);
	useEventListener(host, "valueChange", () => {
		handlers.submit?.();
	});
	useKeyboardBridge(host, getEditor, open.get, keyboardTarget);
	useEscapeKeydown(host, getEditor, () => {
		if (!open.get() || !handlers.dismiss) return false;
		handlers.dismiss();
		return true;
	});
	const setQuery = (next) => {
		if (query.get() === next) return;
		query.set(next);
		host.dispatchEvent(new QueryChangeEvent(next));
	};
	const getAnchor = () => {
		const customAnchor = resolveAnchor(props.anchor.get());
		if (customAnchor) return customAnchor;
		return getSafeEditorView(getEditor())?.dom.querySelector(".prosekit-autocomplete-match") || null;
	};
	useAutocompleteExtension(host, getEditor, props.regex.get, getAnchor, reference, handlers, setQuery, props.queryBuilder.get, props.followCursor.get, (open) => overlayStore.requestOpenChange(open));
}
const EVENT_KEYS = [
	"ArrowDown",
	"ArrowRight",
	"ArrowUp",
	"ArrowLeft",
	"Home",
	"End",
	"Enter"
];
function useKeyboardBridge(host, getEditor, getOpen, target) {
	useEditorExtension(host, getEditor, withPriority(defineDOMEventHandler("keydown", (view, event) => {
		if (view.composing || event.defaultPrevented || !getOpen() || !EVENT_KEYS.includes(event.key)) return false;
		target.dispatchEvent(event);
		return event.defaultPrevented;
	}), 4));
}
function useAutocompleteExtension(host, getEditor, getRegex, getAnchor, reference, handlers, setQuery, getQueryBuilder, getFollowCursor, requestOpenChange) {
	useEffect(host, () => {
		const editor = getEditor();
		const regex = getRegex();
		const followCursor = getFollowCursor();
		if (!editor || !regex) return;
		const extension = defineAutocomplete(createAutocompleteRule(regex, getAnchor, reference, handlers, setQuery, getQueryBuilder, followCursor, requestOpenChange));
		return editor.use(extension);
	});
}
function createAutocompleteRule(regex, getAnchor, reference, handlers, setQuery, getQueryBuilder, followCursor, requestOpenChange) {
	const handleEnter = (options) => {
		const anchor = getAnchor();
		reference.set(anchor || void 0);
		handlers.submit = options.deleteMatch;
		handlers.dismiss = options.ignoreMatch;
		setQuery(getQueryBuilder()(options.match));
		requestOpenChange(true);
	};
	const handleLeave = () => {
		reference.set(void 0);
		setQuery("");
		handlers.submit = void 0;
		handlers.dismiss = void 0;
		requestOpenChange(false);
	};
	return new AutocompleteRule({
		regex,
		onEnter: handleEnter,
		onLeave: handleLeave,
		followCursor
	});
}
function useEscapeKeydown(host, getEditor, handler) {
	useEditorExtension(host, getEditor, withPriority(defineKeymap({ Escape: handler }), 4));
}
const AutocompleteRootElementBase = defineCustomElement(setupAutocompleteRoot, AutocompleteRootPropsDeclaration);
/**
* `<prosekit-autocomplete-root>` custom element.
*
* Properties: {@link AutocompleteRootProps}
*
* Events: {@link AutocompleteRootEvents}
*/
var AutocompleteRootElement = class extends AutocompleteRootElementBase {};
/** @internal */
function registerAutocompleteRootElement() {
	registerCustomElement("prosekit-autocomplete-root", AutocompleteRootElement);
}
export { AutocompleteEmptyElement, AutocompleteEmptyPropsDeclaration, AutocompleteItemElement, AutocompleteItemPropsDeclaration, AutocompletePopupElement, AutocompletePopupPropsDeclaration, AutocompletePositionerElement, AutocompletePositionerPropsDeclaration, AutocompleteRootElement, AutocompleteRootPropsDeclaration, OpenChangeEvent, QueryChangeEvent, SelectEvent, ValueChangeEvent, ValuesChangeEvent, defaultQueryBuilder, registerAutocompleteEmptyElement, registerAutocompleteItemElement, registerAutocompletePopupElement, registerAutocompletePositionerElement, registerAutocompleteRootElement, setupAutocompleteEmpty, setupAutocompleteItem, setupAutocompletePopup, setupAutocompletePositioner, setupAutocompleteRoot };

//# sourceMappingURL=autocomplete.js.map