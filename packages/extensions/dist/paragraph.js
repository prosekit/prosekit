import { defineCommands, defineKeymap, defineNodeSpec, setBlockType, union, withPriority } from "@prosekit/core";
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
/**
* @internal
*/
function defineParagraphKeymap() {
	return defineKeymap({ "Mod-Alt-0": setParagraph() });
}
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
/**
* Defines a paragraph node.
*
* The paragraph node spec has the highest priority, because it should be the
* default block node for most cases.
*/
function defineParagraph() {
	return union(withPriority(defineParagraphSpec(), 4), defineParagraphCommands(), defineParagraphKeymap());
}
export { defineParagraph, defineParagraphCommands, defineParagraphKeymap, defineParagraphSpec };

//# sourceMappingURL=paragraph.js.map