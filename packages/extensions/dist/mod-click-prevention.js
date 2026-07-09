import { Plugin, PluginKey } from "@prosekit/pm/state";
import { definePlugin, isApple } from "@prosekit/core";
/**
* By default, clicking a node while holding the mod key will select the node. This
* extension disables that behavior.
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
export { defineModClickPrevention };

//# sourceMappingURL=mod-click-prevention.js.map