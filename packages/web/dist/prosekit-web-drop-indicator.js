import { t as useEditorExtension } from "./use-editor-extension.js";
import { n as assignStyles, t as useScrolling } from "./use-scrolling.js";
import { computed, createSignal, defineCustomElement, defineProps, registerCustomElement, useEffect } from "@aria-ui/core";
import { usePresence } from "@aria-ui/utils";
import { defineDropIndicator } from "@prosekit/extensions/drop-indicator";
/** @internal */
const DropIndicatorPropsDeclaration = /* @__PURE__ */ defineProps({
	editor: {
		default: null,
		attribute: false,
		type: "json"
	},
	width: {
		default: 2,
		attribute: "width",
		type: "number"
	}
});
/**
* @internal
*/
function setupDropIndicator(host, props) {
	const context = createSignal(null);
	const extension = defineDropIndicator({
		onShow: (options) => context.set(options),
		onHide: () => context.set(null)
	});
	useEditorExtension(host, props.editor.get, extension);
	const getLine = computed(() => context.get()?.line);
	const getScrolling = useScrolling(host);
	usePresence(host, computed(() => !!context.get() && !getScrolling()));
	useEffect(host, () => {
		const lineValue = getLine();
		const lineWidth = props.width.get();
		if (!lineValue) return;
		const { p1: { x: x1, y: y1 }, p2: { x: x2, y: y2 } } = lineValue;
		const horizontal = y1 === y2;
		let width;
		let height;
		let top = y1;
		let left = x1;
		if (horizontal) {
			width = x2 - x1;
			height = lineWidth;
			top -= lineWidth / 2;
		} else {
			width = lineWidth;
			height = y2 - y1;
			left -= lineWidth / 2;
		}
		top = Math.round(top);
		left = Math.round(left);
		assignStyles(host, {
			position: "fixed",
			pointerEvents: "none",
			width: `${width}px`,
			height: `${height}px`,
			transform: `translate(${left}px, ${top}px)`,
			left: "0px",
			top: "0px"
		});
	});
}
const DropIndicatorElementBase = defineCustomElement(setupDropIndicator, DropIndicatorPropsDeclaration);
/**
* `<prosekit-drop-indicator>` custom element.
*
* Properties: {@link DropIndicatorProps}
*/
var DropIndicatorElement = class extends DropIndicatorElementBase {};
/**
* @internal
*/
function registerDropIndicatorElement() {
	registerCustomElement("prosekit-drop-indicator", DropIndicatorElement);
}
export { DropIndicatorElement, DropIndicatorPropsDeclaration, registerDropIndicatorElement, setupDropIndicator };

//# sourceMappingURL=prosekit-web-drop-indicator.js.map