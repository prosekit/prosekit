import { t as useEditorExtension } from "./use-editor-extension-B2WuUfnd.js";
import { n as assignStyles, t as useScrolling } from "./use-scrolling-BjVzAkiZ.js";
import { createComputed, createSignal, defineCustomElement, registerCustomElement, useEffect } from "@aria-ui/core";
import { usePresence } from "@aria-ui/presence";
import { defineDropIndicator } from "@prosekit/extensions/drop-indicator";

//#region src/components/drop-indicator/drop-indicator/setup.ts
/**
* @internal
*/
function useDropIndicator(host, { state }) {
	const context = createSignal(null);
	const extension = defineDropIndicator({
		onShow: (options) => context.set(options),
		onHide: () => context.set(null)
	});
	useEditorExtension(host, state.editor, extension);
	const line = createComputed(() => context.get()?.line);
	const scrolling = useScrolling(host);
	usePresence(host, createComputed(() => {
		return !!context.get() && !scrolling.get();
	}));
	useEffect(host, () => {
		const lineValue = line.get();
		const lineWidth = state.width.get();
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

//#endregion
//#region src/components/drop-indicator/drop-indicator/types.ts
/** @internal */
const dropIndicatorProps = Object.freeze({
	editor: { default: null },
	width: { default: 2 }
});
/** @internal */
const dropIndicatorEvents = {};

//#endregion
//#region src/components/drop-indicator/drop-indicator/element.gen.ts
const DropIndicatorElementBase = defineCustomElement({
	props: dropIndicatorProps,
	events: dropIndicatorEvents,
	setup: useDropIndicator
});
var DropIndicatorElement = class extends DropIndicatorElementBase {};
registerCustomElement("prosekit-drop-indicator", DropIndicatorElement);

//#endregion
export { DropIndicatorElement, dropIndicatorEvents, dropIndicatorProps, useDropIndicator };
//# sourceMappingURL=prosekit-web-drop-indicator.js.map