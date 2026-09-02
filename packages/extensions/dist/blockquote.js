import { defineWrappingInputRule } from "./input-rule.js";
import { defineCommands, defineKeymap, defineNodeSpec, insertNode, isAtBlockStart, toggleWrap, union, wrap } from "@prosekit/core";
import { joinBackward } from "@prosekit/pm/commands";
/**
* @internal
*/
function defineBlockquoteCommands() {
	return defineCommands({
		setBlockquote: () => {
			return wrap({ type: "blockquote" });
		},
		insertBlockquote: () => {
			return insertNode({ type: "blockquote" });
		},
		toggleBlockquote: () => {
			return toggleWrap({ type: "blockquote" });
		}
	});
}
/**
* Wraps the text block in a blockquote when `>` is typed at the start of a new
* line followed by a space.
*/
function defineBlockquoteInputRule() {
	return defineWrappingInputRule({
		regex: /^>\s/,
		type: "blockquote"
	});
}
function toggleBlockquoteKeybinding() {
	return toggleWrap({ type: "blockquote" });
}
const backspaceUnsetBlockquoteCommand = (state, dispatch, view) => {
	if (isAtBlockStart(state, view)?.node(-1).type.name === "blockquote") return joinBackward(state, dispatch, view);
	return false;
};
function backspaceUnsetBlockquote() {
	return backspaceUnsetBlockquoteCommand;
}
/**
* @internal
*/
function defineBlockquoteKeymap() {
	return defineKeymap({
		"Mod-B": toggleBlockquoteKeybinding(),
		"Backspace": backspaceUnsetBlockquote()
	});
}
function defineBlockquoteSpec() {
	return defineNodeSpec({
		name: "blockquote",
		content: "block+",
		group: "block",
		defining: true,
		parseDOM: [{ tag: "blockquote" }],
		toDOM() {
			return ["blockquote", 0];
		}
	});
}
function defineBlockquote() {
	return union(defineBlockquoteSpec(), defineBlockquoteInputRule(), defineBlockquoteCommands(), defineBlockquoteKeymap());
}
export { defineBlockquote, defineBlockquoteCommands, defineBlockquoteInputRule, defineBlockquoteKeymap, defineBlockquoteSpec };

//# sourceMappingURL=blockquote.js.map