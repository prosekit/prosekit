import { n as useEditorContext } from "./editor-context-VOfdNrFa.js";
import { defineComponent, h, onMounted, ref, watchEffect } from "vue";

//#region src/components/create-component.ts
function createComponent(tagName, displayName, propNames, eventNames) {
	const hasEditor = propNames.includes("editor");
	return defineComponent((props, { slots, emit }) => {
		const editor = useEditorContext();
		const mounted = ref(false);
		onMounted(() => {
			mounted.value = true;
		});
		const elementRef = ref(null);
		watchEffect((onCleanup) => {
			const element = elementRef.value;
			if (!element) return;
			const eventHandlers = {};
			for (const eventName of eventNames) {
				const extractDetail = eventName.endsWith("Change");
				eventHandlers[eventName] = (event) => {
					emit(eventName, extractDetail ? event.detail : event);
				};
			}
			for (const [eventName, handler] of Object.entries(eventHandlers)) element.addEventListener(eventName, handler);
			onCleanup(() => {
				for (const [eventName, handler] of Object.entries(eventHandlers)) element.removeEventListener(eventName, handler);
			});
		});
		return () => {
			const properties = {};
			for (const [key, value] of Object.entries(props)) if (value !== void 0 && !key.startsWith(".")) properties[propNames.includes(key) ? "." + key : key] = value;
			if (hasEditor && editor && !properties["editor"]) properties.editor = editor;
			properties.key = mounted.value ? 1 : 0;
			properties.ref = elementRef;
			return h(tagName, properties, slots.default?.());
		};
	}, {
		name: displayName,
		props: propNames,
		emits: eventNames
	});
}

//#endregion
export { createComponent as t };
//# sourceMappingURL=create-component-c9woOlZn.js.map