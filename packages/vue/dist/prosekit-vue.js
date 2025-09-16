import { provideEditor, useEditorContext } from "./editor-context-DKYvJpUt.js";
import { ProsemirrorAdapterProvider, useMarkViewContext, useMarkViewFactory, useNodeViewContext, useNodeViewFactory } from "@prosemirror-adapter/vue";
import { computed, defineComponent, h, onMounted, onUnmounted, shallowRef, toValue, triggerRef, watchPostEffect } from "vue";
import { EditorNotFoundError, ProseKitError, defineDocChangeHandler, defineKeymap, defineMarkViewComponent, defineMarkViewFactory, defineMountHandler, defineNodeViewComponent, defineNodeViewFactory, defineUpdateHandler, union, withPriority } from "@prosekit/core";

//#region src/hooks/use-editor-extension.ts
/**
* @internal
*/
function useEditorExtension(editorRef, extensionRef) {
	const editorContext = useEditorContext();
	watchPostEffect((onCleanup) => {
		const editor = toValue(editorRef) || toValue(editorContext);
		const extension = toValue(extensionRef);
		if (!editor) throw new EditorNotFoundError();
		if (extension) onCleanup(editor.use(extension));
	});
}

//#endregion
//#region src/hooks/use-priority-extension.ts
/**
* @internal
*/
function usePriorityExtension(extension, priority) {
	return computed(() => {
		const ext = toValue(extension);
		return ext && priority ? withPriority(ext, priority) : ext;
	});
}

//#endregion
//#region src/hooks/use-extension.ts
/**
* Add an extension to the editor.
*
* @public
*/
function useExtension(extension, options) {
	useEditorExtension(options?.editor, usePriorityExtension(extension, options?.priority));
}

//#endregion
//#region src/extensions/vue-mark-view.ts
function withMarkViewProps(component) {
	return defineComponent({
		name: "MarkViewPropsWrapper",
		setup: () => {
			const props = useMarkViewContext();
			return () => h(component, props);
		}
	});
}
/**
* @internal
*/
const VueMarkViewsConsumer = /* @__PURE__ */ defineComponent({
	name: "VueMarkViewsConsumer",
	setup: () => {
		const markViewFactory = useMarkViewFactory();
		const extension = computed(() => {
			return defineVueMarkViewFactory(markViewFactory);
		});
		useExtension(extension);
		return () => null;
	}
});
/**
* Defines a mark view using a Vue component.
*
* @public
*/
function defineVueMarkView(options) {
	const { name, component,...userOptions } = options;
	const args = {
		...userOptions,
		component: withMarkViewProps(component)
	};
	return defineMarkViewComponent({
		group: "vue",
		name,
		args
	});
}
function defineVueMarkViewFactory(factory) {
	return defineMarkViewFactory({
		group: "vue",
		factory
	});
}

//#endregion
//#region src/extensions/vue-node-view.ts
function withNodeViewProps(component) {
	return defineComponent({
		name: "NodeViewPropsWrapper",
		setup: () => {
			const props = useNodeViewContext();
			return () => h(component, props);
		}
	});
}
/**
* @internal
*/
const VueNodeViewsConsumer = /* @__PURE__ */ defineComponent({
	name: "VueNodeViewsConsumer",
	setup: () => {
		const nodeViewFactory = useNodeViewFactory();
		const extension = computed(() => {
			return defineVueNodeViewFactory(nodeViewFactory);
		});
		useExtension(extension);
		return () => null;
	}
});
/**
* Defines a node view using a Vue component.
*
* @public
*/
function defineVueNodeView(options) {
	const { name, component,...userOptions } = options;
	const args = {
		...userOptions,
		component: withNodeViewProps(component)
	};
	return defineNodeViewComponent({
		group: "vue",
		name,
		args
	});
}
function defineVueNodeViewFactory(factory) {
	return defineNodeViewFactory({
		group: "vue",
		factory
	});
}

//#endregion
//#region src/components/prosekit.ts
/**
* The root component for a ProseKit editor.
*
* @public
*/
const ProseKit = defineComponent({
	name: "ProseKit",
	props: { editor: {
		type: Object,
		required: true
	} },
	setup: (props, { slots }) => {
		provideEditor(props.editor);
		return () => {
			return h(ProsemirrorAdapterProvider, null, () => [
				h(VueNodeViewsConsumer),
				h(VueMarkViewsConsumer),
				slots.default?.()
			]);
		};
	}
});

//#endregion
//#region src/hooks/use-doc-change.ts
/**
* Calls the given handler whenever the editor document changes.
*
* @public
*/
function useDocChange(handler, options) {
	const extension = defineDocChangeHandler((view) => handler(view.state.doc));
	useExtension(extension, options);
}

//#endregion
//#region src/hooks/use-editor.ts
/**
* Retrieves the editor instance from the nearest ProseKit component.
*
* @public
*/
function useEditor(options) {
	const update = options?.update ?? false;
	const editor = useEditorContext();
	if (!editor) throw new ProseKitError("useEditor must be used within the ProseKit component");
	const editorRef = shallowRef(editor);
	if (update) onMounted(() => {
		const forceUpdate = () => triggerRef(editorRef);
		const extension = union(defineMountHandler(forceUpdate), defineUpdateHandler(forceUpdate));
		const dispose = editor.use(extension);
		onUnmounted(dispose);
	});
	return editorRef;
}

//#endregion
//#region src/hooks/use-keymap.ts
function useKeymap(keymap, options) {
	const extension = computed(() => defineKeymap(toValue(keymap)));
	useExtension(extension, options);
}

//#endregion
//#region src/hooks/use-state-update.ts
/**
* Calls the given handler whenever the editor state changes.
*
* @public
*/
function useStateUpdate(handler, options) {
	const extension = defineUpdateHandler((view) => handler(view.state));
	useExtension(extension, options);
}

//#endregion
export { ProseKit, defineVueMarkView, defineVueNodeView, useDocChange, useEditor, useExtension, useKeymap, useStateUpdate };
//# sourceMappingURL=prosekit-vue.js.map