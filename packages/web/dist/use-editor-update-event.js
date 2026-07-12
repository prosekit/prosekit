import { t as useEditorExtension } from "./use-editor-extension.js";
import { defineUpdateHandler } from "@prosekit/core";
/**
* @internal
*/
function useEditorUpdateEvent(host, getEditor, handler) {
	useEditorExtension(host, getEditor, defineUpdateHandler(handler));
}
export { useEditorUpdateEvent as t };

//# sourceMappingURL=use-editor-update-event.js.map