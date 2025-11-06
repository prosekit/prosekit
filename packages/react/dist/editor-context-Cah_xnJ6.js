import { createContext, useContext } from "react";

//#region src/contexts/editor-context.ts
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

//#endregion
export { useEditorContext as n, EditorContextProvider as t };
//# sourceMappingURL=editor-context-Cah_xnJ6.js.map