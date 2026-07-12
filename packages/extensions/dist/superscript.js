import { defineCommands, defineMarkSpec, toggleMark, union } from "@prosekit/core";
/**
* @internal
*/
function defineSuperscriptCommands() {
	return defineCommands({ toggleSuperscript: () => toggleMark({ type: "superscript" }) });
}
/**
* @internal
*/
function defineSuperscriptSpec() {
	return defineMarkSpec({
		name: "superscript",
		excludes: "subscript",
		inclusive: true,
		parseDOM: [{ tag: "sup" }, {
			style: "vertical-align",
			getAttrs: (value) => value === "super" ? null : false
		}],
		toDOM: () => {
			return ["sup", 0];
		}
	});
}
function defineSuperscript() {
	return union(defineSuperscriptSpec(), defineSuperscriptCommands());
}
export { defineSuperscript, defineSuperscriptCommands, defineSuperscriptSpec };

//# sourceMappingURL=superscript.js.map