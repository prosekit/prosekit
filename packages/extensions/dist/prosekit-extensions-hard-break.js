import { defineCommands, defineKeymap, defineNodeSpec, insertNode, union } from "@prosekit/core";

//#region src/hard-break/hard-break-commands.ts
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

//#endregion
//#region src/hard-break/hard-break-keymap.ts
/**
* @internal
*/
function defineHardBreakKeymap() {
	return defineKeymap({
		"Mod-Enter": insertHardBreak(),
		"Shift-Enter": insertHardBreak()
	});
}

//#endregion
//#region src/hard-break/hard-break-spec.ts
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

//#endregion
//#region src/hard-break/hard-break.ts
/**
* @public
*/
function defineHardBreak() {
	return union(defineHardBreakSpec(), defineHardBreakKeymap(), defineHardBreakCommands());
}

//#endregion
export { defineHardBreak, defineHardBreakCommands, defineHardBreakKeymap, defineHardBreakSpec };
//# sourceMappingURL=prosekit-extensions-hard-break.js.map