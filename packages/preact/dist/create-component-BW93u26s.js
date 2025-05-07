import { useEditorContext } from "./editor-context-imq7MdJr.js";
import { createElement } from "preact";
import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import { forwardRef } from "preact/compat";
import { mergeRefs } from "react-merge-refs";

//#region src/components/create-component.ts
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
function createComponent(tagName, displayName, propNames, eventNames) {
	const hasEditor = propNames.includes("editor");
	const lowerCaseEventNameMap = Object.fromEntries(eventNames.map((name) => [name.toLowerCase(), name]));
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
				const eventName = lowerCaseEventNameMap[lowerCaseEventName];
				const handler = value;
				if (eventName && handler) {
					const extractDetail = eventName.endsWith("Change");
					const normalizedHandler = extractDetail ? (event) => {
						handler(event.detail);
					} : handler;
					eventHandlers[eventName] = normalizedHandler;
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
		return createElement(tagName, {
			...attributes,
			ref: mergeRefs([ref, setEl])
		});
	});
	Component.displayName = displayName;
	return Component;
}

//#endregion
export { createComponent };