import { t as getStateWithDefaults } from "./get-default-state-BzBimBWi.js";
import { t as useEditorExtension } from "./use-editor-extension-B2WuUfnd.js";
import { t as getSafeEditorView } from "./get-safe-editor-view-Dt9Amrcn.js";
import { createComputed, createContext, createSignal, defineCustomElement, registerCustomElement, useAnimationFrame, useAttribute, useEffect, useEventListener } from "@aria-ui/core";
import { listboxProps, useListbox, useListboxEmpty, useListboxItem } from "@aria-ui/listbox/elements";
import { listboxEvents, listboxItemEvents, listboxProps as listboxProps$1 } from "@aria-ui/listbox";
import { Priority, defineDOMEventHandler, defineKeymap, withPriority } from "@prosekit/core";
import { overlayPositionerEvents, overlayPositionerProps, useOverlayPositionerState } from "@aria-ui/overlay/elements";
import { usePresence } from "@aria-ui/presence";
import { AutocompleteRule, defineAutocomplete } from "@prosekit/extensions/autocomplete";

//#region src/components/autocomplete/autocomplete-empty/setup.ts
/**
* @internal
*/
const useAutocompleteEmpty = useListboxEmpty;

//#endregion
//#region src/components/autocomplete/autocomplete-empty/types.ts
/** @internal */
const autocompleteEmptyProps = {};
/** @internal */
const autocompleteEmptyEvents = {};

//#endregion
//#region src/components/autocomplete/autocomplete-empty/element.gen.ts
const AutocompleteEmptyElementBase = defineCustomElement({
	props: autocompleteEmptyProps,
	events: autocompleteEmptyEvents,
	setup: useAutocompleteEmpty
});
var AutocompleteEmptyElement = class extends AutocompleteEmptyElementBase {};
registerCustomElement("prosekit-autocomplete-empty", AutocompleteEmptyElement);

//#endregion
//#region src/components/autocomplete/context.ts
const queryContext = createContext("prosekit/autocomplete-popover/query", "");
const onSubmitContext = createContext("prosekit/autocomplete-popover/onSubmit", null);
const openContext = createContext("prosekit/autocomplete-popover/open", false);

//#endregion
//#region src/components/autocomplete/autocomplete-item/setup.ts
/**
* @internal
*/
function useAutocompleteItem(element, { state, emit }) {
	useListboxItem(element, {
		state,
		emit
	});
	const open = openContext.consume(element);
	useEffect(element, () => {
		if (!state.value.peek() && open.get()) state.value.set(element.textContent ?? "");
	});
	useEventListener(element, "pointerdown", (event) => {
		event.preventDefault();
	});
}

//#endregion
//#region src/components/autocomplete/autocomplete-item/types.ts
/** @internal */
const autocompleteItemProps = { value: { default: "" } };
/** @internal */
const autocompleteItemEvents = listboxItemEvents;

//#endregion
//#region src/components/autocomplete/autocomplete-item/element.gen.ts
const AutocompleteItemElementBase = defineCustomElement({
	props: autocompleteItemProps,
	events: autocompleteItemEvents,
	setup: useAutocompleteItem
});
var AutocompleteItemElement = class extends AutocompleteItemElementBase {};
registerCustomElement("prosekit-autocomplete-item", AutocompleteItemElement);

//#endregion
//#region src/components/autocomplete/autocomplete-list/setup.ts
/**
* @internal
*/
function useAutocompleteList(element, { state, emit }) {
	const open = openContext.consume(element);
	const query = queryContext.consume(element);
	const onSubmit = onSubmitContext.consume(element);
	const keydownTarget = useKeyDownTarget(element, open, state.editor);
	const listboxState = getStateWithDefaults({
		filter: state.filter,
		eventTarget: createSignal(keydownTarget)
	}, listboxProps);
	useEffect(element, () => {
		element.addEventListener("valueChange", () => {
			if (onSubmit) onSubmit.get()?.();
		});
	});
	useListbox(element, {
		state: listboxState,
		emit
	});
	useEffect(element, () => {
		listboxState.query.set(query.get());
	});
	useEffect(element, () => {
		if (!open.get()) {
			listboxState.value.set("");
			query.set("");
		}
	});
	useEffect(element, () => {
		if (!open.get()) listboxState.autoFocus.set(false);
		else {
			let canceled = false;
			requestAnimationFrame(() => {
				if (canceled) return;
				listboxState.autoFocus.set(true);
			});
			return () => {
				canceled = true;
			};
		}
	});
	useEffect(element, () => {
		element.tabIndex = -1;
	});
}
function useKeyDownTarget(element, open, editor) {
	const keydownHandlers = [];
	useEffect(element, () => {
		const editorValue = editor.get();
		if (!editorValue) return;
		const extension = defineDOMEventHandler("keydown", (view, event) => {
			if (view.composing || event.defaultPrevented || !open.get()) return false;
			keydownHandlers.forEach((handler) => handler(event));
			return event.defaultPrevented;
		});
		return editorValue.use(withPriority(extension, Priority.highest));
	});
	return {
		addEventListener: (type, listener) => {
			if (type === "keydown") keydownHandlers.push(listener);
		},
		removeEventListener: (type, listener) => {
			if (type === "keydown") {
				const index = keydownHandlers.indexOf(listener);
				if (index !== -1) keydownHandlers.splice(index, 1);
			}
		}
	};
}

