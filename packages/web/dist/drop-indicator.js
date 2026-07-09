import { t as useEditorExtension } from "./use-editor-extension.js";
import { t as assignStyles } from "./assign-styles.js";
import { t as useScrolling } from "./use-scrolling.js";
import { computed, createSignal, defineCustomElement, defineProps, registerCustomElement, useEffect } from "@aria-ui/core";
import { usePresence } from "@aria-ui/utils";
import { computePosition, offset } from "@floating-ui/dom";
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
	const getScrolling = useScrolling(host);
	usePresence(host, computed(() => !!context.get() && !getScrolling()));
	useEffect(host, () => {
		const ctx = context.get();
		if (!ctx) return;
		const { view, line } = ctx;
		const lineWidth = props.width.get();
		const { p1, p2 } = line;
		const horizontal = p1.y === p2.y;
		const reference = {
			getBoundingClientRect: () => ({
				x: p1.x,
				y: p1.y,
				left: p1.x,
				top: p1.y,
				right: p2.x,
				bottom: p2.y,
				width: p2.x - p1.x,
				height: p2.y - p1.y
			}),
			contextElement: view.dom
		};
		let cancelled = false;
		computePosition(reference, host, {
			placement: horizontal ? "bottom-start" : "right-start",
			middleware: [offset(-lineWidth / 2)]
		}).then(({ x, y }) => {
			if (cancelled) return;
			assignStyles(host, {
				position: "absolute",
				pointerEvents: "none",
				width: `${horizontal ? p2.x - p1.x : lineWidth}px`,
				height: `${horizontal ? lineWidth : p2.y - p1.y}px`,
				left: `${Math.round(x)}px`,
				top: `${Math.round(y)}px`
			});
		});
		return () => {
			cancelled = true;
		};
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

//# sourceMappingURL=drop-indicator.js.map