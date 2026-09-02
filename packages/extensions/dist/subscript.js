import { defineCommands, defineMarkSpec, toggleMark, union } from "@prosekit/core";
/**
* @internal
*/
function defineSubscriptCommands() {
	return defineCommands({ toggleSubscript: () => toggleMark({ type: "subscript" }) });
}
/**
* @internal
*/
function defineSubscriptSpec() {
	return defineMarkSpec({
		name: "subscript",
		excludes: "superscript",
		inclusive: true,
		parseDOM: [{ tag: "sub" }, {
			style: "vertical-align",
			getAttrs: (value) => value === "sub" ? null : false
		}],
		toDOM: () => {
			return ["sub", 0];
		}
	});
}
function defineSubscript() {
	return union(defineSubscriptSpec(), defineSubscriptCommands());
}
export { defineSubscript, defineSubscriptCommands, defineSubscriptSpec };

//# sourceMappingURL=subscript.js.map