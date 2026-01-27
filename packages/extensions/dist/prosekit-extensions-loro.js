import { Priority, defineCommands, defineKeymap, definePlugin, isApple, union, withPriority } from "@prosekit/core";
import { LoroCursorPlugin, LoroEphemeralCursorPlugin, LoroSyncPlugin, LoroUndoPlugin, redo, undo } from "loro-prosemirror";

//#region src/loro/loro-commands.ts
const commands = {
	undo: () => undo,
	redo: () => redo
};
function defineLoroCommands() {
	return defineCommands(commands);
}

//#endregion
//#region src/loro/loro-cursor-plugin.ts
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

//#endregion
//#region src/loro/loro-keymap.ts
const keymap = {
	"Mod-z": undo,
	"Mod-Z": redo
};
if (!isApple) keymap["Mod-y"] = redo;
function defineLoroKeymap() {
	return defineKeymap(keymap);
}

//#endregion
//#region src/loro/loro-sync-plugin.ts
function defineLoroSyncPlugin(options) {
	return definePlugin(LoroSyncPlugin(options));
}

//#endregion
//#region src/loro/loro-undo-plugin.ts
function defineLoroUndoPlugin(options) {
	return definePlugin(LoroUndoPlugin(options));
}

//#endregion
//#region src/loro/loro.ts
/**
* @public
*/
function defineLoro(options) {
	const { doc, awareness, presence, sync, undo: undo$1, cursor } = options;
	return withPriority(union([
		defineLoroKeymap(),
		defineLoroCommands(),
		defineLoroCursorPlugin({
			...cursor,
			awareness,
			presence
		}),
		defineLoroUndoPlugin({
			...undo$1,
			doc
		}),
		defineLoroSyncPlugin({
			...sync,
			doc
		})
	]), Priority.high);
}

//#endregion
export { defineLoro, defineLoroCommands, defineLoroCursorPlugin, defineLoroKeymap, defineLoroSyncPlugin, defineLoroUndoPlugin };
//# sourceMappingURL=prosekit-extensions-loro.js.map