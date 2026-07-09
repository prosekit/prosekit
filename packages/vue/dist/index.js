import { n as useEditorContext, t as provideEditor } from "./editor-context.js";
import { Teleport, computed, defineComponent, h, markRaw, onMounted, onUnmounted, shallowRef, toValue, triggerRef, watchPostEffect } from "vue";
import { EditorNotFoundError, ProseKitError, defineDocChangeHandler, defineKeymap, defineMarkViewComponent, defineMarkViewFactory, defineMountHandler, defineNodeViewComponent, defineNodeViewFactory, defineUpdateHandler, union, withPriority } from "@prosekit/core";
import { AbstractVueMarkView, AbstractVueNodeView, buildVueMarkViewCreator, buildVueNodeViewCreator, useVueRenderer } from "@prosemirror-adapter/vue";
var ProseKitVueMarkView = class extends AbstractVueMarkView {
	constructor(..._args) {
		super(..._args);
		this.render = () => {
			const UserComponent = this.component;
			const render = () => {
				const props = this.context;
				return h(Teleport, {
					key: this.key,
					to: this.dom
				}, [h(UserComponent, props)]);
			};
			return markRaw(defineComponent({
				name: "ProsemirrorMarkView",
				setup: () => {
					return render;
				}
			}));
		};
	}
};
/**
* @internal
*/
function defineVueMarkViewFactory(renderVueRenderer, removeVueRenderer) {
	return defineMarkViewFactory({
		group: "vue",
		factory: buildVueMarkViewCreator(renderVueRenderer, removeVueRenderer, ProseKitVueMarkView)
	});
}
/**
* Defines a mark view using a Vue component.
*/
function defineVueMarkView(options) {
	return defineMarkViewComponent({
		group: "vue",
		name: options.name,
		args: options
	});
}
var ProseKitVueNodeView = class extends AbstractVueNodeView {
	constructor(..._args) {
		super(..._args);
		this.render = () => {
			const UserComponent = this.component;
			const render = () => {
				const props = this.context;
				return h(Teleport, {
					key: this.key,
					to: this.dom
				}, [h(UserComponent, props)]);
			};
			return markRaw(defineComponent({
				name: "ProsemirrorNodeView",
				setup: () => {
					return render;
				}
			}));
		};
	}
};
/**
* @internal
*/
function defineVueNodeViewFactory(renderVueRenderer, removeVueRenderer) {
	return defineNodeViewFactory({
		group: "vue",
		factory: buildVueNodeViewCreator(renderVueRenderer, removeVueRenderer, ProseKitVueNodeView)
	});
}
/**
* Defines a node view using a Vue component.
*/
function defineVueNodeView(options) {
	return defineNodeViewComponent({
		group: "vue",
		name: options.name,
		args: options
	});
}
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
/**
* @internal
*/
const ViewRenderer = defineComponent({
	name: "ViewRenderer",
	props: { editor: {
		type: Object,
		required: true
	} },
	setup: (props, { slots }) => {
		const { renderVueRenderer, removeVueRenderer, render } = useVueRenderer();
		useEditorExtension(() => props.editor, union([defineVueMarkViewFactory(renderVueRenderer, removeVueRenderer), defineVueNodeViewFactory(renderVueRenderer, removeVueRenderer)]));
		return () => [slots.default?.(), render()];
	}
});
/**
* The root component for a ProseKit editor.
*/
const ProseKit = defineComponent({
	name: "ProseKit",
	props: { editor: {
		type: Object,
		required: true
	} },
	setup: (props, { slots }) => {
		provideEditor(props.editor);
		return () => h(ViewRenderer, { editor: props.editor }, () => slots.default?.());
	}
});
/**
* @internal
*/
function usePriorityExtension(extension, priority) {
	return computed(() => {
		const ext = toValue(extension);
		return ext && priority ? withPriority(ext, priority) : ext;
	});
}
/**
* Add an extension to the editor.
*/
function useExtension(extension, options) {
	useEditorExtension(options?.editor, usePriorityExtension(extension, options?.priority));
}
/**
* Calls the given handler whenever the editor document changes.
*/
function useDocChange(handler, options) {
	useExtension(defineDocChangeHandler((view) => handler(view.state.doc)), options);
}
/**
* Retrieves the editor instance from the nearest ProseKit component.
*/
function useEditor(options) {
	const update = options?.update ?? false;
	const editor = useEditorContext();
	if (!editor) throw new ProseKitError("useEditor must be used within the ProseKit component");
	const editorRef = shallowRef(editor);
	if (update) {
		const forceUpdate = () => triggerRef(editorRef);
		onMounted(() => {
			const extension = union(defineMountHandler(forceUpdate), defineUpdateHandler(forceUpdate));
			onUnmounted(editor.use(extension));
		});
	}
	return editorRef;
}
/**
* Runs a function to derive a value from the editor instance after editor state
* changes.
*
* This is useful when you need to render something based on the editor state,
* for example, whether the selected text is wrapped in an italic mark.
*
* It returns a shallow ref of the derived value that updates whenever the editor
* state changes.
*/
function useEditorDerivedValue(derive, options) {
	const initialEditor = options?.editor;
	const editorAccessor = initialEditor ? computed(() => toValue(initialEditor)) : useEditor({ update: true });
	return computed(() => derive(toValue(editorAccessor)));
}
function useKeymap(keymap, options) {
	useExtension(computed(() => defineKeymap(toValue(keymap))), options);
}
/**
* Calls the given handler whenever the editor state changes.
*/
function useStateUpdate(handler, options) {
	useExtension(defineUpdateHandler((view) => handler(view.state)), options);
}
export { ProseKit, defineVueMarkView, defineVueNodeView, useDocChange, useEditor, useEditorDerivedValue, useExtension, useKeymap, useStateUpdate };

//# sourceMappingURL=index.js.map