//#endregion
//#region src/components/autocomplete/autocomplete-list/types.ts
const autocompleteListProps = {
	filter: listboxProps$1.filter,
	editor: { default: null }
};
const autocompleteListEvents = { ...listboxEvents };

//#endregion
//#region src/components/autocomplete/autocomplete-list/element.gen.ts
const AutocompleteListElementBase = defineCustomElement({
	props: autocompleteListProps,
	events: autocompleteListEvents,
	setup: useAutocompleteList
});
var AutocompleteListElement = class extends AutocompleteListElementBase {};
registerCustomElement("prosekit-autocomplete-list", AutocompleteListElement);

//#endregion
//#region src/hooks/use-first-rendering.ts
function useFirstRendering(host) {
	const firstRendering = createSignal(true);
	useEffect(host, () => {
		requestAnimationFrame(() => {
			firstRendering.set(false);
		});
	});
	return firstRendering;
}

//#endregion
//#region src/components/autocomplete/autocomplete-popover/helpers.ts
function defaultQueryBuilder(match) {
	return match[0].toLowerCase().replace(/[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g, "").replace(/\s\s+/g, " ").trim();
}

//#endregion
//#region src/components/autocomplete/autocomplete-popover/setup.ts
/**
* @internal
*/
function useAutocompletePopover(host, { state, emit }) {
	const { editor, regex, ...overlayState } = state;
	const reference = createSignal(null);
	const query = createSignal("");
	const onDismiss = createSignal(null);
	const onSubmit = createSignal(null);
	const presence = createComputed(() => !!reference.get());
	queryContext.provide(host, query);
	onSubmitContext.provide(host, onSubmit);
	openContext.provide(host, presence);
	useEscapeKeydown(host, editor, createKeymapHandler(onDismiss, presence));
	useAutocompleteExtension(host, editor, regex, reference, query, onDismiss, onSubmit);
	useOverlayPositionerState(host, overlayState, { reference });
	useAttribute(host, "data-state", () => presence.get() ? "open" : "closed");
	usePresence(host, presence);
	const firstRendering = useFirstRendering(host);
	useEffect(host, () => {
		const queryValue = query.get();
		if (!firstRendering.peek()) emit("queryChange", queryValue);
	});
	useAnimationFrame(host, () => {
		const presenceValue = presence.get();
		return () => {
			emit("openChange", presenceValue);
		};
	});
}
function useAutocompleteExtension(host, editor, regex, reference, query, onDismiss, onSubmit) {
	useEffect(host, () => {
		const editorValue = editor.get();
		const regexValue = regex.get();
		if (!editorValue || !regexValue) return;
		const extension = defineAutocomplete(createAutocompleteRule(editorValue, regexValue, reference, query, onDismiss, onSubmit));
		return editorValue.use(extension);
	});
}
function createAutocompleteRule(editor, regex, reference, query, onDismiss, onSubmit) {
	const handleEnter = (options) => {
		const span = getSafeEditorView(editor)?.dom.querySelector(".prosekit-autocomplete-match");
		if (span) reference.set(span);
		query.set(defaultQueryBuilder(options.match));
		onDismiss.set(options.ignoreMatch);
		onSubmit.set(options.deleteMatch);
	};
	const handleLeave = () => {
		reference.set(null);
		query.set("");
	};
	return new AutocompleteRule({
		regex,
		onEnter: handleEnter,
		onLeave: handleLeave
	});
}
function createKeymapHandler(handler, enabled) {
	return () => {
		if (!enabled.get()) return false;
		const fn = handler.peek();
		if (!fn) return false;
		fn();
		return true;
	};
}
function useEscapeKeydown(host, editor, handler) {
	useEditorExtension(host, editor, withPriority(defineKeymap({ Escape: handler }), Priority.highest));
}

//#endregion
//#region src/components/autocomplete/autocomplete-popover/types.ts
const defaultBoundary = typeof document !== "undefined" && document.querySelector("body") || "clippingAncestors";
/** @internal */
const autocompletePopoverProps = {
	...overlayPositionerProps,
	editor: { default: null },
	regex: { default: null },
	placement: { default: "bottom-start" },
	offset: { default: 4 },
	inline: { default: true },
	hoist: { default: true },
	fitViewport: { default: true },
	boundary: { default: defaultBoundary },
	overflowPadding: { default: 8 }
};
/** @internal */
const autocompletePopoverEvents = {
	...overlayPositionerEvents,
	openChange: {},
	queryChange: {}
};

//#endregion
//#region src/components/autocomplete/autocomplete-popover/element.gen.ts
const AutocompletePopoverElementBase = defineCustomElement({
	props: autocompletePopoverProps,
	events: autocompletePopoverEvents,
	setup: useAutocompletePopover
});
var AutocompletePopoverElement = class extends AutocompletePopoverElementBase {};
registerCustomElement("prosekit-autocomplete-popover", AutocompletePopoverElement);

//#endregion
export { AutocompleteEmptyElement, AutocompleteItemElement, AutocompleteListElement, AutocompletePopoverElement, autocompleteEmptyEvents, autocompleteEmptyProps, autocompleteItemEvents, autocompleteItemProps, autocompleteListEvents, autocompleteListProps, autocompletePopoverEvents, autocompletePopoverProps, useAutocompleteEmpty, useAutocompleteItem, useAutocompleteList, useAutocompletePopover };
//# sourceMappingURL=prosekit-web-autocomplete.js.map