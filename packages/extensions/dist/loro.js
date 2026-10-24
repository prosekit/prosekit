import { defineCommands, defineKeymap, definePlugin, isApple, union, withPriority } from "@prosekit/core";
import { LoroCursorPlugin, LoroEphemeralCursorPlugin, LoroSyncPlugin, LoroUndoPlugin, redo, undo } from "loro-prosemirror";
const commands = {
	undo: () => undo,
	redo: () => redo
};
function defineLoroCommands() {
	return defineCommands(commands);
}
function defineLoroCursorPlugin(options) {
	return definePlugin(createLoroCursorPlugin(options));
}
function createLoroCursorPlugin(options) {
	const { awareness, presence, ...rest } = options;
	if (awareness && presence) throw new Error("Only one of awareness and presence can be provided");
	else if (awareness) return LoroCursorPlugin(awareness, rest);
	else if (presence) return LoroEphemeralCursorPlugin(presence, rest);
	else throw new Error("Either awareness or presence must be provided");
}
const keymap = {
	"Mod-z": undo,
	"Mod-Z": redo
};
if (!isApple) keymap["Mod-y"] = redo;
function defineLoroKeymap() {
	return defineKeymap(keymap);
}
function defineLoroSyncPlugin(options) {
	return definePlugin(LoroSyncPlugin(options));
}
function defineLoroUndoPlugin(options) {
	return definePlugin(LoroUndoPlugin(options));
}
function defineLoro(options) {
	const { doc, awareness, presence, sync, undo, cursor } = options;
	return withPriority(union([
		defineLoroKeymap(),
		defineLoroCommands(),
		defineLoroCursorPlugin({
			...cursor,
			awareness,
			presence
		}),
		defineLoroUndoPlugin({
			...undo,
			doc
		}),
		defineLoroSyncPlugin({
			...sync,
			doc
		})
	]), 3);
}
export { defineLoro, defineLoroCommands, defineLoroCursorPlugin, defineLoroKeymap, defineLoroSyncPlugin, defineLoroUndoPlugin };

//# sourceMappingURL=loro.js.map