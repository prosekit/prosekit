import { createContext, useContext } from "react";
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
export { useEditorContext as n, EditorContextProvider as t };

//# sourceMappingURL=editor-context.js.map