import { n as useEditorContext, t as EditorContextProvider } from "./editor-context-Ns6wbE1p.js";
import { ProsemirrorAdapterProvider, useMarkViewContext, useMarkViewFactory, useNodeViewContext, useNodeViewFactory } from "@prosemirror-adapter/preact";
import { h } from "preact";
import { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef } from "preact/hooks";
import { EditorNotFoundError, ProseKitError, defineDocChangeHandler, defineKeymap, defineMarkViewComponent, defineMarkViewFactory, defineMountHandler, defineNodeViewComponent, defineNodeViewFactory, defineUpdateHandler, union, withPriority } from "@prosekit/core";
import { queueExtension } from "@prosekit/web";
import { useSyncExternalStore } from "preact/compat";

//#region src/hooks/use-editor-extension.ts
/**
* @internal
*/
function useEditorExtension(editor, extension) {
	if (!editor) throw new EditorNotFoundError();
	useEffect(() => {
		if (extension) return queueExtension(editor, extension);
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
//#region src/extensions/preact-mark-view.ts
function withMarkViewProps(component) {
	return function MarkViewPropsWrapper() {
		return h(component, useMarkViewContext());
	};
}
/**
* @internal
*/
const PreactMarkViewConsumer = () => {
	const markViewFactory = useMarkViewFactory();
	useExtension(useMemo(() => definePreactMarkViewFactory(markViewFactory), [markViewFactory]));
	return null;
};
/**
* Defines a mark view using a Preact component.
*
* @public
*/
function definePreactMarkView(options) {
	const { name, component, ...userOptions } = options;
	return defineMarkViewComponent({
		group: "preact",
		name,
		args: {
			...userOptions,
			component: withMarkViewProps(component)
		}
	});
}
function definePreactMarkViewFactory(factory) {
	return defineMarkViewFactory({
		group: "preact",
		factory
	});
}

//#endregion
//#region src/extensions/preact-node-view.ts
function withNodeViewProps(component) {
	return function NodeViewPropsWrapper() {
		return h(component, useNodeViewContext());
	};
}
/**
* @internal
*/
const PreactNodeViewConsumer = () => {
	const nodeViewFactory = useNodeViewFactory();
	useExtension(useMemo(() => definePreactNodeViewFactory(nodeViewFactory), [nodeViewFactory]));
	return null;
};
/**
* Defines a node view using a Preact component.
*
* @public
*/
function definePreactNodeView(options) {
	const { name, component, ...userOptions } = options;
	return defineNodeViewComponent({
		group: "preact",
		name,
		args: {
			...userOptions,
			component: withNodeViewProps(component)
		}
	});
}
function definePreactNodeViewFactory(factory) {
	return defineNodeViewFactory({
		group: "preact",
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
	return h(EditorContextProvider, { value: editor }, h(ProsemirrorAdapterProvider, null, h(PreactNodeViewConsumer, null), h(PreactMarkViewConsumer, null), children));
};

//#endregion
//#region src/hooks/use-event-callback.ts
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

//#endregion
//#region src/hooks/use-doc-change.ts
/**
* Calls the given handler whenever the editor document changes.
*
* @public
*/
function useDocChange(handler, options) {
	const memoizedHandler = useEventCallback(handler);
	useExtension(useMemo(() => defineDocChangeHandler((view) => memoizedHandler(view.state.doc)), [memoizedHandler]), options);
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
//#region src/hooks/use-editor-derived-value.ts
/**
* Runs a function to derive a value from the editor instance after editor state
* changes.
*
* This is useful when you need to render something based on the editor state,
* for example, whether the selected text is wrapped in an italic mark.
*
* It returns the derived value that updates whenever the editor state changes.
*
* @public
*/
function useEditorDerivedValue(derive, options) {
	const editorContext = useEditorContext();
	const editor = options?.editor ?? editorContext;
	if (!editor) throw new EditorNotFoundError();
	const [subscribe, getSnapshot] = useMemo(() => {
		return createEditorStore(editor, derive);
	}, [editor, derive]);
	return useSyncExternalStore(subscribe, getSnapshot);
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

//#endregion
//#region src/hooks/use-keymap.ts
function useKeymap(keymap, options) {
	useExtension(useMemo(() => defineKeymap(keymap), [keymap]), options);
}

//#endregion
//#region src/hooks/use-state-update.ts
/**
* Calls the given handler whenever the editor state changes.
*
* @public
*/
function useStateUpdate(handler, options) {
	const memoizedHandler = useEventCallback(handler);
	useExtension(useMemo(() => defineUpdateHandler((view) => memoizedHandler(view.state)), [memoizedHandler]), options);
}

//#endregion
export { ProseKit, definePreactMarkView, definePreactNodeView, useDocChange, useEditor, useEditorDerivedValue, useExtension, useKeymap, useStateUpdate };
//# sourceMappingURL=prosekit-preact.js.map