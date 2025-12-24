import { n as useEditorContext, t as EditorContextProvider } from "./editor-context-B5bsBkGo.js";
import { ProsemirrorAdapterProvider, useMarkViewContext, useMarkViewFactory, useNodeViewContext, useNodeViewFactory } from "@prosemirror-adapter/solid";
import { createComponent, createEffect, createMemo, createSignal, onCleanup } from "solid-js";
import { EditorNotFoundError, ProseKitError, defineDocChangeHandler, defineKeymap, defineMarkViewComponent, defineMarkViewFactory, defineMountHandler, defineNodeViewComponent, defineNodeViewFactory, defineUpdateHandler, union, withPriority } from "@prosekit/core";

//#region src/utils/to-value.ts
/**
* Accesses the value of a MaybeAccessor
*
* @example
* ```ts
* access("foo") // => "foo"
* access(() => "foo") // => "foo"
* ```
*/
function toValue(v) {
	return typeof v === "function" ? v() : v;
}

//#endregion
//#region src/hooks/use-editor-extension.ts
/**
* @internal
*/
function useEditorExtension(editorAccessor, extensionAccessor) {
	const editorContext = useEditorContext();
	createEffect(() => {
		const editor = toValue(editorAccessor) || toValue(editorContext);
		const extension = extensionAccessor();
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
	return () => {
		const ext = extension();
		return ext && priority ? withPriority(ext, priority) : ext;
	};
}

//#endregion
//#region src/hooks/use-extension.ts
/**
* Add an extension to the editor.
*/
function useExtension(extension, options) {
	useEditorExtension(options?.editor, usePriorityExtension(extension, options?.priority));
}

//#endregion
//#region src/extensions/solid-mark-view.ts
function withMarkViewProps(component) {
	return function MarkViewPropsWrapper() {
		const context = useMarkViewContext();
		return createComponent(component, {
			get contentRef() {
				return context().contentRef;
			},
			get view() {
				return context().view;
			},
			get mark() {
				return context().mark;
			}
		});
	};
}
/**
* @internal
*/
function consumeSolidMarkViews() {
	const markViewFactory = useMarkViewFactory();
	useExtension(createMemo(() => defineSolidMarkViewFactory(markViewFactory), [markViewFactory]));
}
/**
* Defines a mark view using a Solid component.
*
* @public
*/
function defineSolidMarkView(options) {
	const { name, component, ...userOptions } = options;
	return defineMarkViewComponent({
		group: "solid",
		name,
		args: {
			...userOptions,
			component: withMarkViewProps(component)
		}
	});
}
function defineSolidMarkViewFactory(factory) {
	return defineMarkViewFactory({
		group: "solid",
		factory
	});
}

//#endregion
//#region src/extensions/solid-node-view.ts
function withNodeViewProps(component) {
	return function NodeViewPropsWrapper() {
		const context = useNodeViewContext();
		return createComponent(component, {
			get contentRef() {
				return context().contentRef;
			},
			get view() {
				return context().view;
			},
			get getPos() {
				return context().getPos;
			},
			get setAttrs() {
				return context().setAttrs;
			},
			get node() {
				return context().node;
			},
			get selected() {
				return context().selected;
			},
			get decorations() {
				return context().decorations;
			},
			get innerDecorations() {
				return context().innerDecorations;
			}
		});
	};
}
/**
* @internal
*/
function consumeSolidNodeViews() {
	const nodeViewFactory = useNodeViewFactory();
	useExtension(createMemo(() => defineSolidNodeViewFactory(nodeViewFactory), [nodeViewFactory]));
}
/**
* Defines a node view using a Solid component.
*
* @public
*/
function defineSolidNodeView(options) {
	const { name, component, ...userOptions } = options;
	return defineNodeViewComponent({
		group: "solid",
		name,
		args: {
			...userOptions,
			component: withNodeViewProps(component)
		}
	});
}
function defineSolidNodeViewFactory(factory) {
	return defineNodeViewFactory({
		group: "solid",
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
const ProseKit = (props) => {
	return createComponent(ProsemirrorAdapterProvider, { get children() {
		return createComponent(EditorContextProvider, {
			get value() {
				return props.editor;
			},
			get children() {
				consumeSolidNodeViews();
				consumeSolidMarkViews();
				return props.children;
			}
		});
	} });
};

//#endregion
//#region src/hooks/use-doc-change.ts
/**
* Calls the given handler whenever the editor document changes.
*
* @public
*/
function useDocChange(handler, options) {
	const extension = defineDocChangeHandler((view) => handler(view.state.doc));
	useExtension(() => extension, options);
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
	const [depend, forceUpdate] = useForceUpdate();
	createEffect(() => {
		if (update) {
			const extension = union(defineMountHandler(forceUpdate), defineUpdateHandler(forceUpdate));
			return editor.use(extension);
		}
	}, [
		editor,
		update,
		forceUpdate
	]);
	return () => {
		depend();
		return editor;
	};
}
function useForceUpdate() {
	return createSignal(void 0, { equals: false });
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
* It returns an accessor of the derived value that updates whenever the editor
* state changes.
*
* @public
*/
function useEditorDerivedValue(derive, options) {
	const initialEditor = options?.editor;
	const editorAccessor = initialEditor ? () => toValue(initialEditor) : useEditor({ update: true });
	return createMemo(() => derive(editorAccessor()));
}

//#endregion
//#region src/hooks/use-keymap.ts
function useKeymap(keymap, options) {
	const extension = () => defineKeymap(keymap());
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
	useExtension(() => extension, options);
}

//#endregion
export { ProseKit, defineSolidMarkView, defineSolidNodeView, useDocChange, useEditor, useEditorDerivedValue, useExtension, useKeymap, useStateUpdate };
//# sourceMappingURL=prosekit-solid.js.map