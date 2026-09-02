import { addMark, defineCommands, defineMarkSpec, removeMark, union } from "@prosekit/core";
/**
* @internal
*/
function addBackgroundColor(attrs) {
	return addMark({
		type: "backgroundColor",
		attrs
	});
}
/**
* @internal
*/
function removeBackgroundColor() {
	return removeMark({ type: "backgroundColor" });
}
/**
* @internal
*/
function defineBackgroundColorCommands() {
	return defineCommands({
		addBackgroundColor,
		removeBackgroundColor
	});
}
/**
* @internal
*/
function defineBackgroundColorSpec() {
	return defineMarkSpec({
		name: "backgroundColor",
		attrs: { color: { validate: "string" } },
		parseDOM: [{
			tag: ":where([style*=\"background-color:\"], [data-background-color])",
			getAttrs: (node) => {
				const value = node.getAttribute("data-background-color");
				if (value && value !== "inherit") return { color: value };
				const color = node.style.backgroundColor;
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
					"style": `background-color: ${color};`,
					"data-background-color": color
				},
				0
			];
		}
	});
}
/**
* Defines the `backgroundColor` mark and some commands for it.
*/
function defineBackgroundColor() {
	return union(defineBackgroundColorSpec(), defineBackgroundColorCommands());
}
export { addBackgroundColor, defineBackgroundColor, defineBackgroundColorCommands, defineBackgroundColorSpec, removeBackgroundColor };

//# sourceMappingURL=background-color.js.map