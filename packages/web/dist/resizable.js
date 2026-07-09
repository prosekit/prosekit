import { t as assignStyles } from "./assign-styles.js";
import { createContext, createSignal, defineCustomElement, defineProps, registerCustomElement, useEffect } from "@aria-ui/core";
import { useAttribute } from "@aria-ui/utils";
import { getWindow } from "@ocavue/utils";
function isFinitePositiveNumber(value) {
	return typeof value === "number" && Number.isFinite(value) && value > 0;
}
/**
* @internal
*/
const onResizeContext = createContext("prosekit/resizable/onResize");
/**
* @internal
*/
const onResizeStartContext = createContext("prosekit/resizable/onResizeStart");
/**
* @internal
*/
const onResizeEndContext = createContext("prosekit/resizable/onResizeEnd");
/**
* @internal
*/
const ResizableRootPropsDeclaration = defineProps({
	width: {
		default: null,
		attribute: "data-width",
		type: "json"
	},
	height: {
		default: null,
		attribute: "data-height",
		type: "json"
	},
	aspectRatio: {
		default: null,
		attribute: "data-aspect-ratio",
		type: "json"
	}
});
var ResizeStartEvent = class extends Event {
	constructor(width, height) {
		super("resizeStart");
		this.detail = {
			width,
			height
		};
	}
};
var ResizeEndEvent = class extends Event {
	constructor(width, height) {
		super("resizeEnd");
		this.detail = {
			width,
			height
		};
	}
};
/**
* @internal
*/
function setupResizableRoot(host, props) {
	const resizing = createSignal(false);
	const onResizeStart = () => {
		const { width, height } = host.getBoundingClientRect();
		let aspectRatio = props.aspectRatio.get() ?? width / height;
		if (!isFinitePositiveNumber(aspectRatio)) aspectRatio = 0;
		resizing.set(true);
		host.dispatchEvent(new ResizeStartEvent(width, height));
		return [
			width,
			height,
			aspectRatio
		];
	};
	const onResize = (width, height) => {
		props.width.set(width);
		props.height.set(height);
	};
	const onResizeEnd = () => {
		const { width, height } = host.getBoundingClientRect();
		resizing.set(false);
		host.dispatchEvent(new ResizeEndEvent(width, height));
	};
	onResizeStartContext.provide(host, onResizeStart);
	onResizeContext.provide(host, onResize);
	onResizeEndContext.provide(host, onResizeEnd);
	useEffect(host, () => {
		updateResizableRootStyles(host, props.width.get(), props.height.get(), props.aspectRatio.get());
	});
	useAttribute(host, "data-resizing", () => resizing.get() ? "" : void 0);
}
function updateResizableRootStyles(host, width, height, aspectRatio) {
	const hasWidth = isFinitePositiveNumber(width);
	const hasHeight = isFinitePositiveNumber(height);
	const styles = {
		width: hasWidth ? `${width}px` : "auto",
		height: hasHeight ? `${height}px` : "auto"
	};
	if (isFinitePositiveNumber(aspectRatio)) {
		styles.aspectRatio = String(aspectRatio);
		if (hasWidth) styles.height = "auto";
		else if (hasHeight) styles.width = "min-content";
	}
	assignStyles(host, styles);
}
const ResizableRootElementBase = defineCustomElement(setupResizableRoot, ResizableRootPropsDeclaration);
/**
* `<prosekit-resizable-root>` custom element.
*
* Properties: {@link ResizableRootProps}
*
* Events: {@link ResizableRootEvents}
*
* Data attributes:
*
* | Attribute | Description |
* | --- | --- |
* | `data-resizing` | Present when the element is being resized |
*/
var ResizableRootElement = class extends ResizableRootElementBase {};
let isResizableRootRegistered = false;
/**
* @internal
*/
function registerResizableRootElement() {
	if (isResizableRootRegistered) return;
	isResizableRootRegistered = true;
	registerCustomElement("prosekit-resizable-root", ResizableRootElement);
}
function calcResize(position, w, h, dx, dy, aspectRatio) {
	aspectRatio = aspectRatio ? aspectRatio : w / h;
	aspectRatio = isFinitePositiveNumber(aspectRatio) ? aspectRatio : 1;
	switch (position) {
		case "bottom-right": return clamp(calcBottomRightResize(w, h, dx, dy, aspectRatio));
		case "bottom-left": return clamp(calcBottomLeftResize(w, h, dx, dy, aspectRatio));
		case "top-right": return clamp(calcTopRightResize(w, h, dx, dy, aspectRatio));
		case "top-left": return clamp(calcTopLeftResize(w, h, dx, dy, aspectRatio));
		case "top": return clamp(calcTopResize(w, h, dx, dy, aspectRatio));
		case "right": return clamp(calcRightResize(w, h, dx, dy, aspectRatio));
		case "bottom": return clamp(calcBottomResize(w, h, dx, dy, aspectRatio));
		case "left": return clamp(calcLeftResize(w, h, dx, dy, aspectRatio));
		default: throw new RangeError(`Invalid position: ${position}`);
	}
}
const calcBottomRightResize = (w, h, dx, dy, r) => {
	w += dx;
	h += dy;
	const sum = w + h;
	h = sum / (r + 1);
	w = sum - h;
	return [w, h];
};
const calcBottomLeftResize = (w, h, dx, dy, r) => {
	w -= dx;
	h += dy;
	const sum = w + h;
	h = sum / (r + 1);
	w = sum - h;
	return [w, h];
};
const calcTopRightResize = (w, h, dx, dy, r) => {
	w += dx;
	h -= dy;
	const sum = w + h;
	h = sum / (r + 1);
	w = sum - h;
	return [w, h];
};
const calcTopLeftResize = (w, h, dx, dy, r) => {
	w -= dx;
	h -= dy;
	const sum = w + h;
	h = sum / (r + 1);
	w = sum - h;
	return [w, h];
};
const calcTopResize = (w, h, dx, dy, r) => {
	h -= dy;
	w = h * r;
	return [w, h];
};
const calcRightResize = (w, h, dx, dy, r) => {
	w += dx;
	h = w / r;
	return [w, h];
};
const calcBottomResize = (w, h, dx, dy, r) => {
	h += dy;
	w = h * r;
	return [w, h];
};
const calcLeftResize = (w, h, dx, dy, r) => {
	w -= dx;
	h = w / r;
	return [w, h];
};
function clamp([w, h]) {
	return [Math.max(w, 1), Math.max(h, 1)];
}
/**
* @internal
*/
const ResizableHandlePropsDeclaration = defineProps({ position: {
	default: "bottom-right",
	attribute: "position",
	type: "string"
} });
/**
* @internal
*/
function setupResizableHandle(host, props) {
	const getOnResize = onResizeContext.consume(host);
	const getOnResizeStart = onResizeStartContext.consume(host);
	const getOnResizeEnd = onResizeEndContext.consume(host);
	let startX = 0;
	let startY = 0;
	let width = 0;
	let height = 0;
	let aspectRatio = 1;
	const pointerPressing = createSignal(false);
	const handlePointerDown = (event) => {
		event.preventDefault();
		pointerPressing.set(true);
		startX = event.x;
		startY = event.y;
		const size = getOnResizeStart()?.();
		if (size) [width, height, aspectRatio] = size;
	};
	const handlePointerMove = (event) => {
		event.preventDefault();
		const dx = event.x - startX;
		const dy = event.y - startY;
		const [w, h] = calcResize(props.position.get(), width, height, dx, dy, aspectRatio);
		getOnResize()?.(w, h);
	};
	const handlePointerUp = (event) => {
		event.preventDefault();
		pointerPressing.set(false);
		getOnResizeEnd()?.();
	};
	useEffect(host, () => {
		host.addEventListener("pointerdown", handlePointerDown);
		return () => {
			host.removeEventListener("pointerdown", handlePointerDown);
		};
	});
	useEffect(host, () => {
		if (!pointerPressing.get()) return;
		const win = getWindow(host);
		win.addEventListener("pointermove", handlePointerMove);
		win.addEventListener("pointerup", handlePointerUp);
		return () => {
			win.removeEventListener("pointermove", handlePointerMove);
			win.removeEventListener("pointerup", handlePointerUp);
		};
	});
}
const ResizableHandleElementBase = defineCustomElement(setupResizableHandle, ResizableHandlePropsDeclaration);
/**
* `<prosekit-resizable-handle>` custom element.
*
* Properties: {@link ResizableHandleProps}
*/
var ResizableHandleElement = class extends ResizableHandleElementBase {};
let isResizableHandleRegistered = false;
/**
* @internal
*/
function registerResizableHandleElement() {
	if (isResizableHandleRegistered) return;
	isResizableHandleRegistered = true;
	registerCustomElement("prosekit-resizable-handle", ResizableHandleElement);
}
export { ResizableHandleElement, ResizableHandlePropsDeclaration, ResizableRootElement, ResizableRootPropsDeclaration, ResizeEndEvent, ResizeStartEvent, registerResizableHandleElement, registerResizableRootElement, setupResizableHandle, setupResizableRoot };

//# sourceMappingURL=resizable.js.map