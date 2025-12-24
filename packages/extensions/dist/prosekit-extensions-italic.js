import { r as defineMarkInputRule } from "./input-rule-dmsb3j6w.js";
import { canUseRegexLookbehind, defineCommands, defineKeymap, defineMarkSpec, toggleMark, union } from "@prosekit/core";

//#region src/italic/italic-commands.ts
/**
* @internal
*/
function defineItalicCommands() {
	return defineCommands({ toggleItalic: () => toggleMark({ type: "italic" }) });
}

//#endregion
//#region src/italic/italic-input-rule.ts
/**
* @internal
*/
function defineItalicInputRule() {
	return defineMarkInputRule({
		regex: canUseRegexLookbehind() ? /(?<=\s|^)\*([^\s*]|[^\s*][^*]*[^\s*])\*$/ : /\*([^\s*]|[^\s*][^*]*[^\s*])\*$/,
		type: "italic"
	});
}

//#endregion
//#region src/italic/italic-keymap.ts
/**
* @internal
*/
function defineItalicKeymap() {
	return defineKeymap({ "Mod-i": toggleMark({ type: "italic" }) });
}

//#endregion
//#region src/italic/italic-spec.ts
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

//#endregion
//#region src/italic/italic.ts
/**
* @public
*/
function defineItalic() {
	return union(defineItalicSpec(), defineItalicCommands(), defineItalicKeymap(), defineItalicInputRule());
}

//#endregion
export { defineItalic, defineItalicCommands, defineItalicInputRule, defineItalicKeymap, defineItalicSpec };
//# sourceMappingURL=prosekit-extensions-italic.js.map