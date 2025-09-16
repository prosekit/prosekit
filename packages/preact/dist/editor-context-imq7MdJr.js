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
export { EditorContextProvider, useEditorContext };
//# sourceMappingURL=editor-context-imq7MdJr.js.map