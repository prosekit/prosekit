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
export { EditorContextProvider, useEditorContext };
//# sourceMappingURL=editor-context-Cci4uqN_.js.map