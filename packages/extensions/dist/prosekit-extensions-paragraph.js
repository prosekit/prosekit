import { Priority, defineCommands, defineKeymap, defineNodeSpec, setBlockType, union, withPriority } from "@prosekit/core";

//#region src/paragraph/paragraph-commands.ts
/**
* @internal
*/
function setParagraph() {
	return setBlockType({ type: "paragraph" });
}
/**
* @internal
*/
function defineParagraphCommands() {
	return defineCommands({ setParagraph });
}

//#endregion
//#region src/paragraph/paragraph-keymap.ts
/**
* @internal
*/
function defineParagraphKeymap() {
	return defineKeymap({ "mod-alt-0": setParagraph() });
}

//#endregion
//#region src/paragraph/paragraph-spec.ts
/**
* @internal
*
* Defines a paragraph node spec.
*/
function defineParagraphSpec() {
	return defineNodeSpec({
		name: "paragraph",
		content: "inline*",
		group: "block",
		parseDOM: [{ tag: "p" }],
		toDOM() {
			return ["p", 0];
		}
	});
}

//#endregion
//#region src/paragraph/paragraph.ts
/**
* @public
*
* Defines a paragraph node.
*
* The paragraph node spec has the highest priority, because it should be the
* default block node for most cases.
*/
function defineParagraph() {
	return union(withPriority(defineParagraphSpec(), Priority.highest), defineParagraphCommands(), defineParagraphKeymap());
}

//#endregion
export { defineParagraph, defineParagraphCommands, defineParagraphKeymap, defineParagraphSpec };
//# sourceMappingURL=prosekit-extensions-paragraph.js.map