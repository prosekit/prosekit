import { computed, defineComponent, h, shallowRef, watchEffect } from "vue";
import { registerResizableHandleElement, registerResizableRootElement } from "@prosekit/web/resizable";
/** A Vue component that renders an `prosekit-resizable-root` custom element. */
const ResizableRoot = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerResizableRootElement();
	const elementRef = shallowRef(null);
	const splittedProps = computed(() => {
		const { aspectRatio: p0, height: p1, width: p2, onResizeEnd: e0, onResizeStart: e1, ...restProps } = props;
		return [[
			p0,
			p1,
			p2,
			e0,
			e1
		], restProps];
	});
	const handlers = [];
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const [p0, p1, p2, e0, e1] = splittedProps.value[0];
		Object.assign(element, {
			aspectRatio: p0,
			height: p1,
			width: p2
		});
		handlers.length = 0;
		handlers.push(e0);
		handlers.push(e1);
	});
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const ac = new AbortController();
		for (const [index, eventName] of ["resizeEnd", "resizeStart"].entries()) element.addEventListener(eventName, (event) => {
			handlers[index]?.(event);
		}, { signal: ac.signal });
		return () => ac.abort();
	});
	return () => {
		const restProps = splittedProps.value[1];
		return h("prosekit-resizable-root", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: [
	"aspectRatio",
	"height",
	"width",
	"onResizeEnd",
	"onResizeStart"
] });
/** A Vue component that renders an `prosekit-resizable-handle` custom element. */
const ResizableHandle = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerResizableHandleElement();
	const elementRef = shallowRef(null);
	const splittedProps = computed(() => {
		const { position: p0, ...restProps } = props;
		return [[p0], restProps];
	});
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const [p0] = splittedProps.value[0];
		Object.assign(element, { position: p0 });
	});
	return () => {
		const restProps = splittedProps.value[1];
		return h("prosekit-resizable-handle", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: ["position"] });
export { ResizableHandle, ResizableRoot };

//# sourceMappingURL=resizable.js.map