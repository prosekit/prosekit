import { createContext, useContext } from "solid-js";

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
export { EditorContextProvider, useEditorContext };
//# sourceMappingURL=editor-context-DIj_hnDx.js.map