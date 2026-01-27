import { n as useEditorContext } from "./editor-context-B5bsBkGo.js";
import h from "solid-js/h";

//#region src/components/create-component.ts
function createComponent(tagName, propNames, eventNames) {
	const hasEditor = propNames.includes("editor");
	const lowerCaseEventNameMap = new Map(eventNames.map((name) => [name.toLowerCase(), name]));
	const Component = (props) => {
		const properties = {};
		const eventHandlers = {};
		for (const name of Object.keys(props)) {
			if (propNames.includes(name)) {
				properties["prop:" + name] = () => props[name];
				continue;
			}
			if (name.startsWith("on")) {
				const lowerCaseEventName = name.slice(2).toLowerCase();
				const eventName = lowerCaseEventNameMap.get(lowerCaseEventName);
				if (eventName) {
					const extractDetail = eventName.endsWith("Change");
					eventHandlers["on:" + eventName] = (event) => {
						const handler = props[name];
						if (typeof handler === "function") handler(extractDetail ? event.detail : event);
					};
					continue;
				}
			}
			properties[name] = () => props[name];
		}
		const editor = useEditorContext();
		if (hasEditor && editor) properties["prop:editor"] = () => props["editor"] || editor;
		return h(tagName, {
			...properties,
			...eventHandlers
		});
	};
	return Component;
}

//#endregion
export { createComponent as t };
//# sourceMappingURL=create-component-DOv1yHjo.js.map