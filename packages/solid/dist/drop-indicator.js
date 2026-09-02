import { n as useEditorContext } from "./editor-context.js";
import { createEffect, createSignal, mergeProps, splitProps } from "solid-js";
import h from "solid-js/h";
import { registerDropIndicatorElement } from "@prosekit/web/drop-indicator";
/** A Solid component that renders an `prosekit-drop-indicator` custom element. */
const DropIndicator = (props) => {
	registerDropIndicatorElement();
	const [getElement, setElement] = createSignal(null);
	const [elementProps, restProps] = splitProps(props, ["editor", "width"]);
	const p0Fallback = useEditorContext();
	createEffect(() => {
		const element = getElement();
		if (!element) return;
		Object.assign(element, {
			editor: elementProps.editor ?? p0Fallback,
			width: elementProps.width
		});
	});
	return () => h("prosekit-drop-indicator", mergeProps(restProps, { ref: (el) => {
		setElement(el);
	} }));
};
export { DropIndicator };

//# sourceMappingURL=drop-indicator.js.map