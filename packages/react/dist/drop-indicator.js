"use client";
import { n as useEditorContext } from "./editor-context.js";
import { createElement, forwardRef, useCallback, useLayoutEffect, useRef } from "react";
import { registerDropIndicatorElement } from "@prosekit/web/drop-indicator";
function DropIndicatorComponent(props, forwardedRef) {
	registerDropIndicatorElement();
	const elementRef = useRef(null);
	const p0Fallback = useEditorContext();
	const { editor: p0, width: p1, ...restProps } = props;
	useLayoutEffect(() => {
		const element = elementRef.current;
		if (!element) return;
		Object.assign(element, {
			editor: p0 ?? p0Fallback,
			width: p1
		});
	});
	const mergedRef = useCallback((element) => {
		elementRef.current = element;
		if (typeof forwardedRef === "function") forwardedRef(element);
		else if (forwardedRef) forwardedRef.current = element;
	}, [forwardedRef]);
	return createElement("prosekit-drop-indicator", {
		...restProps,
		ref: mergedRef,
		suppressHydrationWarning: true
	});
}
/** A React component that renders an `prosekit-drop-indicator` custom element. */
const DropIndicator = /* @__PURE__ */ forwardRef(DropIndicatorComponent);
/**

@module

## Anatomy

```jsx
import { DropIndicator } from 'prosekit/react/drop-indicator'

<DropIndicator />
```
*/
export { DropIndicator };

//# sourceMappingURL=drop-indicator.js.map