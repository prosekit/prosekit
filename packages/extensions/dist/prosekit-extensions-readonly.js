import { PluginKey, ProseMirrorPlugin } from "@prosekit/pm/state";
import { definePlugin } from "@prosekit/core";

//#region src/readonly/index.ts
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

//#endregion
export { defineReadonly };
//# sourceMappingURL=prosekit-extensions-readonly.js.map