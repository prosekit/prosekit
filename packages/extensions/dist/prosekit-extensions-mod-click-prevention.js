import { definePlugin, isApple } from "@prosekit/core";
import { Plugin, PluginKey } from "@prosekit/pm/state";

//#region src/mod-click-prevention/index.ts
/**
* By default, clicking a node while holding the mod key will select the node. This
* extension disables that behavior.
*
* @public
*/
function defineModClickPrevention() {
	return definePlugin(new Plugin({
		key,
		props: { handleClick }
	}));
}
const key = new PluginKey("prosekit-mod-click-prevention");
function handleClick(_view, _pos, event) {
	return !!event[selectNodeModifier];
}
const selectNodeModifier = isApple ? "metaKey" : "ctrlKey";

//#endregion
export { defineModClickPrevention };
//# sourceMappingURL=prosekit-extensions-mod-click-prevention.js.map