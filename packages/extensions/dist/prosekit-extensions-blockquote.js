import { a as defineWrappingInputRule } from "./input-rule-COGr_GBb.js";
import { defineCommands, defineKeymap, defineNodeSpec, insertNode, isAtBlockStart, toggleWrap, union, wrap } from "@prosekit/core";
import { joinBackward } from "@prosekit/pm/commands";

//#region src/blockquote/blockquote-commands.ts
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

//#endregion
//#region src/blockquote/blockquote-input-rule.ts
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

//#endregion
//#region src/blockquote/blockquote-keymap.ts
function toggleBlockquoteKeybinding() {
	return toggleWrap({ type: "blockquote" });
}
function backspaceUnsetBlockquote() {
	return (state, dispatch, view) => {
		if (isAtBlockStart(state, view)?.node(-1).type.name === "blockquote") return joinBackward(state, dispatch, view);
		return false;
	};
}
/**
* @internal
*/
function defineBlockquoteKeymap() {
	return defineKeymap({
		"mod-shift-b": toggleBlockquoteKeybinding(),
		"Backspace": backspaceUnsetBlockquote()
	});
}

//#endregion
//#region src/blockquote/blockquote-spec.ts
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

//#endregion
//#region src/blockquote/blockquote.ts
/**
* @public
*/
function defineBlockquote() {
	return union(defineBlockquoteSpec(), defineBlockquoteInputRule(), defineBlockquoteCommands(), defineBlockquoteKeymap());
}

//#endregion
export { defineBlockquote, defineBlockquoteCommands, defineBlockquoteInputRule, defineBlockquoteKeymap, defineBlockquoteSpec };
//# sourceMappingURL=prosekit-extensions-blockquote.js.map