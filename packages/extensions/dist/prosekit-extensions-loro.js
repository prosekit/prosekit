import { Priority, defineCommands, defineKeymap, definePlugin, isApple, union, withPriority } from "@prosekit/core";
import { LoroCursorPlugin, LoroSyncPlugin, LoroUndoPlugin, redo, undo } from "loro-prosemirror";

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
	const { awareness,...rest } = options;
	return definePlugin(LoroCursorPlugin(awareness, rest));
}

//#endregion
//#region src/loro/loro-keymap.ts
const keymap = {
	"Mod-z": undo,
	"Shift-Mod-z": redo
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
	const { doc, awareness, sync, undo: undo$1, cursor } = options;
	return withPriority(union([
		defineLoroKeymap(),
		defineLoroCommands(),
		defineLoroCursorPlugin({
			...cursor,
			awareness
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