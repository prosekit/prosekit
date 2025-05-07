import { defineMarkInputRule } from "./input-rule-Gji4N7Oe.js";
import { canUseRegexLookbehind, defineCommands, defineKeymap, defineMarkSpec, toggleMark, union } from "@prosekit/core";

//#region src/strike/index.ts
/**
* @internal
*/
function defineStrikeSpec() {
	return defineMarkSpec({
		name: "strike",
		parseDOM: [
			{ tag: "s" },
			{ tag: "strike" },
			{ tag: "del" },
			{ style: "text-decoration=line-through" },
			{ style: "text-decoration-line=line-through" }
		],
		toDOM() {
			return ["s", 0];
		}
	});
}
/**
* @internal
*/
function defineStrikeCommands() {
	return defineCommands({ toggleStrike: () => toggleMark({ type: "strike" }) });
}
/**
* @internal
*/
function defineStrikeKeymap() {
	return defineKeymap({
		"Mod-shift-s": toggleMark({ type: "strike" }),
		"Mod-shift-x": toggleMark({ type: "strike" })
	});
}
/**
* @internal
*/
function defineStrikeInputRule() {
	return defineMarkInputRule({
		regex: canUseRegexLookbehind() ? /(?<=\s|^)~~([^\s~]|[^\s~][^~]*[^\s~])~~$/ : /~~([^\s~]|[^\s~][^~]*[^\s~])~~$/,
		type: "strike"
	});
}
/**
* @public
*/
function defineStrike() {
	return union(defineStrikeSpec(), defineStrikeCommands(), defineStrikeKeymap(), defineStrikeInputRule());
}

//#endregion
export { defineStrike, defineStrikeCommands, defineStrikeInputRule, defineStrikeKeymap, defineStrikeSpec };