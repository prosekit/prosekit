import { defineMarkInputRule } from "./input-rule.js";
import { canUseRegexLookbehind, defineCommands, defineKeymap, defineMarkSpec, toggleMark, union } from "@prosekit/core";
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
		"Mod-S": toggleMark({ type: "strike" }),
		"Mod-X": toggleMark({ type: "strike" })
	});
}
/**
* @internal
*/
function defineStrikeInputRule() {
	return defineMarkInputRule({
		regex: new RegExp((canUseRegexLookbehind() ? String.raw`(?<=\s|^)` : "") + String.raw`~~([^\s~]|[^\s~][^~]*[^\s~])~~$`),
		type: "strike"
	});
}
function defineStrike() {
	return union(defineStrikeSpec(), defineStrikeCommands(), defineStrikeKeymap(), defineStrikeInputRule());
}
export { defineStrike, defineStrikeCommands, defineStrikeInputRule, defineStrikeKeymap, defineStrikeSpec };

//# sourceMappingURL=strike.js.map