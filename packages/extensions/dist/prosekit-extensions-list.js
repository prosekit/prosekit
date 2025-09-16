import { defineInputRule } from "./input-rule-B17tpW4m.js";
import { defineDropIndicator } from "./drop-indicator-E7nCfdnR.js";
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
//#region src/list/list-drop-indicator.ts
/**
* Configures drop indicator to avoid unexpected drop point.
*
* We don't want to drag a list node and drop it as the first
* child of another list node.
*
* @internal
*/
function defineListDropIndicator() {
	return defineDropIndicator({ onDrag });
}
const onDrag = ({ view, pos }) => {
	const slice = view.dragging?.slice;
	if (slice && slice.openStart === 0 && slice.openEnd === 0 && slice.content.childCount === 1) {
		if (slice.content.child(0).type.name === "list") {
			const $pos = view.state.doc.resolve(pos);
			if ($pos.parent.type.name === "list" && $pos.index() === 0) return false;
		}
	}
	return true;
};

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
				return {
					...fn(...args),
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
function getMarkers(node) {
	const attrs = node.attrs;
	switch (attrs.kind) {
		case "task": return [["label", ["input", {
			type: "checkbox",
			checked: attrs.checked ? "" : void 0
		}]]];
		default: return [];
	}
}
/**
* @internal
*/
function defineListSpec() {
	const spec = createListSpec();
	return defineNodeSpec({
		...spec,
		toDOM: (node) => {
			return listToDOM({
				node,
				getMarkers
			});
		},
		name: "list"
	});
}

//#endregion
//#region src/list/list.ts
/**
* @public
*/
function defineList() {
	return union(defineListSpec(), defineListPlugins(), defineListKeymap(), defineListInputRules(), defineListCommands(), defineListSerializer(), defineListDropIndicator());
}

//#endregion
export { ListDOMSerializer, defineList, defineListCommands, defineListInputRules, defineListKeymap, defineListPlugins, defineListSerializer, defineListSpec };
//# sourceMappingURL=prosekit-extensions-list.js.map