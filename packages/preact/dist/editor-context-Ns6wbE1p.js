import { createContext } from "preact";
import { useContext } from "preact/hooks";

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
//# sourceMappingURL=editor-context-Ns6wbE1p.js.map