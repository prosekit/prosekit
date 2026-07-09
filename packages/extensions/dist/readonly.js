import { PluginKey, ProseMirrorPlugin } from "@prosekit/pm/state";
import { definePlugin } from "@prosekit/core";
/**
* Marks the editor as read-only.
*
* @module
*/
/**
* Make the editor read-only.
*/
function defineReadonly() {
	return definePlugin(plugin);
}
const plugin = new ProseMirrorPlugin({
	key: new PluginKey("prosekey-readonly"),
	props: { editable: () => false }
});
export { defineReadonly };

//# sourceMappingURL=readonly.js.map