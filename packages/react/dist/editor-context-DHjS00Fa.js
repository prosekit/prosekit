import { createContext, useContext } from "react";

//#region src/contexts/editor-context.ts
const EditorContext = createContext(null);
/**
* @internal
*/
function useEditorContext() {
	return useContext(EditorContext);
}
/**
* @internal
*/
const EditorContextProvider = EditorContext.Provider;

//#endregion
export { useEditorContext as n, EditorContextProvider as t };
//# sourceMappingURL=editor-context-DHjS00Fa.js.map