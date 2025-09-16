import { useEditorContext } from "./editor-context-Cci4uqN_.js";
import { createElement, forwardRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

//#region src/components/merge-refs.ts
/**
* Assigns a value to a ref.
* @returns The ref cleanup callback, if any.
*/
function assignRef(ref, value) {
	if (typeof ref === "function") return ref(value);
	else if (ref) ref.current = value;
}
/**
* Merges multiple refs into a single one.
*/
function mergeRefs(refs) {
	return (value) => {
		const cleanups = [];
		for (const ref of refs) {
			const cleanup = assignRef(ref, value);
			const isCleanup = typeof cleanup === "function";
			cleanups.push(isCleanup ? cleanup : () => assignRef(ref, null));
		}
		return () => {
			for (const cleanup of cleanups) cleanup();
		};
	};
}

//#endregion
//#region src/components/create-component.ts
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
function createComponent(tagName, displayName, propNames, eventNames) {
	const hasEditor = propNames.includes("editor");
	const lowerCaseEventNameMap = new Map(eventNames.map((name) => [name.toLowerCase(), name]));
	const Component = forwardRef((props, ref) => {
		const [el, setEl] = useState(null);
		const properties = {};
		const attributes = {};
		const eventHandlersRef = useRef({});
		const eventHandlers = {};
		for (const [name, value] of Object.entries(props)) {
			if (value === void 0) continue;
			if (propNames.includes(name)) {
				properties[name] = value;
				continue;
			}
			if (name.startsWith("on")) {
				const lowerCaseEventName = name.slice(2).toLowerCase();
				const eventName = lowerCaseEventNameMap.get(lowerCaseEventName);
				if (eventName) {
					const extractDetail = eventName.endsWith("Change");
					eventHandlers[eventName] = (event) => {
						const handler = value;
						if (typeof handler === "function") handler(extractDetail ? event.detail : event);
					};
					continue;
				}
			}
			if (name === "className") attributes["class"] = value;
			else attributes[name] = value;
		}
		const editor = useEditorContext();
		if (hasEditor && editor && !properties["editor"]) properties["editor"] = editor;
		useIsomorphicLayoutEffect(() => {
			if (!el) return;
			for (const [name, value] of Object.entries(properties)) if (value !== void 0) el[name] = value;
		}, [el, ...propNames.map((name) => properties[name])]);
		useIsomorphicLayoutEffect(() => {
			eventHandlersRef.current = eventHandlers;
		});
		useIsomorphicLayoutEffect(() => {
			if (!el) return;
			const fixedEventHandlers = {};
			for (const eventName of eventNames) fixedEventHandlers[eventName] = (event) => {
				eventHandlersRef.current[eventName]?.(event);
			};
			for (const [name, handler] of Object.entries(fixedEventHandlers)) el.addEventListener(name, handler);
			return () => {
				for (const [name, handler] of Object.entries(fixedEventHandlers)) el.removeEventListener(name, handler);
			};
		}, [el]);
		const mergedRef = useMemo(() => mergeRefs([ref, setEl]), [ref]);
		return createElement(tagName, {
			...attributes,
			ref: mergedRef
		});
	});
	Component.displayName = displayName;
	return Component;
}

//#endregion
export { createComponent };
//# sourceMappingURL=create-component-CBvs05W1.js.map