"use client";
import { createElement, forwardRef, useCallback, useLayoutEffect, useRef } from "react";
import { registerResizableHandleElement, registerResizableRootElement } from "@prosekit/web/resizable";
function ResizableRootComponent(props, forwardedRef) {
	registerResizableRootElement();
	const elementRef = useRef(null);
	const handlersRef = useRef([]);
	const { aspectRatio: p0, height: p1, width: p2, onResizeEnd: e0, onResizeStart: e1, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, {
			aspectRatio: p0,
			height: p1,
			width: p2
		});
		handlersRef.current = [e0, e1];
	});
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		const ac = new AbortController();
		for (const [index, eventName] of ["resizeEnd", "resizeStart"].entries()) element.addEventListener(eventName, (event) => {
			handlersRef.current[index]?.(event);
		}, { signal: ac.signal });
		return () => ac.abort();
	}, []);
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-resizable-root", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A React component that renders an `prosekit-resizable-root` custom element. */
const ResizableRoot = /* @__PURE__ */ forwardRef(ResizableRootComponent);
function ResizableHandleComponent(props, forwardedRef) {
	registerResizableHandleElement();
	const elementRef = useRef(null);
	const { position: p0, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, { position: p0 });
	});
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-resizable-handle", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A React component that renders an `prosekit-resizable-handle` custom element. */
const ResizableHandle = /* @__PURE__ */ forwardRef(ResizableHandleComponent);
/**

@module

## Anatomy

```jsx
import {
ResizableHandle,
ResizableRoot,
} from 'prosekit/react/resizable'

<ResizableRoot>
<img src="..." />
<ResizableHandle>...</ResizableHandle>
</ResizableRoot>
```
*/
export { ResizableHandle, ResizableRoot };

//# sourceMappingURL=resizable.js.map