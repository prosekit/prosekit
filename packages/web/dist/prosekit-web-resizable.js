import { createContext, createSignal, defineCustomElement, registerCustomElement, useAttribute, useEffect } from "@aria-ui/core";
import { getWindow } from "@ocavue/utils";

//#region src/components/resizable/context.ts
/**
* @internal
*/
const onResizeContext = createContext("prosekit/resizable/onResize", null);
/**
* @internal
*/
const onResizeStartContext = createContext("prosekit/resizable/onResizeStart", null);
/**
* @internal
*/
const onResizeEndContext = createContext("prosekit/resizable/onResizeEnd", null);

//#endregion
//#region src/utils/is-finite-positive-number.ts
function isFinitePositiveNumber(value) {
	return typeof value === "number" && Number.isFinite(value) && value > 0;
}

//#endregion
//#region src/components/resizable/resizable-handle/calc-resize.ts
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

//#endregion
//#region src/components/resizable/resizable-handle/setup.ts
/**
* @internal
*/
function useResizableHandle(host, { state }) {
	const onResize = onResizeContext.consume(host);
	const onResizeStart = onResizeStartContext.consume(host);
	const onResizeEnd = onResizeEndContext.consume(host);
	useResizableHandleState(host, state, {
		onResize,
		onResizeStart,
		onResizeEnd
	});
}
function useResizableHandleState(host, state, context) {
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
		const size = context.onResizeStart.get()?.();
		if (size) [width, height, aspectRatio] = size;
	};
	const handlePointerMove = (event) => {
		event.preventDefault();
		const dx = event.x - startX;
		const dy = event.y - startY;
		const [w, h] = calcResize(state.position.peek(), width, height, dx, dy, aspectRatio);
		context.onResize.get()?.(w, h);
	};
	const handlePointerUp = (event) => {
		event.preventDefault();
		pointerPressing.set(false);
		context.onResizeEnd.get()?.();
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

//#endregion
//#region src/components/resizable/resizable-handle/types.ts
/** @internal */
const resizableHandleProps = { position: { default: "bottom-right" } };
/** @internal */
const resizableHandleEvents = {};

//#endregion
//#region src/components/resizable/resizable-handle/element.gen.ts
const ResizableHandleElementBase = defineCustomElement({
	props: resizableHandleProps,
	events: resizableHandleEvents,
	setup: useResizableHandle
});
var ResizableHandleElement = class extends ResizableHandleElementBase {};
registerCustomElement("prosekit-resizable-handle", ResizableHandleElement);

//#endregion
//#region src/components/resizable/resizable-root/setup.ts
/**
* @internal
*/
function useResizableRoot(host, { state, emit }) {
	const resizing = createSignal(false);
	const onResizeStart = () => {
		const { width, height } = host.getBoundingClientRect();
		let aspectRatio = state.aspectRatio.peek() ?? width / height;
		if (!isFinitePositiveNumber(aspectRatio)) aspectRatio = 0;
		emit("resizeStart", {
			width,
			height
		});
		resizing.set(true);
		return [
			width,
			height,
			aspectRatio
		];
	};
	const onResize = (width, height) => {
		state.width.set(width);
		state.height.set(height);
	};
	const onResizeEnd = () => {
		const { width, height } = host.getBoundingClientRect();
		emit("resizeEnd", {
			width,
			height
		});
		resizing.set(false);
	};
	onResizeStartContext.provide(host, createSignal(onResizeStart));
	onResizeContext.provide(host, createSignal(onResize));
	onResizeEndContext.provide(host, createSignal(onResizeEnd));
	useEffect(host, () => {
		updateResizableRootStyles(host, Math.max(state.width.get() || 0, 1), Math.max(state.height.get() || 0, 1), state.aspectRatio.get());
	});
	useAttribute(host, "data-resizing", () => resizing.get() ? "" : void 0);
}
function updateResizableRootStyles(host, width, height, aspectRatio) {
	host.style.width = isFinitePositiveNumber(width) ? `${width}px` : "";
	host.style.height = isFinitePositiveNumber(height) ? `${height}px` : "";
	if (isFinitePositiveNumber(aspectRatio)) {
		host.style.aspectRatio = `${aspectRatio}`;
		if (width && width > 0 && aspectRatio >= 1) host.style.height = "auto";
		else if (height && height > 0 && aspectRatio <= 1) host.style.width = "min-content";
	}
}

//#endregion
//#region src/components/resizable/resizable-root/types.ts
/** @internal */
const resizableRootProps = {
	width: { default: null },
	height: { default: null },
	aspectRatio: { default: null }
};
/** @internal */
const resizableRootEvents = {
	resizeStart: {},
	resizeEnd: {}
};

//#endregion
//#region src/components/resizable/resizable-root/element.gen.ts
const ResizableRootElementBase = defineCustomElement({
	props: resizableRootProps,
	events: resizableRootEvents,
	setup: useResizableRoot
});
var ResizableRootElement = class extends ResizableRootElementBase {};
registerCustomElement("prosekit-resizable-root", ResizableRootElement);

//#endregion
export { ResizableHandleElement, ResizableRootElement, resizableHandleEvents, resizableHandleProps, resizableRootEvents, resizableRootProps, useResizableHandle, useResizableRoot };
//# sourceMappingURL=prosekit-web-resizable.js.map