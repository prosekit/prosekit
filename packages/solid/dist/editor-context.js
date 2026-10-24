import { createContext, useContext } from "solid-js";
const editorContext = createContext(null);
/**
* @internal
*/
function useEditorContext() {
	return useContext(editorContext);
}
/**
* @internal
*/
const EditorContextProvider = editorContext.Provider;
export { useEditorContext as n, EditorContextProvider as t };

//# sourceMappingURL=editor-context.js.map