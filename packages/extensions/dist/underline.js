import { defineCommands, defineKeymap, defineMarkSpec, toggleMark, union } from "@prosekit/core";
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
function defineUnderline() {
	return union(defineUnderlineSpec(), defineUnderlineCommands(), defineUnderlineKeymap());
}
export { defineUnderline, defineUnderlineCommands, defineUnderlineKeymap, defineUnderlineSpec };

//# sourceMappingURL=underline.js.map