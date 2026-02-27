import { definePlugin } from "@prosekit/core";
import { dropCursor } from "prosemirror-dropcursor";

//#region src/drop-cursor/drop-cursor.ts
/**
* Show up a decoration at the drop position when something is dragged over the editor.
*
* See [prosemirror-dropcursor](https://github.com/ProseMirror/prosemirror-dropcursor) for more information.
*
* You probably want to use `<DropIndicator />` component instead of this extension.
*
* @public
*/
function defineDropCursor(options) {
	return definePlugin(() => dropCursor(options));
}

//#endregion
export { defineDropCursor };
//# sourceMappingURL=prosekit-extensions-drop-cursor.js.map