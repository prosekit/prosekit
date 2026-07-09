import { n as useEditorContext, t as EditorContextProvider } from "./editor-context.js";
import { createComponent, createEffect, createMemo, createSignal, onCleanup } from "solid-js";
import { EditorNotFoundError, ProseKitError, defineDocChangeHandler, defineKeymap, defineMarkViewComponent, defineMarkViewFactory, defineMountHandler, defineNodeViewComponent, defineNodeViewFactory, defineUpdateHandler, union, withPriority } from "@prosekit/core";
import { AbstractSolidMarkView, AbstractSolidNodeView, buildSolidMarkViewCreator, buildSolidNodeViewCreator, useSolidRenderer } from "@prosemirror-adapter/solid";
import { Portal } from "solid-js/web";
function hidePortalDiv(el) {
	el.style.display = "contents";
	el.dataset.solidPortal = "true";
}
var ProseKitSolidMarkView = class extends AbstractSolidMarkView {
	constructor(..._args) {
		super(..._args);
		this.render = () => {
			const UserComponent = this.component;
			const getProps = this.context;
			return createComponent(Portal, {
				mount: this.dom,
				children: createComponent(UserComponent, {
					get contentRef() {
						return getProps().contentRef;
					},
					get view() {
						return getProps().view;
					},
					get mark() {
						return getProps().mark;
					}
				}),
				ref: hidePortalDiv
			});
		};
	}
};
/**
* @internal
*/
function defineSolidMarkViewFactory(renderSolidRenderer, removeSolidRenderer) {
	return defineMarkViewFactory({
		group: "solid",
		factory: buildSolidMarkViewCreator(renderSolidRenderer, removeSolidRenderer, ProseKitSolidMarkView)
	});
}
/**
* Defines a mark view using a Solid component.
*/
function defineSolidMarkView(options) {
	return defineMarkViewComponent({
		group: "solid",
		name: options.name,
		args: options
	});
}
var ProseKitSolidNodeView = class extends AbstractSolidNodeView {
	constructor(..._args) {
		super(..._args);
		this.render = () => {
			const UserComponent = this.component;
			const getProps = this.context;
			return createComponent(Portal, {
				mount: this.dom,
				children: createComponent(UserComponent, {
					get contentRef() {
						return getProps().contentRef;
					},
					get view() {
						return getProps().view;
					},
					get getPos() {
						return getProps().getPos;
					},
					get setAttrs() {
						return getProps().setAttrs;
					},
					get node() {
						return getProps().node;
					},
					get selected() {
						return getProps().selected;
					},
					get decorations() {
						return getProps().decorations;
					},
					get innerDecorations() {
						return getProps().innerDecorations;
					}
				}),
				ref: hidePortalDiv
			});
		};
	}
};
/**
* @internal
*/
function defineSolidNodeViewFactory(renderSolidRenderer, removeSolidRenderer) {
	return defineNodeViewFactory({
		group: "solid",
		factory: buildSolidNodeViewCreator(renderSolidRenderer, removeSolidRenderer, ProseKitSolidNodeView)
	});
}
/**
* Defines a node view using a Solid component.
*/
function defineSolidNodeView(options) {
	return defineNodeViewComponent({
		group: "solid",
		name: options.name,
		args: options
	});
}
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
const ViewRenderer = (props) => {
	const { renderSolidRenderer, removeSolidRenderer, render } = useSolidRenderer();
	const extension = union([defineSolidMarkViewFactory(renderSolidRenderer, removeSolidRenderer), defineSolidNodeViewFactory(renderSolidRenderer, removeSolidRenderer)]);
	useEditorExtension(() => props.editor, () => extension);
	return [props.children, render];
};
/**
* The root component for a ProseKit editor.
*/
const ProseKit = (props) => {
	return createComponent(EditorContextProvider, {
		get value() {
			return props.editor;
		},
		get children() {
			return createComponent(ViewRenderer, {
				get editor() {
					return props.editor;
				},
				get children() {
					return props.children;
				}
			});
		}
	});
};
/**
* @internal
*/
function usePriorityExtension(extension, priority) {
	return () => {
		const ext = extension();
		return ext && priority ? withPriority(ext, priority) : ext;
	};
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
	const extension = defineDocChangeHandler((view) => handler(view.state.doc));
	useExtension(() => extension, options);
}
/**
* Retrieves the editor instance from the nearest ProseKit component.
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
/**
* Runs a function to derive a value from the editor instance after editor state
* changes.
*
* This is useful when you need to render something based on the editor state,
* for example, whether the selected text is wrapped in an italic mark.
*
* It returns an accessor of the derived value that updates whenever the editor
* state changes.
*/
function useEditorDerivedValue(derive, options) {
	const initialEditor = options?.editor;
	const editorAccessor = initialEditor ? () => toValue(initialEditor) : useEditor({ update: true });
	return createMemo(() => derive(editorAccessor()));
}
function useKeymap(keymap, options) {
	const extension = () => defineKeymap(keymap());
	useExtension(extension, options);
}
/**
* Calls the given handler whenever the editor state changes.
*/
function useStateUpdate(handler, options) {
	const extension = defineUpdateHandler((view) => handler(view.state));
	useExtension(() => extension, options);
}
export { ProseKit, defineSolidMarkView, defineSolidNodeView, useDocChange, useEditor, useEditorDerivedValue, useExtension, useKeymap, useStateUpdate };

//# sourceMappingURL=index.js.map