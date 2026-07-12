import { defineInputRule } from "./input-rule.js";
import { t as defineDropIndicator } from "./drop-indicator2.js";
import { Plugin } from "@prosekit/pm/state";
import { defineClipboardSerializer, defineCommands, defineKeymap, defineNodeSpec, definePlugin, insertNode, union } from "@prosekit/core";
import { chainCommands, deleteSelection } from "@prosekit/pm/commands";
import { isElementLike } from "@ocavue/utils";
import { ListDOMSerializer, createDedentListCommand, createDedentListCommand as dedentList, createIndentListCommand, createIndentListCommand as indentList, createListEventPlugin, createListRenderingPlugin, createListSpec, createMoveListCommand as moveList, createSafariInputMethodWorkaroundPlugin, createSplitListCommand as splitList, createToggleCollapsedCommand as toggleCollapsed, createToggleListCommand as toggleList, createUnwrapListCommand as unwrapList, createWrapInListCommand as wrapInList, deleteCommand, enterCommand, findCheckboxInListItem, joinCollapsedListBackward, joinListElements, joinListUp, listInputRules, listToDOM, protectCollapsed, unwrapListSlice } from "prosemirror-flat-list";
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
		dedentList,
		indentList,
		moveList,
		splitList,
		toggleCollapsed,
		unwrapList,
		toggleList,
		wrapInList,
		insertList
	});
}
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
/**
* @internal
*/
function defineListInputRules() {
	return union(listInputRules.map(defineInputRule));
}
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
/**
* @internal
*/
function defineListSerializer() {
	return defineClipboardSerializer({
		serializeFragmentWrapper: (fn) => {
			return (...args) => {
				return normalizeElementTree(joinListElements(fn(...args)));
			};
		},
		serializeNodeWrapper: (fn) => {
			return (...args) => {
				const dom = fn(...args);
				return isElementLike(dom) ? normalizeElementTree(joinListElements(dom)) : dom;
			};
		},
		nodesFromSchemaWrapper: (fn) => {
			return (...args) => {
				return {
					...fn(...args),
					list: (node) => listToDOM({
						node,
						nativeList: true
					})
				};
			};
		}
	});
}
function normalizeElementTree(node) {
	if (isElementLike(node)) normalizeTaskList(node);
	for (const child of node.children) normalizeElementTree(child);
	return node;
}
/**
* Modifies the DOM tree for task lists to ensure that the output HTML can be
* parsed by rehype-remark.
*/
function normalizeTaskList(node) {
	if (!node.classList.contains("prosemirror-flat-list") || node.getAttribute("data-list-kind") !== "task" || node.children.length !== 2) return;
	const marker = node.children.item(0);
	if (!marker || !marker.classList.contains("list-marker")) return;
	const checkbox = findCheckboxInListItem(marker);
	if (!checkbox) return;
	const content = node.children.item(1);
	if (!content || !content.classList.contains("list-content")) return;
	const textBlock = content.children.item(0);
	if (!textBlock || ![
		"P",
		"H1",
		"H2",
		"H3",
		"H4",
		"H5",
		"H6"
	].includes(textBlock.tagName)) return;
	node.replaceChildren(...content.children);
	textBlock.prepend(checkbox);
}
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
	return defineNodeSpec({
		...createListSpec(),
		toDOM: (node) => {
			return listToDOM({
				node,
				getMarkers
			});
		},
		name: "list"
	});
}
function defineList() {
	return union(defineListSpec(), defineListPlugins(), defineListKeymap(), defineListInputRules(), defineListCommands(), defineListSerializer(), defineListDropIndicator());
}
export { ListDOMSerializer, dedentList, defineList, defineListCommands, defineListDropIndicator, defineListInputRules, defineListKeymap, defineListPlugins, defineListSerializer, defineListSpec, indentList, insertList, moveList, splitList, toggleCollapsed, toggleList, unwrapList, wrapInList };

//# sourceMappingURL=list.js.map