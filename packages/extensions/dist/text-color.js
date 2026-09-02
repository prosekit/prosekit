import { addMark, defineCommands, defineMarkSpec, removeMark, union } from "@prosekit/core";
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
/**
* Defines the `textColor` mark and some commands for it.
*/
function defineTextColor() {
	return union(defineTextColorSpec(), defineTextColorCommands());
}
export { addTextColor, defineTextColor, defineTextColorCommands, defineTextColorSpec, removeTextColor };

//# sourceMappingURL=text-color.js.map