import { defineMarkInputRule } from "./input-rule-B17tpW4m.js";
import { canUseRegexLookbehind, defineCommands, defineKeymap, defineMarkSpec, toggleMark, union } from "@prosekit/core";

//#region src/code/code-commands.ts
/**
* @internal
*/
function defineCodeCommands() {
	return defineCommands({ toggleCode: () => toggleMark({ type: "code" }) });
}

//#endregion
//#region src/code/code-input-rule.ts
/**
* @internal
*/
function defineCodeInputRule() {
	return defineMarkInputRule({
		regex: canUseRegexLookbehind() ? /(?<=\s|^)`([^\s`]|[^\s`][^`]*[^\s`])`$/ : /`([^\s`]|[^\s`][^`]*[^\s`])`$/,
		type: "code"
	});
}

//#endregion
//#region src/code/code-keymap.ts
/**
* @internal
*/
function defineCodeKeymap() {
	return defineKeymap({ "Mod-e": toggleMark({ type: "code" }) });
}

//#endregion
//#region src/code/code-spec.ts
/**
* @internal
*/
function defineCodeSpec() {
	return defineMarkSpec({
		name: "code",
		parseDOM: [{ tag: "code" }],
		code: true,
		toDOM() {
			return ["code", 0];
		}
	});
}

//#endregion
//#region src/code/code.ts
/**
* @public
*/
function defineCode() {
	return union(defineCodeSpec(), defineCodeCommands(), defineCodeKeymap(), defineCodeInputRule());
}

//#endregion
export { defineCode, defineCodeCommands, defineCodeInputRule, defineCodeKeymap, defineCodeSpec };
//# sourceMappingURL=prosekit-extensions-code.js.map