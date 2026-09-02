import { defineMarkInputRule } from "./input-rule.js";
import { canUseRegexLookbehind, defineCommands, defineKeymap, defineMarkSpec, toggleMark, union } from "@prosekit/core";
/**
* @internal
*/
function defineBoldCommands() {
	return defineCommands({ toggleBold: () => toggleMark({ type: "bold" }) });
}
/**
* @internal
*/
function defineBoldInputRule() {
	return defineMarkInputRule({
		regex: new RegExp((canUseRegexLookbehind() ? String.raw`(?<=\s|^)` : "") + String.raw`\*\*([^\s*]|[^\s*][^*]*[^\s*])\*\*$`),
		type: "bold"
	});
}
/**
* @internal
*/
function defineBoldKeymap() {
	return defineKeymap({ "Mod-b": toggleMark({ type: "bold" }) });
}
/**
* @internal
*/
function defineBoldSpec() {
	return defineMarkSpec({
		name: "bold",
		parseDOM: [
			{ tag: "strong" },
			{
				tag: "b",
				getAttrs: (node) => {
					return typeof node !== "string" && node.style.fontWeight !== "normal" && null;
				}
			},
			{
				style: "font-weight=400",
				clearMark: (m) => m.type.name == "strong"
			},
			{
				style: "font-weight",
				getAttrs: (value) => {
					return typeof value === "string" && /^(?:bold(?:er)?|[5-9]\d{2,})$/.test(value) && null;
				}
			}
		],
		toDOM() {
			return ["strong", 0];
		}
	});
}
function defineBold() {
	return union(defineBoldSpec(), defineBoldCommands(), defineBoldKeymap(), defineBoldInputRule());
}
export { defineBold, defineBoldCommands, defineBoldInputRule, defineBoldKeymap, defineBoldSpec };

//# sourceMappingURL=bold.js.map