import { defineMarkInputRule } from "./input-rule.js";
import { canUseRegexLookbehind, defineCommands, defineKeymap, defineMarkSpec, toggleMark, union } from "@prosekit/core";
/**
* @internal
*/
function defineItalicCommands() {
	return defineCommands({ toggleItalic: () => toggleMark({ type: "italic" }) });
}
/**
* @internal
*/
function defineItalicInputRule() {
	return defineMarkInputRule({
		regex: new RegExp((canUseRegexLookbehind() ? String.raw`(?<=\s|^)` : "") + String.raw`\*([^\s*]|[^\s*][^*]*[^\s*])\*$`),
		type: "italic"
	});
}
/**
* @internal
*/
function defineItalicKeymap() {
	return defineKeymap({ "Mod-i": toggleMark({ type: "italic" }) });
}
/**
* @internal
*/
function defineItalicSpec() {
	return defineMarkSpec({
		name: "italic",
		parseDOM: [
			{ tag: "i" },
			{ tag: "em" },
			{ style: "font-style=italic" },
			{
				style: "font-style=normal",
				clearMark: (m) => m.type.name === "italic"
			}
		],
		toDOM() {
			return ["em", 0];
		}
	});
}
function defineItalic() {
	return union(defineItalicSpec(), defineItalicCommands(), defineItalicKeymap(), defineItalicInputRule());
}
export { defineItalic, defineItalicCommands, defineItalicInputRule, defineItalicKeymap, defineItalicSpec };

//# sourceMappingURL=italic.js.map