import { EditorContextProvider, useEditorContext } from "./editor-context-Cci4uqN_.js";
import { ProsemirrorAdapterProvider, useMarkViewContext, useMarkViewFactory, useNodeViewContext, useNodeViewFactory } from "@prosemirror-adapter/react";
import { createElement, useEffect, useMemo, useReducer } from "react";
import { EditorNotFoundError, ProseKitError, defineDocChangeHandler, defineKeymap, defineMarkViewComponent, defineMarkViewFactory, defineMountHandler, defineNodeViewComponent, defineNodeViewFactory, defineUpdateHandler, union, withPriority } from "@prosekit/core";

//#region src/hooks/use-editor-extension.ts
/**
* @internal
*/
function useEditorExtension(editor, extension) {
	if (!editor) throw new EditorNotFoundError();
	useEffect(() => {
		if (extension) return editor.use(extension);
	}, [editor, extension]);
}

//#endregion
//#region src/hooks/use-priority-extension.ts
/**
* @internal
*/
function usePriorityExtension(extension, priority) {
	return useMemo(() => {
		return extension && priority ? withPriority(extension, priority) : extension;
	}, [extension, priority]);
}

//#endregion
//#region src/hooks/use-extension.ts
/**
* Add an extension to the editor.
*/
function useExtension(extension, options) {
	const editorContext = useEditorContext();
	useEditorExtension(options?.editor || editorContext, usePriorityExtension(extension, options?.priority));
}

//#endregion
//#region src/extensions/react-mark-view.ts
function withMarkViewProps(component) {
	return function MarkViewPropsWrapper() {
		const props = useMarkViewContext();
		return createElement(component, props);
	};
}
/**
* @internal
*/
const ReactMarkViewConsumer = () => {
	const markViewFactory = useMarkViewFactory();
	const extension = useMemo(() => defineReactMarkViewFactory(markViewFactory), [markViewFactory]);
	useExtension(extension);
	return null;
};
/**
* Defines a mark view using a React component.
*
* @public
*/
function defineReactMarkView(options) {
	const { name, component,...userOptions } = options;
	const args = {
		...userOptions,
		component: withMarkViewProps(component)
	};
	return defineMarkViewComponent({
		group: "react",
		name,
		args
	});
}
function defineReactMarkViewFactory(factory) {
	return defineMarkViewFactory({
		group: "react",
		factory
	});
}

//#endregion
//#region src/extensions/react-node-view.ts
function withNodeViewProps(component) {
	return function NodeViewPropsWrapper() {
		const props = useNodeViewContext();
		return createElement(component, props);
	};
}
/**
* @internal
*/
const ReactNodeViewConsumer = () => {
	const nodeViewFactory = useNodeViewFactory();
	const extension = useMemo(() => defineReactNodeViewFactory(nodeViewFactory), [nodeViewFactory]);
	useExtension(extension);
	return null;
};
/**
* Defines a node view using a React component.
*
* @public
*/
function defineReactNodeView(options) {
	const { name, component,...userOptions } = options;
	const args = {
		...userOptions,
		component: withNodeViewProps(component)
	};
	return defineNodeViewComponent({
		group: "react",
		name,
		args
	});
}
function defineReactNodeViewFactory(factory) {
	return defineNodeViewFactory({
		group: "react",
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
	const { editor, children } = props;
	return createElement(ProsemirrorAdapterProvider, null, createElement(EditorContextProvider, { value: editor }, createElement(ReactNodeViewConsumer), createElement(ReactMarkViewConsumer), children));
};

//#endregion
//#region src/hooks/use-doc-change.ts
/**
* Calls the given handler whenever the editor document changes.
*
* @public
*/
function useDocChange(handler, options) {
	const extension = useMemo(() => defineDocChangeHandler((view) => handler(view.state.doc)), [handler]);
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
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		if (update) {
			const extension = union(defineMountHandler(forceUpdate), defineUpdateHandler(forceUpdate));
			return editor.use(extension);
		}
	}, [
		editor,
		update,
		forceUpdate
	]);
	return editor;
}
function useForceUpdate() {
	const [, dispatch] = useReducer((x) => x + 1, 0);
	return dispatch;
}

//#endregion
//#region src/hooks/use-keymap.ts
function useKeymap(keymap, options) {
	const extension = useMemo(() => defineKeymap(keymap), [keymap]);
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
	const extension = useMemo(() => defineUpdateHandler((view) => handler(view.state)), [handler]);
	useExtension(extension, options);
}

//#endregion
export { ProseKit, defineReactMarkView, defineReactNodeView, useDocChange, useEditor, useExtension, useKeymap, useStateUpdate };