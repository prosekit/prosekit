import { n as useEditorContext, t as provideEditor } from "./editor-context-VOfdNrFa.js";
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
		useExtension(computed(() => {
			return defineVueMarkViewFactory(markViewFactory);
		}));
		return () => null;
	}
});
/**
* Defines a mark view using a Vue component.
*
* @public
*/
function defineVueMarkView(options) {
	const { name, component, ...userOptions } = options;
	return defineMarkViewComponent({
		group: "vue",
		name,
		args: {
			...userOptions,
			component: withMarkViewProps(component)
		}
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
		useExtension(computed(() => {
			return defineVueNodeViewFactory(nodeViewFactory);
		}));
		return () => null;
	}
});
/**
* Defines a node view using a Vue component.
*
* @public
*/
function defineVueNodeView(options) {
	const { name, component, ...userOptions } = options;
	return defineNodeViewComponent({
		group: "vue",
		name,
		args: {
			...userOptions,
			component: withNodeViewProps(component)
		}
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
	useExtension(defineDocChangeHandler((view) => handler(view.state.doc)), options);
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
		onUnmounted(editor.use(extension));
	});
	return editorRef;
}

//#endregion
//#region src/hooks/use-editor-derived-value.ts
/**
* Runs a function to derive a value from the editor instance after editor state
* changes.
*
* This is useful when you need to render something based on the editor state,
* for example, whether the selected text is wrapped in an italic mark.
*
* It returns a shallow ref of the derived value that updates whenever the editor
* state changes.
*
* @public
*/
function useEditorDerivedValue(derive, options) {
	const initialEditor = options?.editor;
	const editorAccessor = initialEditor ? computed(() => toValue(initialEditor)) : useEditor({ update: true });
	return computed(() => derive(toValue(editorAccessor)));
}

//#endregion
//#region src/hooks/use-keymap.ts
function useKeymap(keymap, options) {
	useExtension(computed(() => defineKeymap(toValue(keymap))), options);
}

//#endregion
//#region src/hooks/use-state-update.ts
/**
* Calls the given handler whenever the editor state changes.
*
* @public
*/
function useStateUpdate(handler, options) {
	useExtension(defineUpdateHandler((view) => handler(view.state)), options);
}

//#endregion
export { ProseKit, defineVueMarkView, defineVueNodeView, useDocChange, useEditor, useEditorDerivedValue, useExtension, useKeymap, useStateUpdate };
//# sourceMappingURL=prosekit-vue.js.map