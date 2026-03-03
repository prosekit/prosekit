import { Priority, defineCommands, defineKeymap, definePlugin, isApple, union, withPriority } from "@prosekit/core";
import { redoCommand, undoCommand, yCursorPlugin, ySyncPlugin, yUndoPlugin, yUndoPluginKey } from "y-prosemirror";

//#region src/yjs/yjs-commands.ts
const commands = {
	undo: () => undoCommand,
	redo: () => redoCommand
};
function defineYjsCommands() {
	return defineCommands(commands);
}

//#endregion
//#region src/yjs/yjs-cursor-plugin.ts
function defineYjsCursorPlugin(options) {
	const { awareness, ...rest } = options;
	return definePlugin(yCursorPlugin(awareness, rest));
}

//#endregion
//#region src/yjs/yjs-keymap.ts
const keymap = {
	"Mod-z": undoCommand,
	"Mod-Z": redoCommand
};
if (!isApple) keymap["Mod-y"] = redoCommand;
function defineYjsKeymap() {
	return defineKeymap(keymap);
}

//#endregion
//#region src/yjs/yjs-sync-plugin.ts
function defineYjsSyncPlugin(options) {
	const { fragment, ...rest } = options;
	return definePlugin(ySyncPlugin(fragment, rest));
}

//#endregion
//#region src/yjs/yjs-undo-plugin.ts
/**
* @see https://github.com/yjs/y-prosemirror/issues/114 and https://github.com/yjs/y-prosemirror/issues/102
*/
function fixYUndoPlugin(yUndoPluginInstance) {
	const originalUndoPluginView = yUndoPluginInstance.spec.view;
	yUndoPluginInstance.spec.view = (view) => {
		const pluginState = yUndoPluginKey.getState(view.state);
		if (!pluginState) return {};
		const undoManager = pluginState.undoManager;
		if (undoManager.restore) {
			undoManager.restore();
			undoManager.restore = () => {};
		}
		const viewRet = originalUndoPluginView ? originalUndoPluginView(view) : void 0;
		return { destroy: () => {
			const hasUndoManSelf = undoManager.trackedOrigins.has(undoManager);
			const observers = undoManager._observers;
			undoManager.restore = () => {
				if (hasUndoManSelf) undoManager.trackedOrigins.add(undoManager);
				undoManager.doc.on("afterTransaction", undoManager.afterTransactionHandler);
				undoManager._observers = observers;
			};
			if (viewRet?.destroy) viewRet.destroy();
		} };
	};
}
/**
* @internal
*/
function yUndoPlugin$1(options) {
	const yUndoPluginInstance = yUndoPlugin(options);
	fixYUndoPlugin(yUndoPluginInstance);
	return yUndoPluginInstance;
}
/**
* @internal
*/
function defineYjsUndoPlugin(options) {
	return definePlugin(yUndoPlugin$1(options));
}

//#endregion
//#region src/yjs/yjs.ts
/**
* @public
*/
function defineYjs(options) {
	const { doc, awareness, sync, undo, cursor } = options;
	const fragment = options.fragment ?? doc.getXmlFragment("prosemirror");
	return withPriority(union([
		defineYjsKeymap(),
		defineYjsCommands(),
		defineYjsCursorPlugin({
			...cursor,
			awareness
		}),
		defineYjsUndoPlugin({ ...undo }),
		defineYjsSyncPlugin({
			...sync,
			fragment
		})
	]), Priority.high);
}

//#endregion
export { defineYjs, defineYjsCommands, defineYjsCursorPlugin, defineYjsKeymap, defineYjsSyncPlugin, defineYjsUndoPlugin };
//# sourceMappingURL=prosekit-extensions-yjs.js.map