import { t as useEditorExtension } from "./use-editor-extension.js";
import { defineUpdateHandler } from "@prosekit/core";
/**
* @internal
*/
function useEditorUpdateEvent(host, getEditor, handler) {
	const extension = defineUpdateHandler(handler);
	useEditorExtension(host, getEditor, extension);
}
export { useEditorUpdateEvent as t };

//# sourceMappingURL=use-editor-update-event.js.map