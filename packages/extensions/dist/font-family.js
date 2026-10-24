import { addMark, defineCommands, defineMarkSpec, removeMark, union } from "@prosekit/core";
/**
* @internal
*/
function addFontFamily(attrs) {
	return addMark({
		type: "fontFamily",
		attrs
	});
}
/**
* @internal
*/
function removeFontFamily() {
	return removeMark({ type: "fontFamily" });
}
/**
* @internal
*/
function defineFontFamilyCommands() {
	return defineCommands({
		addFontFamily,
		removeFontFamily
	});
}
/**
* @internal
*/
function defineFontFamilySpec() {
	return defineMarkSpec({
		name: "fontFamily",
		attrs: { family: { validate: "string" } },
		parseDOM: [{
			tag: ":where([style*=\"font-family:\"], [data-font-family])",
			getAttrs: (node) => {
				const value = node.getAttribute("data-font-family");
				if (value && value !== "inherit") return { family: value };
				const fontFamily = node.style.fontFamily;
				if (fontFamily && fontFamily !== "inherit") return { family: fontFamily };
				return false;
			},
			consuming: false
		}],
		toDOM(mark) {
			const family = mark.attrs.family;
			return [
				"span",
				{
					"style": `font-family: ${family};`,
					"data-font-family": family
				},
				0
			];
		}
	});
}
/**
* Defines the `fontFamily` mark and some commands for it.
*/
function defineFontFamily() {
	return union(defineFontFamilySpec(), defineFontFamilyCommands());
}
export { addFontFamily, defineFontFamily, defineFontFamilyCommands, defineFontFamilySpec, removeFontFamily };

//# sourceMappingURL=font-family.js.map