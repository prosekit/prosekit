import { n as useEditorContext } from "./editor-context.js";
import { computed, defineComponent, h, shallowRef, watchEffect } from "vue";
import { registerDropIndicatorElement } from "@prosekit/web/drop-indicator";
/** A Vue component that renders an `prosekit-drop-indicator` custom element. */
const DropIndicator = /* @__PURE__ */ defineComponent((props, { slots }) => {
	registerDropIndicatorElement();
	const elementRef = shallowRef(null);
	const p0Fallback = useEditorContext();
	const splittedProps = computed(() => {
		const { editor: p0, width: p1, ...restProps } = props;
		return [[p0, p1], restProps];
	});
	watchEffect(() => {
		const element = elementRef.value;
		if (!element) return;
		const [p0, p1] = splittedProps.value[0];
		Object.assign(element, {
			editor: p0 ?? p0Fallback,
			width: p1
		});
	});
	return () => {
		const restProps = splittedProps.value[1];
		return h("prosekit-drop-indicator", {
			...restProps,
			ref: elementRef
		}, slots.default?.());
	};
}, { props: ["editor", "width"] });
export { DropIndicator };

//# sourceMappingURL=drop-indicator.js.map