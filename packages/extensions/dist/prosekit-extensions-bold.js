import { defineMarkInputRule } from "./prosekit-extensions-input-rule.js";
import { canUseRegexLookbehind, defineCommands, defineKeymap, defineMarkSpec, toggleMark, union } from "@prosekit/core";

//#region src/bold/bold-commands.ts
/**
* @internal
*/
function defineBoldCommands() {
	return defineCommands({ toggleBold: () => toggleMark({ type: "bold" }) });
}

//#endregion
//#region src/bold/bold-input-rule.ts
/**
* @internal
*/
function defineBoldInputRule() {
	return defineMarkInputRule({
		regex: canUseRegexLookbehind() ? /(?<=\s|^)\*\*([^\s*]|[^\s*][^*]*[^\s*])\*\*$/ : /\*\*([^\s*]|[^\s*][^*]*[^\s*])\*\*$/,
		type: "bold"
	});
}

//#endregion
//#region src/bold/bold-keymap.ts
/**
* @internal
*/
function defineBoldKeymap() {
	return defineKeymap({ "Mod-b": toggleMark({ type: "bold" }) });
}

//#endregion
//#region src/bold/bold-spec.ts
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
					return typeof value === "string" && /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null;
				}
			}
		],
		toDOM() {
			return ["strong", 0];
		}
	});
}

//#endregion
//#region src/bold/bold.ts
/**
* @public
*/
function defineBold() {
	return union(defineBoldSpec(), defineBoldCommands(), defineBoldKeymap(), defineBoldInputRule());
}

//#endregion
export { defineBold, defineBoldCommands, defineBoldInputRule, defineBoldKeymap, defineBoldSpec };
//# sourceMappingURL=prosekit-extensions-bold.js.map