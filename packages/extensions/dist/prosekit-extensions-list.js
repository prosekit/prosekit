import { defineInputRule } from "./input-rule-Gji4N7Oe.js";
import { defineClipboardSerializer, defineCommands, defineKeymap, defineNodeSpec, definePlugin, insertNode, union } from "@prosekit/core";
import { Plugin } from "@prosekit/pm/state";
import { chainCommands, deleteSelection } from "@prosekit/pm/commands";
import { ListDOMSerializer, createDedentListCommand, createIndentListCommand, createListEventPlugin, createListRenderingPlugin, createListSpec, createMoveListCommand, createSafariInputMethodWorkaroundPlugin, createSplitListCommand, createToggleCollapsedCommand, createToggleListCommand, createUnwrapListCommand, createWrapInListCommand, deleteCommand, enterCommand, joinCollapsedListBackward, joinListElements, joinListUp, listInputRules, listToDOM, protectCollapsed, unwrapListSlice } from "prosemirror-flat-list";
import { isElementLike } from "@ocavue/utils";

//#region src/list/list-commands.ts
function insertList(attrs) {
	return insertNode({
		type: "list",
		attrs
	});
}
/**
* Defines list commands.
*
* @internal
*/
function defineListCommands() {
	return defineCommands({
		dedentList: createDedentListCommand,
		indentList: createIndentListCommand,
		moveList: createMoveListCommand,
		splitList: createSplitListCommand,
		toggleCollapsed: createToggleCollapsedCommand,
		unwrapList: createUnwrapListCommand,
		toggleList: createToggleListCommand,
		wrapInList: createWrapInListCommand,
		insertList
	});
}

//#endregion
//#region src/list/list-input-rules.ts
/**
* @internal
*/
function defineListInputRules() {
	return union(listInputRules.map(defineInputRule));
}

//#endregion
//#region src/list/list-keymap.ts
const backspaceCommand = chainCommands(protectCollapsed, deleteSelection, joinListUp, joinCollapsedListBackward);
const dedentListCommand = createDedentListCommand();
const indentListCommand = createIndentListCommand();
const listKeymap = {
	"Enter": enterCommand,
	"Backspace": backspaceCommand,
	"Delete": deleteCommand,
	"Mod-]": indentListCommand,
	"Mod-[": dedentListCommand,
	"Tab": indentListCommand,
	"Shift-Tab": dedentListCommand
};
/**
* Returns a extension that adds key bindings for list.
*
* @internal
*/
function defineListKeymap() {
	return defineKeymap(listKeymap);
}

//#endregion
//#region src/list/list-plugins.ts
function createListClipboardPlugin() {
	return new Plugin({ props: { transformCopied: unwrapListSlice } });
}
function createListPlugins() {
	return [
		createListEventPlugin(),
		createListRenderingPlugin(),
		createListClipboardPlugin(),
		createSafariInputMethodWorkaroundPlugin()
	];
}
/**
* @internal
*/
function defineListPlugins() {
	return definePlugin(createListPlugins);
}

//#endregion
//#region src/list/list-serializer.ts
/**
* @internal
*/
function defineListSerializer() {
	return defineClipboardSerializer({
		serializeFragmentWrapper: (fn) => {
			return (...args) => {
				const dom = fn(...args);
				return joinListElements(dom);
			};
		},
		serializeNodeWrapper: (fn) => {
			return (...args) => {
				const dom = fn(...args);
				return isElementLike(dom) ? joinListElements(dom) : dom;
			};
		},
		nodesFromSchemaWrapper: (fn) => {
			return (...args) => {
				const nodes = fn(...args);
				return {
					...nodes,
					list: (node) => listToDOM({
						node,
						nativeList: true,
						getMarkers: () => null
					})
				};
			};
		}
	});
}

//#endregion
//#region src/list/list-spec.ts
/**
* @internal
*/
function defineListSpec() {
	return defineNodeSpec({
		...createListSpec(),
		name: "list"
	});
}

//#endregion
//#region src/list/list.ts
/**
* @public
*/
function defineList() {
	return union(defineListSpec(), defineListPlugins(), defineListKeymap(), defineListInputRules(), defineListCommands(), defineListSerializer());
}

//#endregion
export { ListDOMSerializer, defineList, defineListCommands, defineListInputRules, defineListKeymap, defineListPlugins, defineListSerializer, defineListSpec };