import { EditorContextProvider, useEditorContext } from "./editor-context-imq7MdJr.js";
import { h } from "preact";
import { useEffect, useMemo, useReducer } from "preact/hooks";
import { EditorNotFoundError, ProseKitError, defineDocChangeHandler, defineKeymap, defineMountHandler, defineUpdateHandler, union, withPriority } from "@prosekit/core";

//#region src/components/prosekit.ts
/**
* The root component for a ProseKit editor.
*
* @public
*/
const ProseKit = (props) => {
	const { editor, children } = props;
	return h(EditorContextProvider, {
		value: editor,
		children
	});
};

//#endregion
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
export { ProseKit, useDocChange, useEditor, useExtension, useKeymap, useStateUpdate };
//# sourceMappingURL=prosekit-preact.js.map