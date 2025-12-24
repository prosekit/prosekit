import { defineCommands, defineKeymap, defineNodeAttr, setNodeAttrs, union } from "@prosekit/core";

//#region src/text-align/index.ts
function defineTextAlignAttr(type, defaultValue) {
	return defineNodeAttr({
		type,
		attr: "textAlign",
		default: defaultValue,
		splittable: true,
		toDOM: (value) => value ? ["style", `text-align:${value};`] : null,
		parseDOM: (node) => {
			return node.style.getPropertyValue("text-align") || null;
		}
	});
}
/**
* @internal
*/
function defineTextAlignAttrs(types, defaultValue) {
	return union(types.map((type) => defineTextAlignAttr(type, defaultValue)));
}
/**
* @internal
*/
function setTextAlign({ types, value }) {
	return setNodeAttrs({
		type: types,
		attrs: { textAlign: value }
	});
}
/**
* @internal
*/
function defineTextAlignCommands(types) {
	return defineCommands({ setTextAlign: (value) => setTextAlign({
		types,
		value
	}) });
}
/**
* @internal
*/
function defineTextAlignKeymap(types) {
	return defineKeymap({
		"Mod-L": setTextAlign({
			types,
			value: "left"
		}),
		"Mod-E": setTextAlign({
			types,
			value: "center"
		}),
		"Mod-R": setTextAlign({
			types,
			value: "right"
		}),
		"Mod-J": setTextAlign({
			types,
			value: "justify"
		})
	});
}
/**
* Adds a `textAlign` attribute to the specified nodes. This will be rendered as
* a CSS `text-align` style.
*
* @public
*/
function defineTextAlign(options) {
	return union(defineTextAlignAttrs(options.types, options.default || "left"), defineTextAlignKeymap(options.types), defineTextAlignCommands(options.types));
}

//#endregion
export { defineTextAlign, defineTextAlignCommands, defineTextAlignKeymap, setTextAlign };
//# sourceMappingURL=prosekit-extensions-text-align.js.map