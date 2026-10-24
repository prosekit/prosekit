import { defineCommands, defineKeymap, defineNodeSpec, insertNode, union } from "@prosekit/core";
/**
* @internal
*/
function insertHardBreak() {
	return insertNode({ type: "hardBreak" });
}
/**
* @internal
*/
function defineHardBreakCommands() {
	return defineCommands({ insertHardBreak });
}
/**
* @internal
*/
function defineHardBreakKeymap() {
	return defineKeymap({
		"Mod-Enter": insertHardBreak(),
		"Shift-Enter": insertHardBreak()
	});
}
/**
* @internal
*/
function defineHardBreakSpec() {
	return defineNodeSpec({
		name: "hardBreak",
		inline: true,
		selectable: false,
		leafText: () => "\n",
		group: "inline",
		parseDOM: [{ tag: "br" }],
		toDOM() {
			return ["br"];
		}
	});
}
function defineHardBreak() {
	return union(defineHardBreakSpec(), defineHardBreakKeymap(), defineHardBreakCommands());
}
export { defineHardBreak, defineHardBreakCommands, defineHardBreakKeymap, defineHardBreakSpec };

//# sourceMappingURL=hard-break.js.map