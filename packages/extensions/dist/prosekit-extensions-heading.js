import { defineTextBlockInputRule } from "./input-rule-B17tpW4m.js";
import { defineCommands, defineKeymap, defineNodeSpec, insertNode, isAtBlockStart, setBlockType, toggleNode, union, unsetBlockType, withSkipCodeBlock } from "@prosekit/core";

//#region src/heading/heading-commands.ts
/**
* @internal
*/
function defineHeadingCommands() {
	return defineCommands({
		setHeading: (attrs) => {
			return setBlockType({
				type: "heading",
				attrs
			});
		},
		insertHeading: (attrs) => {
			return insertNode({
				type: "heading",
				attrs
			});
		},
		toggleHeading: (attrs) => {
			return toggleNode({
				type: "heading",
				attrs
			});
		}
	});
}

//#endregion
//#region src/heading/heading-input-rule.ts
/**
* Converts the text block to a heading when `#` is typed at the start of a new
* line followed by a space.
*
* @internal
*/
function defineHeadingInputRule() {
	return defineTextBlockInputRule({
		regex: /^(#{1,6})\s$/,
		type: "heading",
		attrs: (match) => {
			return { level: match[1]?.length ?? 1 };
		}
	});
}

//#endregion
//#region src/heading/heading-keymap.ts
function toggleHeadingKeybinding(level) {
	return withSkipCodeBlock(toggleNode({
		type: "heading",
		attrs: { level }
	}));
}
/**
* Set the block type to default (usually `paragraph`) when pressing Backspace at
* the start of a heading block.
*/
const backspaceUnsetHeading = (state, dispatch, view) => {
	if (isAtBlockStart(state, view)?.parent.type.name === "heading") return unsetBlockType()(state, dispatch, view);
	return false;
};
/**
* @internal
*/
function defineHeadingKeymap() {
	return defineKeymap({
		"mod-alt-1": toggleHeadingKeybinding(1),
		"mod-alt-2": toggleHeadingKeybinding(2),
		"mod-alt-3": toggleHeadingKeybinding(3),
		"mod-alt-4": toggleHeadingKeybinding(4),
		"mod-alt-5": toggleHeadingKeybinding(5),
		"mod-alt-6": toggleHeadingKeybinding(6),
		"Backspace": backspaceUnsetHeading
	});
}

//#endregion
//#region src/heading/heading-spec.ts
/**
* @internal
*/
function defineHeadingSpec() {
	return defineNodeSpec({
		name: "heading",
		attrs: { level: {
			default: 1,
			validate: "number"
		} },
		content: "inline*",
		group: "block",
		defining: true,
		parseDOM: [
			{
				tag: "h1",
				attrs: { level: 1 }
			},
			{
				tag: "h2",
				attrs: { level: 2 }
			},
			{
				tag: "h3",
				attrs: { level: 3 }
			},
			{
				tag: "h4",
				attrs: { level: 4 }
			},
			{
				tag: "h5",
				attrs: { level: 5 }
			},
			{
				tag: "h6",
				attrs: { level: 6 }
			}
		],
		toDOM(node) {
			return [`h${node.attrs.level}`, 0];
		}
	});
}

//#endregion
//#region src/heading/heading.ts
/**
* @public
*/
function defineHeading() {
	return union(defineHeadingSpec(), defineHeadingInputRule(), defineHeadingKeymap(), defineHeadingCommands());
}

//#endregion
export { defineHeading, defineHeadingCommands, defineHeadingInputRule, defineHeadingKeymap, defineHeadingSpec };
//# sourceMappingURL=prosekit-extensions-heading.js.map