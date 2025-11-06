import { createContext } from "preact";
import { useContext } from "preact/hooks";

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
//# sourceMappingURL=editor-context-2FBNRtz5.js.map