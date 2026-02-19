import { addMark, defineCommands, defineMarkSpec, removeMark, union } from "@prosekit/core";

//#region src/text-color/text-color-commands.ts
/**
* @internal
*/
function addTextColor(attrs) {
	return addMark({
		type: "textColor",
		attrs
	});
}
/**
* @internal
*/
function removeTextColor() {
	return removeMark({ type: "textColor" });
}
/**
* @internal
*/
function defineTextColorCommands() {
	return defineCommands({
		addTextColor,
		removeTextColor
	});
}

//#endregion
//#region src/text-color/text-color-spec.ts
/**
* @internal
*/
function defineTextColorSpec() {
	return defineMarkSpec({
		name: "textColor",
		attrs: { color: { validate: "string" } },
		parseDOM: [{
			tag: ":where([style*=\"color:\"], [data-text-color])",
			getAttrs: (node) => {
				const value = node.getAttribute("data-text-color");
				if (value && value !== "inherit") return { color: value };
				const color = node.style.color;
				if (color && color !== "inherit") return { color };
				return false;
			},
			consuming: false
		}],
		toDOM(mark) {
			const color = mark.attrs.color;
			return [
				"span",
				{
					"style": `color: ${color};`,
					"data-text-color": color
				},
				0
			];
		}
	});
}

//#endregion
//#region src/text-color/text-color.ts
/**
* Defines the `textColor` mark and some commands for it.
*
* @public
*/
function defineTextColor() {
	return union(defineTextColorSpec(), defineTextColorCommands());
}

//#endregion
export { addTextColor, defineTextColor, defineTextColorCommands, defineTextColorSpec, removeTextColor };
//# sourceMappingURL=prosekit-extensions-text-color.js.map