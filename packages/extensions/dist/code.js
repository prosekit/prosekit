import { defineMarkInputRule } from "./input-rule.js";
import { canUseRegexLookbehind, defineCommands, defineKeymap, defineMarkSpec, toggleMark, union } from "@prosekit/core";
/**
* @internal
*/
function defineCodeCommands() {
	return defineCommands({ toggleCode: () => toggleMark({ type: "code" }) });
}
/**
* @internal
*/
function defineCodeInputRule() {
	return defineMarkInputRule({
		regex: new RegExp((canUseRegexLookbehind() ? String.raw`(?<=\s|^)` : "") + "`([^\\s`]|[^\\s`][^`]*[^\\s`])`$"),
		type: "code"
	});
}
/**
* @internal
*/
function defineCodeKeymap() {
	return defineKeymap({ "Mod-e": toggleMark({ type: "code" }) });
}
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
function defineCode() {
	return union(defineCodeSpec(), defineCodeCommands(), defineCodeKeymap(), defineCodeInputRule());
}
export { defineCode, defineCodeCommands, defineCodeInputRule, defineCodeKeymap, defineCodeSpec };

//# sourceMappingURL=code.js.map