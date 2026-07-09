import { definePlugin } from "@prosekit/core";
import { dropCursor } from "prosemirror-dropcursor";
/**
* Show up a decoration at the drop position when something is dragged over the editor.
*
* See [prosemirror-dropcursor](https://github.com/ProseMirror/prosemirror-dropcursor) for more information.
*
* You probably want to use `<DropIndicator />` component instead of this extension.
*/
function defineDropCursor(options) {
	return definePlugin(() => dropCursor(options));
}
export { defineDropCursor };

//# sourceMappingURL=drop-cursor.js.map