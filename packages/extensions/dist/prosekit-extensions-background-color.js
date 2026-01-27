import { addMark, defineCommands, defineMarkSpec, removeMark, union } from "@prosekit/core";

//#region src/background-color/background-color-commands.ts
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

//#endregion
//#region src/background-color/background-color-spec.ts
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

//#endregion
//#region src/background-color/background-color.ts
/**
* Defines the `backgroundColor` mark and some commands for it.
*
* @public
*/
function defineBackgroundColor() {
	return union(defineBackgroundColorSpec(), defineBackgroundColorCommands());
}

//#endregion
export { addBackgroundColor, defineBackgroundColor, defineBackgroundColorCommands, defineBackgroundColorSpec, removeBackgroundColor };
//# sourceMappingURL=prosekit-extensions-background-color.js.map