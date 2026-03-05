import { defineCommands, defineKeymap, defineMarkSpec, toggleMark, union } from "@prosekit/core";

//#region src/underline/index.ts
/**
* @internal
*/
function defineUnderlineSpec() {
	return defineMarkSpec({
		name: "underline",
		parseDOM: [
			{ tag: "u" },
			{ tag: "underline" },
			{ style: "text-decoration=underline" },
			{ style: "text-decoration-line=underline" }
		],
		toDOM() {
			return ["u", 0];
		}
	});
}
/**
* @internal
*/
function defineUnderlineCommands() {
	return defineCommands({ toggleUnderline: () => toggleMark({ type: "underline" }) });
}
/**
* @internal
*/
function defineUnderlineKeymap() {
	return defineKeymap({ "Mod-u": toggleMark({ type: "underline" }) });
}
/**
* @public
*/
function defineUnderline() {
	return union(defineUnderlineSpec(), defineUnderlineCommands(), defineUnderlineKeymap());
}

//#endregion
export { defineUnderline, defineUnderlineCommands, defineUnderlineKeymap, defineUnderlineSpec };
//# sourceMappingURL=prosekit-extensions-underline.js.map