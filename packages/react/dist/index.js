"use client";
import { n as useEditorContext, t as EditorContextProvider } from "./editor-context.js";
import { Fragment, createElement, useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useSyncExternalStore } from "react";
import { EditorNotFoundError, ProseKitError, defineDocChangeHandler, defineKeymap, defineMarkViewComponent, defineMarkViewFactory, defineMountHandler, defineNodeViewComponent, defineNodeViewFactory, defineUpdateHandler, union, withPriority } from "@prosekit/core";
import { AbstractReactMarkView, AbstractReactNodeView, buildReactMarkViewCreator, buildReactNodeViewCreator, useReactRenderer } from "@prosemirror-adapter/react";
import { createPortal } from "react-dom";
import { queueExtension } from "@prosekit/web";
var ProseKitReactMarkView = class extends AbstractReactMarkView {
	constructor(..._args) {
		super(..._args);
		this.render = () => {
			const UserComponent = this.component;
			return createPortal(createElement(UserComponent, { ...this.context }), this.dom, this.key);
		};
	}
};
/**
* @internal
*/
function defineReactMarkViewFactory(renderReactRenderer, removeReactRenderer) {
	return defineMarkViewFactory({
		group: "react",
		factory: buildReactMarkViewCreator(renderReactRenderer, removeReactRenderer, ProseKitReactMarkView)
	});
}
/**
* Defines a mark view using a React component.
*/
function defineReactMarkView(options) {
	return defineMarkViewComponent({
		group: "react",
		name: options.name,
		args: options
	});
}
var ProseKitReactNodeView = class extends AbstractReactNodeView {
	constructor(..._args) {
		super(..._args);
		this.render = () => {
			const UserComponent = this.component;
			return createPortal(createElement(UserComponent, { ...this.context }), this.dom, this.key);
		};
	}
};
/**
* @internal
*/
function defineReactNodeViewFactory(renderReactRenderer, removeReactRenderer) {
	return defineNodeViewFactory({
		group: "react",
		factory: buildReactNodeViewCreator(renderReactRenderer, removeReactRenderer, ProseKitReactNodeView)
	});
}
/**
* Defines a node view using a React component.
*/
function defineReactNodeView(options) {
	return defineNodeViewComponent({
		group: "react",
		name: options.name,
		args: options
	});
}
/**
* @internal
*/
function useEditorExtension(editor, extension) {
	if (!editor) throw new EditorNotFoundError();
	useEffect(() => {
		if (extension) return queueExtension(editor, extension);
	}, [editor, extension]);
}
const ViewRenderer = ({ editor, children }) => {
	const { renderReactRenderer, removeReactRenderer, render } = useReactRenderer();
	useEditorExtension(editor, useMemo(() => {
		return union([defineReactMarkViewFactory(renderReactRenderer, removeReactRenderer), defineReactNodeViewFactory(renderReactRenderer, removeReactRenderer)]);
	}, [renderReactRenderer, removeReactRenderer]));
	return createElement(Fragment, null, createElement(Fragment, null, children), createElement(Fragment, null, render()));
};
/**
* The root component for a ProseKit editor.
*/
const ProseKit = (props) => {
	const { editor, children } = props;
	return createElement(EditorContextProvider, { value: editor }, createElement(ViewRenderer, {
		editor,
		children
	}));
};
/**
* @internal
*/
function useEventCallback(callback) {
	const callbackRef = useRef(callback);
	useLayoutEffect(() => {
		callbackRef.current = callback;
	}, [callback]);
	return useCallback((...args) => callbackRef.current(...args), []);
}
/**
* @internal
*/
function usePriorityExtension(extension, priority) {
	return useMemo(() => {
		return extension && priority ? withPriority(extension, priority) : extension;
	}, [extension, priority]);
}
/**
* Add an extension to the editor.
*/
function useExtension(extension, options) {
	const editorContext = useEditorContext();
	useEditorExtension(options?.editor || editorContext, usePriorityExtension(extension, options?.priority));
}
/**
* Calls the given handler whenever the editor document changes.
*/
function useDocChange(handler, options) {
	const memoizedHandler = useEventCallback(handler);
	useExtension(useMemo(() => defineDocChangeHandler((view) => memoizedHandler(view.state.doc)), [memoizedHandler]), options);
}
/**
* Runs a function to derive a value from the editor instance after editor state
* changes.
*
* This is useful when you need to render something based on the editor state,
* for example, whether the selected text is wrapped in an italic mark.
*
* It returns the derived value that updates whenever the editor state changes.
*/
function useEditorDerivedValue(derive, options) {
	const editorContext = useEditorContext();
	const editor = options?.editor ?? editorContext;
	if (!editor) throw new EditorNotFoundError();
	const [subscribe, getSnapshot] = useMemo(() => {
		return createEditorStore(editor, derive);
	}, [editor, derive]);
	return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
function createEditorStore(editor, derive) {
	let dirty = true;
	let derived;
	const subscribe = (onChange) => {
		const handleChange = () => {
			dirty = true;
			onChange();
		};
		const extension = union(defineUpdateHandler(handleChange), defineMountHandler(handleChange));
		return editor.use(extension);
	};
	const getSnapshot = () => {
		if (dirty) {
			dirty = false;
			derived = derive(editor);
		}
		return derived;
	};
	return [subscribe, getSnapshot];
}
/**
* Retrieves the editor instance from the nearest ProseKit component.
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
function useKeymap(keymap, options) {
	useExtension(useMemo(() => defineKeymap(keymap), [keymap]), options);
}
/**
* Calls the given handler whenever the editor state changes.
*/
function useStateUpdate(handler, options) {
	const memoizedHandler = useEventCallback(handler);
	useExtension(useMemo(() => defineUpdateHandler((view) => memoizedHandler(view.state)), [memoizedHandler]), options);
}
export { ProseKit, defineReactMarkView, defineReactNodeView, useDocChange, useEditor, useEditorDerivedValue, useExtension, useKeymap, useStateUpdate };

//# sourceMappingURL=index.js.map